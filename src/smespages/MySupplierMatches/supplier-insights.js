"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import styles from "./suppliers.module.css";

Chart.register(...registerables);

export function SupplierInsights() {
  const chartRefs = {
    suppliersByCategory: useRef(null),
    ratingVsMatchScore: useRef(null),
    engagementPipeline: useRef(null),
    performanceMetrics: useRef(null),
  };

  const charts = useRef([]);

  useEffect(() => {
    // Clean up any existing charts
    charts.current.forEach((chart) => chart.destroy());
    charts.current = [];

    // Suppliers by Category
    if (chartRefs.suppliersByCategory.current) {
      const ctx = chartRefs.suppliersByCategory.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Legal", "Accounting", "IT", "Marketing", "HR"],
            datasets: [
              {
                label: "Matched Suppliers by Category",
                data: [6, 12, 9, 5, 3],
                backgroundColor: "#5D4037",
                borderColor: "#3E2723",
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
                text: "Matched Suppliers by Category",
                color: "#5D4037",
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Suppliers",
                  color: "#5D4037",
                },
                ticks: {
                  color: "#5D4037",
                },
                grid: {
                  color: "#D7CCC8",
                },
              },
              y: {
                ticks: {
                  color: "#5D4037",
                },
                grid: {
                  color: "#D7CCC8",
                },
              },
            },
          },
        });
        charts.current.push(chart);
      }
    }

    // Rating vs Match Score
    if (chartRefs.ratingVsMatchScore.current) {
      const ctx = chartRefs.ratingVsMatchScore.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "scatter",
          data: {
            datasets: [
              {
                label: "Legal",
                data: [{ x: 4.2, y: 85 }],
                backgroundColor: "#0277BD",
              },
              {
                label: "Accounting",
                data: [{ x: 4.0, y: 82 }],
                backgroundColor: "#0097A7",
              },
              {
                label: "IT",
                data: [{ x: 4.3, y: 88 }],
                backgroundColor: "#00796B",
              },
              {
                label: "Marketing",
                data: [{ x: 3.9, y: 78 }],
                backgroundColor: "#558B2F",
              },
              {
                label: "HR",
                data: [{ x: 4.1, y: 80 }],
                backgroundColor: "#F9A825",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Average Rating vs Match Score",
                color: "#5D4037",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Average Supplier Rating",
                  color: "#5D4037",
                },
                min: 3.8,
                max: 4.5,
                ticks: {
                  color: "#5D4037",
                },
                grid: {
                  color: "#D7CCC8",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Match Score (%)",
                  color: "#5D4037",
                },
                min: 75,
                max: 90,
                ticks: {
                  color: "#5D4037",
                },
                grid: {
                  color: "#D7CCC8",
                },
              },
            },
          },
        });
        charts.current.push(chart);
      }
    }

    // Supplier Engagement Pipeline
    if (chartRefs.engagementPipeline.current) {
      const ctx = chartRefs.engagementPipeline.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["New", "Engaged", "Negotiating", "Contracted", "Completed"],
            datasets: [
              {
                label: "Number of Suppliers",
                data: [6, 4, 5, 3, 2],
                backgroundColor: [
                  "#81C784", // lighter green
                  "#66BB6A",
                  "#4CAF50",
                  "#388E3C",
                  "#2E7D32", // darker green
                ],
                borderColor: "#1B5E20",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Supplier Engagement Pipeline",
                color: "#5D4037",
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Status",
                  color: "#5D4037",
                },
                ticks: {
                  color: "#5D4037",
                },
                grid: {
                  color: "#D7CCC8",
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Suppliers",
                  color: "#5D4037",
                },
                ticks: {
                  color: "#5D4037",
                },
                grid: {
                  color: "#D7CCC8",
                },
              },
            },
          },
        });
        charts.current.push(chart);
      }
    }

    // Supplier Performance Metrics
    if (chartRefs.performanceMetrics.current) {
      const ctx = chartRefs.performanceMetrics.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["On-Time Delivery", "Quote Response Rate", "SLA Compliance", "Client Satisfaction"],
            datasets: [
              {
                label: "Performance %",
                data: [92, 85, 90, 95],
                backgroundColor: [
                  "#FFAB91", // lighter orange
                  "#FF8A65",
                  "#FF7043",
                  "#F4511E", // darker orange
                ],
                borderColor: "#BF360C",
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
                text: "Supplier Performance Metrics",
                color: "#5D4037",
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: "Performance %",
                  color: "#5D4037",
                },
                ticks: {
                  color: "#5D4037",
                },
                grid: {
                  color: "#D7CCC8",
                },
              },
              y: {
                ticks: {
                  color: "#5D4037",
                },
                grid: {
                  color: "#D7CCC8",
                },
              },
            },
          },
        });
        charts.current.push(chart);
      }
    }

    return () => {
      charts.current.forEach((chart) => chart.destroy());
    };
  }, []);

  return (
    <div className={styles.insightsContainer}>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.suppliersByCategory} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.ratingVsMatchScore} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.engagementPipeline} />
      </div>
      <div className={styles.chartContainer}>
        <canvas ref={chartRefs.performanceMetrics} />
      </div>
      <div className={styles.definitionBubble}>
        <p>Definitions same as customer</p>
      </div>
    </div>
  );
}