// Use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// Create a new class to instantiate for a user
class AuthService {
  // Get user data from the decoded token
  getProfile() {
    return decode(this.getToken());
  }

  