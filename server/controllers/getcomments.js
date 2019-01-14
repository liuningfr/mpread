const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { bookid } = ctx.request.query
    const comments = await mysql('comments')
                            .select('comments.*', 'cSessionInfo.user_info')
                            .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
                            .where('bookid', bookid)
    if (comments) {
        ctx.state.data = {
            list: comments.map(item => {
                const userinfo = JSON.parse(item.user_info)
                return { ...item,
                    user_info: {
                        nickName: userinfo.nickName,
                        avatarUrl: userinfo.avatarUrl
                    }
                }
            })
        }
    }
}

