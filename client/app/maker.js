const HandleCalories = (e) => {
  e.preventDefault();

  $('#calorieMessage').animate({height:'hide'}, 350);

    if($("#foodName").val() === '' || $("#foodCal").val() === '' || $("#foodCarbs").val() === ''
    || $("#foodProtein").val() === '' || $("#foodFat").val() === ''){
    handleError("All fields are required");
    return false;
  }

    sendAjax('POST', $("#foodForm").attr("action"), $("#foodForm").serialize(), function() {
      loadFoodsFromServer();
    });

  return false;
};


const deleteFood = (e) => {
  e.preventDefault();

  $('#calorieMessage').animate({ height: 'hide' }, 350);

  if ($('#delFoodName').val() === '') {
    handleError('Food name is required');
    return false;
  }

  sendAjax('POST', $('#delFoodForm').attr('action'), $('#delFoodForm').serialize(), function() {
      loadFoodsFromServer();
  });

};

const FoodForm = (props) => {
  return (
                    <form id='foodForm'
                        onSubmit={HandleCalories}
                        name='foodForm'
                        action='/maker'
                        method='POST'
                        className='foodForm' >
                            <label htmlFor='name'>Name: </label>
                            <input id='foodName' type='text' name='name' placeholder='Food Name' />

                            <label htmlFor='cals'>Calories: </label>
                            <input id='foodCal' type='text' name='cals' placeholder='Calories' />

                            <label htmlFor='carbs'>Carbs: </label>
                            <input id='foodCarbs' type='text' name='carbs' placeholder='Carbs' />

                            <label htmlFor='protein'>Protein: </label>
                            <input id='foodProtein' type='text' name='protein' placeholder='Protein' />

                            <label htmlFor='fat'>Fat: </label>
                            <input id='foodFat' type='text' name='fat' placeholder='Fat' />

                            <input type='hidden' name='_csrf' value={props.csrf} />
                            <input className='makeFoodSubmit' type='submit' value='Add Food' />
                    </form>

  );
}

const DeleteFoodForm = (props) => {
  return (
      <div>
          <h1>Delete Food Name Here:</h1>
          <form id="delFoodForm"
              name="delFoodForm"
              onSubmit={deleteFood}
              action='/deleteFood'
              method='POST'
              className='delFoodForm'>
              <label htmlFor="name">Name:</label>
              <input id="delFoodName" type="text" name="name" placeholder="Food Name" />
              <input type="hidden" name="_csrf" value={props.csrf} />
              <input className="makeFoodSubmit" type="submit" value="Delete" />
          </form>
      </div>
  );
}


// create list of Foods
const FoodList = function (props) {
  if(props.foods.length == 0){
    return (
      <div className='foodsList'>
        <h3 className = 'emptyFood'>No Food Yet</h3>
      </div>
    );
  };

  const foodNodes = props.foods.map(function(food) {
    return(
        <div key={food._id} className="food">
            <h3 className="foodName">Name: {food.name} </h3>
            <h3 className="foodCal">Calories: {food.cals} </h3>
            <h3 className="foodCarbs"> Carbs: {food.carbs} </h3>
            <h3 className='foodProtein'> <strong>Protein:</strong> {food.protein}</h3>
            <h3 className='foodFat'> <strong>Fat:</strong> {food.fat} </h3>
        </div>
    );
});

return(
    <div className="foodList">
        {foodNodes}
    </div>
);
};

const loadFoodsFromServer = () => {
  sendAjax('GET', '/getFoods', null, (data) => {
      ReactDOM.render(
          <FoodList foods={data.foods} />, document.querySelector('#foods')
      );
  });
};



const setup = function(csrf) {
  if(document.querySelector('#makeFood')) {
      ReactDOM.render(
          <FoodForm csrf={csrf} />, document.querySelector('#makeFood')
      );

      ReactDOM.render(
        <DeleteFoodForm csrf={csrf} />, document.querySelector("#deleteFood")
    );
  
      ReactDOM.render(
          <FoodList foods={[]} />, document.querySelector('#foods')
      );
  
      loadFoodsFromServer();
      handleChangePassword(csrf);
      handleUpgradeClick();

  }
};

// get csrf token
const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});