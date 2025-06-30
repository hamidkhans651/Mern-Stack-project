const config = {
  // API URL for different environments
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development'
};

export default config; 