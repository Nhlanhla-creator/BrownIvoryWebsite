"use client"

import { useState } from "react"
import styles from "./support-programs.module.css"

export function SupportProgramFlowPipeline() {
  const [stages] = useState([
    { id: "initial", name: "Initial Matches >80%", count: 85 },
    { id: "interest", name: "Expressions of Interest", count: 65 },
    { id: "applications", name: "Applications Submitted", count: 65 },
    { id: "review", name: "Under Review", count: 35 },
    { id: "interview", name: "Interview/Engagement", count: 25 },
    { id: "acceptance", name: "Program Acceptance", count: 5 },
    { id: "participation", name: "Program Participation", count: 2 },
    { id: "completion", name: "Program Completion", count: 4 },
    { id: "withdrawn", name: "Withdrawn", count: 82 },
    { id: "declined", name: "Declined", count: 82 },
  ])

  const [hoveredStage, setHoveredStage] = useState(null)

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-800 mb-4">Deal Flow Pipeline</h2>
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
                <p>{stage.name}: {stage.count}</p>
                {stage.id === "acceptance" && <p className="text-xs">Add robot for status</p>}
                {stage.id === "completion" && <p className="text-xs">What about final reports?</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
