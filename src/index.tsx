import { createRoot } from "react-dom/client";
import { App } from "./App";
const rootEl = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootEl);
root.render(<App />);
