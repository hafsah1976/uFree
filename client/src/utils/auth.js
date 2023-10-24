// Use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// Create a new class to instantiate for a user
class AuthService {
  // Get user data from the decoded token
  getProfile() {
    return decode(this.getToken());
  }
    // Check if the user is logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token); // this line is focusing on the core concept of checking for the presence of a valid token and token expiration
      }