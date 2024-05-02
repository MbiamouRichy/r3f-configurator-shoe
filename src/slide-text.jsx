import { motion } from "framer-motion";
import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { state } from "./store";
export default function SlideText() {
  const snap = useSnapshot(state);

  let configJapan = {
    initial: { opacity: 0, y: -500 },
    animate: { opacity: 1, y: 0 },
    transition: { ease: "backOut", delay: 0.2 },
  };

  let configHaut = {
    initial: { opacity: 0, x: -500 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -500 },
    transition: { ease: "backOut", delay: 0.1 },
  };
  let configBas = {
    initial: { opacity: 0, x: 500 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -500 },
    transition: { ease: "backOut", delay: 0.1 },
  };

  let SlideText = [
    {
      japan: "赤",
      text: "Air max akatsuki",
    },
    {
      japan: "黒",
      text: "Air max 90",
    },
    {
      japan: "白",
      text: "Air max 90",
    },
    {
      japan: "黒",
      text: "Air Uptempo",
    },
  ];
  return SlideText.map((slide, idx) =>
    snap.activeSlide === idx ? (
      <Fragment key={idx}>
        <motion.h1
          {...configJapan}
          className="absolute font-extrabold top-5 left-0 w-full text-center text-slate-50"
        >
          {slide.japan}
        </motion.h1>
        <div className="w-full absolute top-0 left-0 -mt-10 h-screen flex flex-row justify-center items-center">
          <h1 className="absolute -z-[1] w-full md:w-4/5 text-slate-50">
            <motion.span
              {...configHaut}
              className="dechireHaut absolute text-center w-full"
            >
              {slide.text}
            </motion.span>
            <motion.span
              {...configBas}
              className="dechireBas absolute text-center w-full"
            >
              {slide.text}
            </motion.span>
          </h1>

          <h1 className="text-plein z-30 absolute w-full md:w-4/5 text-slate-50">
            <motion.span
              {...configHaut}
              transition={{ delay: 0 }}
              className="dechireHaut text-vide absolute text-center w-full"
            >
              {slide.text}
            </motion.span>
            <motion.span
              {...configBas}
              transition={{ delay: 0 }}
              className="dechireBas text-vide absolute text-center w-full"
            >
              {slide.text}
            </motion.span>
          </h1>
        </div>
      </Fragment>
    ) : (
      ""
    )
  );
}
