const graphql = require('graphql');
const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt
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

const ALL_POSTS = [
    {
        id: 1,
        title: "1-sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        description: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
        published_at: '2017-01-30'
    },
    {
        id: 2,
        title: "2-qui est esse",
        description: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
        published_at: '2017-01-30'
    },
    {
        id: 3,
        title: "3-ea molestias quasi exercitationem repellat qui ipsa sit aut",
        description: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
        published_at: '2017-01-30'
    },
    {
        id: 4,
        title: "4-eum et est occaecati",
        description: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit",
        published_at: '2017-01-30'
    },
    {
        id: 5,
        title: "5-nesciunt quas odio",
        description: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque",
        published_at: '2017-01-30'
    },
    {
        id: 6,
        title: "6-dolorem eum magni eos aperiam quia",
        description: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae",
        published_at: '2017-01-30'
    },
    {
        id: 7,
        title: "7-magnam facilis autem",
        description: "dolore placeat quibusdam ea quo vitae magni quis enim qui quis quo nemo aut saepe quidem repellat excepturi ut quia sunt ut sequi eos ea sed quas",
        published_at: '2017-01-30'
    },
    {
        id: 8,
        title: "8-dolorem dolore est ipsam",
        description: "dignissimos aperiam dolorem qui eum facilis quibusdam animi sint suscipit qui sint possimus cum quaerat magni maiores excepturi ipsam ut commodi dolor voluptatum modi aut vitae",
        published_at: '2017-01-30'
    },
    {
        id: 9,
        title: "9-nesciunt iure omnis dolorem tempora et accusantium",
        description: "consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas",
        published_at: '2017-01-30'
    },
    {
        id: 10,
        title: "10-optio molestias id quia eum",
        description: "quo et expedita modi cum officia vel magni doloribus qui repudiandae vero nisi sit quos veniam quod sed accusamus veritatis error",
        published_at: '2017-01-30'
    },
    {
        id: 11,
        title: "11-nesciunt quas odio",
        description: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque",
        published_at: '2017-01-30'
    },
    {
        id: 12,
        title: "12-dolorem eum magni eos aperiam quia",
        description: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae",
        published_at: '2017-01-30'
    },
]

const getPosts = (viewer, { offset, limit }) => {
    console.warn('Server-Schema', offset, limit)
    return ALL_POSTS.slice(offset, offset + limit)
}

const Post = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLString },
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
            args: {
                offset: { type: GraphQLInt, defaultValue: 0 },
                limit: { type: GraphQLInt, defaultValue: 10 },
            },
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