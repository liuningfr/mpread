const https = require('https')
const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { isbn, openid } = ctx.request.body
    if (isbn && openid) {
        const url = `https://api.douban.com/v2/book/isbn/${isbn}`
        const bookinfo = await getJSON(url)
        const { title, image, alt, publisher, summary, price, rating: { average: rate } } = bookinfo
        const tags = bookinfo.tags.map(item => `${item.title} ${item.count}`).join(',')
        const author = bookinfo.author.join(',')
        const book = { isbn, openid, title, image, alt, publisher, summary, price, rate, tags, author }
        try {
            await mysql('books').insert(book)
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: `添加图书失败${e.sqlMessage}`
                }
            }
        }
        console.log(book.publisher)
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
