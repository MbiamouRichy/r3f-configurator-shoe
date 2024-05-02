import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSnapshot } from "valtio";
import { state } from "./store";
export default function SlideNav() {
  const snap = useSnapshot(state);
  function indexChange() {
    if (state.activeSlide < 0) {
      state.activeSlide = 3;
    } else if (state.activeSlide > snap.slideLenght) {
      state.activeSlide = 0;
    }
    state.selectedColors = state.colors[state.activeSlide];
    console.log(snap.activeSlide, state.activeSlide);
  }
  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: -120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.8, delay: 1.3 }}
        className="p-10 w-full z-30 flex flex-row justify-center items-center gap-3 fixed bottom-0 left-0"
      >
        <button
          style={{
            background: `${snap.selectedColors}`,
          }}
          onClick={() => {
            state.activeSlide = state.activeSlide - 1;
            indexChange();
          }}
          className="px-5"
        >
          <ArrowLeft />
        </button>
        <button
          style={{
            background: `${snap.selectedColors}`,
          }}
        >
          Shop now!
        </button>
        <button
          style={{
            background: `${snap.selectedColors}`,
          }}
          onClick={() => {
            state.activeSlide = state.activeSlide + 1;
            indexChange();
          }}
          className="px-5"
        >
          <ArrowRight />
        </button>
      </motion.footer>
    </>
  );
}
