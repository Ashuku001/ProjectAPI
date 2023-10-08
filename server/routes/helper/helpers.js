// const settings = {
//   ashukuEnter: {
//     APP_ID: "1321994925377004",

//     APP_SECRET: "99ec3f966e2259a2e9dbc6f29f35325f",

//     RECIPIENT_PHONE_NUMBER: "254707737397",

//     PHONE_NUMBER_ID: "106394112548719",

//     BUSINESS_ACCOUNT_ID: "100985536429175",

//     ACCESS_TOKEN:
//       "EAASyWO3sBewBO76BoFcFr6lncZBCy8rMgjZBbykyMJwidBszEoHYaVxI44XfV9ZCzTrTiOjbhn8MqobxZAdNfIb1W1h4RSu0LJL8ly3kvHALv3SSBObxbUck3On9bOk2rTc2MjlGvSuLRfxurDdvRSwysbNYxR8gZC9A32LVI5ZCOBeyGpM61fCqbWmSjqa1frJ846Ip65dJOmzmizPqL8woraEF331pzYpTh1UBkZD",
//     API_VERSION: "v17.0",

//     TEMPLATE_NAME_PREFIX: "mkt",

//     WEBHOOK_VERIFICATION_TOKEN: "ashuku",
//   },
//   tarusEnterprise: {
//     APP_ID: "671059864954371",

//     APP_SECRET: "9784eaa1ae349dddf14f4e97a4f1a00b",

//     RECIPIENT_PHONE_NUMBER: "254720536706",

//     PHONE_NUMBER_ID: "135413972986748",

//     BUSINESS_ACCOUNT_ID: "142797562243055",

//     ACCESS_TOKEN:"EAAJiU0zfpgMBO8UmOMH78J78VYUZAyezTOXZC8PTAg3r69TG5SUScytpGrNUZAV2qZA93xaVLZAqKVuM7aN9zXajnIEvCvHbHH5nluWZCuwMMX8OClqAZCeaYk4H5al1Guf5GsLSxEGOHMZBVvm6xz5y1n91Kn2jkZBjmrsPCnTixArzcDAaLKQqer558h8NV4135XKm1Mfif9f7IIn83qKEXQaXYWjbUG2uB6vwZD",
    
//     API_VERSION: "v17.0",

//     TEMPLATE_NAME_PREFIX: "mkt",

//     WEBHOOK_VERIFICATION_TOKEN: "tarus",
//   },
// };

const graphQLClient = require("../../utils/graphqlClient/graphqlClient.js")
const { gql } = require("graphql-request");

const GET_SETTINGS = gql`
  query setting($username: String!){
    setting(username: $username){
        APP_ID
        APP_SECRET
        PHONE_NUMBER_ID
        BUSINESS_ACCOUNT_ID
        ACCESS_TOKEN
        API_VERSION
        WEBHOOK_VERIFICATION_TOKEN
        RECIPIENT_PHONE_NUMBER
    }
  }
`

async function getSettings(username) {
  if (username) {
    try {
      const variables = {username}
      const {setting} = await graphQLClient.request(GET_SETTINGS, variables)

      const appSettings = setting
      console.log(`SETTINGS FOR ${username}`, appSettings);

      return appSettings;
    } catch (error) {
      console.log("Failed to retrieve user settings>>>>>>>>>>");
      console.log(error);
    }
  } else {
    throw new Error("Failed to suppply the username");
  }
}

async function getVerificationToken(req) {
  const username = req.query["username"];

  if (username) {
    try {
      const settings = await getSettings(username).then((value) => {
        return value;
      });

      // console.log("THE SETTINGS",settings)
      console.log(
        "WEBHOOK VERIFICATION>>>>>",
        settings.WEBHOOK_VERIFICATION_TOKEN
      );
      const verificationToken = settings.WEBHOOK_VERIFICATION_TOKEN;
      if (verificationToken) {
        return verificationToken;
      }
    } catch (error) {
      console.log("Error getting the verification token");
      throw new Error(error);
    }
  } else {
    console.log("Could not find a username in the callback url");
    throw new Error();
  }
}

async function getAppSecret(req) {
  const username = req.query["username"];
  if (username) {
    try {
      const settings = await getSettings(username).then((value) => {
        return value;
      });

      console.log("THE SETTINGS", settings);
      const appSecret = settings.APP_SECRET;
      console.log("app secret>>>>>", appSecret);
      if (appSecret) {
        return appSecret;
      }
    } catch (error) {
      console.log("Error getting the app secret");
      throw new Error(error);
    }
  } else {
    console.log("Could not find a username in the callback url");
    throw new Error();
  }
}

if (exports) {
  exports.getSettings = getSettings
  exports.getVerificationToken = getVerificationToken;
  exports.getAppSecret = getAppSecret;
}
