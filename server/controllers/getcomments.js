const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { bookid, openid } = ctx.request.query
    const mysqlSelect = mysql('comments')
                            .select('comments.*', 'cSessionInfo.user_info')
                            .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    let comments = []
    if (bookid) {
        comments = await mysqlSelect.where('bookid', bookid)
    }
    if (openid) {
        comments = await mysqlSelect.where('openid', openid)
    }
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

