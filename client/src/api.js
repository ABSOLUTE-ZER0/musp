import axios from 'axios';

export default axios.create({
  baseURL: 'https://boiling-headland-01485.herokuapp.com/',
  validateStatus: function(status){
    return status < 500;
  }
});