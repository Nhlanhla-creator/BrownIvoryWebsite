"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import styles from "./funding.module.css"

Chart.register(...registerables)

export function FundingInsights() {
  const chartRefs = {
    fundingAskBreakdown: useRef(null),
    fundingTypeBreakdown: useRef(null),
    topMatchedSectors: useRef(null),
    targetGrowthStages: useRef(null),
    funderResponseTime: useRef(null),
  }

  const charts = useRef([])

  useEffect(() => {
    // Clean up any existing charts
    charts.current.forEach((chart) => chart.destroy())
    charts.current = []

    // Brown color palette
    const brownPalette = {
      primary: "#795548",
      secondary: "#8D6E63",
      tertiary: "#A1887F",
      light: "#BCAAA4",
      lighter: "#D7CCC8",
      lightest: "#EFEBE9",
      accent1: "#FF8A65", // Orange-brown
      accent2: "#FFB74D", // Light orange
      accent3: "#4FC3F7", // Blue
      accent4: "#81C784", // Green
      accent5: "#9575CD", // Purple
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

    createChart(chartRefs.fundingAskBreakdown, {
      type: "bar",
      data: {
        labels: ["Business Development", "Acquisition", "Setup", "Working Capital", "Capex"],
        datasets: [{
          label: "Number of Requests",
          data: [12, 12, 8, 20, 30],
          backgroundColor: brownPalette.accent1,
          borderColor: brownPalette.primary,
          borderWidth: 1,
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Funding Ask Breakdown by Use",
            color: brownPalette.primary,
            font: {
              weight: "bold"
            }
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
      }
    })

    createChart(chartRefs.fundingTypeBreakdown, {
      type: "doughnut",
      data: {
        labels: ["Equity", "Debt", "Grant", "Convertible", "Blended"],
        datasets: [{
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
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Funding Type Breakdown",
            color: brownPalette.primary,
            font: {
              weight: "bold"
            }
          },
          legend: {
            position: "right",
            labels: { color: brownPalette.primary },
          },
        },
      },
    })

    createChart(chartRefs.topMatchedSectors, {
      type: "bar",
      data: {
        labels: ["ICT", "Agritech", "Clean Energy", "Manufacturing", "Retail"],
        datasets: [{
          label: "Number of Matches",
          data: [18, 15, 12, 10, 8],
          backgroundColor: brownPalette.accent3,
          borderColor: brownPalette.primary,
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Top 5 Matched Sectors",
            color: brownPalette.primary,
            font: {
              weight: "bold"
            }
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

    createChart(chartRefs.targetGrowthStages, {
      type: "bar",
      data: {
        labels: ["Seed", "Growth", "Pre-seed", "Series A", "Expansion"],
        datasets: [{
          label: "Number of Funders",
          data: [25, 22, 15, 10, 5],
          backgroundColor: brownPalette.accent4,
          borderColor: brownPalette.primary,
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Target Growth Stages",
            color: brownPalette.primary,
            font: {
              weight: "bold"
            }
          },
          legend: { display: false },
        },
        scales: {
          x: { ticks: { color: brownPalette.primary }, grid: { color: brownPalette.lighter } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Funders", color: brownPalette.primary },
            ticks: { color: brownPalette.primary },
            grid: { color: brownPalette.lighter },
          },
        },
      },
    })

    createChart(chartRefs.funderResponseTime, {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"],
        datasets: [{
          label: "Number of Funders",
          data: [2, 3, 3, 3, 3, 3, 3, 3, 1, 2],
          backgroundColor: brownPalette.accent5,
          borderColor: brownPalette.primary,
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Funder Response Time Distribution",
            color: brownPalette.primary,
            font: {
              weight: "bold"
            }
          },
          legend: { display: false },
        },
        scales: {
          x: {
            title: { display: true, text: "Response Time (Days)", color: brownPalette.primary },
            ticks: { color: brownPalette.primary },
            grid: { color: brownPalette.lighter },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Funders", color: brownPalette.primary },
            ticks: { color: brownPalette.primary },
            grid: { color: brownPalette.lighter },
          },
        },
      },
    })

    return () => {
      charts.current.forEach((chart) => chart.destroy())
    }
  }, [])

  return (
    <div className={styles.insightsContainer}>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.fundingAskBreakdown} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.fundingTypeBreakdown} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.topMatchedSectors} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.targetGrowthStages} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.funderResponseTime} />
      </div>
    </div>
  )
}
