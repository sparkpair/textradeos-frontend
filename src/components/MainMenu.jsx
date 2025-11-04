import { useState } from "react";
import { Menu } from "lucide-react";
import MenuModal from "./MenuModal";
import { AnimatePresence } from "framer-motion";
import Button from "./Button";

export default function MainMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='border-btn' onClick={() => setOpen(true)}>
        <Menu size={20} />
      </Button>
      
      <AnimatePresence>
        {open && <MenuModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
