import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const SMEFunding = () => {
  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <h1 style={styles.title}>SME Funding Solutions</h1>
        <p style={styles.intro}>
          Access the capital you need to start, grow, and scale your business through our network of funding partners.
        </p>

        <div style={styles.hero}>
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Business funding"
            style={styles.heroImage}
          />
          <div style={styles.heroText}>
            <h2>Funding Opportunities for SMEs</h2>
            <p>We connect small and medium enterprises with the right financial solutions</p>
          </div>
        </div>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Funding Options Available</h2>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h3>Business Loans</h3>
              <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Loans" />
              <p>Flexible loan products with competitive rates</p>
            </div>
            <div style={styles.card}>
              <h3>Investor Funding</h3>
              <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Investors" />
              <p>Connect with angel investors and venture capital</p>
            </div>
            <div style={styles.card}>
              <h3>Government Grants</h3>
              <img src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Grants" />
              <p>Access non-repayable funding opportunities</p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>How It Works</h2>
          <ol style={styles.steps}>
            <li>Complete our SME profile questionnaire</li>
            <li>Get matched with suitable funding options</li>
            <li>Prepare your application with our guidance</li>
            <li>Submit to potential funders</li>
            <li>Receive funding and grow your business</li>
          </ol>
        </section>

        <section style={styles.cta}>
          <h2>Ready to find funding for your business?</h2>
          <button style={styles.ctaButton}>Apply Now</button>
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
    fontFamily: "'Montserrat', sans-serif",
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
    textAlign: "center",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  hero: {
    position: "relative",
    margin: "2rem 0",
    borderRadius: "10px",
    overflow: "hidden"
  },
  heroImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover"
  },
  heroText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(55, 44, 39, 0.7)",
    color: "white",
    padding: "2rem",
    textAlign: "center"
  },
  section: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    margin: "2rem 0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  subtitle: {
    color: "#9E6E3C",
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    textAlign: "center"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem"
  },
  card: {
    backgroundColor: "#F8F8F8",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "translateY(-5px)"
    }
  },
  steps: {
    lineHeight: "2",
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto",
    paddingLeft: "1.5rem"
  },
  cta: {
    textAlign: "center",
    margin: "3rem 0",
    padding: "2rem",
    backgroundColor: "#754A2D",
    color: "white",
    borderRadius: "10px"
  },
  ctaButton: {
    backgroundColor: "#9E6E3C",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "#B58A6A"
    }
  }
};

export default SMEFunding;
