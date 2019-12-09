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
    || !req.body.carbs || !req.body.protein
    || !req.body.fat) {
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
        error: 'It already exists',
      });
    }

    return res.status(400).json({
      error: 'An error has occurred',
    });
  });

  return caloriePromise;
};

const getFoods = (request, response) => {
  const req = request;
  const res = response;

  return Calories.CaloriesModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({ foods: docs });
  });
};

const deleteFood = (req, res) => {
  const name = `${req.body.name}`;
  if (!name) {
    return res.status(400).json({
      error: 'Name required',
    });
  }

  return Calories.CaloriesModel.findByName(name, (err, docs) => {
    if (err || docs.length === 0) {
      return res.status(400).json({ error: 'No Food exists' });
    }
    return Calories.CaloriesModel.removeAllByName(name, (error) => {
      if (error) {
        return res.status(400).json({ error: 'an error occured' });
      }
      return getFoods(req, res);
    });
  });
};  


module.exports.makerPage = makerPage;
module.exports.make = makeCalories;
module.exports.getFoods = getFoods;
module.exports.deleteFood = deleteFood;
