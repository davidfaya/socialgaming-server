const {UserInputError} = require('apollo-server')
const {AuthenticationError} = require('apollo-server')
const Post = require('../../models/Post')
const userAuth = require('../../utils/userAuth')
const posts = require('./posts')

module.exports = {
    Mutations: {
        createComment: async (_, {postId, body}, context)=> {
                const user = userAuth(context)
                if (body.trim() === '') {
                    throw new UserInputError('Must have a commnent', { 
                        errors: {
                            body: 'Comment must not be empty'
                        }
                    })
                }
                const post = await Post.findById(postId)
                if (post) {
                    post.comments.unshift({
                        body, 
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                    await post.save()
                    return post
                    
                }
                else throw new UserInputError('Post does not exist')

        },
        deleteComment: async (_, {postId, commentId}, context)=> {
         const user = userAuth(context)
         const post = await Post.findById(postId)
         if (post) {
             const commentIndex = post.comments.findIndex(cmt => cmt.id === commentId)
             
             if (post.comments[commentIndex].username === user.username){
                 post.comments.splice(commentIndex,1)
                 await post.save()
                 return post
             }
             else throw new AuthenticationError('Can only delete post you created')
         } else throw new UserInputError('Post does not exist')
        }
    }
}