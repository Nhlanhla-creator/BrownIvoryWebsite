import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const PurposePartner = () => {
  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <h1 style={styles.title}>Purpose Partners</h1>
        <p style={styles.intro}>
          Connecting businesses with social impact initiatives to create meaningful change.
        </p>

        <div style={styles.hero}>
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Community partnership"
            style={styles.heroImage}
          />
          <div style={styles.heroText}>
            <h2>Align Your Business with Social Good</h2>
            <p>Partner with NGOs and community organizations that share your values</p>
          </div>
        </div>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Partnership Opportunities</h2>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h3>CSR Programs</h3>
              <img src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="CSR" />
              <p>Develop impactful corporate social responsibility initiatives</p>
            </div>
            <div style={styles.card}>
              <h3>Community Projects</h3>
              <img src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Community" />
              <p>Support local development projects in your area</p>
            </div>
            <div style={styles.card}>
              <h3>Employee Volunteering</h3>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Volunteering" />
              <p>Engage your team in meaningful volunteer work</p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Benefits of Partnership</h2>
          <ul style={styles.benefits}>
            <li>Enhance your brand reputation and community standing</li>
            <li>Boost employee morale and engagement</li>
            <li>Create measurable social impact</li>
            <li>Network with like-minded organizations</li>
            <li>Potential tax benefits for qualifying initiatives</li>
          </ul>
        </section>

        <section style={styles.cta}>
          <h2>Ready to make a difference?</h2>
          <button style={styles.ctaButton}>Become a Purpose Partner</button>
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

export default PurposePartner;
