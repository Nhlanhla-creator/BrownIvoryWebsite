import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Solutions = () => {
  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <h1 style={styles.title}>Business Solutions</h1>
        <p style={styles.intro}>
          Comprehensive tools and services designed to solve your business challenges and accelerate growth.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Business solutions"
          style={styles.heroImage}
        />

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Our Solution Categories:</h2>
          <div style={styles.grid}>
            <div style={styles.gridItem}>
              <h3>Technology Solutions</h3>
              <p>Custom software, cloud services, and digital transformation tools</p>
              <img 
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Technology"
                style={styles.gridImage}
              />
            </div>
            <div style={styles.gridItem}>
              <h3>Financial Tools</h3>
              <p>Accounting software, payment solutions, and financial management</p>
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Financial"
                style={styles.gridImage}
              />
            </div>
            <div style={styles.gridItem}>
              <h3>Marketing Services</h3>
              <p>Digital marketing, branding, and customer acquisition solutions</p>
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Marketing"
                style={styles.gridImage}
              />
            </div>
            <div style={styles.gridItem}>
              <h3>Operational Efficiency</h3>
              <p>Process optimization, supply chain management, and productivity tools</p>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Operations"
                style={styles.gridImage}
              />
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>How Our Solutions Help:</h2>
          <ul style={styles.list}>
            <li><strong>Save Time:</strong> Automate repetitive tasks and streamline operations</li>
            <li><strong>Reduce Costs:</strong> Optimize resources and eliminate inefficiencies</li>
            <li><strong>Increase Revenue:</strong> Tools to help you acquire and retain customers</li>
            <li><strong>Gain Insights:</strong> Data analytics and business intelligence</li>
            <li><strong>Scale Easily:</strong> Solutions that grow with your business</li>
          </ul>
        </section>

        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Team collaboration"
          style={styles.heroImage}
        />

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Implementation Process:</h2>
          <ol style={styles.list}>
            <li>Needs assessment and solution matching</li>
            <li>Customization for your specific requirements</li>
            <li>Training and onboarding</li>
            <li>Ongoing support and optimization</li>
          </ol>
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
    gap: "1.5rem",
    marginTop: "1rem"
  },
  gridItem: {
    backgroundColor: "#F2F0E6",
    padding: "1rem",
    borderRadius: "6px",
    border: "1px solid #9E6E3C",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  gridImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "4px",
    marginTop: "0.5rem"
  }
};

export default Solutions;
