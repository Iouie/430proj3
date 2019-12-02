'use strict';


var handleLogin = function handleLogin(e) {
    e.preventDefault();


    $("#errorMessage").hide();

    if ($("#user").val() == '' || $('#pass').val() == '') {
        handleError("All fields required");
        return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
};

var handleSignup = function handleSignup(e) {
    e.preventDefault();

    e.preventDefault();
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
};

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "HELLO",
            )
        ),

        React.createElement(
            "form", {
                id: "loginForm",
                name: "loginForm",
                onSubmit: handleLogin,
                action: "/login",
                method: "POST",
                className: "mainForm"
            },
            React.createElement(
                "div", {
                    className: "row justify-content-center"
                },
                React.createElement(
                    "div", {
                        className: "form-group .col-md-3"
                    },
                    React.createElement("input", {
                        className: "field",
                        id: "user",
                        type: "text",
                        name: "username",
                        placeholder: "Username"
                    })
                ),
                React.createElement(
                    "div", {
                        className: "form-group .col-md-3"
                    },
                    React.createElement("input", {
                        className: "field",
                        id: "pass",
                        type: "password",
                        name: "password",
                        placeholder: "Password"
                    })
                )
            ),
            React.createElement("input", {
                id: "loginCsrf",
                type: "hidden",
                name: "_csrf",
                value: props.csrf
            }),
            React.createElement(
                "button", {
                    className: "btn btn-outline-light",
                    id: "loginButton",
                    type: "submit"
                },
                "Sign In"
            ),
            React.createElement(
                "div", {
                    className: "alert alert-danger",
                    role: "alert"
                },
                "Username or password is incorrect"
            ),
            React.createElement(
                "p",
                null,
                "Don't have an account? ",
                React.createElement(
                    "a", {
                        href: "./signup"
                    },
                    "Sign Up"
                )
            )
        )
};

var SignupWindow = function SignupWindow(props) {
    return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "HELLO",
            )
        ),

        React.createElement(
            "form", {
                id: "signupForm",
                name: "signupForm",
                onSubmit: handleSignup,
                action: "/signup",
                method: "POST",
                className: "mainForm"
            },
            React.createElement(
                "div", {
                    className: "row justify-content-center"
                },
                React.createElement(
                    "div", {
                        className: "form-group .col-md-3"
                    },
                    React.createElement("input", {
                        className: "field",
                        id: "user",
                        type: "text",
                        name: "username",
                        placeholder: "Username"
                    })
                ),
                React.createElement(
                    "div", {
                        className: "form-group .col-md-3"
                    },
                    React.createElement("input", {
                        className: "field",
                        id: "pass",
                        type: "password",
                        name: "password",
                        placeholder: "Password"
                    })
                )
            ),
            React.createElement("input", {
                id: "signupcsrf",
                type: "hidden",
                name: "_csrf",
                value: props.csrf
            }),
            React.createElement(
                "button", {
                    className: "btn btn-outline-light",
                    id: "signup",
                    type: "submit"
                },
                "Sign Up"
            ),
            React.createElement(
                "div", {
                    className: "alert alert-danger",
                    role: "alert"
                },
                "Passwords do not match"
            ),
            React.createElement(
                "p",
                null,
                "Already have an account? ",
                React.createElement(
                    "a", {
                        href: "./login"
                    },
                    "Login"
                )
            )
        )
};


var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector('#login'));

    ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector('#signup'));
  };

  var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
      setup(result.csrfToken);
    });
  };
  
  $(document).ready(function () {
    getToken();
  });