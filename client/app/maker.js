const HandleCalories = (e) => {
  e.preventDefault();

  $('#calorieMessage').animate({height:'hide'}, 350);

    if($("#foodName").val() == '' || $("#foodCal").val() == '' || $("#foodCarbs").val() == ''
    || $("#foodProtein").val() == '' || $("#foodFat").val() == ''){
    handleError("All fields are required");
    return false;
  }

    sendAjax('POST', $("#caloriesForm").attr("action"), $("#caloriesForm").serialize(), function() {
      loadFoodsFromServer();
    });

  return false;
};


const searchFood = (e) => {
  e.preventDefault();
  $('#calorieMessage').animate({height:'hide'}, 350);

  if($('#searchFood').val() == '') {
      handleError('Name is required for search');
      return false;
  }

  const search = e.target.parentElement.querySelector('#searchFood').value;


  sendAjax('GET', '/searchFood', {search}, (data) => {
      ReactDOM.render(
          <FoodList foods={data.foods} />, document.querySelector('#foods')
      );
  });
};

const deleteFood = (e) => {
	const id = e.target.parentElement.querySelector('.foodid').innerText;
	const _csrf = document.querySelector('input[name="_csrf"]').value;
	
	sendAjax('DELETE', '/deleteFood', {id, _csrf}, data => {
		loadFoodsFromServer();
	});
};

const FoodForm = (props) => {
  return (
    <div>
      <h1 id='foodTitle'>Foods</h1>
      <form id='searchFoodForm'
                onSubmit={searchFood}
                name='searchForm'
                action='/searchFood'
                method='POST'
                className='searchFoodForm' >
                <label htmlFor='search'>Name: </label>
                <input id='searchFood' type='text' name='search' placeholder='Search' />
                <input className='searchFoodSubmit' type='submit' value='Search' />
</form>

     <button id="newFoodBtn">New Food</button>
            <div id="newFoodWindow" className="foodWindow">
                <div className="newFoodContent">
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
                </div>
            </div>
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

  const foodNodes = props.foods.sort(function(a,b){
    return a.name.localeCompare(b.name);
})
.map(function(food) {
    return (
        <div key={food._id} className='food'>
            <h3 className='foodName'> {food.name} </h3>
                <p className='foodCal'> <strong>Calories:</strong> {food.cals} </p>
                <p className='foodCarbs'> <strong>Carbs:</strong> {food.carbs} </p>
                <p className='foodProtein'> <strong>Protein:</strong> {food.protein} </p>
                <p className='foodFat'> <strong>Fat:</strong> {food.fat} </p>
            <span className='foodId'>{food._id}</span>
        </div>
    );
});

return (
  <div className='foodList'>
      {foodNodes}
      <p className='totalCount'>{props.foods.length} foods</p>
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
          <FoodList foods={[]} />, document.querySelector('#foods')
      );
  
      loadFoodsFromServer();

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