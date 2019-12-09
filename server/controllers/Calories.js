const models = require('../models');
const Calories = models.Calories;

const makerPage = (req, res) => {
  Calories.CaloriesModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: 'An error occurred',
      });
    }

    return res.render('app', {
      csrfToken: req.csrfToken(),
      foods: docs,
    });
  });
};

const makeCalories = (req, res) => {
  if (!req.body.name || !req.body.cals
    || req.body.carbs || !req.body.protein
    || req.body.fat) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }

  const calorieData = {
    name: req.body.name,
    cals: req.body.cals,
    carbs: req.body.carbs,
    protein: req.body.protein,
    fat: req.body.fat,
    owner: req.session.account._id,
  };

  const newCalories = new Calories.CaloriesModel(calorieData);

  const caloriePromise = newCalories.save();

  caloriePromise.then(() => res.json({
    redirect: '/maker',
  }));

  caloriePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Try naming your food differently',
      });
    }

    return res.status(400).json({
      error: 'An error has occurred',
    });
  });

  return caloriePromise;
};

const searchFood = (req, res) => {
  if (!req.query.search) {
    return res.status(400).json({ error: 'Name of food is required' });
  }

  const searchedFood = {
    name: req.query.search,
  };

  return Calories.CaloriesModel.findFood(searchedFood, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }
    return res.json({ foods: doc });
  });
};

const getFoods = (request, response) => {
  const req = request;
  const res = response;

  return Calories.CaloriesModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({ beers: docs });
  });
};


module.exports.makerPage = makerPage;
module.exports.make = makeCalories;
module.exports.getFoods = getFoods;
module.exports.searchFood = searchFood;
