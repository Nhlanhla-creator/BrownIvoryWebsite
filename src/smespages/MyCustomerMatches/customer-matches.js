import { DealFlowPipeline } from "./deal-flow-pipeline"
import { CustomerInsights } from "./customer-insights"
import { FilterMatches } from "./filter-matches"
import { CustomerTable } from "./customer-table"

export default function CustomerMatchesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Customer Matches</h1>

      <div className="border rounded-lg p-4 bg-white shadow">
        <DealFlowPipeline />
      </div>

      <div className="border rounded-lg p-4 bg-white shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Customer Matches Insights</h2>
        <CustomerInsights />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Matches</h2>
        <FilterMatches />
      </div>

      <div className="overflow-x-auto">
        <CustomerTable />
      </div>
    </div>
  )
}
