const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let CaloriesModel = {};

// mongoose.Types.ObjectID converts the string ID
// to a real mongo ID
const convertId = mongoose.Types.ObjectId;
const setFood = (title) => _.escape(title).trim();

const CaloriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setFood,
  },

  cal: {
    type: Number,
    min: 1,
    required: true,
  },

  date: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  }
});

CaloriesSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  cal: doc.cal,
  date: doc.date,
});

CaloriesSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CaloriesModel.find(search).select('title cal date').exec(callback);
};

CaloriesModel = mongoose.model('Calories', CaloriesSchema);

module.exports.CaloriesModel = CaloriesModel;
module.exports.CaloriesSchema = CaloriesSchema;