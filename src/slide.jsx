import { Logo } from "@pmndrs/branding";
import { motion } from "framer-motion";
import { ShoppingCartIcon } from "lucide-react";
import { useSnapshot } from "valtio";
import { state } from "./store";
export default function Slide() {
  const snap = useSnapshot(state);
  return (
    <motion.div
      transition={{ ease: "backOut" }}
      style={{
        background: `${snap.selectedColors}`,
      }}
      className="absolute -z-[2] top-0 left-0 w-full h-full"
    >
      <motion.header
        initial={{ opacity: 0, y: -120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.8, delay: 1 }}
        className="flex flex-row z-30 justify-between fixed w-full p-10"
      >
        <Logo width="40" height="40" />
        <div>
          <ShoppingCartIcon size="3em" />
        </div>
      </motion.header>
    </motion.div>
  );
}
