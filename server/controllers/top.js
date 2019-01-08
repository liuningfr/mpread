const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const top = await mysql('books')
                      .select('id', 'title', 'image', 'count')
                      .orderBy('count', 'desc')
                      .limit(6)
    ctx.state.data = {
        list: top
    }
}
