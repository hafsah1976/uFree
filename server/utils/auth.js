// Import JWT, a library to handle JSON Web Tokens
const jwt = require("jsonwebtoken");

// Import the secret key from .env

// Set the secret key and expiration time for your JWT token
// const SECRET_KEY = process.env.JWT_SECRETKEY;
// const EXPIRATION_TIME = process.env.JWT_EXPIRATION;

function isValidEmail (email) {
  const emailRegex = /.+@.+\..+/;
  return emailRegex.test(email);
}

// Export an object with two methods: 'authMiddleware' and 'signToken'
module.exports = {
  // Middleware function for authenticating routes
  authMiddleware: function ({ req }) {
    try {
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

      console.log('-----------CONSOLEEEEEE_-------')
      console.log(process.env.EXPIRATION_TIME);
      console.log('-----------CONSOLEEEEEE_-------')
      // Verify the token and extract user data from it
      try {
        const { data } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = data; // Attach user data to the request object
      } catch (error) {
        console.log("Invalid token:", error); // Handle invalid tokens (for debugging)
      }

      // Return the updated request object (with or without user data)
      return req;
    } catch (error) {
      console.error("Error in authMiddleware:", error);
      return req; // Return the original request object in case of an error
    }
  },

  // Function to validate an email address


  // Function for signing a JWT with user data
  signToken: function ({ username, email, _id }) {
    try {
      // Add email validation here before creating the payload
      if (!isValidEmail(email)) {
        throw new Error('Invalid email address');
      }

      // Create a payload object containing user data (e.g., username, email, and user ID)
      const payload = { username, email, _id };

      // Sign a JWT with the payload, secret key, and expiration time
      return jwt.sign({ data: payload }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRATION_TIME });
    } catch (error) {
      console.error("Error in signToken:", error);
      return null; // Return null in case of an error
    }
  },
};
