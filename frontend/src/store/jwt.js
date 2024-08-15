function getCookie(cookieName) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name.trim() === cookieName) return value;
  }
  return null;
}

async function jwtFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  // Attach JWT token
  options.headers["Authorization"] = "Bearer " + localStorage.getItem("JWTtoken");

  if (options.method.toUpperCase() !== "GET") {
    // Ensure the Content-Type header is set correctly
    if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }
    // Attach CSRF token
    const csrfToken = getCookie("CSRF-Token");
    if (csrfToken) {
      options.headers["CSRF-Token"] = csrfToken;
    } else {
      console.error("CSRF token not found");
    }
  }

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

export default jwtFetch;
