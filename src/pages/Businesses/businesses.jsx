import { useEffect, useState } from "react";
import Button from "../../components/Button";
import AddModal from "../../components/Businesses/AddModal";
import { AnimatePresence } from "framer-motion";

export default function Businesses() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Businesses | TexTradeOS";
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Businesses</h1>

      <Button onClick={() => setIsModalOpen(true)}>Add Business</Button>

      <AnimatePresence>
        {/* Modal */}
        {isModalOpen && (
          <AddModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
