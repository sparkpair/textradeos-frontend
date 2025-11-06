import { useEffect, useState } from "react";
import Button from "../../components/Button";
import AddBusinessModal from "../../components/Businesses/AddBusinessModal";
import { AnimatePresence } from "framer-motion";

export default function Businesses() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Businesses | TexTradeOS";
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Businesses</h1>

      <Button onClick={() => setIsCreateModalOpen(true)}>Add Business</Button>

      <AnimatePresence>
        {/* Modal */}
        {isCreateModalOpen && (
          <AddBusinessModal onClose={() => setIsCreateModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
