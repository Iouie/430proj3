const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#errorMessage").fadeIn(400);
  }
  
  const sendAjax = (action, data) => {
    $.ajax({
      cache: false,
      type: "POST",
      url: action,
      data: data,
      dataType: "json",
      success: (result, status, xhr) => {
        $("#errorMessage").fadeOut(400);
  
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
  
      $("#errorMessage").fadeOut(400);
  
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
  
      $("#errorMessage").fadeOut(400);

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

//     $("#changePasswordForm").on("submit", (e) => {
//       e.preventDefault();
  
//       $("#error").fadeOut(400);
  
//       if($("#currentPass").val() == '' || $("#newPass").val() == '' || $("#pass2").val() == '') {
//         showError("All fields are required");
//         return false;
//       }
  
//       if($("#newPass").val() !== $("#pass2").val()) {
//         showError("Passwords do not match");
//         return false;           
//       }
  
//       sendAjax($("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize());
  
//       return false;
//     });
//   });