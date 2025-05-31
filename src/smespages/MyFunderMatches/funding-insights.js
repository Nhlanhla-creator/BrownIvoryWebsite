"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { BarChart, PieChart, LineChart, TrendingUp, DollarSign, Users } from "lucide-react";
import styles from "./funding.module.css";

Chart.register(...registerables);

export function FundingInsights({ insightsData }) {
  const [activeTab, setActiveTab] = useState("funding");

  const chartRefs = {
    fundingAskBreakdown: useRef(null),
    fundingTypeBreakdown: useRef(null),
    topMatchedSectors: useRef(null),
    targetGrowthStages: useRef(null),
    funderResponseTime: useRef(null),
    sectorTrends: useRef(null),
    sectorDistribution: useRef(null),
    timelineProgress: useRef(null),
    monthlyActivity: useRef(null),
  };

  const charts = useRef([]);

  useEffect(() => {
    if (!insightsData) return;

    charts.current.forEach((chart) => chart.destroy());
    charts.current = [];

    const brownPalette = {
      primary: "#7B3F00",
      secondary: "#A0522D",
      tertiary: "#C68642",
      light: "#D8B384",
      lighter: "#EBD3B0",
      lightest: "#F9E9D0",
      accent1: "#8B5E3C",
      accent2: "#A67B5B",
      accent3: "#5C3A21",
      accent4: "#3E2C20",
      accent5: "#2B1B0E",
    };

    const createChart = (ref, config) => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d");
        if (ctx) {
          const chart = new Chart(ctx, config);
          charts.current.push(chart);
        }
      }
    };

    if (activeTab === "funding") {
      createChart(chartRefs.fundingAskBreakdown, {
        type: "bar",
        data: {
          labels: Object.keys(insightsData.fundingUseBreakdown || {}),
          datasets: [
            {
              label: "Number of Requests",
              data: Object.values(insightsData.fundingUseBreakdown || {}),
              backgroundColor: brownPalette.accent1,
              borderColor: brownPalette.primary,
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Funding Ask Breakdown by Use",
              color: brownPalette.primary,
              font: { weight: "bold", size: 13 },
            },
            legend: { display: false },
          },
          scales: {
            x: {
              beginAtZero: true,
              title: { display: true, text: "Number of Requests", color: brownPalette.primary },
              ticks: { color: brownPalette.primary },
              grid: { color: brownPalette.lighter },
            },
            y: {
              ticks: { color: brownPalette.primary },
              grid: { color: brownPalette.lighter },
            },
          },
        },
      });

      createChart(chartRefs.fundingTypeBreakdown, {
        type: "doughnut",
        data: {
          labels: Object.keys(insightsData.fundingTypeBreakdown || {}),
          datasets: [
            {
              data: Object.values(insightsData.fundingTypeBreakdown || {}),
              backgroundColor: [
                brownPalette.primary,
                brownPalette.secondary,
                brownPalette.tertiary,
                brownPalette.light,
                brownPalette.lighter,
              ],
              borderColor: "#FFFFFF",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Funding Type Breakdown",
              color: brownPalette.primary,
              font: { weight: "bold", size: 13 },
            },
            legend: {
              position: "right",
              labels: {
                color: brownPalette.primary,
                boxWidth: 10,
                padding: 10,
                font: { size: 10 },
              },
            },
          },
        },
      });
    } else if (activeTab === "sector") {
      createChart(chartRefs.topMatchedSectors, {
        type: "bar",
        data: {
          labels: Object.keys(insightsData.topMatchedSectors || {}),
          datasets: [
            {
              label: "Number of Matches",
              data: Object.values(insightsData.topMatchedSectors || {}),
              backgroundColor: brownPalette.accent3,
              borderColor: brownPalette.primary,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Top 5 Matched Sectors",
              color: brownPalette.primary,
              font: { weight: "bold", size: 13 },
            },
            legend: { display: false },
          },
          scales: {
            x: { ticks: { color: brownPalette.primary }, grid: { color: brownPalette.lighter } },
            y: {
              beginAtZero: true,
              title: { display: true, text: "Number of Matches", color: brownPalette.primary },
              ticks: { color: brownPalette.primary },
              grid: { color: brownPalette.lighter },
            },
          },
        },
      });

      createChart(chartRefs.sectorDistribution, {
        type: "pie",
        data: {
          labels: Object.keys(insightsData.sectorDistribution || {}),
          datasets: [
            {
              data: Object.values(insightsData.sectorDistribution || {}),
              backgroundColor: [
                brownPalette.primary,
                brownPalette.secondary,
                brownPalette.tertiary,
                brownPalette.light,
                brownPalette.lighter,
                brownPalette.accent1,
                brownPalette.accent2,
              ],
              borderColor: "#FFFFFF",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Sector Distribution",
              color: brownPalette.primary,
              font: { weight: "bold", size: 13 },
            },
            legend: {
              position: "right",
              labels: {
                color: brownPalette.primary,
                boxWidth: 10,
                padding: 5,
                font: { size: 10 },
              },
            },
          },
        },
      });
    } else if (activeTab === "timeline") {
      const labels = insightsData.timelineProgress?.map(d => d.month) || [];
      createChart(chartRefs.timelineProgress, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Applications",
              data: insightsData.timelineProgress?.map(d => d.applications) || [],
              borderColor: brownPalette.primary,
              backgroundColor: "rgba(139, 90, 43, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Matches",
              data: insightsData.timelineProgress?.map(d => d.matches) || [],
              borderColor: brownPalette.accent3,
              backgroundColor: "rgba(70, 130, 180, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Funding Progress Over Time",
              color: brownPalette.primary,
              font: { weight: "bold", size: 13 },
            },
            legend: {
              position: "top",
              labels: { color: brownPalette.primary, font: { size: 10 } },
            },
          },
          scales: {
            x: { ticks: { color: brownPalette.primary }, grid: { color: brownPalette.lighter } },
            y: {
              beginAtZero: true,
              ticks: { color: brownPalette.primary },
              grid: { color: brownPalette.lighter },
            },
          },
        },
      });

      createChart(chartRefs.monthlyActivity, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "New Matches",
              data: insightsData.monthlyActivity?.map(d => d.matches) || [],
              backgroundColor: brownPalette.accent1,
            },
            {
              label: "Applications Sent",
              data: insightsData.monthlyActivity?.map(d => d.applications) || [],
              backgroundColor: brownPalette.accent4,
            },
            {
              label: "Deals Closed",
              data: insightsData.monthlyActivity?.map(d => d.deals) || [],
              backgroundColor: brownPalette.accent5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Monthly Funding Activity",
              color: brownPalette.primary,
              font: { weight: "bold", size: 13 },
            },
            legend: {
              position: "top",
              labels: { color: brownPalette.primary, font: { size: 10 } },
            },
          },
          scales: {
            x: { ticks: { color: brownPalette.primary }, grid: { color: brownPalette.lighter } },
            y: {
              beginAtZero: true,
              ticks: { color: brownPalette.primary },
              grid: { color: brownPalette.lighter },
            },
          },
        },
      });
    }
  }, [activeTab, insightsData]);

  if (!insightsData) return null;

  return (
    <div>
      <div className={styles.insightsSummary}>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}><TrendingUp size={20} /></div>
          <div className={styles.insightContent}>
            <h3>{insightsData.matchRate || 0}%</h3>
            <p>Match Rate</p>
          </div>
        </div>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}><DollarSign size={20} /></div>
          <div className={styles.insightContent}>
            <h3>R{Number(insightsData.averageFundingAmount || 0).toLocaleString()}</h3>
            <p>Avg. Funding</p>
          </div>
        </div>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}><Users size={20} /></div>
          <div className={styles.insightContent}>
            <h3>{insightsData.activeFundersCount || 0}</h3>
            <p>Active Funders</p>
          </div>
        </div>
      </div>

      <div className={styles.insightsTabs}>
        <div className={styles.insightsTabHeader}>
          <div className={`${styles.insightsTab} ${activeTab === "funding" ? styles.insightsTabActive : ""}`} onClick={() => setActiveTab("funding")}> <BarChart size={14} /> <span>Funding Breakdown</span> </div>
          <div className={`${styles.insightsTab} ${activeTab === "sector" ? styles.insightsTabActive : ""}`} onClick={() => setActiveTab("sector")}> <PieChart size={14} /> <span>Sector Analysis</span> </div>
          <div className={`${styles.insightsTab} ${activeTab === "timeline" ? styles.insightsTabActive : ""}`} onClick={() => setActiveTab("timeline")}> <LineChart size={14} /> <span>Timeline</span> </div>
        </div>
      </div>

      <div className={styles.insightsContainer}>
        {activeTab === "funding" && (
          <>
            <div className={styles.chartContainer}><canvas ref={chartRefs.fundingAskBreakdown} /></div>
            <div className={styles.chartContainer}><canvas ref={chartRefs.fundingTypeBreakdown} /></div>
          </>
        )}
        {activeTab === "sector" && (
          <>
            <div className={styles.chartContainer}><canvas ref={chartRefs.topMatchedSectors} /></div>
            <div className={styles.chartContainer}><canvas ref={chartRefs.sectorDistribution} /></div>
          </>
        )}
        {activeTab === "timeline" && (
          <>
            <div className={styles.chartContainer}><canvas ref={chartRefs.timelineProgress} /></div>
            <div className={styles.chartContainer}><canvas ref={chartRefs.monthlyActivity} /></div>
          </>
        )}
      </div>
    </div>
  );
}
