const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { id } = ctx.request.query

    const detail = await mysql('books')
                        .select('books.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                        .where('id', id)
                        .first()

    await mysql('books').where('id', id).increment('count', 1)
    const userInfo = JSON.parse(detail.user_info)
    ctx.state.data = {
        ...detail,
        user_info: {
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl
        }
    }
}
