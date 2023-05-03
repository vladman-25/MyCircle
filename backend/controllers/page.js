const formidable = require("formidable");
const fs = require('fs');
const Page = require("../models/page.model");
const User = require("../models/user.model");


const createPage = async(req, res) => {
    try {
        const form = formidable({ multiples: true, uploadDir: "./uploads/pages/" });
        await form.parse(req, async (err, fields, files) => {

            const name = fields.name
            const category = fields.category;
            const description = fields.description


            const newPage = new Page({
                name: name,
                category: category,
                description: description,
                image: "fake",
            })


            let imgUrl = newPage._id

            const newPath = "./uploads/pages/" + imgUrl + ".png";
            await fs.rename( "./uploads/pages/" + files.image.newFilename, newPath, function (err) {
                if (err) throw err;
            });

            imgUrl = imgUrl + ".png";
            newPage.image = imgUrl
            try {
                await newPage.save();
                return res.status(200).send(newPage)
            } catch (error) {
                console.log(error)
                return res.status(400).send({"error":"Error! Could not post!"});
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Am murit");
    }
}

const getPages = async(req, res) => {

}

const getPageById = async(req, res) => {
    try {
        const page = await Page.findById(req.params.pageID);
        if (!page) return res.status(400).send("This user id does not exist");
        return res.status(200).send(page)

    } catch(error)  {
        console.log(error)
        return res.status(500).send("Am murit")
    }
}

const editPage = async(req, res) => {

}

const deletePage = async(req, res) => {

}

module.exports = {
    createPage: createPage,
    getPages: getPages,
    getPageById: getPageById,
    editPage: editPage,
    deletePage: deletePage,
}