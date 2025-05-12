import { SupportProgramFlowPipeline } from "./support-program-flow-pipeline"
import { SupportProgramInsights } from "./support-program-insights"
import { FilterSupportPrograms } from "./filter-support-programs"
import { SupportProgramTable } from "./support-program-table"

export default function SupportProgramsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6 bg-brown-50">
      <h1 className="text-3xl font-bold text-brown-800 mb-6">My Support Program Matches</h1>

      <div className="border rounded-lg p-4 bg-white shadow border-brown-200">
        <SupportProgramFlowPipeline />
      </div>

      <div className="border rounded-lg p-4 bg-white shadow border-brown-200">
        <h2 className="text-2xl font-bold text-brown-800 mb-4">My Support Matches Insights</h2>
        <SupportProgramInsights />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-brown-800 mb-4">Filter Matches</h2>
        <FilterSupportPrograms />
      </div>

      <div className="overflow-x-auto">
        <SupportProgramTable />
      </div>
    </div>
  )
}
