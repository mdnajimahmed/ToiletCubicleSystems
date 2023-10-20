import {HTTP_METHODS} from '../config/httpMethods.js';
import {Api} from '../interfaces/api.js';


const getSutdent = async (req, res) => {
  res.status(200).json({
    "person": "student"
  });
}

const postSutdent = async (req, res) => {
  res.status(200).json({
    "person": "student created",
    "received": {
      "body": req.body,
      "params": req.params,
      "query": req.query
    }
  });
}

const putSutdent = async (req, res) => {
  res.status(200).json({
    "person": "student updated",
    "received": {
      "body": req.body,
      "params": req.params,
      "query": req.query
    }
  });
}

const getSutdentApi = new Api('/student', HTTP_METHODS.GET, getSutdent)
const postSutdentApi = new Api('/student', HTTP_METHODS.POST, postSutdent)
const putSutdentApi = new Api('/student/:id', HTTP_METHODS.PUT, putSutdent)
export { getSutdentApi, postSutdentApi,putSutdentApi } 