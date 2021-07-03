var $ = jQuery;

/**********************
 ALERT
**********************/
var hideAlert = function(elementToDelete) {
  var elementToDelete = elementToDelete || $(".alert");
  if (elementToDelete) elementToDelete.remove();
};

// type is 'success' or 'danger' or any other valid bootstrap class
var showAlert = function(type, message, time) {
  var time = time || 7;
  var markup = `
            <div class="alert alert-${type} alert-dismissible" role="alert" style="margin: 0;border-radius: 0;text-align: justify;">
                ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
  $markup = $(markup);
  $(".alertContainer").prepend($markup);
  window.setTimeout(hideAlert.bind(null, $markup), time * 1000);
};

/**********************
 Handle form submission
***********************/
var submitBtnContent = null;
var loadingSpinner = `
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin-right: 3px; vertical-align: sub;" width="1em" height="1em" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <g transform="rotate(0 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(30 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(60 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(90 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(120 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(150 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(180 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(210 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(240 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(270 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(300 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
                      </rect>
                    </g><g transform="rotate(330 50 50)">
                      <rect x="45" y="0" rx="5" ry="10" width="10" height="20" fill="#ffffff">
                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                      </rect>
                    </g>
                </svg>`;
var formSubmitting = function(form) {
  submitBtnContent = form.find('button[type="submit"]').html();
  form.find('button[type="submit"]').attr("disabled", true);
  form.find('button[type="submit"]').html(loadingSpinner + submitBtnContent);
};
var formSubmitted = function(form) {
  form.find('button[type="submit"]').attr("disabled", false);
  form.find('button[type="submit"]').html(submitBtnContent);
};

var bookingForm = $(".js-reservationform");
var reserver = function(
  email,
  phone,
  room,
  checkin,
  checkout,
  adults,
  children
) {
  $.ajax({
    method: "POST",
    // url: bookingForm.data("endpoint"),
    url: "/reservation",
    data: {
      user: {
        email,
        phone,
        room,
        checkin,
        checkout,
        adults,
        children
      }
    },
    success: function(data, status, xhttp) {
      if (data.status === "success") {
        showAlert("success", data.message, 10);

        bookingForm.trigger("reset");
        formSubmitted(bookingForm);
      } else {
        // if false, show some sort of message with errors
        showAlert(
          "danger",
          "Une erreur s'est produite.\nNotre équipe mettra tout en oeuvre pour la résoudre.",
          20
        );
        formSubmitted(bookingForm);
      }
    }
  })
    // .done(function() {
    //   bookingForm.find('button[type="submit"]').attr("disabled", false);
    // })
    .fail(function(error) {
      //   bookingForm.find('button[type="submit"]').attr("disabled", false);
      showAlert(
        "danger",
        "Une erreur s'est produite.\nNotre équipe mettra tout en oeuvre pour la résoudre.",
        20
      );
      formSubmitted(bookingForm);
    });
};

bookingForm.on("submit", function(e) {
  e.preventDefault();
  var element = $(e.target);
  formSubmitting(element);
  var email = $("#email").val();
  var phone = $("#phone").val();
  var room = $("#room").val();
  var checkin = $("#checkin").val();
  var checkout = $("#checkout").val();
  var adults = $("#adults").val();
  var children = $("#children").val();
  //   var devis = $("#devis").is(":checked") ? "oui" : "non";
  //   console.log(email, phone, room, checkin, checkout, adults, children);
  reserver(email, phone, room, checkin, checkout, adults, children);
});
