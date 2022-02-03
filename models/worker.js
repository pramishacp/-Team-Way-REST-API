const Joi = require('joi');
const mongoose = require('mongoose');

const Worker = mongoose.model('Worker', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validateWorker(worker) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(worker, schema);
}

exports.Worker = Worker;
exports.validate = validateWorker;