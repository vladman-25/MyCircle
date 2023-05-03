const User = require('../models/user.model');
const Page = require('../models/page.model')

searchAction = async (req, res) => {
    try {
        let { search } = req.body;
        const users_firstname = await User.find({firstname: { $regex: new RegExp("^" + search.toLowerCase(), "i") }});
        const users_lastname = await User.find({lastname: { $regex: new RegExp("^" + search.toLowerCase(), "i") }});
        const users_username = await User.find({username: { $regex: new RegExp("^" + search.toLowerCase(), "i") }});
        let arr2 = []
        arr2 = arr2.concat(users_firstname)
        arr2 = arr2.concat(users_lastname)
        arr2 = arr2.concat(users_username)
        const arr3 = arr2.map((obj, index) => {
            obj.password = ""
            return obj;
        })
        const unique = arr3.filter((obj, index) => {
            return index === arr3.findIndex(o => obj.id === o.id && obj.username === o.username);
        });


        const pages_name = await Page.find({name: { $regex: new RegExp("^" + search.toLowerCase(), "i") }});
        const pages_category = await Page.find({category: { $regex: new RegExp("^" + search.toLowerCase(), "i") }});

        let arr_pg = []
        arr_pg = arr_pg.concat(pages_name)
        arr_pg = arr_pg.concat(pages_category)

        const unique_pg = arr_pg.filter((obj, index) => {
            return index === arr_pg.findIndex(o => obj.id === o.id);
        });

        return res.status(200).send({users: unique, pages: unique_pg})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

module.exports = {
    searchAction: searchAction
}