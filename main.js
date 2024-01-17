const searchParams = new URLSearchParams(window.location.search);
let referral = '';

if (searchParams.has('referral')) {
    referral = searchParams.get('referral');
    let result = document.getElementById("referral-code-content__text");
    result.innerHTML = referral;

    let redirectLink = document.getElementById("yourLinkId");
    redirectLink.setAttribute("href", "twss-customer://twssolutions.us?referral=" + referral);
}

// auto redirect
document.addEventListener("DOMContentLoaded", function () {
    var linkElement = document.getElementById("yourLinkId");
    if (linkElement) {
        linkElement.click();
    }
});

function onCopyReferralCode() {
    navigator.clipboard.writeText(referral);
}

function redirect() {
    myURL();
    var result = document.getElementById("result");
    result.innerHTML = "<b> The page will redirect after delay of 5 seconds";
}

function myURL() {
    var linkElement = document.getElementById("yourLinkId");
    linkElement.click();


    // window.location = 'twss-customer://twssolutions.us';
    // // window.open("twss-customer://twssolutions.us", "_blank");
    // const url =
    //     "intent://twssolutions.us/#Intent;scheme=twss-customer;package=com.twssolutions.customer;action=android.intent.action.VIEW;end";
    // window.open(url, "_blank");
}

function redirect2() {
    setTimeout(myURL2, 5000);
    var result = document.getElementById("result2");
    result.innerHTML = "<b> The page will redirect after delay of 5 seconds";
}

function myURL2() {
    window.location.href = 'https://google.com';
}