import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';


@Injectable()
export class LanguageService {

    constructor() { }

    //language support

    public engHeader =
    {
        logo: "assets/images/logo.svg", searchLine: "assets/images/searchLine.svg", whatLookingPlaceHolder: "What are you looking for...", logOrCreateAccount: "Log in or create your account",
        onTitle: "on Yelo", aboutUs: "About Us", trustNSafe: "Trust & Safety", howWorks: "How It Works", needHelp: "Need Help?", logOut: "Logout",
        login: "Login", sellStuff: "Sell Your Stuff", myProfile: "My Profile", home: "Home", signUp: "Sign Up", backToTitle: "Back to yelo",
        logoPng: "assets/images/logo.png", postIn30Secs: "Post your items in as little as 30 seconds", downloadTopRated: "Download our top-rated iOS or Android app to post your item",
        phoneNumber: "Phone Number", emailAddress: "Email Address", enterNumberCountryCode: "Please try entering your full number, including the country code.",
        send: "Send", continueWebsite: "Continue Browsing Website", thankYou: "Thank you", takeFewMinutes: "it may take a few minutes for you to receive it.",
        checkInternetConnection: "Please check your internet connection & try again.", ok: "Ok", sessionTimedOut: "Session Timed Out",
        timeToTitle: "Buy and sell quickly, safely and locally. It’s time to Yelo!", titleTag: "Yelo",
    }

    public engHome = {
        titleBuySellSafe: "yelo Post, Chat, Buy and Sell.", bringCommunities: "The simpler",
        buySellFun: "way to buy and sell locally", cancel: "Cancel", reset: "Reset", location: "LOCATION",
        categories: "Categories", showMore: "Show More", showLess: "Show Less", distance: "DISTANCE", max: "Max", km: "Km",
        noCategory: "no category", sortBy: "SORT BY", newestFirst: "Newest First", closestFirst: "Closest First", lowToHighPrice: "Price: low to high",
        highToLowPrice: "Price: high to low", postedWithin: "POSTED WITHIN", allListings: "All listings", last24Hours: "The last 24 hours",
        last7Days: "The last 7 days", last30Days: "The last 30 days", filters: "Filters", price: "Price", currency: "Currency", from: "From",
        saveFilters: "Save Filters", mike: "assets/images/mike.svg", miles: "Km", noOffers: "No offers found", sorryNotFound: "Sorry, we couldn't find what you were looking for",
        downloadApp: "Download the app", startPostingOffers: "to start posting offers now", trustByMillions: "Trusted by Millions", blythe: "Blythe",
        robin: "Robin", chris: "Chris", greg: "Greg", heidi: "Heidi", krystal: "Krystal", readTitleStories: "Read yelo Stories", getApp: "Get the App!",
        joinMillions: "Join millions of loyal customers using the yelo mobile app, the simpler way to buy and sell locally!",
        googlePlayStore: "https://d2qb2fbt5wuzik.cloudfront.net/yelowebsite/images/google-play.svg",
        appStore: "https://d2qb2fbt5wuzik.cloudfront.net/yelowebsite/images/app-store.svg", loveJob: "Love your Job!",
        srAndroidEngineer: "Sr. Android Engineer", srIOSEngineer: "Sr. IOS Engineer", srBackendEngineer: "Sr. Backend Engineer",
        seePositions: "See All Positions!", sendAppLink: "Send app link", emailPlaceHolder: "your-email@domain.com",
        provideValidEmail: "Please provide a valid email address...", howPhone: "https://d2qb2fbt5wuzik.cloudfront.net/yelowebsite/images/howPhone.png",
        enterNumberCountryCode: "Please try entering your full number, including the country code.", recentRequestApp: "You have recently requested the app.",
        minsToReceive: "It may take a few minutes for you to receive it.", wait5Mins: "Please wait about 5 minutes", makeOtherRequest: "to make another request.",
        thankYou: "Thank you",

    }

    public engAbout = {
        aboutUs: "About Us", howWorks: "How It Works", createCommunities: "We Bring People Together",
        comeTogetherSell: "to Discover Value", ourStory: "Our Story", ceo: "Nick Huzar, CEO", cto: "Arean van Veelen, CTO",
        betterBuySell: "A Better Way to Buy and Sell", largeMarket: "yelo is the largest mobile marketplace in the U.S.",
        topApp: "Top 3 App", shopCategory: "In Shopping Category", appYear: "App of Year", geekWire: "Geekwire", billion14: "$14 Billion",
        transactionYear: "In Transactions this Year", million23: "23+ Million", downloads: "Downloads", titleNews: "yelo In the News",
    }

    public engchangePassword = {
        changePassTitle: "Change Password - yelo", changePassword: "Change Password", currentPassword: "Current Password",
        newPasswordAgain: "New Password (again)", newPassword: "New Password", submit: "Submit",
    }

    public engDiscussions = {
        titleBuySellSimple: "yelo - Buy. Sell. Simple.", myOffers: "My Offers", keyBoard: "Key board", twoHundred: "200", $: "$",
        Jeffery: "Jeffery", ago: "ago", month: "month", one: "1", hey: "Hey", replyToss: "Reply to ss", send: "Send", report: "Report", sabari: "Sabari",
        whyreport: "Why do you want to report this item?", prohibited: "It's prohibited on yelo", offensive: "It's offensive to me",
        notReal: "It's not a real post", duplicate: "It's a duplicate post", wrongCategory: "It's in the wrong category", scam: "It may be a scam",
        stolen: "It may be stolen", other: "Other", additionalNote: "Additional note (optional)", writeNotehere: "Please write your note here...",
        done: "Done",

    }

    public engEmailVerify = {
        verifyEmailTitle: "Verify Email - yelo", emailVerify: "Email Verify",
        emailProvide: "Please provide a valid email address...",
        submit: "Submit",


    }

    public engFooter = {
        logoBottom: "assets/images/logo_bottom.svg", buySellSafe: "Post, Chat, Buy and Sell", downloadApp: "Download the app",
        footerFB: "assets/images/fb.svg", footerInsta: "assets/images/insta.svg", footerTwitter: "assets/images/twitter.svg", aboutUs: "About Us", howWorks: "How It Works", terms: "Terms",
        privacy: "Privacy", help: "Help", footerPlayStore: "assets/images/playstore.svg", footerAppStore: "assets/images/appstore.svg",

    }

    public engHowItWorks = {
        aboutUs: "About Us", howItWorks: "How It Works", mobileCommerce: "Buying and Selling Made Easy",
        startlessIn30Secs: "Get Started in Less Than 30 Seconds", discoverLocally: "Discover Locally",
        browseMillionListings: "Browse millions of listings to find amazing items nearby", chatInstantly: "Chat Instantly",
        messageUsersAnonymously: "Message users anonymously and securely through the yelo app. Our newsfeed allows you to connect with buyers, sellers and other people you know.",
        sellSimpleVideo: "Sell Quickly With Image", easilyPost: "Easily post your items for sale with just a simple snap chat from your smartphone.",
        buildTrustCommunity: "Building a Trusted Community", userProfiles: "User Profiles", knowMoreBuyers: "Know more about buyers and seller before you engage",
        userRatings: "User Ratings", checkBuyer: "Check buyer and seller ratings, and give ratings when you transact", realTimeAlerts: "Real-time Alerts",
        getNotified: "Get notified instantly on your phone when a buyer or seller contacts you", 
        titleIs: "yelo is", toDownload: "to download", free: "free",
        downloadTopRated: "Download our top-rated iOS or Android app to get started today!", howItWorksPlayStore: "assets/images/playstore.svg",
        howItWorksAppstore: "assets/images/appstore.svg", comingSoon: "Coming Soon!!!", thankYou: "Thank you",
        fewMinsReceive: "it may take a few minutes for you to receive it.",

    }

    public engItem = {
        titleSimpleWayToBuy: "yelo is a simpler way to buy and sell locally. Get the free app.", itemAppStore: "assets/images/appstore.svg",
        itemPlayStore: "assets/images/playstore.svg", previous: "Previous", next: "Next", postRemoved: "post is removed", posted: "Posted",
        ago: "ago", report: "Report", description: "Description", comments: "Comments", condition: "Condition", viewAll: "view all",
        typeYourMessage: "Type your message", youHave: "You have", one120: "120", characterLeft: "character left.",
        postComment: "Post Comment", myOtherOffers: "My Other Offers", price: "PRICE", $: "$", buyText: "Buy",makeOffer: "Make Offer",buyOffer: "Buy", follow: "Follow",
        following: "Following", unFollow: "Un-Follow", watch: "Favourite", watching: "Favourite", unWatch: "Un-Favourite", seller: "About the seller",
        approximationProtectPrivacy: "Approximation to protect seller's privacy", followers: "Followers", readyBuyHit: "Ready to buy? Hit the Buy button.",
        offer: "Offer", notSure: "Not sure?", ask: "Ask", forMoreInfo: "for more info", offerSent: "Offer Sent!", orBetterDownloadApp: "Or better yet download the app. It's faster!",
        getApp: "Get the app!",
        itemGooglePlay: "https://d2qb2fbt5wuzik.cloudfront.net/yelowebsite/images/google-play.svg",
        itemAppStore2: "https://d2qb2fbt5wuzik.cloudfront.net/yelowebsite/images/app-store.svg", soldBy: "Sold by", whyReport: "Why do you want to report this item?",
        additionalNote: "Additional note (optional)", pleaseWriteNote: "Please write your note here...", done: "Done", reported: "Reported",
        thanksTakingTime: "Thank you for taking time to let us know.", send: "Send", nowFollowing: "You're now following", offers: "Offers",
        follower: "Follower", comingSoon: "Coming Soon!!!", thankYou: "Thank you", fewMinsReceive: "it may take a few minutes for you to receive it",
        enterQuestionPlaceHolder: "Enter your question here...", lengthTextarea120: "120 - lengthTextarea", settingsFBOn: "assets/images/FB_on.svg", settingsFBOff: "assets/images/FB_off.svg",
        settingsGOn: "assets/images/G+_on.svg", settingsGOff: "assets/images/G+_off.svg", settingsEmailOn: "assets/images/Email_on.svg",
        settingsEmailOff: "assets/images/Email_off.svg"
    }

    public engLogin = {
        formBackground: "assets/images/formBackground.png", loginTo: "Login To", loginLogo: "assets/images/logo.svg", userName: "USER NAME",
        passWord: "PASSWORD", byClicking: "By Clicking on “Login” or ”Connect with Facebook” you shall agree to the yelo",
        termsService: "Terms of Service", privacyPolicy: "Privacy Policy", login: "Login", notRegistered: "Not registered?",
        signUp: "Sign up", forgotPassword: "Forgot password?", reset: "Reset", and: "and", registerErrMsg:"fdgfdgfdg"
    }

    public engLogout = {
    }

    public engMemberProfile = {
        profile: "Profile:", title: "yelo", offers: "Offers", $: "$", seller: "About the seller", followers: "Followers", follow: "Follow",
        following: "Following", unFollow: "Un-Follow", bangaluru: "Bangaluru", follower: "Follower",
    }

    public engneedHelp = {
        support: "Help - yelo",
    }

    public engPasswordReset = {
        forgotPasswordTitle: "Forgot Password - yelo", newPasswordEnter: "ENTER NEW PASSWORD", newPassword: "New Password",
        newPasswordAgain: "New Password (again)", success: "Success...", submit: "Submit",

    }

    public engPrivacy = {
        privacyPolicyTitle: "Privacy Policy - yelo",
    }

    public engRegister = {
        formBackground: "assets/images/formBackground.png", registerLogo: "assets/images/logo.svg", name: "NAME", fullNameMissing: "fullname is missing",
        userName: "USER NAME", email: "EMAIL", phoneNumber: "PHONE NUMBER", password: "PASSWORD",
        connectFBLogin: "By Clicking on “Login” or ”Connect with Facebook” you shall agree to the yelo", termsService: "Terms of Service",
        privacyPolicy: "Privacy Policy", and: "and", signUp: "SIGN UP", alreadyRegistered: "Already registered?", logIn: "Log In",
        signUpWith: "Sign Up with",
    }
    public engResetPassword = {
        passwordResetTitle: "Password reset - yelo", startBuyCrypto: "start buying and selling safe with crypto!",
        formBackground: "assets/images/formBackground.png", resetPasswordLogo: "assets/images/logo.svg", forgotPassword: "Forgot Password",
        recoverPassword: "Enter your email to recover your password", receiveLink: "You will receive a link to reset your password",
        email: "EMAIL", submit: "SUBMIT", resetPasswordlogoBottom: "assets/images/logo_bottom.svg",

    }

    public engSell = {
        sellTitle: "yelo - Buy. Sell. Simple.", browse: "Browse", noCategory: "no category", terms: "Terms", privacy: "Privacy",
        titleCopyRights: "© 2017 yelo, Inc.", sellStuff: "Sell your stuff",

    }
    public engSettings = {
        settingsTitle: "Account Settings - yelo", verifiedWith: "Verified With", settingsFBOn: "assets/images/FB_on.svg", settingsFBOff: "assets/images/FB_off.svg",
        settingsGOn: "assets/images/G+_on.svg", settingsGOff: "assets/images/G+_off.svg", settingsEmailOn: "assets/images/Email_on.svg",
        settingsEmailOff: "assets/images/Email_off.svg", posts: "Posts", followers: "Followers", following: "Following", selling: "SELLING",
        sold: "SOLD", favourites: "FAVOURITES", noListYet: "NO LISTINGS (YET!)", $: "$",

    }

    public engTerms = {
    }

    public engTrust = {
        trustTitle: "Trust - yelo", trust: "Trust", trustworthiness: "The most valuable currency",
        communityWorld: "in our marketplace is trust", buildLocalMarket: "We’re building a local marketplace where the",
        wellBeing: "well-being of buyers and sellers comes first", obsessingText: "We want yelo to be a place where buying and selling can be more rewarding. We'll keep obsessing over every detailof the experience so our buyers and sellers can connect with more confidence. And we'll keep holding ourselvesand our community to high standards",
        trustNeighbours: "Earn trust from each other", careVigilant: "Get to know other users", userProfiles: "User Profiles",
        profileOpportunity: "Your profile is your opportunity to introduce yourself to other members of the community",
        verificationID: "ID Verification", secureIdentity: "We securely validate your identity using your state ID and Facebook profile",
        userRatings: "User Ratings", seeHowMany: "See how many completed transactions users have and check out their average rating",
        appMessaging: "In-App Messaging", securelyCommunicate: "Securely communicate with buyers and sellers without giving away personal information",
        winningGame: "Learn buying and selling best practices", buyingTips: "Buying Tips",
        coverBasics: "Cover the basics of how to successfully inspect and purchase items from sellers on yelo",
        sellingTips: "Selling Tips", overBasics: "over the basics of how to successfully engage with buyers on yelo",
        letUsKnow: "Let us know if we can help", customerExperts: "Customer Care Experts",
        hereToHelp: "We are here to help solve problems and investigate issues when they arise. Please email for assistance",
        workClosely: "We work closely with our Law Enforcement Partners to ensure incidents requiring further investigation are handledaccordingly",
        assistLaw: "To learn more about how we assist Law Enforcement Officers, please visit ourLaw Enforcement Resource Page",
        haveQuestions: "Still have questions?", visitOur: "Visit our", helpCenter: "Help Center", learnMore: "to learn more",


    }

    public engverifyEmail = {
        verifyEmailTitle: "Verify-email - yelo", congratulationsVerified: "Congratulations, your email Id has been verified",

    }


    //language support
}