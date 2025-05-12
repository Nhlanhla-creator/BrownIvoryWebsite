"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import styles from "./support-programs.module.css"

Chart.register(...registerables)

export function SupportProgramInsights() {
  const chartRefs = {
    programsByType: useRef(null),
    sectorFocus: useRef(null),
    applicationStatus: useRef(null),
    supportTypes: useRef(null),
    performanceMetrics: useRef(null),
  }

  const charts = useRef([])

  useEffect(() => {
    charts.current.forEach((chart) => chart.destroy())
    charts.current = []

    const createChart = (ref, config) => {
      const ctx = ref?.current?.getContext("2d")
      if (ctx) {
        const chart = new Chart(ctx, config)
        charts.current.push(chart)
      }
    }

    createChart(chartRefs.programsByType, {
      type: "bar",
      data: {
        labels: ["Incubator", "Accelerator", "ESD", "Export Development"],
        datasets: [
          {
            label: "Number of Programs",
            data: [8, 6, 10, 4],
            backgroundColor: "#64B5F6",
            borderColor: "#1976D2",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Programs by Type",
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: { ticks: { color: "#5D4037" }, grid: { color: "#D7CCC8" } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Programs", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
        },
      },
    })

    createChart(chartRefs.sectorFocus, {
      type: "bar",
      data: {
        labels: ["ICT", "Agriculture", "Clean Energy", "Manufacturing", "Other"],
        datasets: [
          {
            label: "Number of Programs",
            data: [6, 5, 3, 4, 2],
            backgroundColor: "#9575CD",
            borderColor: "#512DA8",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Sector Focus of Programs",
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: { ticks: { color: "#5D4037" }, grid: { color: "#D7CCC8" } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Programs", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
        },
      },
    })

    createChart(chartRefs.applicationStatus, {
      type: "bar",
      data: {
        labels: ["New", "Applied", "Under Review", "Interview", "Accepted", "Rejected"],
        datasets: [
          {
            label: "Number of Applications",
            data: [6, 5, 3, 2, 1, 4],
            backgroundColor: "#81C784",
            borderColor: "#388E3C",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Application Status Pipeline",
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: { ticks: { color: "#5D4037" }, grid: { color: "#D7CCC8" } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Applications", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
        },
      },
    })

    createChart(chartRefs.supportTypes, {
      type: "bar",
      data: {
        labels: ["Mentorship", "Funding Access", "Market Access", "Technical Support", "Export Assistance"],
        datasets: [
          {
            label: "Number of Programs",
            data: [10, 8, 7, 6, 4],
            backgroundColor: "#FF8A65",
            borderColor: "#E64A19",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Support Types Offered by Program",
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: {
            beginAtZero: true,
            title: { display: true, text: "Number of Programs", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
          y: {
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
        },
      },
    })

    createChart(chartRefs.performanceMetrics, {
      type: "bar",
      data: {
        labels: [
          "New Market Interest",
          "Partnerships Formed",
          "Follow-on Funding Raised",
          "New Jobs Created",
          "Revenue Growth",
        ],
        datasets: [
          {
            label: "Impact Score / Number",
            data: [8, 12, 18, 15, 25],
            backgroundColor: "#9C27B0",
            borderColor: "#7B1FA2",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Real Program Performance Metrics",
            color: "#5D4037",
          },
          legend: { display: false },
        },
        scales: {
          x: {
            beginAtZero: true,
            title: { display: true, text: "Impact Score / Number", color: "#5D4037" },
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
          y: {
            ticks: { color: "#5D4037" },
            grid: { color: "#D7CCC8" },
          },
        },
      },
    })

    return () => charts.current.forEach((chart) => chart.destroy())
  }, [])

  return (
    <div className={styles.insightsContainer}>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.programsByType} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.sectorFocus} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.applicationStatus} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.supportTypes} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.performanceMetrics} />
      </div>
    </div>
  )
}
