const {model, Schema } = require('mongoose')
const User = require('./User')

const PostSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    user : User.schema,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createAt: String
        }
    ],
    

})

module.exports = model('Post', PostSchema)