import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'
import {gql} from 'graphql-tag'
import {Client} from '@apperate/iexjs'
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];


const typeDefs = gql`
  type Query{
    hello: String!   
  }
`

const resolvers = {
    Query: {
      hello: ()=>"world"
    },
  };


const client = new Client({api_token: "TOKEN", version:"VERSION"});
client.quote({symbol:"AAPL"}).then(res=>console.log(res));


const server = new ApolloServer({
    typeDefs,
    resolvers
});

const 

const {url} = await startStandaloneServer(server,{listen: {port:4000}})

console.log("Server started at port 4000")