const postsResovers = require('./posts')
const usersResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
    Query: {
        ...postsResovers.Query,
        ...usersResolvers.Query
    }, 
    Mutation : {
        ...usersResolvers.Mutation,
        ...postsResovers.Mutation,
        ...commentsResolvers.Mutations
    },
    Subscription: {
        ...postsResovers.Subscription
    }
}