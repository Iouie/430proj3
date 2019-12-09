'use strict';

var handleCalories = function handleCalories(e) {
    e.preventDefault();

    $('#calorieMessage').animate({ height: 'hide' }, 350);

    if($("#foodName").val() == '' || $("#foodCal").val() == '' || $("#foodCarbs").val() == ''
    || $("#foodProtein").val() == '' || $("#foodFat").val() == ''){
        handleError('All fields are required');
        return false;
    }

    sendAjax('POST', $('#caloriesForm').attr('action'), $('#caloriesForm').serialize(), function () {
        loadFoodsFromServer();
    });

    return false;
};

var searchFood = function searchFood(e) {
    e.preventDefault();
    $('#calorieMessage').animate({ height: 'hide' }, 350);

    if ($('#searchFood').val() == '') {
        handleError('Name is required');
        return false;
    }

    var search = e.target.parentElement.querySelector('#searchFood').value;

    sendAjax('GET', '/searchFood', { search: search }, function (data) {
        ReactDOM.render(React.createElement(FoodList, { foods: data.foods }), document.querySelector('#foods'));
    });
};

var FoodForm = function FoodForm(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            { id: 'foodTitle' },
            'Foods'
        ),
        React.createElement(
            'form',
            {
                id: 'searchFoodForm',
                onSubmit: searchFood,
                name: 'searchForm',
                action: '/searchFood',
                method: 'POST',
                className: 'searchFoodForm' },
            React.createElement(
                'label',
                { htmlFor: 'search' },
                'Name: '
            ),
            React.createElement('input', { id: 'searchFood', type: 'text', name: 'search', placeholder: 'Search' }),
            React.createElement('input', { className: 'searchFoodSubmit', type: 'submit', value: 'Search' })
        ),
        React.createElement(
            'button',
            { id: 'newFoodBtn' },
            'New Food'
        ),
        React.createElement(
            'div',
            { id: 'newFoodWindow', className: 'foodWindow' },
            React.createElement(
                'div',
                { className: 'newFoodContent' },
                React.createElement(
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
                    React.createElement('input', { id: 'foodFat', type: 'text', name: 'fat', placeholder: 'Fat' }),

                    React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
                    React.createElement('input', { className: 'makeFoodSubmit', type: 'submit', value: 'Log Food' })
                )
            )
        )
    );
};

var FoodList = function FoodList(props) {
    if (props.foods.length === 0) {
        return React.createElement(
            'div',
            { className: 'foodsList' },
            React.createElement(
                'h3',
                { className: 'emptyFood' },
                'No Food Yet'
            )
        );
    }

    var foodNodes = props.foods.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    }).map(function (food) {
        return React.createElement(
            'div',
            { key: food._id, className: 'food' },
            React.createElement(
                'h3',
                { className: 'foodName' },
                ' ',
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
                ),
            React.createElement(
                'span',
                { className: 'foodId' },
                food._id
            )
        );
    });    

    return React.createElement(
        'div',
        { className: 'foodList' },
        foodNodes,
        React.createElement(
            'p',
            { className: 'totalCount' },
            props.foods.length,
            ' foods '
        )
    );
};

var loadFoodsFromServer = function loadFoodsFromServer() {
    sendAjax('GET', '/getFoods', null, function (data) {
        ReactDOM.render(React.createElement(FoodList, { foods: data.foods }), document.querySelector('#foods'));
    });
};

var setup = function setup(csrf) {
    if (document.querySelector('#makeFood')) {
        ReactDOM.render(React.createElement(FoodForm, { csrf: csrf }), document.querySelector('#makeFood'));

        ReactDOM.render(React.createElement(FoodList, { foods: [] }), document.querySelector('#foods'));

        loadFoodsFromServer();
    }
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
            handleError(messageObj.error);
        }
    });
};
