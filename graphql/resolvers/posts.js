const {AuthenticationError, UserInputError} = require('apollo-server')
const Post = require('../../models/Post')
const User = require('../../models/User')
const userAuth = require('../../utils/userAuth')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt: -1})
                
                return posts
            } catch (err) {
                throw new Error(err)
            }
        }, 
        async getPost(_, {postId}) {

            try{
                let post = await Post.findById(postId)
            
                if (post) {
                    console.log(post)
                    let user = await User.find({username:post.username})
                    console.log(user)
                    post.user = {...user}
                    console.log(post)

                    return post 
                }
                else throw new Error('Post not found')

            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Post: {
        user: async (post) => {
            console.log("A")
            const user = await User.find({username:post.username})
            console.log(user)
            return user
        }
    },
    Mutation:{
        async createPost(_, {body}, context) {
            
            const user = userAuth(context)
            
             if (body.trim() === '') 
                 throw new Error('Post must contain a body')
                
            const newPost = new Post({
                body,
                user: user.id, 
                username : user.username,
                createdAt : new Date().toISOString()
            })
            
            const post = await newPost.save()

            // context.pubsub.publish('NEW_POST', {
            //     newPost: post
            // })

            return post
        },
        async deletePost(_, {postId}, context) {
            const user = userAuth(context)
            try
            {
                const post = await Post.findById(postId)
                if (user.username === post.username) {
                    await post.delete()
                    return 'Post Deleted'
                }
                else throw new AuthenticationError("Can only delete posts you created")
            } catch (err) {
                throw new Error(err)
            }
            
        },
        toggleLikePost: async (_, {postId}, context) => {
            const user = userAuth(context)
            console.log(user)
            try
            {
                const post = await Post.findById(postId)
                if (post) {
                    console.log(post)
                    if (post.likes.find(like => like.username === user.username)) {
                        //post already liked,  unlike it
                        post.likes = post.likes.filter((like) => like.username !== user.username)
                        
                    } else {
                        //Add like
                        post.likes.push({
                            username: user.username,
                            createdAt: new Date().toISOString()
                        })
                    }
                    await post.save()
                    return post
                }
                else throw new UserInputError("Post does not exist")
            } catch (err) {
                throw new Error(err)
            } 
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, args, {pubsub}) => {
                return pubsub.asyncIterator('NEW_POST')
            }

        }
    }
}