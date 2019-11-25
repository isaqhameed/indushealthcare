 function formSubmit(e){
        
     e.preventDefault();
     var submitEmail = $('#email_submit').val();
     var data = {"email_submit": submitEmail};
     console.log("data =", data)
         if(submitEmail != ''){
            var $form = $('#ClientData'), 
                url = 'https://script.google.com/macros/s/AKfycbw5bfLUxBabQNCFbT4vhLQq4zoHCx07OtRq3bJz7SiynIFYJnQm/exec';
            $.ajax({
                url: url,
                method: "GET",
                dataType: "json",
                data: {"email_submit": submitEmail}, //$form.serialize(),
                success: function(response){
             //   $('#subscriptionform')[0].reset();
               // alert('We recieve your subscription request');
                return true
            }
            })
        }
        else{
            return false
        }
    }


$(function() {
  $("#submit-form").on("click", function (e) {
      console.log("submit form clicked")
     formSubmit(e) 
  });
    

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbw5bfLUxBabQNCFbT4vhLQq4zoHCx07OtRq3bJz7SiynIFYJnQm/exec",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
    
 
    
 /*   function formSubmit(){
        var submitFirstName = $('#firstName').val();
        var submitLastName = $('#lastName').val();
        var submitOrganization = $('#Organization').val();
        var submitTitle = $('#Title').val();
        var submitEmail = $('#Email').val();
        var submitPhone = $('Phone').val();
        var submitStreetAddress = $('streetAddress').val();
        var submitCity = $('City').val();
        var submitZipCode = $('zipCode').val();
        var submitState = $('State').val();
        var submitMessage = $('Message').val();
        if(submitFirstName != '' || submitLastName != '' || submitOrganization != '' || submitTitle != '' || submitOrganization != '' || submitEmail != '' || submitPhone != '' || submitStreetAddress != '' || submitCity != '' || submitState != '' || submitZipCode != '' || submitMessage != ''){
            var $form = $('#ClientData'), url = 'https://script.google.com/macros/s/AKfycbw5bfLUxBabQNCFbT4vhLQq4zoHCx07OtRq3bJz7SiynIFYJnQm/exec';
            $.ajax({
                url: url,
                method: "GET"
                dataType: "json",
                data: $form.serialize();
                success: function(response){
                $('#subscriptionform')[0].reset();
                alert('We recieve your subscription request');
                return true
            }
            })
        }
        else{
            return false
        }
    }
 */


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
});