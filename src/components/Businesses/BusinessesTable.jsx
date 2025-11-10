import Table from "../components/Table";

const columns = [
  { label: "#", render: (_, i) => i + 1, width: "60px" },
  { label: "Business Name", field: "name" },
  { label: "Owner", field: "owner" },
  { label: "Username", field: "username" },
  { label: "Phone No.", field: "phone_no" },
  {
    label: "Registration Date",
    render: (row) => new Date(row.registration_date).toLocaleDateString(),
  },
  { label: "Type", field: "type" },
  { label: "Price", field: "price" },
];

<Table
  columns={columns}
  data={businesses}
  onRowClick={(biz) => setSelectedBusiness(biz)}
  contextMenuItems={[
    { label: "View Details", onClick: (biz) => setSelectedBusiness(biz) },
    { label: "Edit", onClick: (biz) => alert("Edit " + biz.name) },
    { label: "Delete", onClick: (biz) => handleDelete(biz), danger: true },
  ]}
/>
