import Storage from "redux-persist/lib/storage";

const AUTHENTICATION_TOKEN = "SpacifyToken";
const LOGIN_TYPE = "LoginType";

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

export default {
  setToken,
  retrieveToken,
  removeToken,
  setLoginType,
  removeLoginType,
  retrieveType,
};
