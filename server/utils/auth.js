//import JWT, a library to handle JSON Web Tokens
const jwt = require("jsonwebtoken");

//Import secret key from .env
require('dotenv').config();

// Set the secret key and expiration time for your JWToken
const SECRET_KEY = process.env.JWT_SECRETKEY;
const EXPIRATION_TIME = process.env.JWT_EXPIRATION;

// Define 'secret' and 'expiration' values (defined in .env file)

// Export an object with two methods: 'authMiddleware' and 'signToken'
module.exports = {
  // Middleware function for authenticating routes
  authMiddleware: function ({ req }) {
    // Allow the token to be sent via request query parameters, request body, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token is included in the 'Authorization' header, extract it
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim(); // Remove 'Bearer ' from the token string
    }

    // If there's no token, return the original request object
    if (!token) {
      return req;
    }

    // Verify the token and extract user data from it
    try {
      const { data } = jwt.verify(token, SECRET_KEY, { maxAge: EXPIRATION_TIME });
      req.user = data; // Attach user data to the request object
    } catch {
      console.log("Invalid token"); // Handle invalid tokens (for debugging)
    }

    // Return the updated request object (with or without user data)
    return req;
  },
  
