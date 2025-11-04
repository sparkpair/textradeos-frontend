import { useState } from "react";
import { X } from "lucide-react";
import Input from "../Input";
import Button from "../Button";
import Modal from "../Modal";

export default function AddBusinessModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    owner: "",
    username: "",
    password: "",
    contact: "",
    joining_date: "",
    price: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Business Data:", form);
    // TODO: send data to API
    onClose(); // close modal after submit
  };

  return (
    <Modal title="Add Business" onClose={onClose} size="2xl">
        {/* Form */}
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Input
              label="Business Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter business name"
              required
            />

            <Input
              label="Owner Name"
              name="owner"
              value={form.owner}
              onChange={handleChange}
              placeholder="Enter owner name"
              required
            />
            
            <Input
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />

            <Input
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />

            <Input
              label="Contact Number"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
            />

            <Input
              label="Joining Date"
              name="joining_date"
              type="date"
              value={form.joining_date}
              onChange={handleChange}
              placeholder="Enter joining date"
            />

            <Input
              label="Price"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
            />

            <Input
              label="Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="Enter type"
            />
          </div>

          <Button type="submit" className="w-full">
            Save Business
          </Button>
        </form>
    </Modal>
  );
}
