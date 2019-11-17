const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let CaloriesModel = {};

// mongoose.Types.ObjectID converts the string ID
// to a real mongo ID
const convertId = mongoose.Types.ObjectId;
const setFood = (food) => _.escape(food).trim();

const CaloriesSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
    trim: true,
    set: setFood,
  },


  calories: {
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
  food: doc.food,
  calories: doc.calories,
  date: doc.date,
  createdData: doc.createdData
});

CaloriesSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CaloriesModel.find(search).select('food calories date').exec(callback);
};

CaloriesModel = mongoose.model('Calories', CaloriesSchema);

module.exports.CaloriesModel = CaloriesModel;
module.exports.CaloriesSchema = CaloriesSchema;