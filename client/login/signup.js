const handleSignup = (e) => {
    e.preventDefault();

    $("#errorMessage").hide();

    $("#errorMessage").hide();

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
}

const SignupForm = (props) => {
    return (
        <div class='container-fluid'>

        <div class='row top-buffer2'></div>

        <section id='signup'>
            <div class='greeting text-center'>
                <h1>HELLO</h1>
            </div>

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

            </form>
            </section>

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

    </div>
    );
};

const setup = function(csrf){
    ReactDOM.render(
      <SignupForm csrf={csrf} />, document.querySelector('#signup')
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