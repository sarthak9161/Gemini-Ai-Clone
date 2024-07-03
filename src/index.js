import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import ContextProvider from "./context/Context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
