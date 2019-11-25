var $form = $('form#test-form'),
    url = 'https://script.google.com/macros/s/AKfycbw5bfLUxBabQNCFbT4vhLQq4zoHCx07OtRq3bJz7SiynIFYJnQm/exec'

$('#submit-form').on('click', function(e) {
    alert('Hi');
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject(),
  }).success(
//        alert('We recieve your subscription request');
    // do something
  );
});
