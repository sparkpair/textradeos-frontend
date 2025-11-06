import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../components/Button";
import AddBusinessModal from "../../components/Businesses/AddBusinessModal";

export default function Businesses() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    document.title = "Businesses | TexTradeOS";
  }, []);

  const businesses = [
    { id: 1, name: "TexTrade Garments", owner: "Andrew", location: "Karachi" },
    { id: 2, name: "Alpha Textiles", owner: "Hasan", location: "Lahore" },
    { id: 3, name: "BlueThread Mills", owner: "Ali", location: "Faisalabad" },
  ];

  // close context menu when clicked anywhere
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="p-6 w-full relative">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Businesses</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>Add Business</Button>
      </div>

      {/* Table container */}
      <div
        id="tableContainer"
        className="border border-gray-300 rounded-2xl p-1 shadow-sm select-none"
      >
        {/* Header Row */}
        <div className="grid [grid-template-columns:60px_1.5fr_1fr_1fr] bg-[#127475] text-white rounded-xl px-4 py-1.5">
          <div>#</div>
          <div>Business Name</div>
          <div>Owner</div>
          <div>Location</div>
        </div>

        {/* Data Rows */}
        {businesses.map((biz, index) => (
          <div
            key={biz.id}
            onClick={() => setSelectedBusiness(biz)}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({
                x: e.pageX,
                y: e.pageY,
                business: biz,
              });
            }}
            className="grid [grid-template-columns:60px_1.5fr_1fr_1fr] border-b border-gray-300 last:border-0 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <div>{index + 1}</div>
            <div>{biz.name}</div>
            <div>{biz.owner}</div>
            <div>{biz.location}</div>
          </div>
        ))}

        {/* Empty state */}
        {businesses.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No businesses found.
          </div>
        )}
      </div>

      {/* Right-click Context Menu */}
      {contextMenu && (
        <div
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
          className="absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg w-44 py-1"
        >
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              setSelectedBusiness(contextMenu.business);
              setContextMenu(null);
            }}
          >
            View Details
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              alert(`Edit: ${contextMenu.business.name}`);
              setContextMenu(null);
            }}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
            onClick={() => {
              alert(`Delete: ${contextMenu.business.name}`);
              setContextMenu(null);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <AddBusinessModal onClose={() => setIsCreateModalOpen(false)} />
        )}

        {/* Business Details Modal */}
        {selectedBusiness && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-[400px] p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">
                {selectedBusiness.name}
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Owner:</strong> {selectedBusiness.owner}
                </p>
                <p>
                  <strong>Location:</strong> {selectedBusiness.location}
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => alert("Edit feature coming soon")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
