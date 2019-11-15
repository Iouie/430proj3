const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#errorMessage").show();
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
  
  $(document).ready(() => {
    $("#signupForm").on("submit", (e) => {
      e.preventDefault();
  
      $("#errorMessage").hide();
  
      if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("All fields are required");
        return false;
      }
  
      if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;           
      }
  
      sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());
  
      return false;
    });
  
    $("#loginForm").on("submit", (e) => {
      e.preventDefault();
  
      $("#errorMessage").hide();

      if($("#user").val() == '') {
        handleError("Username is required");
        return false;
      }

      if($("#pass").val() == '') {
        handleError("Password is required");
        return false;
      }
  

      sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());
  
      return false;
    });
});
