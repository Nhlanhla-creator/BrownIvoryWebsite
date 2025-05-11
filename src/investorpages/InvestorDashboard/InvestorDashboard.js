import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./InvestorDashboard.module.css";

function InvestorDashboard() {
  const [portfolioStats] = useState({
    totalInvestments: 12,
    activeDeals: 8,
    totalDeployed: 2500000,
    avgReturn: 18.5,
  });

  const [recentOpportunities] = useState([
    {
      id: 1,
      name: "Tech Innovate",
      industry: "SaaS",
      stage: "Series A",
      amount: 500000,
      description: "Cloud-based inventory management solution",
      matchScore: 92,
    },
    {
      id: 2,
      name: "GreenEnergy Solutions",
      industry: "Clean Energy",
      stage: "Seed",
      amount: 250000,
      description: "Renewable energy storage technology",
      matchScore: 87,
    },
    {
      id: 3,
      name: "HealthTech Pro",
      industry: "Healthcare",
      stage: "Pre-seed",
      amount: 100000,
      description: "AI-powered diagnostic platform",
      matchScore: 85,
    },
  ]);

  const [portfolioCompanies] = useState([
    {
      id: 1,
      name: "Fintech Solutions",
      industry: "Financial Services",
      investmentDate: "2024-01-15",
      investedAmount: 350000,
      currentValuation: 580000,
      performance: 65.7,
      updates: 2,
    },
    {
      id: 2,
      name: "EduLearn",
      industry: "Education",
      investmentDate: "2023-08-22",
      investedAmount: 200000,
      currentValuation: 310000,
      performance: 55,
      updates: 0,
    },
    {
      id: 3,
      name: "AgriTech Farms",
      industry: "Agriculture",
      investmentDate: "2023-11-10",
      investedAmount: 425000,
      currentValuation: 510000,
      performance: 20,
      updates: 3,
    },
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Quarterly Portfolio Review",
      date: "2025-05-20",
      time: "10:00 AM",
      type: "Meeting",
    },
    {
      id: 2,
      title: "Startup Pitch Day",
      date: "2025-05-25",
      time: "2:00 PM",
      type: "Event",
    },
    {
      id: 3,
      title: "Due Diligence Call: TechInnovate",
      date: "2025-05-15",
      time: "11:30 AM",
      type: "Call",
    },
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={styles.investorDashboard}>
      <h1 className={styles.dashboardTitle}>Investor Dashboard</h1>

      <div className={styles.dashboardContent}>
        <div className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Portfolio Overview</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Total Investments</h3>
              <p className={styles.statValue}>{portfolioStats.totalInvestments}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Active Deals</h3>
              <p className={styles.statValue}>{portfolioStats.activeDeals}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Total Deployed</h3>
              <p className={styles.statValue}>{formatCurrency(portfolioStats.totalDeployed)}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Avg. Portfolio Return</h3>
              <p className={styles.statValue}>{portfolioStats.avgReturn}%</p>
            </div>
          </div>
        </div>

        <div className={styles.dashboardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recommended Opportunities</h2>
            <Link to="/investor-opportunities" className={styles.viewAllLink}>View All</Link>
          </div>
          <div className={styles.opportunitiesGrid}>
            {recentOpportunities.map((opportunity) => (
              <div key={opportunity.id} className={styles.opportunityCard}>
                <div className={styles.opportunityHeader}>
                  <h3>{opportunity.name}</h3>
                  <span className={styles.matchBadge}>{opportunity.matchScore}% Match</span>
                </div>
                <div className={styles.opportunityDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Industry:</span>
                    <span className={styles.detailValue}>{opportunity.industry}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Stage:</span>
                    <span className={styles.detailValue}>{opportunity.stage}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Seeking:</span>
                    <span className={styles.detailValue}>{formatCurrency(opportunity.amount)}</span>
                  </div>
                </div>
                <p className={styles.opportunityDescription}>{opportunity.description}</p>
                <div className={styles.cardActions}>
                  <button className={styles.btnPrimary}>View Details</button>
                  <button className={styles.btnSecondary}>Save</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.dashboardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Portfolio Companies</h2>
            <Link to="/investor-portfolio" className={styles.viewAllLink}>View All</Link>
          </div>
          <div className={styles.tableResponsive}>
            <table className={styles.portfolioTable}>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Industry</th>
                  <th>Investment Date</th>
                  <th>Invested Amount</th>
                  <th>Current Value</th>
                  <th>Performance</th>
                  <th>Updates</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolioCompanies.map((company) => (
                  <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.industry}</td>
                    <td>{formatDate(company.investmentDate)}</td>
                    <td>{formatCurrency(company.investedAmount)}</td>
                    <td>{formatCurrency(company.currentValuation)}</td>
                    <td>
                      <span className={`${styles.performance} ${company.performance > 0 ? styles.positive : company.performance < 0 ? styles.negative : styles.neutral}`}>
                        {company.performance > 0 ? '+' : ''}{company.performance}%
                      </span>
                    </td>
                    <td>
                      {company.updates > 0 ? (
                        <span className={styles.updateBadge}>{company.updates}</span>
                      ) : (
                        <span className={styles.noUpdates}>-</span>
                      )}
                    </td>
                    <td>
                      <button className={styles.btnIcon} title="View Details">📊</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.dashboardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Upcoming Events</h2>
            <Link to="/investor-calendar" className={styles.viewAllLink}>View Calendar</Link>
          </div>
          <div className={styles.eventsList}>
            {upcomingEvents.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <div className={styles.eventIcon}>
                  {event.type === 'Meeting' && '📅'}
                  {event.type === 'Event' && '🎪'}
                  {event.type === 'Call' && '📞'}
                </div>
                <div className={styles.eventInfo}>
                  <h4>{event.title}</h4>
                  <p className={styles.eventTime}>{formatDate(event.date)} at {event.time}</p>
                  <span className={styles.eventType}>{event.type}</span>
                </div>
                <div className={styles.eventActions}>
                  <button className={styles.btnIcon} title="View Details">👁️</button>
                  <button className={styles.btnIcon} title="Add to Calendar">📆</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorDashboard;
