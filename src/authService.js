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

async function loginWithPopup(client, options) {
  try {
    await client.loginWithRedirect(options);

    const query = window.location.search;
    console.log(query)

    if (query.includes("code=") && query.includes("state=")) {

      await client.handleRedirectCallback();
      
      user.set(await client.getUser());
            
      isAuthenticated.set(true);

      window.history.replaceState({}, document.title, "/");
    }
 
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
}

function logout(client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;