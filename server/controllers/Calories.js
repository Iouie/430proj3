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


const getVideos = (req, res) => {
  res.json([
    { name: 'How to Make Eating unbelievably easy',
      url: 'https://www.youtube.com/watch?v=Q4yUlJV31Rk',
      description: 'Summary of Luke Darward and how he ate healthy',
    },
    {
      name: 'Diets & Healthy Eating',
      url: 'https://www.youtube.com/watch?v=9Nkl5TY4tmc',
      description: 'Short video on how to eat healthy',
    },
    {
      name: 'How to stick to your healthy eating goals',
      url: 'https://www.youtube.com/watch?v=x_4LugKlkMA',
      description: 'A guide on eating healthy by Sunnybrook Hospital',
    },
    {
      name: '10 Tips To NOT Screw Up Your Diet!',
      url: 'https://www.youtube.com/watch?v=T4A4G6yuDLo',
      description: 'This man has 5.6 million subs',
    },
    {
      name: 'Shia LaBeouf "Just Do It" Motivational Speech',
      url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
      description: 'The goat',
    },
  ]);
};

module.exports.makerPage = makerPage;
module.exports.make = makeCalories;
module.exports.getFoods = getFoods;
module.exports.deleteFood = deleteFood;
module.exports.getVideos = getVideos;
