
function getCookie(cookieName) {

  const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        const [name, value] = cookie.split("=")
        if (name.trim() === cookieName) return value
    }
    return null
}


async function jwtFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};
  options.headers["Authorization"] = "Bearer " + localStorage.getItem("jwtToken");


  if (options.method.toUpperCase() !== "GET") {
    if (!options.headers["Content-Type"] && !(options.body instanceof FormData)){
      options.headers["Content-Type"] = "application/json"
    }
    options.headers["CSRF-Token"] = getCookie("CSRF-Token");
  }

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;


    return res
}

export default jwtFetch;
