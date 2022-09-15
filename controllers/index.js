module.exports = {
    getMainPage: async (req, res, next) => {
        return res.render('index', { title: 'Express' })},
}