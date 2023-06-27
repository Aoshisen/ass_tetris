import { createRoot } from "react-dom/client";
import "@/assets/styles/format.scss";
import { App } from "./app";

const rootEl = document.getElementById("root") as HTMLDivElement;
const root = createRoot(rootEl);

root.render(<App />);
