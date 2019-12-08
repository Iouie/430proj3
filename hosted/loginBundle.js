'use strict';

var handleLogin = function handleLogin(e) {
  e.preventDefault();

  $('#calorieMessage').animate({ height: 'hide' }, 350);

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

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  $('#calorieMessage').animate({ height: 'hide' }, 350);

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
var LoginWindow = function LoginWindow(props) {
  return React.createElement(
    'form',
    { id: 'loginForm', name: 'loginForm',
      onSubmit: handleLogin,
      action: '/login',
      method: 'POST',
      className: 'mainForm' },

        React.createElement(
          'label',
          { htmlFor: 'username' },
          'Username: '
        ),

        React.createElement('input', { id: 'user', type: 'text', name: 'username', placeholder: 'Username' }),
        React.createElement(
          'label',
          { htmlFor: 'password' },
          'Password: '
        ),
        React.createElement('input', { id: 'pass', type: 'password', name: 'password', placeholder: 'Password' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement('input', { className: 'formSubmit', id: 'loginButton', type: 'submit', value: 'Sign In' }),
    );
};

var SignupForm = function SignupForm(props) {
  return React.createElement(
    'form',
    { id: 'signupForm', name: 'signupForm', 
    onSubmit: handleSignup, 
    action: '/signup', 
    method: 'POST', 
    className: 'mainForm' },
    React.createElement(
      'label',
      {htmlFor: 'username'},
      'Username: '
    ),
      React.createElement('input', { 'class': 'field', id: 'user', type: 'text', name: 'username', placeholder: 'Username' }),
      React.createElement(
        'label',
        {htmlFor: 'pass' },
        'Password: '
        ),
        React.createElement('input', {id: 'pass', type: 'password', name: 'pass', placeholder: 'Password' }),
        React.createElement(
          'label',
          {htmlFor: 'pass2'},
          'Retype Password: '
        ),
        React.createElement('input', { id: 'pass2', type: 'password', name: 'pass2', placeholder: 'Retype Password' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
        React.createElement(
          'input',
          { className: 'formSubmit', id: 'signupButton', type: 'submit', value: 'Sign Up' }),
          );
};

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector('#content'));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector('#content'));
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector('#loginButton');
  var signupButton = document.querySelector('#signupButton');

  signupButton.addEventListener('click', function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });

  loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    createLoginWindow();
    return false;
  });

  createLoginWindow(csrf);
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#calorieMessage").animate({ height: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $('#calorieMessage').animate({ height: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
