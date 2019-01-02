const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const books = await mysql('books')
                        .select('books.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                        .orderBy('books.id', 'desc')
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
