import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import SlideText from "./slide-text.jsx";
import Slide from "./slide.jsx";
import SlideNav from "./slideNav.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Slide />
    <SlideText />
    <SlideNav />
  </>
);
