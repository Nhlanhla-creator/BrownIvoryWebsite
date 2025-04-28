import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Investors = () => {
  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <h1 style={styles.title}>Investor Opportunities</h1>
        <p style={styles.intro}>
          Discover high-potential SMEs seeking investment and grow your portfolio with vetted business opportunities.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Investor analyzing data"
          style={styles.heroImage}
        />

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Why Invest in SMEs?</h2>
          <ul style={styles.list}>
            <li><strong>High Growth Potential:</strong> Early-stage opportunities with significant upside</li>
            <li><strong>Diversification:</strong> Spread risk across multiple sectors and businesses</li>
            <li><strong>Tax Benefits:</strong> Many regions offer incentives for SME investments</li>
            <li><strong>Direct Impact:</strong> See your capital drive real business growth</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Our Investment Process:</h2>
          <ol style={styles.list}>
            <li>Complete investor profile and preferences</li>
            <li>Access our curated pipeline of investment-ready SMEs</li>
            <li>Review detailed business profiles and financials</li>
            <li>Connect directly with entrepreneurs</li>
            <li>Complete due diligence with our support</li>
            <li>Finalize investment terms</li>
          </ol>
        </section>

        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Investment chart"
          style={styles.heroImage}
        />

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Investment Sectors:</h2>
          <div style={styles.grid}>
            <div style={styles.gridItem}>
              <h3>Technology</h3>
              <p>Innovative startups in software, hardware, and digital services</p>
            </div>
            <div style={styles.gridItem}>
              <h3>Renewable Energy</h3>
              <p>Clean energy solutions and sustainable technologies</p>
            </div>
            <div style={styles.gridItem}>
              <h3>Agriculture</h3>
              <p>Agri-tech and food production innovations</p>
            </div>
            <div style={styles.gridItem}>
              <h3>Healthcare</h3>
              <p>Medical devices, health tech, and pharmaceutical solutions</p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Investor Benefits:</h2>
          <ul style={styles.list}>
            <li>Access to pre-vetted, investment-ready SMEs</li>
            <li>Detailed due diligence reports</li>
            <li>Deal structuring support</li>
            <li>Ongoing portfolio monitoring</li>
            <li>Exclusive investor events and networking</li>
          </ul>
        </section>

      </main>

      <Footer />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#F2F0E6",
    color: "#372C27",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%"
  },
  title: {
    color: "#754A2D",
    fontSize: "2.5rem",
    marginBottom: "1rem",
    textAlign: "center"
  },
  intro: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    textAlign: "center"
  },
  section: {
    backgroundColor: "#D3D2CE",
    padding: "1.5rem",
    borderRadius: "8px",
    marginTop: "2rem",
  },
  subtitle: {
    color: "#9E6E3C",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  list: {
    marginLeft: "1.5rem",
    lineHeight: "1.8",
    fontSize: "1rem",
  },
  heroImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    margin: "2rem 0",
    maxHeight: "500px",
    objectFit: "cover"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
    marginTop: "1rem"
  },
  gridItem: {
    backgroundColor: "#F2F0E6",
    padding: "1rem",
    borderRadius: "6px",
    border: "1px solid #9E6E3C"
  }
};

export default Investors;
