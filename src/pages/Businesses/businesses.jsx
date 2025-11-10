import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import AddBusinessModal from "../../components/Businesses/AddBusinessModal";
import BusinessDetailsModal from "../../components/Businesses/BusinessDetailsModal";
import Table from "../../components/Table";
import axiosClient from "../../api/axiosClient";

export default function Businesses() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Businesses | TexTradeOS";
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get("/businesses/");

      // Flatten userId.username to top-level 'username' for Table
      const flattened = data.map((biz) => ({
        ...biz,
        username: biz.userId?.username || "-", // handle nullable userId
      }));

      setBusinesses(flattened);
    } catch (error) {
      console.error("Failed to load businesses:", error);
      alert("Failed to load businesses");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBusiness = async (formData) => {
    try {
      await axiosClient.post("/businesses/", formData);
      await loadBusinesses();
    } catch (error) {
      console.error("Failed to create business:", error);
      alert(error.response?.data?.message || "Failed to create business");
    }
  };

  const handleDelete = async (biz) => {
    if (!window.confirm(`Delete ${biz.name}?`)) return;
    try {
      await axiosClient.delete(`/businesses/${biz._id}`);
      await loadBusinesses();
    } catch (error) {
      console.error("Failed to delete business:", error);
      alert("Failed to delete business");
    }
  };

  // Table columns
  const columns = [
    { label: "#", render: (_, i) => i + 1, width: "60px" },
    { label: "Business Name", field: "name" },
    { label: "Owner", field: "owner" },
    { label: "Username", field: "username" }, // use flattened username
    { label: "Phone No.", field: "phone_no" },
    {
      label: "Registration Date",
      render: (row) =>
        row.registration_date
          ? new Date(row.registration_date).toLocaleDateString()
          : "-",
    },
    { label: "Type", field: "type" },
    { label: "Price", field: "price" },
  ];

  // Context menu items
  const contextMenuItems = [
    { label: "View Details", onClick: (biz) => setSelectedBusiness(biz) },
    { label: "Edit", onClick: (biz) => alert(`Edit: ${biz.name}`) },
    { label: "Delete", onClick: handleDelete, danger: true },
  ];

  return (
    <div className="w-full h-full overflow-hidden grid grid-rows-[auto_1fr] gap-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Businesses</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>Add Business</Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={businesses}
        onRowClick={(biz) => setSelectedBusiness(biz)}
        contextMenuItems={contextMenuItems}
        loading={loading}
      />

      {/* Modals */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <AddBusinessModal
            onClose={() => setIsCreateModalOpen(false)}
            onSave={handleAddBusiness}
          />
        )}

        {selectedBusiness && (
          <BusinessDetailsModal
            business={selectedBusiness}
            onClose={() => setSelectedBusiness(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
