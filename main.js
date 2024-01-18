const PLATFORM = {
    MACOS: "MacOS",
    IOS: "iOS",
    ANDROID: "Android",
    WINDOWS: "Windows",
    LINUX: "Linux",
}

// ==== Get referral code from url parameter
const searchParams = new URLSearchParams(window.location.search);
let referral = '';

if (searchParams.has('referral')) {
    referral = searchParams.get('referral');
    let result = document.getElementById("referral-code-content__text");
    result.innerHTML = referral;

    let redirectLink = document.getElementById("yourLinkId");
    redirectLink.setAttribute("href", "twss-customer://twssolutions.us?referral=" + referral);
}

// ==== Auto redirect go to app (Sign up page) or download link
document.addEventListener("DOMContentLoaded", function () {
    onRedirect();
});

function onRedirect() {
    try {
        var linkElement = document.getElementById("yourLinkId");
        if (linkElement) {
            linkElement.click();
        }
    } catch (error) {
        let platform = onGetOS();
        switch (platform) {
            case PLATFORM.ANDROID:
                window.location = 'https://twss-ohio-public-storage.s3.us-east-2.amazonaws.com/mobile-app/TWSSolutions_Customer.apk'; // android download link
                break;
            case PLATFORM.IOS:
                window.location = 'itms-beta://beta.itunes.apple.com/v1/app/6466731245'; // ios download link
                break;
            default:
                break;
        }
    }
    // window.location = 'twss-customer://twssolutions.us';
    // // window.open("twss-customer://twssolutions.us", "_blank");
    // const url =
    //     "intent://twssolutions.us/#Intent;scheme=twss-customer;package=com.twssolutions.customer;action=android.intent.action.VIEW;end";
    // window.open(url, "_blank");
}

// ==== User can copy referral code if redirect link not work
function onCopyReferralCode() {
    navigator.clipboard.writeText(referral);
}

// ==== Get current platform
function onGetOS() {
    // console.log("user agent data: ", window?.navigator?.userAgentData.mobile)

    const userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = PLATFORM.MACOS;
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = PLATFORM.IOS;
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = PLATFORM.WINDOWS;
    } else if (/Android/.test(userAgent)) {
        os = PLATFORM.ANDROID;
    } else if (/Linux/.test(platform)) {
        os = PLATFORM.LINUX;
    }

    return os;
}