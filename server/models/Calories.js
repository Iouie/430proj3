const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let CaloriesModel = {};

// mongoose.Types.ObjectID converts the string ID
// to a real mongo ID
const convertId = mongoose.Types.ObjectId;
const setFood = (name) => _.escape(name).trim();

const CaloriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setFood,
  },

  cals: {
    type: Number,
    min: 1,
    required: true,
  },

  carbs: {
    type: Number,
    min: 0,
    required: true,
  },

  protein: {
    type: Number,
    min: 1,
    required: true,
  },

  fat: {
    type: Number,
    min: 1,
    required: true,
  },


  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

CaloriesSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  cals: doc.cals,
  carbs: doc.carbs,
  protein: doc.protein,
  fat: doc.fat,
});

CaloriesSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CaloriesModel.find(search).select('name cals carbs protein fat').exec(callback);
};

CaloriesModel = mongoose.model('Calories', CaloriesSchema);

module.exports.CaloriesModel = CaloriesModel;
module.exports.CaloriesSchema = CaloriesSchema;
