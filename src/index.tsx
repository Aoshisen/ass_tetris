import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.scss"
const rootEl = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootEl);
root.render(<App />);
