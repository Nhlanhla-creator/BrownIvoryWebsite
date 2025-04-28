import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const ServiceProvider = () => {
  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <h1 style={styles.title}>Service Providers</h1>
        <p style={styles.intro}>
          Connect with trusted professionals to support your business needs.
        </p>

        <div style={styles.hero}>
          <img 
            src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Professional services"
            style={styles.heroImage}
          />
          <div style={styles.heroText}>
            <h2>Quality Services for Your Business</h2>
            <p>Access vetted professionals across multiple industries</p>
          </div>
        </div>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Service Categories</h2>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h3>Legal Services</h3>
              <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Legal" />
              <p>Business law, contracts, compliance and more</p>
            </div>
            <div style={styles.card}>
              <h3>Accounting</h3>
              <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Accounting" />
              <p>Bookkeeping, tax preparation, financial planning</p>
            </div>
            <div style={styles.card}>
              <h3>Marketing</h3>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Marketing" />
              <p>Digital marketing, branding, advertising</p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Why Use Our Platform?</h2>
          <ul style={styles.benefits}>
            <li>All providers are vetted for quality and experience</li>
            <li>Competitive pricing and transparent fees</li>
            <li>Easy comparison of multiple providers</li>
            <li>Verified reviews from other SMEs</li>
            <li>Dedicated support for service coordination</li>
          </ul>
        </section>

        <section style={styles.cta}>
          <div style={styles.ctaGrid}>
            <div>
              <h2>Looking for Services?</h2>
              <button style={styles.ctaButton}>Find Providers</button>
            </div>
            <div>
              <h2>Are You a Service Provider?</h2>
              <button style={styles.ctaButton}>Join Our Network</button>
            </div>
          </div>
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
    },
    "& img": {
      width: "100%",
      height: "200px",
      objectFit: "cover"
    },
    "& h3": {
      padding: "1rem",
      color: "#754A2D"
    },
    "& p": {
      padding: "0 1rem 1rem",
      color: "#555"
    }
  },
  benefits: {
    lineHeight: "2",
    fontSize: "1.1rem",
    maxWidth: "800px",
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
  ctaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr"
    }
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

export default ServiceProvider;
