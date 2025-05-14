"use client"

import { useState } from "react"
import styles from "./funding.module.css"

export function FundingFlowPipeline() {
  const [stages] = useState([
    { id: "initial", name: "Initial Matches >80%", count: 85 },
    { id: "interest", name: "Expressions of Interest", count: 65 },
    { id: "engagements", name: "Engagements Initiated", count: 65 },
    { id: "duediligence", name: "In Due Diligence", count: 35 },
    { id: "discussions", name: "Investor Discussions", count: 25 },
    { id: "termsheets", name: "Term Sheets Issued", count: 5 },
    { id: "deals", name: "Deals Closed", count: 2 },
    { id: "withdrawn", name: "Withdrawn", count: 4 },
    { id: "declined", name: "Declined", count: 82 },
  ])

  const [hoveredStage, setHoveredStage] = useState(null)

  return (
    <div>
      <h2 className={styles.sectionTitle}>Deal Flow Pipeline</h2>
      <div className={styles.pipelineContainer}>
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={styles.stageContainer}
            onMouseEnter={() => setHoveredStage(stage.id)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            <div
              className={`${styles.stageCircle} ${
                stage.id === "deals"
                  ? styles.stageSuccess
                  : stage.id === "declined" || stage.id === "withdrawn"
                    ? styles.stageFailed
                    : ""
              }`}
            >
              {stage.count}
            </div>
            <div className={styles.stageName}>{stage.name.split(" ")[0]}</div>
            {hoveredStage === stage.id && (
              <div className={styles.stageTooltip}>
                <p>
                  {stage.name}: {stage.count}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
