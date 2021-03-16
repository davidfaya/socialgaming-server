const gql = require('graphql-tag')


module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Likes]!
    }
    type Comment {
        id: ID!
        createdAt: String!
        username: String!
        body: String!

    }
    type Likes {
        id: ID!
        createdAt: String!
        username: String!

    }
    type User {
        id: ID!
        email: String!
        username: String!
        token: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId:ID!) : Post
    }
    input RegisterInput {
        username:String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!) : String!
        createComment(postId: ID!, body:String!): Post! 
        deleteComment(postId: ID!, commentId: ID!): Post!
        toggleLikePost(postId: ID!): Post!
    }
    type Subscription {
        newPost: Post!
    }
`