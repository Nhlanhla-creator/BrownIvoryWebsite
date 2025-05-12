import { FundingFlowPipeline } from "./funding-flow-pipeline"
import { FundingInsights } from "./funding-insights"
import { FilterFunding } from "./filter-funding"
import { FundingTable } from "./funding-table"

export default function FundingMatchesPage() {
  return (
    <div className="container mx-auto p-6 space-y-6 bg-brown-50">
      <h1 className="text-3xl font-bold text-brown-800 mb-6">My Funding Matches</h1>

      <div className="border rounded-lg p-4 bg-white shadow border-brown-200">
        <FundingFlowPipeline />
      </div>

      <div className="border rounded-lg p-4 bg-white shadow border-brown-200">
        <h2 className="text-2xl font-bold text-brown-800 mb-4">My Funding Matches Insights</h2>
        <FundingInsights />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-brown-800 mb-4">Filter Matches</h2>
        <FilterFunding />
      </div>

      <div className="overflow-x-auto">
        <FundingTable />
      </div>
    </div>
  )
}
