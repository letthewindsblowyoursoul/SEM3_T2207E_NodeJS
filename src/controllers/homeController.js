const getLogin = (req, res) => {
    //process data
    //call model
    res.render('sample.ejs')
}
const getHomepage = (req, res) => {
    res.send('Hello World!')
}

module.exports = {
    getHomepage,getLogin
}