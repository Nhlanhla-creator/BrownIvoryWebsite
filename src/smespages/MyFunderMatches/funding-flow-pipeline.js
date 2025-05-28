import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronRight, Info } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import styles from "./DealFlowPipeline.module.css";

export default function DealFlowPipeline() {
  const [hoveredStage, setHoveredStage] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const [stages, setStages] = useState([
    {
      id: "initial",
      name: "Primary Matches",
      count: 0,
      description: "Funders that match your profile with a score of 80% or higher",
      colorClass: styles.stageInitial,
      iconColor: "#8d6e63"
    },
    {
      id: "application",
      name: "Applications",
      count: 0,
      description: "Applications you've submitted to potential funders",
      colorClass: styles.stageApplication,
      iconColor: "#795548"
    },
    {
      id: "review",
      name: "Under Review",
      count: 0,
      description: "Applications currently being reviewed by funders",
      colorClass: styles.stageReview,
      iconColor: "#6d4c41"
    },
    {
      id: "feedback",
      name: "Deals Initiated",
      count: 0,
      description: "Feedback received from potential investors",
      hasMessages: true,
      colorClass: styles.stageFeedback,
      iconColor: "#5d4037"
    },
 
    {
      id: "deals",
      name: "Deals Closed",
      count: 0,
      description: "Successfully closed funding deals",
      colorClass: styles.stageDeals,
      iconColor: "#3e2723"
    },
    {
      id: "withdrawn",
      name: "Withdrawn /Declined",
      count: 0,
      description: "Applications withdrawn by you or declined by funders",
      showRejectionInfo: true,
      colorClass: styles.stageWithdrawn,
      iconColor: "#3e2723"
    },
  ]);

  useEffect(() => {
    const fetchStageCounts = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const snapshot = await getDocs(collection(db, "smeApplications"));
      const stageCounts = {
        initial: 0,
        application: 0,
        review: 0,
        feedback: 0,
        termsheet: 0,
        deals: 0,
        withdrawn: 0,
      };

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.smeId !== user.uid) return;

        switch (data.status) {
          case "Application Sent":
            stageCounts.application += 1;
            break;
          case "Under Review":
            stageCounts.review += 1;
            break;
          case "Investor Feedback":
            stageCounts.feedback += 1;
            break;
          case "Term Sheet":
            stageCounts.termsheet += 1;
            break;
          case "Deal Closed":
            stageCounts.deals += 1;
            break;
          case "Withdrawn":
          case "Declined":
            stageCounts.withdrawn += 1;
            break;
          default:
            stageCounts.initial += 1;
        }
      });

      setStages(current =>
        current.map(stage => ({
          ...stage,
          count: stageCounts[stage.id] || 0,
        }))
      );
    };

    fetchStageCounts();
  }, []); // This will be re-triggered when the component is remounted

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
       
       
      </div>

      <div className={styles.pipelineStagesContainer}>
        <div className={styles.pipelineConnectionLine}></div>

        <div className={styles.pipelineStagesRow}>
          {stages.map((stage) => (
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
                  {stage.useClient && (
                    <button
                      className={styles.tooltipAction}
                      onClick={() => alert("View term sheets")}
                    >
                      View term sheets <ChevronRight size={12} />
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