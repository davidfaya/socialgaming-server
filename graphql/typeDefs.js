const gql = require('graphql-tag')


module.exports = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Likes]!
        user: User
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
        image: String!
        username: String!
        token: String!
        createdAt: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId:ID!) : Post
        getUsers: [User]
        getUser(userId:ID!) : User
    }
    input RegisterInput {
        username:String!
        password:String!
        confirmPassword:String!
        email:String!
    }
    input UserUpdate {
        username: String!
        email: String!
        image: String!
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        updateUser(userUpdate: UserUpdate ) : User!
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