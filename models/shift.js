const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');

const shiftSchema = new mongoose.Schema({
  worker: {
    type: new mongoose.Schema({
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
    }),
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    enum: ['0-8', '8-16', '16-24'],
    default: '0-8'
  }
});

shiftSchema.statics.lookupWorker = function (workerId) {
  return this.findOne({
    'worker._id': workerId,
  });
}

shiftSchema.statics.lookup = function (workerId, date) {
  const dateStart = moment(date).startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSS");
  const dateEnd = moment(date).endOf('day').format("YYYY-MM-DDTHH:mm:ss.SSS");

  return this.find({
    'worker._id': new mongoose.Types.ObjectId(workerId),
    'date': {
      '$gte': dateStart,
      '$lte': dateEnd
    }
  });
}

const Shift = mongoose.model('Shift', shiftSchema);

function validateShift(shift) {
  const schema = {
    workerId: Joi.objectId().required(),
    date: Joi.date().iso(),
    time: Joi.string().valid('0-8', '8-16', '16-24'),
  };

  return Joi.validate(shift, schema);
}

exports.Shift = Shift;
exports.validate = validateShift;