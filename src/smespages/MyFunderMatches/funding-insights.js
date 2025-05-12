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
          backgroundColor: "#FF8A65",
          borderColor: "#E64A19",
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
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: {
            beginAtZero: true,
            title: { display: true, text: "Number of Requests", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
          y: {
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
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
          backgroundColor: ["#FFB74D", "#FFA726", "#FF9800", "#FB8C00", "#F57C00"],
          borderColor: "#E65100",
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Funding Type Breakdown",
            color: "#5D4037",
          },
          legend: {
            position: "right",
            labels: { color: "#5D4037" },
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
          backgroundColor: "#4FC3F7",
          borderColor: "#0288D1",
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Top 5 Matched Sectors",
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: { ticks: { color: "#5D4037" }, grid: { color: "#D7CCC8" } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Matches", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
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
          backgroundColor: "#81C784",
          borderColor: "#388E3C",
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Target Growth Stages",
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: { ticks: { color: "#5D4037" }, grid: { color: "#D7CCC8" } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Funders", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
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
          backgroundColor: "#9575CD",
          borderColor: "#512DA8",
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Funder Response Time Distribution",
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: {
            title: { display: true, text: "Response Time (Days)", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Funders", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
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
