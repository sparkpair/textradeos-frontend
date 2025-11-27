import { useState, useEffect } from "react";
import Modal from "../Modal";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { useToast } from "../../context/ToastContext";

export default function AddSubscriptionModal({ onClose, onSave, initialData, businessOptions = [] }) {
  const [form, setForm] = useState({
    businessId: "",
    type: "",
    price: "",
    startDate: "",
    endDate: "",
    paymentStatus: "unpaid",
  });

  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setForm({
        businessId: initialData.businessId?._id || "",
        type: initialData.type || "",
        price: initialData.price || "",
        startDate: initialData.startDate ? initialData.startDate.split("T")[0] : "",
        endDate: initialData.endDate ? initialData.endDate.split("T")[0] : "",
        paymentStatus: initialData.paymentStatus || "unpaid",
      });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSelectChange = (name, value) => setForm({ ...form, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSave(form);
      onClose();
    } catch (err) {
      console.error(err);
      addToast(err.response?.data?.message || "Failed to save subscription", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={initialData ? "Edit Subscription" : "Add Subscription"} onClose={onClose} size="2xl">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select
            label="Business"
            options={businessOptions.map(b => ({ value: b._id, label: b.name }))}
            value={form.businessId}
            onChange={(val) => handleSelectChange("businessId", val)}
            placeholder="Select Business"
            required
          />
          <Select
            label="Type"
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
            value={form.type}
            onChange={(val) => handleSelectChange("type", val)}
            placeholder="Select Type"
            required
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
          />
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            required
          />
          <Select
            label="Payment Status"
            options={[
              { value: "paid", label: "Paid" },
              { value: "unpaid", label: "Unpaid" },
              { value: "pending", label: "Pending" },
            ]}
            value={form.paymentStatus}
            onChange={(val) => handleSelectChange("paymentStatus", val)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={saving}>
          {saving ? "Saving..." : initialData ? "Update Subscription" : "Save Subscription"}
        </Button>
      </form>
    </Modal>
  );
}
