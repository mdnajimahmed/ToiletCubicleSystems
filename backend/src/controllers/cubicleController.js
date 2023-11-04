

import {HTTP_METHODS} from '../config/httpMethods.js';
import {Api} from '../interfaces/api.js';

const getStatus = async (req, res) => {
  res.status(200).json({
    "status": parseInt(Math.random()*2) === 0 ? true : false
  });
}

const getStatusApi = new Api('/status',  HTTP_METHODS.GET, getStatus)
export {getStatusApi} 