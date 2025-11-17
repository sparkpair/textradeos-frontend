import Modal from "../Modal";

export default function StatementModal({ onClose, statementData }) {

  return (
    <Modal
      title={`Statement - ${statementData.customer.name}`}
      onClose={onClose}
      size="xl"
    >
      <h1>Statement</h1>
    </Modal>
  );
}
