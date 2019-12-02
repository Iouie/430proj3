const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#errorMessage").show();
  }

  const handlePass = (message) => {
    $("#successMessage").text(message);
    $("#successMessage").show();
  }

  const sendAjax = (action, data) => {
    $.ajax({
      cache: false,
      type: "POST",
      url: action,
      data: data,
      dataType: "json",
      success: (result, status, xhr) => {
        $("#errorMessage").hide();
  
        window.location = result.redirect;
      },
      error: (xhr, status, error) => {
        const messageObj = JSON.parse(xhr.responseText);
  
        handleError(messageObj.error);
      }
    });
  }