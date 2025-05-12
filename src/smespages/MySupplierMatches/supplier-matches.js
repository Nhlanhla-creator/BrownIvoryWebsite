import { SupplierFlowPipeline } from "./supplier-flow-pipeline"
import { SupplierInsights } from "./supplier-insights"
import { FilterSuppliers } from "./filter-suppliers"
import { SupplierTable } from "./supplier-table"

export default function SupplierMatchesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6 bg-brown-50">
      <h1 className="text-3xl font-bold text-brown-800 mb-6">My Supplier Matches</h1>

      <div className="border rounded-lg p-4 bg-white shadow border-brown-200">
        <SupplierFlowPipeline />
      </div>

      <div className="border rounded-lg p-4 bg-white shadow border-brown-200">
        <h2 className="text-2xl font-bold text-brown-800 mb-4">My Supplier Matches Insights</h2>
        <SupplierInsights />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-brown-800 mb-4">Filter Matches</h2>
        <FilterSuppliers />
      </div>

      <div className="overflow-x-auto">
        <SupplierTable />
      </div>
    </div>
  )
}
