
"use client";

import { useState } from "react";
import { MessageCircle, X, ChevronRight, Info } from "lucide-react";
import styles from "./DealFlowPipeline.module.css";

export default function DealFlowPipeline() {
  const [hoveredStage, setHoveredStage] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const stages = [
    {
      id: "initial",
      name: "Initial Matches",
      count: 85,
      description: "SMSEs that match your profile with a score of 80% or higher",
      colorClass: styles.stageInitial,
      iconColor: "#8d6e63"
    },
    {
      id: "application",
      name: "Recieved Applications",
      count: 65,
      description: "Applications Received from SMSEs",
      colorClass: styles.stageApplication,
      iconColor: "#795548"
    },
    {
      id: "review",
      name: "Under Review",
      count: 45,
      description: "Applications currently being reviewed",
      colorClass: styles.stageReview,
      iconColor: "#6d4c41"
    },
    {
      id: "feedback",
      name: "Feedback Sent",
      count: 25,
      description: "Feedback sent",
      hasMessages: true,
      colorClass: styles.stageFeedback,
      iconColor: "#5d4037"
    },
    {
      id: "deals",
      name: "Deals",
      count: 3,
      description: "Successfully closed funding deals",
      colorClass: styles.stageDeals,
      iconColor: "#4e342e"
    },
    {
      id: "withdrawn",
      name: "Withdrawn /Declined",
      count: 12,
      description: "Applications withdrawn by you or declined ",
      showRejectionInfo: true,
      colorClass: styles.stageWithdrawn,
      iconColor: "#3e2723"
    },
  ];

  const handleFeedbackClick = () => {
    alert("Redirecting to messages...");
  };

  const handleWithdrawnClick = () => {
    setRejectionReason(
      "This application was declined because the business is currently too early stage for the investor's portfolio requirements. They typically invest in companies with at least $500,000 in annual recurring revenue."
    );
    setShowRejectionModal(true);
  };

  const handleStageClick = (stage) => {
    if (stage.id === "feedback" && stage.hasMessages) {
      handleFeedbackClick();
    } else if (stage.id === "withdrawn" && stage.showRejectionInfo) {
      handleWithdrawnClick();
    }
  };

  return (
    <div className={styles.dealflowPipelineContainer}>
      <div className={styles.pipelineHeader}>
        <h2 className={styles.pipelineTitle}>Deal Flow Pipeline</h2>
        <p className={styles.pipelineDescription}>
          Track your funding applications through each stage of the process
        </p>
      </div>

      <div className={styles.pipelineStagesContainer}>
        <div className={styles.pipelineConnectionLine}></div>
        
        <div className={styles.pipelineStagesRow}>
          {stages.map((stage, index) => (
            <div 
              key={stage.id}
              className={`${styles.pipelineStage} ${stage.colorClass}`}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => handleStageClick(stage)}
            >
              <div className={styles.stageCard}>
                <div className={styles.stageContent}>
                  <div className={styles.stageHeader}>
                    <h3 className={styles.stageName}>{stage.name}</h3>
                    <div 
                      className={styles.stageIcon}
                      style={{ color: stage.iconColor }}
                    >
                      <Info size={14} />
                    </div>
                  </div>
                  <p className={styles.stageCount}>{stage.count}</p>
                </div>
              </div>

              

              {hoveredStage === stage.id && (
                <div className={styles.stageTooltip}>
                  <h4 className={styles.tooltipTitle}>{stage.name}</h4>
                  <p className={styles.tooltipDescription}>{stage.description}</p>
                  {stage.hasMessages && (
                    <button 
                      className={styles.tooltipAction}
                      onClick={handleFeedbackClick}
                    >
                      View messages <ChevronRight size={12} />
                    </button>
                  )}
                  {stage.showRejectionInfo && (
                    <button 
                      className={styles.tooltipAction}
                      onClick={handleWithdrawnClick}
                    >
                      See rejection details <ChevronRight size={12} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showRejectionModal && (
        <div 
          className={styles.pipelineModalOverlay}
          onClick={() => setShowRejectionModal(false)}
        >
          <div 
            className={styles.pipelineModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Application Status</h3>
              <button 
                className={styles.modalCloseBtn}
                onClick={() => setShowRejectionModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.statusIndicator}>
                <div 
                  className={styles.statusDot}
                  style={{ backgroundColor: "#5d4037" }}
                ></div>
                <span className={styles.statusText}>Declined</span>
              </div>
              
              <div className={styles.rejectionContent}>
                <h4 className={styles.rejectionTitle}>Reason for Decline:</h4>
                <p className={styles.rejectionReason}>{rejectionReason}</p>
              </div>
              
              <div className={styles.detailsSection}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Funder:</span>
                  <span className={styles.detailValue}>Growth Fund D</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>May 30, 2023</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Application ID:</span>
                  <span className={styles.detailValue}>APP-2023-0587</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}