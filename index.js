const {ApolloServer, PubSub} = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})




//console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true}).then(() => {
        console.log('connected to MongoDB')
         server.listen({port: process.env.SERVER_PORT })
    }).then(res => { 
        console.log(`server running.....`)
    }).catch(err => {
        console.log(err)
    })

 
