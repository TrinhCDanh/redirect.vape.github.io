const PLATFORM = {
    MACOS: "MacOS",
    IOS: "iOS",
    ANDROID: "Android",
    WINDOWS: "Windows",
    LINUX: "Linux",
}

// ==== Check and hide button download for android or ios
let platform = onGetOS();
if (platform == PLATFORM.ANDROID) {
    let buttonIOS = document.getElementById("button-ios");
    buttonIOS.classList.add("button-hidden");
}
if (platform == PLATFORM.IOS) {
    let buttonAndroid = document.getElementById("button-android");
    buttonAndroid.classList.add("button-hidden");
}

// ==== Get referral code from url parameter
const searchParams = new URLSearchParams(window.location.search);
let referral = '';

if (searchParams.has('referral')) {
    referral = searchParams.get('referral');
    let result = document.getElementById("referral-code-content__text");
    result.innerHTML = referral;

    let redirectLink = document.getElementById("yourLinkId");
    redirectLink.setAttribute("href", "twss-pos://twssolutions.us?referral=" + referral);
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
    // window.location = 'twss-pos://twssolutions.us';
    // // window.open("twss-pos://twssolutions.us", "_blank");
    // const url =
    //     "intent://twssolutions.us/#Intent;scheme=twss-pos;package=com.twssolutions.customer;action=android.intent.action.VIEW;end";
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