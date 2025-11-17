import Modal from "../Modal";
import Button from "../Button";
import { formatDateWithDay } from "../../utils/index";
import DetailItem from "../DetailItem";

export default function PaymentDetailsModal({ payment, onClose }) {
  if (!payment) return null;

  return (
    <Modal title="Payment Details" onClose={onClose} size="md">
      <hr className="border-gray-300 mt-2 mb-4.5" />

      {/* --- Details Grid --- */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 px-3">
        {/* Group 1: Core Product Info */}
        <div className="sm:col-span-1">
          <h4 className="text-base font-semibold text-gray-800 mb-2 border-b-2 border-[#127475] inline-block">General Info</h4>
          <div className="space-y-1">
            <DetailItem label="Customer Name" value={payment.customerId.name} />
            <DetailItem label="Method" value={payment.method} />
            <DetailItem label="Date" value={formatDateWithDay(payment.date)} />
            <DetailItem label="Reff. No." value={payment.cheque_no !== "" ? payment.cheque_no : payment.slip_no !== "" ? payment.slip_no : payment.transaction_id !== "" ? payment.transaction_id : "-"} />
            <DetailItem label="Payment Date" value={payment.cheque_date ? formatDateWithDay(payment.cheque_date) : payment.slip_date ? formatDateWithDay(payment.slip_date) : "-"} />
            <DetailItem label="Clear Date" value={formatDateWithDay(payment.clear_date)} />
            <DetailItem label="Bank" value={payment.bank || "-" } />
            <DetailItem label="Amount" value={payment.amount} />
          </div>
        </div>
      </div>

      {/* --- Actions --- */}
      <div className="mt-8 flex justify-end gap-3">
        <Button 
          onClick={onClose} 
          variant="secondary-btn"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
}
