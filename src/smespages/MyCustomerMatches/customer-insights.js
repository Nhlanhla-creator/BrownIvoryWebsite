"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import styles from "./customers.module.css"

Chart.register(...registerables)

export function CustomerInsights() {
  const chartRefs = {
    requestedServices: useRef(null),
    matchScore: useRef(null),
    serviceDelivery: useRef(null),
    responseTime: useRef(null),
    dealSize: useRef(null),
    satisfaction: useRef(null),
  }

  const charts = useRef([])

  useEffect(() => {
    // Clean up any existing charts
    charts.current.forEach((chart) => chart.destroy())
    charts.current = []

    // Helper function to create a chart
    const createChart = (ref, config) => {
      const ctx = ref.current?.getContext("2d")
      if (ctx) {
        const chart = new Chart(ctx, config)
        charts.current.push(chart)
      }
    }

    // Requested Services Bar Chart
    createChart(chartRefs.requestedServices, {
      type: "bar",
      data: {
        labels: ["Accounting", "Legal", "Marketing", "IT", "HR"],
        datasets: [
          {
            label: "Top Requested Service Categories",
            data: [65, 45, 80, 35, 20],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Top Requested Service Categories",
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    // Match Score Distribution
    createChart(chartRefs.matchScore, {
      type: "bar",
      data: {
        labels: ["50-60%", "60-70%", "70-80%", "80-90%", "90-100%"],
        datasets: [
          {
            label: "Match Score Distribution",
            data: [10, 25, 35, 40, 20],
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Match Score Distribution",
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    // Service Delivery Category
    createChart(chartRefs.serviceDelivery, {
      type: "bar",
      data: {
        labels: ["On Time", "Delayed", "Early", "Cancelled"],
        datasets: [
          {
            label: "Service Delivery Category",
            data: [45, 15, 25, 5],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Service Delivery Category",
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    // Average Response Time
    createChart(chartRefs.responseTime, {
      type: "bar",
      data: {
        labels: ["Immediate", "< 1 day", "1-2 days", "3-5 days", "> 5 days"],
        datasets: [
          {
            label: "Average Response Time (Days)",
            data: [5, 25, 40, 15, 5],
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Average Response Time (Days)",
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    // Deal Size
    createChart(chartRefs.dealSize, {
      type: "bar",
      data: {
        labels: ["<$10K", "$10K-$50K", "$50K-$100K", ">$100K"],
        datasets: [
          {
            label: "Average Deal Size",
            data: [15, 30, 40, 25],
            backgroundColor: "rgba(75, 192, 92, 0.5)",
            borderColor: "rgba(75, 192, 92, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Average Deal Size",
          },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    })

    // Customer Satisfaction (Pie Chart)
    createChart(chartRefs.satisfaction, {
      type: "pie",
      data: {
        labels: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
        datasets: [
          {
            label: "Customer Satisfaction",
            data: [55, 25, 15, 5],
            backgroundColor: [
              "rgba(75, 192, 92, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(255, 99, 132, 0.5)",
            ],
            borderColor: [
              "rgba(75, 192, 92, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Customer Satisfaction",
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
        <canvas ref={chartRefs.requestedServices} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.matchScore} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.serviceDelivery} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.responseTime} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.dealSize} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.satisfaction} />
      </div>
      <div className={styles.definitionBubble}>
        <p className="text-sm font-bold">Additional Charts:</p>
        <p className="text-xs">Ave Deal size, Customer Satisfaction</p>
      </div>
    </div>
  )
}
