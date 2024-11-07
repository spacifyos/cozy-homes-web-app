import Storage from "redux-persist/lib/storage";

const AUTHENTICATION_TOKEN = "SpacifyToken";
const LOGIN_TYPE = "LoginType";
const REFERRAL_CODE = "ReferralCode";

async function setToken(token) {
  try {
    await Storage.setItem(AUTHENTICATION_TOKEN, token);
  } catch (error) {
    // Error saving data
  }
}

async function removeToken() {
  try {
    await Storage.removeItem(AUTHENTICATION_TOKEN);
  } catch (error) {
    // Error saving data
  }
}

async function retrieveToken() {
  try {
    return await Storage.getItem(AUTHENTICATION_TOKEN);
  } catch (error) {
    // Error saving data
  }
}

async function setLoginType(type) {
  try {
    await Storage.setItem(LOGIN_TYPE, type);
  } catch (error) {
    // Error saving data
  }
}

async function removeLoginType() {
  try {
    await Storage.removeItem(LOGIN_TYPE);
  } catch (error) {
    // Error saving data
  }
}

async function retrieveType() {
  try {
    return await Storage.getItem(LOGIN_TYPE);
  } catch (error) {
    // Error saving data
  }
}

async function setReferralCode(code) {
  try {
    await Storage.setItem(REFERRAL_CODE, code);
  } catch (error) {
    // Error saving data
  }
}

async function removeReferralCode() {
  try {
    await Storage.removeItem(REFERRAL_CODE);
  } catch (error) {
    // Error saving data
  }
}

async function retrieveReferralCode() {
  try {
    return await Storage.getItem(REFERRAL_CODE);
  } catch (error) {
    // Error saving data
  }
}

export default {
  setToken,
  retrieveToken,
  removeToken,
  setLoginType,
  removeLoginType,
  retrieveType,
  setReferralCode,
  removeReferralCode,
  retrieveReferralCode,
};
