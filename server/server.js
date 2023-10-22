const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const { User, Event } = require('./models');
const { ObjectId } = require('mongoose').Types

const PORT = process.env.PORT || 3001;
const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
//   await server.start();
//   server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, async () => {
      console.log(`API server running on port ${PORT}!`);
    //   console.log(await User.find())
    //   console.log(await Event.create({
    //     name: 'Dinner with Friends',
    //     admin: new ObjectId('6534bca98526acfc8db46822'),
    //     description: 'Cool thing, huh?',
    //     availabilities: [
    //         {
    //             userId: new ObjectId('6534bca98526acfc8db46822'),
    //             availabilities: {
    //                 day: 'monday',
    //                 start: 10,
    //                 end: 22.5
    //             }
    //         }
    //     ]
    //   }));
      console.log((await Event.find().populate('availabilities'))[1].availabilities[0].availabilities);
    //   User.create({
    //     username: 'jacob',
    //     email: 'jacob@gmail.com',
    //     password: '12345678',
    //   })
    //   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
