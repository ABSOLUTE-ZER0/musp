import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000',
  validateStatus: function(status){
    return status < 500;
  }
});