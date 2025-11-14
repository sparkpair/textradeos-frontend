import { useState, useEffect } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { useToast } from "../../context/ToastContext";
import Table from "../Table";
import axiosClient from "../../api/axiosClient";

export default function GenerateInvoiceModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    person_name: "",
    phone_no: "",
    address: "",
  });

  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);

  const columns = [
    { label: "#", render: (_, i) => i + 1, width: "40px" },
    { label: "Customer Name", field: "name", width: "auto" },
    { label: "Person Name", field: "person_name", width: "12%" },
    { label: "Phone", field: "phone_no", width: "15%", align: "center" },
    { label: "Address", field: "address", width: "18%", align: "center" },
    { label: "Status", field: "status", width: "10%", align: "center" },
  ];

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get("/articles/");
      
      const flattened = data.map((article) => ({
        ...article,
        reg_date: formatDateWithDay(article.registration_date),
      }));
      setArticles(flattened);
      console.log(flattened);
      
    } catch (error) {
      console.error("Failed to load articles:", error);
      addToast("Failed to load articles", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <Modal
      title="Generate Invoice"
      onClose={onClose}
      size="4xl"
    >
      <Table
        columns={columns}
        data={articles}
        loading={loading}
      />
    </Modal>
  );
}
