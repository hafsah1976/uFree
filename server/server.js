require('dotenv').config({ path: '../.env' });
const path = require('path');

const db = require('./config/connection');
const { setEventCodes } = require('./utils/generateCode');

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const formatError = require('./utils/formatError');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

  app.get('/service-worker.js', (req, res) => {
    // Set the 'Content-Type' header to 'application/javascript'
    res.setHeader('Content-Type', 'application/javascript');
  
    // Read the service worker file
    const serviceWorkerPath = path.join(__dirname, '../../service-worker.js');
    const serviceWorkerFile = fs.readFileSync(serviceWorkerPath, 'utf8');
  
    // Send the service worker file as the response
    res.send(serviceWorkerFile);
  });

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {

    // get all event codes from DB
    const eventsCursor = db.collection('events').find({});
    eventsCursor.toArray()
      .then(events => {
        const codes = events.map(e => e.code);
        setEventCodes(new Set(codes));
      });

    app.listen(PORT, async () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };

// Call the async function to start the server
startApolloServer();
