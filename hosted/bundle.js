'use strict';

var handleCalories = function handleCalories(e) {
    e.preventDefault();

    $('#calorieMessage').animate({ height: 'hide' }, 350);

    if($("#foodName").val() === '' || $("#foodCal").val() === '' || $("#foodCarbs").val() === ''
    || $("#foodProtein").val() === '' || $("#foodFat").val() === ''){
        handleError('All fields are required');
        return false;
    }

    sendAjax('POST', $('#foodForm').attr('action'), $('#foodForm').serialize(), function () {
        loadFoodsFromServer();
    });
};

var deleteFood = function deleteFood(e) {
    e.preventDefault();

    $('#calorieMessage').animate({
        height: 'hide'
    }, 350);

    if ($('#delFoodName').val() === '') {
        handleError('Name is empty');
        return false;
    }

    sendAjax('POST', $('#delFoodForm').attr('action'), $('#delFoodForm').serialize(), function () {
        loadFoodsFromServer();
    });
};


var FoodForm = function FoodForm(props) {
     return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Add Food Here'
                ), React.createElement(
                    'form',
                    { id: 'foodForm',
                        onSubmit: handleCalories,
                        name: 'foodForm',
                        action: '/maker',
                        method: 'POST',
                        className: 'foodForm' },
                    React.createElement(
                        'label',
                        { htmlFor: 'name' },
                        'Name: '
                    ),
                    React.createElement('input', { id: 'foodName', type: 'text', name: 'name', placeholder: 'Food Name' }),
                    React.createElement(
                        'label',
                        { htmlFor: 'cals' },
                        'Calories: '
                    ),
                    React.createElement('input', { id: 'foodCal', type: 'text', name: 'cals', placeholder: 'Calories' }),
                    React.createElement(
                        'label',
                        { htmlFor: 'carbs' },
                        'Carbs: '
                    ),
                    React.createElement('input', { id: 'foodCarbs', type: 'text', name: 'carbs', placeholder: 'Carbs' }),
                    React.createElement(
                        'label',
                        { htmlFor: 'protein' },
                        'Protein: '
                    ),
                    React.createElement('input', { id: 'foodProtein', type: 'text', name: 'protein', placeholder: 'Protein' }),
                    React.createElement(
                        'label',
                        { htmlFor: 'fat' },
                        'Fat: '
                    ),
                    React.createElement('input', { id: 'foodProtein', type: 'text', name: 'fat', placeholder: 'Fat' }),

                    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
                    React.createElement('input', { className: 'makeFoodSubmit', type: 'submit', value: 'Add Food' })
                )
     );
};

var DeleteFoodForm = function DeleteFoodForm(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Delete Food Name:'
        ),
        React.createElement(
            'form', {
                id: 'delFoodForm',
                name: 'delFoodForm',
                onSubmit: deleteFood,
                action: '/deleteFood',
                method: 'POST',
                className: 'delFoodForm'
            },
            React.createElement(
                'label', {
                    htmlFor: 'name'
                },
                'Name:'
            ),
            React.createElement('input', {
                id: 'delFoodName',
                type: 'text',
                name: 'name',
                placeholder: 'Food Name'
            }),
            React.createElement('input', {
                type: 'hidden',
                name: '_csrf',
                value: props.csrf
            }),
            React.createElement('input', {
                className: 'makeFoodSubmit',
                type: 'submit',
                value: 'Delete'
            })
        )
    );
};


var FoodList = function FoodList(props) {
    if (props.foods.length === 0) {
        return React.createElement(
            'div',
            { className: 'foodList' },
            React.createElement(
                'h3',
                { className: 'emptyFood' },
                'No Food Yet'
            )
        );
    }

    var foodNodes = props.foods.map(function (food) {
        return React.createElement(
            'div', {
                key: food._id,
                className: 'food'
            },
        React.createElement(
                'h3',
                { className: 'foodName' },
                ' Name: ',
                food.name,
                ' '
            ),

                React.createElement(
                    'p',
                    { className: 'foodCal' },
                    ' ',
                    React.createElement(
                        'strong',
                        null,
                        'Calories:'
                    ),
                    ' ',
                    food.cals,
                    ' '
                ),
                React.createElement(
                    'p',
                    { className: 'foodCarbs' },
                    ' ',
                    React.createElement(
                        'strong',
                        null,
                        'Carbs:'
                    ),
                    ' ',
                    food.carbs,
                    ' '
                ),
                React.createElement(
                    'p',
                    { className: 'foodProtein' },
                    ' ',
                    React.createElement(
                        'strong',
                        null,
                        'Protein:'
                    ),
                    ' ',
                    food.protein,
                    ' '
                ),
                React.createElement(
                    'p',
                    { className: 'foodFat' },
                    ' ',
                    React.createElement(
                        'strong',
                        null,
                        'Fat:'
                    ),
                    ' ',
                    food.fat,
                    ' '
                )
        );
    });    

    return React.createElement(
        'div',
        { className: 'foodList' },
        foodNodes,
    );
};

var loadFoodsFromServer = function loadFoodsFromServer() {
    sendAjax('GET', '/getFoods', null, function (data) {
        ReactDOM.render(React.createElement(FoodList, { foods: data.foods }), document.querySelector('#foods'));
    });
};

var setup = function setup(csrf) {
        ReactDOM.render(React.createElement(FoodForm, { csrf: csrf }), document.querySelector('#makeFood'));

        ReactDOM.render(React.createElement(DeleteFoodForm, { csrf: csrf }), document.querySelector("#deleteFood"));

        ReactDOM.render(React.createElement(FoodList, { foods: [] }), document.querySelector('#foods'));

        loadFoodsFromServer();
        handleChangePassword(csrf);
};

// get csrf token
var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});


'use strict';
var handleError = function handleError(message) {
    $('#errorMessage').text(message);
    $('#calorieMessage').animate({ height: 'toggle' }, 350);
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
            console.log(messageObj);
            handleError(messageObj.error);
        }
    });
};

'use strict';

// change password

var handlePasswordChange = function handlePasswordChange(e) {
    e.preventDefault();

    $('#calorieMessage').animate({ height: 'hide' }, 350);

    if ($('currPass').val() == '' || $('#newPass').val() == '' || $('#newPass2').val() == '') {
        handleError('All fields are required');
        return false;
    }

    if ($('#newPass').val() !== $('#newPass2').val()) {
        handleError('Passwords do not match');
        return false;
    }

    sendAjax('POST', '/changePassword', $('#changePassForm').serialize(), function () {
        handleError('Password successfully changed');
    });

    return false;
};

var ChangePassword = function ChangePassword(props) {
    return React.createElement(
        'form',
        { id: 'changePassForm', 
        name: 'changePassForm', 
        action: 'changePassword', 
        onSubmit: handlePasswordChange, 
        method: 'POST' 
    },
        React.createElement(
            'label',
            { htmlFor: 'currPass' },
            ' Current Password: '
        ),
        React.createElement('input', { id: 'currPass', type: 'password', name: 'currPass', placeholder: 'Current Password' }),
        React.createElement(
            'label',
            { htmlFor: 'newPass' },
            ' New Password: '
        ),
        React.createElement('input', { id: 'newPass', type: 'password', name: 'newPass', placeholder: 'New Password' }),
        React.createElement(
            'label',
            { htmlFor: 'newPass2' },
            ' Confirm New Password: '
        ),
        React.createElement('input', { id: 'newPass2', type: 'password', name: 'newPass2', placeholder: 'Retype New Password' }),
        React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf, placeholder: props.csrf }),
        React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Change' })
    );
};
var PassTitle = function PassTitle(props) {
    return React.createElement(
        'h2',
        { id: 'passwordTitle' },
        'Change Password'
    );
};

var FoodTitle = function FoodTitle(props) {
    return React.createElement(
        'div',
        {id: 'sup' },
        ''
    );
};

var createPassTitle = function createPassTitle() {
        ReactDOM.render(React.createElement(PassTitle, null), document.querySelector('#makeFood'));
};

var createChangePasswordForm = function createChangePasswordForm(csrf) {
        ReactDOM.render(React.createElement(ChangePassword, { csrf: csrf }), document.querySelector('#deleteFood'));
};

var createFoodTitle = function createFoodTitle() {
    ReactDOM.render(React.createElement(FoodTitle, null), document.querySelector("#foods"));
}

var createChangePasswordView = function createChangePasswordView(csrf) {
    createPassTitle();
    createChangePasswordForm(csrf);
    createFoodTitle();
};

var handleChangePassword = function handleChangePassword(csrf) {
    var changePass = document.querySelector('#changePassword');

    changePass.addEventListener('click', function (e) {
        e.preventDefault();
        createChangePasswordView(csrf);
    });
};
