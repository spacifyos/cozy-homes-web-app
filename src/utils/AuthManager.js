import Storage from "redux-persist/lib/storage";

const AUTHENTICATION_TOKEN = "RoomzToken";

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

export default {
  setToken,
  retrieveToken,
  removeToken,
};
