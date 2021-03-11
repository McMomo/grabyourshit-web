import createAuth0Client from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "./store";
import {config} from "./auth_config";

async function createClient() {
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });

  return auth0Client;
}

async function loginWithRedirect(auth0Client, options) {
  try {
    await auth0Client.loginWithRedirect(options);
  } catch (e) {
    console.error(e);
  }
}

async function handleRedirectOnLoad(auth0Client) {
    window.addEventListener('load', async () => {
      const redirectResult = await auth0Client.handleRedirectCallback();
      try {
        isAuthenticated.set(await auth0Client.isAuthenticated());
        user.set(await auth0Client.getUser());
      } catch (e) {
        console.error(e)
      }
    });

    try {
      isAuthenticated.set(await auth0Client.isAuthenticated());
      user.set(await auth0Client.getUser());
    } catch (e) {
      console.error(e)
    }
}

function logout(client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithRedirect,
  handleRedirectOnLoad,
  logout,
};

export default auth;