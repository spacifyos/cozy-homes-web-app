import Storage from "redux-persist/lib/storage";

const AUTHENTICATION_TOKEN = "MyToken";
const TENANT_USER_TOKEN = "tenantUserToken";

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

async function setTenantUserToken(token) {
  try {
    await Storage.setItem(TENANT_USER_TOKEN, token);
  } catch (error) {
    console.log(error);
  }
}

async function removeTenantUserToken() {
  try {
    await Storage.removeItem(TENANT_USER_TOKEN);
  } catch (error) {
    console.log(error);
  }
}

async function retrieveTenantUserToken() {
  try {
    return await Storage.getItem(TENANT_USER_TOKEN);
  } catch (error) {
    console.log(error);
  }
}

export default {
  setToken,
  retrieveToken,
  removeToken,
  setTenantUserToken,
  retrieveTenantUserToken,
  removeTenantUserToken,
};
