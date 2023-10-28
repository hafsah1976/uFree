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

      // Check if the provided token is expired
 isTokenExpired(token) {
    try {
      // Decode the token to access its expiration time
      const decoded = decode(token);
  
      // Compare the expiration time 
      //(in seconds since epoch(typically refers to a predefined point in time from which time is measured. The Unix epoch, for example, is a widely used epoch)
      //with the current time
      if (decoded.exp < Date.now() / 1000) {
        // If the token is expired, return true
        return true;
      } else {
        // If the token is not expired, return false
        return false;
      }
    } catch (error) {
      // If an error occurs during decoding, return false to handle it as a non-expired token
      return false;
    }
  }
  
  // Get the user token from localStorage
 getToken() {
    // Retrieves the user token from the browser's local storage
    return localStorage.getItem('id_token');
 }
 
    // Log in the user by saving the user token to local storage
login(idToken) {
    // Save the user token to local storage
    localStorage.setItem('id_token', idToken);
  
    // Redirect the user to the home page
    // window.location.assign('/');
  }


// Log out the user by removing the user token from local storage and reloading the page
 logout() {
    // Clear the user token and profile data from local storage
    localStorage.removeItem('id_token');
  
    // Reload the page to reset the application state
    // window.location.reload();
  }
} 

  // Export the AuthService object, which includes the logout function
  const Auth = new AuthService();
  export default Auth;
  