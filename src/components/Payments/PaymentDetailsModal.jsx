import Modal from "../Modal";
import Button from "../Button";
import { formatDateWithDay } from "../../utils/index";

export default function PaymentDetailsModal({ payment, onClose }) {
  if (!payment) return null;

  return (
    <Modal title="Payment Details" onClose={onClose} size="md">
      <div className="space-y-2 text-gray-700">
        <p><strong>Customer Name:</strong> {payment.customerId.name}</p>
        <p><strong>Method:</strong> {payment.method}</p>
        <p><strong>Date:</strong> {formatDateWithDay(payment.date)}</p>
        <p><strong>Reff. No.:</strong> {payment.cheque_no !== "" ? payment.cheque_no : payment.slip_no !== "" ? payment.slip_no : payment.transaction_id !== "" ? payment.transaction_id : "-"}</p>
        <p><strong>Payment Date:</strong> {payment.cheque_date ? formatDateWithDay(payment.cheque_date) : payment.slip_date ? formatDateWithDay(payment.slip_date) : "-"}</p>
        <p><strong>Clear Date:</strong> {formatDateWithDay(payment.clear_date)}</p>
        <p><strong>Bank:</strong> {payment.bank || "-" }</p>
        <p><strong>Amount:</strong> {payment.amount}</p>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400">
          Close
        </Button>
      </div>
    </Modal>
  );
}
