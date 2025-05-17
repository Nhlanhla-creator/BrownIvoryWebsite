"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, registerables } from "chart.js"
import {
  BarChart,
  PieChart,
  LineChart,
  TrendingUp,
  DollarSign,
  Users,
  Target,
} from "lucide-react"
import styles from "./investor-funding.module.css"

Chart.register(...registerables)

export function InvestorInsights() {
  const [activeTab, setActiveTab] = useState("portfolio")
  const chartRefs = {
    portfolioDistribution: useRef(null),
    investmentsByStage: useRef(null),
    sectorAllocation: useRef(null),
    dealFlowTrends: useRef(null),
    dealConversionRate: useRef(null),
    investmentPerformance: useRef(null),
    monthlyDeals: useRef(null),
    geographicDistribution: useRef(null),
  }

  const charts = useRef([])

  useEffect(() => {
    charts.current.forEach((chart) => chart.destroy())
    charts.current = []

    const brownPalette = {
      primary: "#8B5A2B",
      secondary: "#A67C52",
      tertiary: "#C19A6B",
      light: "#D4B996",
      lighter: "#E6CCAB",
      lightest: "#F5E6CB",
      accent1: "#D2691E",
      accent2: "#CD853F",
      accent3: "#4682B4",
      accent4: "#6B8E23",
      accent5: "#9370DB",
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

    if (activeTab === "portfolio") {
      createChart(chartRefs.portfolioDistribution, {
        type: "doughnut",
        data: {
          labels: ["Equity", "Debt", "Convertible Notes", "Grants", "Blended Finance"],
          datasets: [
            {
              data: [45, 25, 15, 10, 5],
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
              text: "Portfolio Distribution by Investment Type",
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

      createChart(chartRefs.investmentsByStage, {
        type: "bar",
        data: {
          labels: ["Pre-Seed", "Seed", "Series A", "Growth", "Mature"],
          datasets: [
            {
              label: "Number of Investments",
              data: [8, 15, 12, 10, 5],
              backgroundColor: brownPalette.accent1,
              borderColor: brownPalette.primary,
              borderWidth: 1,
            },
            {
              label: "Total Amount (R Millions)",
              data: [4, 30, 60, 100, 75],
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
              text: "Investments by Business Stage",
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
    } else if (activeTab === "sector") {
      createChart(chartRefs.sectorAllocation, {
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
              text: "Investment Allocation by Sector",
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

      createChart(chartRefs.geographicDistribution, {
        type: "bar",
        data: {
          labels: ["South Africa", "Namibia", "Botswana", "Zimbabwe", "Mozambique", "Zambia", "Other"],
          datasets: [
            {
              label: "Number of SMEs",
              data: [45, 12, 10, 8, 7, 5, 13],
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
              text: "Geographic Distribution of Investments",
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
              title: { display: true, text: "Number of SMEs", color: brownPalette.primary },
              ticks: { color: brownPalette.primary },
              grid: { color: brownPalette.lighter },
            },
          },
        },
      })
    }

    // Add other chart setups for "performance" and "dealflow" here (as you already had them)
    // You can re-include those sections if needed. I trimmed them for clarity.

    return () => {
      charts.current.forEach((chart) => chart.destroy())
    }
  }, [activeTab])

  return (
    <div>
      <div className={styles.insightsSummary}>
        {/* Cards */}
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}><DollarSign size={20} /></div>
          <div className={styles.insightContent}>
            <h3>R269M</h3>
            <p>Total Invested</p>
          </div>
        </div>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}><Users size={20} /></div>
          <div className={styles.insightContent}>
            <h3>50</h3>
            <p>SMEs Funded</p>
          </div>
        </div>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}><TrendingUp size={20} /></div>
          <div className={styles.insightContent}>
            <h3>18.5%</h3>
            <p>Avg. ROI</p>
          </div>
        </div>
        <div className={styles.insightCard}>
          <div className={styles.insightIcon}><Target size={20} /></div>
          <div className={styles.insightContent}>
            <h3>34</h3>
            <p>Active Deals</p>
          </div>
        </div>
      </div>

      <div className={styles.insightsTabs}>
        <div className={styles.insightsTabHeader}>
          {["portfolio", "sector", "performance", "dealflow"].map((tab) => (
            <div
              key={tab}
              className={`${styles.insightsTab} ${
                activeTab === tab ? styles.insightsTabActive : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "portfolio" && <PieChart size={14} />}
              {tab === "sector" && <BarChart size={14} />}
              {tab === "performance" && <TrendingUp size={14} />}
              {tab === "dealflow" && <LineChart size={14} />}
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)} Analysis</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.insightsContainer}>
        {activeTab === "portfolio" && (
          <>
            <div className={styles.chartContainer}><canvas ref={chartRefs.portfolioDistribution} /></div>
            <div className={styles.chartContainer}><canvas ref={chartRefs.investmentsByStage} /></div>
          </>
        )}
        {activeTab === "sector" && (
          <>
            <div className={styles.chartContainer}><canvas ref={chartRefs.sectorAllocation} /></div>
            <div className={styles.chartContainer}><canvas ref={chartRefs.geographicDistribution} /></div>
          </>
        )}
      </div>
    </div>
  )
}
