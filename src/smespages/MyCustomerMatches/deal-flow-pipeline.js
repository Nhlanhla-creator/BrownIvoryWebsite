"use client"

import { useState } from "react"
import styles from "./customers.module.css"

export function DealFlowPipeline() {
  const [stages] = useState([
    { id: "initial", name: "Initial Matches >80%", count: 85 },
    { id: "interest", name: "Interest Expressed", count: 65 },
    { id: "engagements", name: "Engagements Initiated", count: 35 },
    { id: "discussions", name: "In Discussions", count: 25 },
    { id: "proposal", name: "Proposal Sent", count: 5 },
    { id: "deals", name: "Deals Secured", count: 2 },
    { id: "delivery", name: "In Delivery", count: 4 },
    { id: "concluded", name: "Concluded & Paid", count: 4 },
    { id: "declined", name: "Declined", count: 82 },
  ])

  const [hoveredStage, setHoveredStage] = useState(null)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Deal Flow Pipeline</h2>
      <div className={styles.pipelineContainer}>
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={styles.stageContainer}
            onMouseEnter={() => setHoveredStage(stage.id)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <div className={styles.stageCircle}>{stage.count}</div>
            <div className={styles.stageName}>{stage.name}</div>
            {hoveredStage === stage.id && (
              <div className={styles.stageTooltip}>
                <p>
                  {stage.name}: {stage.count}
                </p>
                {stage.id === "proposal" && <p className="text-xs">Add robot for status</p>}
                {stage.id === "concluded" && <p className="text-xs">What about final reports?</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
