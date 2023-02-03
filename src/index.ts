import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'
import {gql} from 'graphql-tag'
import {Client} from '@apperate/iexjs';
import GraphQLJSON from 'graphql-type-json';
import fetch from 'node-fetch';

import * as dotenv from 'dotenv';


dotenv.config();
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
  scalar JSON

  type Query{
    hello: String!   
  }

  type Mutation{
    quote(symbol: String!): JSON
  }
`

const resolvers = {
  JSON: GraphQLJSON,

    Query: {
      hello: ()=>"world"
    },
    Mutation: {
      quote: (_: any, {symbol}:{symbol: string} )=>{
        return getQuote(symbol);
      }
    }
  };


const client = new Client({api_token: "sk_e5e69772acc34c609a62e78faaf6741f", version:"v1"});


const getQuote= (symbol: String)=>{

  // return fetch("https://jsonplaceholder.typicode.com/todos/1")
  // .then(data=>{
  //     return data.json().then(json=>json);
  // });

 return client.quote({symbol:symbol})
 
//  .then((res:undefined)=>{
//     console.log("result",res)
//   }).catch((err:Error)=>{
//     console.log("error", err);
//   })
  
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startServer= async ()=>{

  const {url} = await startStandaloneServer(server,{listen: {port:8800}})


}


startServer();
console.log("Server started at port 4000")
