

import {HTTP_METHODS} from '../config/httpMethods.js';
import {Api} from '../interfaces/api.js';

const getTeacher = async (req, res) => {
  res.status(200).json({
    "person": "teacher"
  });
}

const getTeacherApi = new Api('/teacher',  HTTP_METHODS.GET, getTeacher)
export {getTeacherApi} 