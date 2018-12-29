const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const books = await mysql('books').select('*').orderBy('id', 'desc')
    ctx.state.data = {
        list: books
    }
}
