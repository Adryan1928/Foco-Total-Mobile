let authToken: null | string = null;

export async function getAuthToken() {
  return authToken;
}

export async function setAuthToken(token: string) {
  authToken = token;
}

export async function removeAuthToken() {
  authToken = null;
}