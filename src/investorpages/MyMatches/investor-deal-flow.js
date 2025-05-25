"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronRight, Info } from "lucide-react";
import styles from "./DealFlowPipeline.module.css";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function DealFlowPipeline() {
  const [hoveredStage, setHoveredStage] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionDetails, setRejectionDetails] = useState({});
  const [stageCounts, setStageCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStageCounts = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "investorApplications"), where("funderId", "==", user.uid));
    const snapshot = await getDocs(q);

    const counts = {
      initial: 0,
      application: 0,
      review: 0,
      feedback: 0,
      deals: 0,
      withdrawn: 0,
    };

    snapshot.forEach(doc => {
      const data = doc.data();
      const status = data.status?.toLowerCase();

      if (data.matchPercentage >= 80) counts.initial++;
      if (status === "application received") counts.application++;
      if (status === "under review") counts.review++;
      if (status === "feedback sent") counts.feedback++;
      if (status === "approved") counts.deals++;
      if (status === "declined" || status === "withdrawn") counts.withdrawn++;
    });

    setStageCounts(counts);
    setLoading(false);
  };

  useEffect(() => {
    fetchStageCounts();
  }, []);

  const stages = [
    {
      id: "initial",
      name: "Initial Matches",
      description: "SMSEs that match your profile with a score of 80% or higher",
      colorClass: styles.stageInitial,
      iconColor: "#8d6e63"
    },
    {
      id: "application",
      name: "Received Applications",
      description: "Applications received from SMSEs",
      colorClass: styles.stageApplication,
      iconColor: "#795548"
    },
    {
      id: "review",
      name: "Under Review",
      description: "Applications currently being reviewed",
      colorClass: styles.stageReview,
      iconColor: "#6d4c41"
    },
    {
      id: "feedback",
      name: "Feedback Sent",
      description: "Feedback sent",
      hasMessages: true,
      colorClass: styles.stageFeedback,
      iconColor: "#5d4037"
    },
    {
      id: "deals",
      name: "Deals",
      description: "Successfully closed funding deals",
      colorClass: styles.stageDeals,
      iconColor: "#4e342e"
    },
    {
      id: "withdrawn",
      name: "Withdrawn / Declined",
      description: "Applications withdrawn by you or declined",
      showRejectionInfo: true,
      colorClass: styles.stageWithdrawn,
      iconColor: "#3e2723"
    },
  ];

  const handleStageClick = async (stage) => {
    if (stage.id === "feedback" && stage.hasMessages) {
      alert("Redirecting to messages...");
    } else if (stage.id === "withdrawn" && stage.showRejectionInfo) {
      const auth = getAuth();
      const user = auth.currentUser;
      const q = query(
        collection(db, "investorApplications"),
        where("funderId", "==", user.uid),
        where("status", "==", "Declined")
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const app = snapshot.docs[0].data();
        setRejectionDetails({
          funder: app.funderName || "Unknown Funder",
          date: new Date(app.updatedAt).toLocaleDateString(),
          reason: app.responseMessage || "No reason provided.",
          appId: snapshot.docs[0].id,
        });
        setShowRejectionModal(true);
      }
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
                  <p className={styles.stageCount}>
                    {loading ? "..." : stageCounts[stage.id] || 0}
                  </p>
                </div>
              </div>

              {hoveredStage === stage.id && (
                <div className={styles.stageTooltip}>
                  <h4 className={styles.tooltipTitle}>{stage.name}</h4>
                  <p className={styles.tooltipDescription}>{stage.description}</p>
                  {stage.hasMessages && (
                    <button className={styles.tooltipAction}>
                      View messages <ChevronRight size={12} />
                    </button>
                  )}
                  {stage.showRejectionInfo && (
                    <button className={styles.tooltipAction}>
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
                <p className={styles.rejectionReason}>{rejectionDetails.reason}</p>
              </div>

              <div className={styles.detailsSection}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Funder:</span>
                  <span className={styles.detailValue}>{rejectionDetails.funder}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>{rejectionDetails.date}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Application ID:</span>
                  <span className={styles.detailValue}>{rejectionDetails.appId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
