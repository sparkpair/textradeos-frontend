import Modal from "../Modal";
import Button from "../Button";

export default function SubscriptionDetailsModal({ subscription, onClose, onEdit, onToggleStatus }) {
  if (!subscription) return null;

  const isActive = subscription.paymentStatus === "paid";

  return (
    <Modal title={`Subscription: ${subscription.businessId?.name || ""}`} onClose={onClose} size="md">
      <div className="space-y-2 text-gray-700">
        <p><strong>Business:</strong> {subscription.businessId?.name || "-"}</p>
        <p><strong>Type:</strong> {subscription.type}</p>
        <p><strong>Price:</strong> {subscription.price}</p>
        <p>
          <strong>Start Date:</strong>{" "}
          {subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : "-"}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString() : "-"}
        </p>
        <p>
          <strong>Payment Status:</strong>{" "}
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {subscription.paymentStatus}
          </span>
        </p>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button
          onClick={() => onToggleStatus && onToggleStatus(subscription)}
          className={`${isActive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`}
        >
          {isActive ? "Mark Unpaid" : "Mark Paid"}
        </Button>

        <Button
          onClick={() => {
            onClose();
            onEdit(subscription);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Edit
        </Button>

        <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400">
          Close
        </Button>
      </div>
    </Modal>
  );
}
