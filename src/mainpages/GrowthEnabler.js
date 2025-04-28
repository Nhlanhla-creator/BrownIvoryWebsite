import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const GrowthEnabler = () => {
  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <h1 style={styles.title}>Growth Enablers</h1>
        <p style={styles.intro}>
          Strategic programs and partnerships designed to accelerate your business growth and maximize impact.
        </p>

        <img 
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Business growth"
          style={styles.heroImage}
        />

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Our Growth Programs:</h2>
          <div style={styles.grid}>
            <div style={styles.gridItem}>
              <h3>Mentorship Network</h3>
              <p>Connect with experienced business leaders and industry experts</p>
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Mentorship"
                style={styles.gridImage}
              />
            </div>
            <div style={styles.gridItem}>
              <h3>Capacity Building</h3>
              <p>Training programs to enhance your team's skills and capabilities</p>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Training"
                style={styles.gridImage}
              />
            </div>
            <div style={styles.gridItem}>
              <h3>Market Access</h3>
              <p>Programs to help you reach new customers and markets</p>
              <img 
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Market access"
                style={styles.gridImage}
              />
            </div>
            <div style={styles.gridItem}>
              <h3>CSR Partnerships</h3>
              <p>Connect with corporations looking to support SMEs through CSR initiatives</p>
              <img 
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="CSR"
                style={styles.gridImage}
              />
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Benefits for SMEs:</h2>
          <ul style={styles.list}>
            <li>Access to expert knowledge and guidance</li>
            <li>Skill development for your team</li>
            <li>Networking with potential partners and customers</li>
            <li>Visibility enhancement</li>
            <li>Opportunities for funding and investment</li>
          </ul>
        </section>

        <img 
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Business strategy"
          style={styles.heroImage}
        />

        <section style={styles.section}>
          <h2 style={styles.subtitle}>For Corporations & Organizations:</h2>
          <ul style={styles.list}>
            <li><strong>CSR Implementation:</strong> Effective ways to support SME development</li>
            <li><strong>Supply Chain Development:</strong> Identify and nurture potential suppliers</li>
            <li><strong>Talent Pipeline:</strong> Connect with emerging businesses in your industry</li>
            <li><strong>Impact Measurement:</strong> Tools to track and report your social impact</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subtitle}>Success Stories</h2>
          <div style={styles.testimonials}>
            <div style={styles.testimonial}>
              <p>"The mentorship program helped us refine our business model and secure our first major client."</p>
              <p style={styles.author}>- Sarah K., Tech Startup Founder</p>
            </div>
            <div style={styles.testimonial}>
              <p>"Through the market access program, we expanded to three new countries within a year."</p>
              <p style={styles.author}>- James T., Manufacturing SME</p>
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
  },
  testimonials: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    marginTop: "1rem"
  },
  testimonial: {
    backgroundColor: "#F2F0E6",
    padding: "1rem",
    borderRadius: "6px",
    borderLeft: "4px solid #9E6E3C"
  },
  author: {
    fontWeight: "bold",
    marginTop: "0.5rem",
    color: "#754A2D"
  }
};

export default GrowthEnabler;
