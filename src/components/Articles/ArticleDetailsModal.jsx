import Modal from "../Modal";
import Button from "../Button";
import { formatCurrency } from "../../utils/formatters"; // Assuming you have a formatter utility

// Helper function to render a detail row
const DetailItem = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-100 py-2">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className="text-sm font-semibold text-gray-800">{value}</span>
  </div>
);

export default function ArticleDetailsModal({ article, onClose, onEdit, onAddStock }) {
  if (!article) return null;

  const isActive = article.status === "Active";

  return (
    <Modal title={article.name} onClose={onClose} size="lg">
      <div className="p-4 sm:p-6">
        {/* --- Header / Status Indicator --- */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{article.article_no}</h3>
          <div
            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
              isActive
                ? "bg-green-100 text-green-700 ring-1 ring-green-600/20"
                : "bg-red-100 text-red-700 ring-1 ring-red-600/20"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
        </div>

        {/* --- Details Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          
          {/* Group 1: Core Product Info */}
          <div className="sm:col-span-1">
            <h4 className="text-base font-semibold text-gray-800 mb-2 border-b-2 border-indigo-500 inline-block">General Info</h4>
            <div className="space-y-1">
              <DetailItem label="Season" value={article.season} />
              <DetailItem label="Category" value={article.category} />
              <DetailItem label="Type" value={article.type} />
              <DetailItem label="Size" value={article.size} />
            </div>
          </div>
          
          {/* Group 2: Pricing Info */}
          <div className="sm:col-span-1">
            <h4 className="text-base font-semibold text-gray-800 mb-2 border-b-2 border-indigo-500 inline-block">Pricing</h4>
            <div className="space-y-1">
              <DetailItem 
                label="Purchase Price" 
                value={formatCurrency(article.purchase_price)} 
              />
              <DetailItem 
                label="Selling Price" 
                value={formatCurrency(article.selling_price)} 
              />
            </div>
            
            {/* Profit Margin Example (Calculated) */}
            {/* If article.purchase_price and article.selling_price are numbers:
            <div className="flex justify-between border-t border-gray-300 mt-4 pt-4 text-base font-bold text-indigo-600">
                <span>Potential Margin</span>
                <span>{formatCurrency(article.selling_price - article.purchase_price)}</span>
            </div>
            */}

          </div>
        </div>

        {/* --- Actions --- */}
        <div className="mt-8 flex justify-end gap-3">
          
          <Button
            onClick={() => {
              onClose();
              onAddStock(article);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition duration-150 ease-in-out"
          >
            Add Stock
          </Button>

          <Button
            onClick={() => {
              onClose();
              onEdit(article);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition duration-150 ease-in-out"
          >
            Edit Article
          </Button>

          <Button 
            onClick={onClose} 
            className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}