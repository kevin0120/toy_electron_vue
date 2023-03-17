const React = require("react");
const { createRoot } = require("react-dom/client");

const root = createRoot(document.querySelector("#wrapper")); // createRoot(container!) if you use TypeScript
root.render(<h1>Hello, React !</h1>);
