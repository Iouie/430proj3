const handlePasswordChange = (e) => {
    e.preventDefault(); 

    $("#errorMessage").hide();

    if ($("#currentPassword").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '') {
      handleError("All fields are required");
      return false;
    }

    if ($("#newPass").val() !== $("#newPass2").val()) {
      handlePass("Passwords do not match");
      return false;
    }

    handlePasswordChange("Password successfully changed");

    sendAjax($("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize());

    return false;
}

const handleCalories = (e) => {
  e.preventDefault();

  $("errorMessage").hide();

  if($("foodTitle").val() == '' || $("#foodCalories").val() == '' || $("#date").val() == ''){
    handleError("All fields are required");
    return false;
  }

  sendAjax($("#caloriesForm").attr("action"),$("#caloriesForm").serialize());
  loadFoodsFromServer();

  return false;
}

const NavBar = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/myPage">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/maker">My List</a>
        </li>
                <li class="nav-item">
          <a class="nav-link" href="/idk">404 Page</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            My Account
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <button data-toggle="modal" data-target="#changePassword">Change Password</button>
          </div>
        </li>
      </ul>
      <div class="navlink"><a href="/logout">Log out</a></div>
    </div>
  </nav>
  );
}

const ChangePassword = (props) => {
    return (
        <div class="modal fade" id="changePassword" role="dialog">
        <div class="modal-dialog">
    
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Change Password</h4>
            </div>
            <div class="modal-body">
              <form id='changePasswordForm'  onSubmit={handlePasswordChange} name='changePasswordForm' action='/changePassword' method='POST'
                class='changePasswordForm'>
    
                <div class="alert alert-success" id="successMessage" roles="alert" style='display:none'>
                </div>
    
                <div class='row justify-content-center'>
                  <div class='form-group .col-md-3'>
                    <input class='field' id='currentPassword' type='password' name='currentPassword'
                      placeholder='Current Password' />
                  </div>
                </div>
    
                <div class='row justify-content-center'>
                  <div class='form-group .col-md-3'>
                    <input class='field' id='newPass' type='password' name='newPass' placeholder='New Password' />
                  </div>
                </div>
    
                <div class='row justify-content-center'>
                  <div class='form-group .col-md-3'>
                    <input class='field' id='newPass2' type='password' name='newPass2' placeholder='Retype Password' />
                  </div>
                </div>
    
                <div class='row justify-content-center'>
                  <div class='col-md-3'>
                    <input id="changepasswordcsrf" type="hidden" name="_csrf" value={props.csrf} />
                    <button class='btn btn-outline-dark' id='changePasswordButton' type='submit'>Save Changes</button>
                  </div>
                </div>
    
                <div class='row'>
                  <div class='col text-center'>
                    <div class="alert alert-danger" id="errorMessage" role="alert" style='display:none;'>
                    </div>
                  </div>
                </div>
    
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          </div>
          </div>
    )
};

const FoodForm = (props) => {
  return (
    <div class='row'>
    <div class='container-fluid' id='maker'>

      <h2> Add Food Here </h2>

      <div class='row'>
        <div class='col text-center'>
          <div class="alert alert-danger" id="errorMessage" role="alert" style='display:none;'>
          </div>
        </div>
      </div>

      <div class='col'>
        <section id="makeCalories">

          <form id="caloriesForm" name="caloriesForm" onSubmit={handleCalories} action="/maker" method="POST" class="caloriesForm">

            <label for="title">Food: </label>
            <input id="foodTitle" type="text" name="title" placeholder="Food Title" />

            <label for="cal">Calories: </label>
            <input id="foodCalories" type="text" name="cal" placeholder="Food Calories" value= {1} />

            <label for="date">Date: </label>
            <input id="date" type="date" name="date" placeholder="Date" />

            <input type="hidden" name="_csrf" value={props.csrf} />
</form>
</section>
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
  }

  const foodNodes = props.foods.map(function(food){
    return(
      <div key={food.id} className='food'>
         <div class='row'>

<div class="col-sm">
  <h3 className="foodTitle">Food: {food.title}</h3>
</div>

<div class='col-sm'>
  <h3 class="foodCalories">Calories: {food.cal}</h3>
</div>

<div class='col-sm'>
  <h3 class='date'>Date: {food.date}</h3>
</div>
<div class='row top-buffer'></div>
</div>
      </div>
    )
  });

  return(
    <div className="foodsList">
      {foodNodes}
    </div>
  );
};

const loadFoodsFromServer = () => {
  sendAjax('GET', '/maker', null, (data) => {
    ReactDOM.render(
      <FoodList foods={data.foods} />, document.querySelector('#foods')
    );
  });
};

const setup = function(csrf) {

  ReactDOM.render(
  <NavBar username={""} />, document.querySelector("#navbar")
  );

  ReactDOM.render(
    <FoodList foods={[]} />, document.querySelector("#foods")
  );

  ReactDOM.render(
    <ChangePassword  csrf={csrf} />, document.querySelector("#changePass")
  );

  loadFoodsFromServer();

};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});