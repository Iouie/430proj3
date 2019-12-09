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
        handleUpgradeClick();
        handleVideoClicks();
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
        React.createElement('input', { className: 'submitForm', type: 'submit', value: 'Change' }),
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
        '',
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

// remove ads
'use strict';

// function use to remove ads

function RemoveAds(e) {
    e.preventDefault();
    document.querySelector('#ad').style.display = "none";
}


var UpgradeAccount = function UpgradeAccount(props) {
    return React.createElement(
        'div',
        { id: 'upgradeContent' },
        React.createElement(
            'h3',
            null,
            'Upgrade your account to get rid of ads!'
        ),
        React.createElement(
            'button',
            { id: 'removeAds',
            className: 'upgradeButton', 
            onClick: RemoveAds },
            'Upgrade'
        )
    );
};

var UpgradeTitle = function UpgradeTitle(props) {
    return React.createElement(
        'h2',
        { id: 'upgradeTitle' },
        'Upgrade Account'
    );
};

var Nothing = function Nothing(props) {
    return React.createElement(
        'div',
            {id: 'hi'},
            ''
    );
};

var Footer = function Footer(props){
    return React.createElement(
        'footer',
        {id: 'ad'},
        'Insert Ad Here'
    );
}

var createUpgradeTitle = function createUpgradeTitle() {
        ReactDOM.render(React.createElement(UpgradeTitle, null), document.querySelector('#makeFood'));
};

var createUpgradeAccountInfo = function createUpgradeAccountInfo() {
        ReactDOM.render(React.createElement(UpgradeAccount, null), document.querySelector('#foods'));
};

var createNothing = function createNothing(){
    ReactDOM.render(React.createElement(Nothing, null), document.querySelector('#deleteFood'));
}

var createFooter = function createFooter(){
    reactDOM.render(React.createElement(Footer, null), document.querySelector('#ad'));
}

var createUpgradeView = function createUpgradeView() {
    createUpgradeTitle();
    createUpgradeAccountInfo();
    createNothing();
};

var handleUpgradeClick = function handleUpgradeClick() {
    var upgrade = document.querySelector('#upgrade');

    upgrade.addEventListener('click', function (e) {
        e.preventDefault();
        createUpgradeView();
    });
};

// motivation video
'use strict';

var MotivationContainer = function MotivationContainer(props) {
    $('#calorieMessage').animate({height: 'hide'}, 350);

    if (props.motivations.length === 0) {
        return React.createElement(
            'div',
            null,
            'No Motivation videos yet!'
        );
    }
    var motivationList = props.motivations.map(function (motivation) {
        return React.createElement(
            'div',
            { className: 'motivations', key: motivation.name },
            React.createElement(
                'p',
                { id: 'videoTitle' },
                'Name: ',
                 motivation.name
                ),
            React.createElement(
                'p',
                { id: 'videoUrl' },
                'URL: ',
                motivation.url
                ),
            React.createElement(
                'p',
                { id: 'videoDesc' },
                'Description: ',
                motivation.description,
                    ),
        );
            
    });
    return React.createElement(
        'div',
        null,
        motivationList
    );
};

var loadVideos = function loadVideos(){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/getVideos');

    var setVideos = function setVideos() {
        var videoResponse = JSON.parse(xhr.response);
            ReactDOM.render(React.createElement(MotivationContainer, { motivations: videoResponse }), document.getElementById('foods'));
    };

    xhr.onload = setVideos;
    xhr.send();
};

var VideoTitle = function VideoTitle(props) {
    return React.createElement(
        'h3',
        { id: 'videoTitle' },
        'Videos to Motivate'
    );
};

var Nothing = function Nothing(props){
    return React.createElement(
        'div'
    );
};

var createVideoTitle = function createVideoTitle() {
        ReactDOM.render(React.createElement(VideoTitle, null), document.querySelector('#makeFood'));
};

var createNothing = function createNothing(){
    ReactDOM.render(React.createElement(Nothing, null), document.querySelector('#deleteFood'));
};

var createVideoContainer = function createVideoContainer() {
        ReactDOM.render(React.createElement(MotivationContainer, { motivations: [] }), document.getElementById('foods'));

    loadVideos();
};
var createVideoViews = function createVideoViews() {
    createVideoTitle();
    createVideoContainer();
    createNothing();
};

var handleVideoClicks = function handleVideoClicks() {
    var vidClicks = document.querySelector('#vids');

    vidClicks.addEventListener('click', function (e) {
        e.preventDefault();
        createVideoViews();
    });
};