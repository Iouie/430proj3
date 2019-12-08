const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#calorieMessage").animate({height: 'toggle'}, 350); 
  }

  const redirect = (response) => {
    $('#calorieMessage').animate({height: 'hide'}, 350);
    window.location = response.redirect;
};

  const handlePass = (message) => {
    $("#successMessage").text(message);
    $("#successMessage").show();
  }
  const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};