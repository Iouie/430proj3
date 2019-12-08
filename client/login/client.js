const handleLogin = (e) => {
  e.preventDefault();

  $('#calorieMessage').animate({height: 'hide'}, 350);

  if ($("#user").val() == '') {
    handleError("Username is required");
    return false;
  }

  if ($("#pass").val() == '') {
    handleError("Password is required");
    return false;
  }


  sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

  return false;
};


const handleSignup = (e) => {
  e.preventDefault();

  $('#calorieMessage').animate({height: 'hide'}, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

  return false;
};

// create login form
const LoginWindow = (props) => {
  return(
    <form id='loginForm' name='loginForm'
    onSubmit={handleLogin}
    action='/login'
    method='POST'
    className='mainForm'>
    <div class='row justify-content-center'>
               <div class='form-group .col-md-3'>
                 <label htmlFor='username'>Username: </label>
                 <input id='user' type='text' name='username' placeholder='Username' />
               </div>
             </div>
    
             <div class='row justify-content-center'>
               <div class='form-group .col-md-3'>
                 <label htmlFor='password'>Password: </label>
                 <input id='pass' type='password' name='password' placeholder='Password' />
               </div>
             </div>
    
             <div class='row justify-content-center'>
               <div class='form-group .col-md-3'>
                 <input type="hidden" name="_csrf" value={props.csrf} />
                 <input class='btn btn-outline-light' id='loginButton' type='submit' value='Sign In' />
               </div>
             </div>
    
    <div class='row justify-content-center'>
    <div class='form-group .col-md-3'>
      <p>Dont have an account? <a href='./signup'>Sign Up</a></p>
     </div>
   </div>

         <div class='row'>
           <div class='col text-center'>
             <div class="alert alert-danger" id="errorMessage" role="alert" style='display:none;'>
             </div>
           </div>
         </div>
         </form>
  );
};

const SignupForm = (props) => {
  return (
          <form id='signupForm' name='signupForm' onSubmit={handleSignup} action='/signup' method='POST' class='mainForm'>
              <div class='row justify-content-center'>
                  <div class='form-group .col-md-3'>
                      <input class='field' id='user' type='text' name='username' placeholder='Username' />
                  </div>
              </div>

              <div class='row justify-content-center'>
                  <div class='form-group .col-md-3'>
                      <input class='field' id='pass' type='password' name='pass' placeholder='Password' />
                  </div>
              </div>

              <div class='row justify-content-center'>
                  <div class='form-group .col-md-3'>
                      <input class='field' id='pass2' type='password' name='pass2' placeholder='Retype Password' />
                  </div>
              </div>

              <div class='row justify-content-center'>
                  <div class='col-md-1'>
                      <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
                      <button class='btn btn-outline-light' id='signupButton' type='submit'>Sign Up</button>
                  </div>
              </div>
          <div class='row'>
              <div class='col text-center'>
                  <p>Have an account? <a href='./login'>Login</a></p>
              </div>
          </div>

          <div class='row'>
              <div class='col text-center'>
                  <div class="alert alert-danger" id="errorMessage" role="alert" style='display:none;'>
                  </div>
              </div>
          </div>
          </form>
  );
};

const createLoginWindow = (csrf) => {
  ReactDOM.render(
      <LoginWindow csrf={csrf} />,
      document.querySelector('#content')
  );
};

const createSignupWindow = (csrf) => {
  ReactDOM.render(
      <SignupWindow csrf={csrf} />,
      document.querySelector('#content')
  );
};

const setup = (csrf) => {
  const loginButton = document.querySelector('#loginButton');
  const signupButton = document.querySelector('#signupButton');

  signupButton.addEventListener('click', (e) => {
      e.preventDefault();
      createSignupWindow(csrf);
      return false;
  });

  loginButton.addEventListener('click', (e) => {
      e.preventDefault();
      createLoginWindow();
      return false;
  });

  createLoginWindow(csrf);
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
  });
};

// load in csrf token
$(document).ready(function() {
  getToken();
});
