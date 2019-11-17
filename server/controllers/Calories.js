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

    return res.render('user', {
      csrfToken: req.csrfToken(),
      foods: docs,
    });
  });
};

const makeCalories = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      error: 'Must have food name',
    });
  }

  const calorieData = {
    title: req.body.title,
    cal: req.body.cal,
    date: req.body.date,
    owner: req.session.account._id,
  };

  const newCalories = new Calories.CaloriesModel(calorieData);

  const caloriePromise = newCalories.save();

  caloriePromise.then(() => res.json({
    redirect: '/userPage',
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


module.exports.makerPage = makerPage;
module.exports.make = makeCalories;
