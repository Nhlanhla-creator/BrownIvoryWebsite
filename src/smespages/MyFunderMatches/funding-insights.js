"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"
import { BarChart, PieChart, LineChart, TrendingUp, DollarSign, Users } from "lucide-react"
import styles from "./funding.module.css"

Chart.register(...registerables)

export function FundingInsights() {
  const [activeTab, setActiveTab] = useState("funding")
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
  }

  const charts = useRef([])

  useEffect(() => {
    // Clean up any existing charts
    charts.current.forEach((chart) => chart.destroy())
    charts.current = []

    // Brown color palette
    const brownPalette = {
      primary: "#8B5A2B",
      secondary: "#A67C52",
      tertiary: "#C19A6B",
      light: "#D4B996",
      lighter: "#E6CCAB",
      lightest: "#F5E6CB",
      accent1: "#D2691E", // Orange-brown
      accent2: "#CD853F", // Light orange
      accent3: "#4682B4", // Blue
      accent4: "#6B8E23", // Green
      accent5: "#9370DB", // Purple
    }

    const createChart = (ref, config) => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d")
        if (ctx) {
          const chart = new Chart(ctx, config)
          charts.current.push(chart)
        }
      }
    }

    if (activeTab === "funding") {
      createChart(chartRefs.fundingAskBreakdown, {
        type: "bar",
        data: {
          labels: ["Business Development", "Acquisition", "Setup", "Working Capital", "Capex"],
          datasets: [
            {
              label: "Number of Requests",
              data: [12, 12, 8, 20, 30],
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
              font: {
                weight: "bold",
                size: 13,
              },
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
      })

      createChart(chartRefs.fundingTypeBreakdown, {
        type: "doughnut",
        data: {
          labels: ["Equity", "Debt", "Grant", "Convertible", "Blended"],
          datasets: [
            {
              data: [35, 25, 15, 15, 10],
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
              font: {
                weight: "bold",
                size: 13,
              },
            },
            legend: {
              position: "right",
              labels: {
                color: brownPalette.primary,
                boxWidth: 10,
                padding: 10,
                font: {
                  size: 10,
                },
              },
            },
          },
        },
      })
    } else if (activeTab === "sector") {
      createChart(chartRefs.topMatchedSectors, {
        type: "bar",
        data: {
          labels: ["ICT", "Agritech", "Clean Energy", "Manufacturing", "Retail"],
          datasets: [
            {
              label: "Number of Matches",
              data: [18, 15, 12, 10, 8],
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
              font: {
                weight: "bold",
                size: 13,
              },
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
      })

      createChart(chartRefs.sectorDistribution, {
        type: "pie",
        data: {
          labels: ["Technology", "Agriculture", "Healthcare", "Energy", "Education", "Manufacturing", "Other"],
          datasets: [
            {
              data: [30, 20, 15, 12, 10, 8, 5],
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
              font: {
                weight: "bold",
                size: 13,
              },
            },
            legend: {
              position: "right",
              labels: {
                color: brownPalette.primary,
                boxWidth: 10,
                padding: 5,
                font: {
                  size: 10,
                },
              },
            },
          },
        },
      })
    } else if (activeTab === "timeline") {
      createChart(chartRefs.timelineProgress, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Applications",
              data: [5, 8, 12, 15, 20, 25, 30],
              borderColor: brownPalette.primary,
              backgroundColor: "rgba(139, 90, 43, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Matches",
              data: [3, 5, 8, 10, 15, 18, 22],
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
              font: {
                weight: "bold",
                size: 13,
              },
            },
            legend: {
              position: "top",
              labels: {
                color: brownPalette.primary,
                font: {
                  size: 10,
                },
              },
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
      })

      createChart(chartRefs.monthlyActivity, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "New Matches",
              data: [8, 12, 15, 10, 18, 20, 25],
              backgroundColor: brownPalette.accent1,
            },
            {
              label: "Applications Sent",
              data: [5, 8, 10, 12, 15, 18, 20],
              backgroundColor: brownPalette.accent4,
            },
            {
              label: "Deals Closed",
              data: [0, 1, 0, 2, 1, 3, 2],
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
              font: {
                weight: "bold",
                size: 13,
              },
            },
            legend: {
              position: "top",
              labels: {
                color: brownPalette.primary,
                font: {
                  size: 10,
                },
              },
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
      })
    }

    return () => {
      charts.current.forEach((chart) => chart.destroy())
    }
  }, [activeTab])

  return (
    <div>
      <div className={styles.insightsSummary}>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <TrendingUp size={20} />
          </div>
          <div className={styles.insightContent}>
            <h3>85%</h3>
            <p>Match Rate</p>
          </div>
        </div>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <DollarSign size={20} />
          </div>
          <div className={styles.insightContent}>
            <h3>R5.2M</h3>
            <p>Avg. Funding</p>
          </div>
        </div>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}>
            <Users size={20} />
          </div>
          <div className={styles.insightContent}>
            <h3>45</h3>
            <p>Active Funders</p>
          </div>
        </div>
      </div>

      <div className={styles.insightsTabs}>
        <div className={styles.insightsTabHeader}>
          <div
            className={`${styles.insightsTab} ${activeTab === "funding" ? styles.insightsTabActive : ""}`}
            onClick={() => setActiveTab("funding")}
          >
            <BarChart size={14} />
            <span>Funding Breakdown</span>
          </div>
          <div
            className={`${styles.insightsTab} ${activeTab === "sector" ? styles.insightsTabActive : ""}`}
            onClick={() => setActiveTab("sector")}
          >
            <PieChart size={14} />
            <span>Sector Analysis</span>
          </div>
          <div
            className={`${styles.insightsTab} ${activeTab === "timeline" ? styles.insightsTabActive : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            <LineChart size={14} />
            <span>Timeline</span>
          </div>
        </div>
      </div>

      <div className={styles.insightsContainer}>
        {activeTab === "funding" && (
          <>
            <div className={styles.chartContainer}>
              <canvas ref={chartRefs.fundingAskBreakdown} />
            </div>
            <div className={styles.chartContainer}>
              <canvas ref={chartRefs.fundingTypeBreakdown} />
            </div>
          </>
        )}

        {activeTab === "sector" && (
          <>
            <div className={styles.chartContainer}>
              <canvas ref={chartRefs.topMatchedSectors} />
            </div>
            <div className={styles.chartContainer}>
              <canvas ref={chartRefs.sectorDistribution} />
            </div>
          </>
        )}

        {activeTab === "timeline" && (
          <>
            <div className={styles.chartContainer}>
              <canvas ref={chartRefs.timelineProgress} />
            </div>
            <div className={styles.chartContainer}>
              <canvas ref={chartRefs.monthlyActivity} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
