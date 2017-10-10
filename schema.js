const graphql = require('graphql');
const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} = graphql

// type Post{
//     title: String,
//     descripttion: String
// }

// type Viewer{
//     email: String,
//     name: String,
//     posts: [Post]
// }

// type Query{
//     viewer: Viewer
// }

// schema {
//     query: Query
// }

const getUser = () => ({
    email: 'abc@abc.com',
    name: 'abc'
})

const getPosts = () => ([
    {
        id: 1,
        title: 'Post 1',
        description: 'abc'
    },
    {
        id: 2,
        title: 'Post 2',
        description: 'def'
    }
])

const Post = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    })
})

const Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        posts: {
            type: new GraphQLList(Post),
            resolve: getPosts,
        }
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        viewer: {
            type: Viewer,
            resolve: () => {
                return getUser()
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: Query,
})
module.exports = schema