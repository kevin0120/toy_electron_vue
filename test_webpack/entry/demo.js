require("@/react1.jsx");

require("@/app.css");

require("@/image.js");

// webpack.EnvironmentPlugin
if (process.env.NODE_ENV === "production") {
  console.log("Welcome to production");
}
if (process.env.DEBUG) {
  console.log("Debugging output");
}

console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
