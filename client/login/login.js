const handleLogin = (e) => {
    e.preventDefault();

    $("#errorMessage").hide();

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
}

 const LoginForm = (props) => {
     return (
         <div>
        <div class='container-fluid'>

        <div class='row top-buffer2'></div>
    
        <section id='login'>
          <div class='greeting text-center'>
            <h1>HELLO</h1>
          </div>
    
          <form id='loginForm' name='loginForm' onSubmit={handleLogin} action='/login' method='POST' class='mainForm'>
            <div class='row justify-content-center'>
              <div class='form-group .col-md-3'>
                <input class='field' id='user' type='text' name='username' placeholder='Username' />
              </div>
            </div>
    
            <div class='row justify-content-center'>
              <div class='form-group .col-md-3'>
                <input class='field' id='pass' type='password' name='password' placeholder='Password' />
              </div>
            </div>
    
            <div class='row justify-content-center'>
              <div class='form-group .col-md-3'>
                <input id="loginCsrf" type="hidden" name="_csrf" value={props.csrf} />
                <input class='btn btn-outline-light' id='loginButton' type='submit' value='Sign In' />
              </div>
            </div>
          </form>
          </section>
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

        </div>
     );
 };

 const setup = function(csrf){
    ReactDOM.render(
      <LoginForm csrf={csrf} />, document.querySelector('#login')
    );
  };

  const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
  getToken();
});

