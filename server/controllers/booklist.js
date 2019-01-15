const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { page, openid } = ctx.request.query
    const size = 10
    const mysqlSelect = mysql('books')
                        .select('books.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                        .orderBy('books.id', 'desc')
    let books = []
    if (openid) {
        books = await mysqlSelect.where('openid', openid)
    } else {
        books = await mysqlSelect.limit(size).offset(Number(page) * size)
    }
    ctx.state.data = {
        list: books.map(item => {
            return Object.assign(item, {
                user_info: {
                    nickName: JSON.parse(item.user_info).nickName
                }
            })
        })
    }
}
