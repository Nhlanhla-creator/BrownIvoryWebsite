import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const BIGScorePage = () => {
  const [activeTab, setActiveTab] = useState('funding');

  return (
    <div style={{ 
      backgroundImage: 'url("https://i.pinimg.com/736x/ba/37/08/ba37083994c5f3794787b9889f8538c4.jpg")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#372C27'
    }}>
      <div style={{
        backgroundColor: 'rgba(242, 240, 230, 0.92)',
        minHeight: '100vh'
      }}>
        <Header />
        
        {/* Hero Banner */}
        <div style={{
          background: 'linear-gradient(rgba(55, 44, 39, 0.8), rgba(55, 44, 39, 0.8)), url("https://static.vecteezy.com/system/resources/thumbnails/029/344/318/small_2x/ai-generative-american-business-male-people-shaking-hands-skyscrapers-in-the-background-free-photo.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '120px 20px',
          textAlign: 'center',
          color: '#F2F0E6',
          marginBottom: '60px'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '20px',
            letterSpacing: '1px'
          }}>BIG Score</h1>
          <p style={{
            fontSize: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>Africa's first AI-powered trust metric for credible business partnerships</p>
          <button style={{
            backgroundColor: '#9E6E3C',
            color: 'white',
            border: 'none',
            padding: '16px 50px',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: '#754A2D',
              transform: 'translateY(-3px)'
            }
          }}>Calculate Your BIG Score</button>
        </div>
        
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px 60px'
        }}>
          {/* What is BIG Score Section */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            marginBottom: '60px',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              color: '#754A2D', 
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '25px'
            }}>
              What is the BIG Score?
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto 30px'
            }}>
              The BIG Score is Africa's first AI-powered trust metric that validates SMEs, social enterprises, and ESG-focused businesses as credible partners for funding, supply chains, and impact collaborations.
            </p>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap',
              marginBottom: '30px'
            }}>
              {[
                "A credit score for business credibility",
                "A growth roadmap for SMEs",
                "A risk-reducer for funders and corporates"
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#F2F0E6',
                  padding: '25px',
                  borderRadius: '8px',
                  width: '280px',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '250px'
                }}>
                  <p style={{
                    fontWeight: '600',
                    color: '#372C27'
                  }}>{item}</p>
                </div>
              ))}
            </div>
            
            <p style={{ 
              fontStyle: 'italic',
              color: '#754A2D',
              fontWeight: '500'
            }}>
              Powered by blockchain-backed data and dynamic AI analysis, it replaces guesswork with standardized, actionable insights.
            </p>
          </div>

          {/* Why BIG Score Wins Section */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            marginBottom: '60px'
          }}>
            <h2 style={{ 
              color: '#372C27', 
              fontSize: '2rem',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '50px'
            }}>
              Why the BIG Score Wins for Everyone
            </h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }}>
              {/* Column 1 */}
              <div style={{ 
                backgroundColor: '#F2F0E6',
                padding: '30px',
                borderRadius: '8px',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '20px',
                  color: '#754A2D'
                }}>For SMEs & Social Enterprises</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  flex: '1'
                }}>
                  <li style={{ marginBottom: '15px' }}>✅ See exactly where you stand with clear scoring breakdowns</li>
                  <li style={{ marginBottom: '15px' }}>📈 Boost visibility to the right funders and customers</li>
                  <li>🔍 Get tailored "next steps" to improve your score</li>
                </ul>
              </div>
              
              {/* Column 2 */}
              <div style={{ 
                backgroundColor: '#D3D2CE',
                padding: '30px',
                borderRadius: '8px',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '20px',
                  color: '#372C27'
                }}>For Funders & Investors</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  flex: '1'
                }}>
                  <li style={{ marginBottom: '15px' }}>⏱️ Cut due diligence time by 70% with pre-vetted opportunities</li>
                  <li style={{ marginBottom: '15px' }}>📊 Compare apples-to-apples with standardized metrics</li>
                  <li>🤖 AI-matched recommendations aligned with your criteria</li>
                </ul>
              </div>
              
              {/* Column 3 */}
              <div style={{ 
                backgroundColor: '#9E6E3C',
                padding: '30px',
                borderRadius: '8px',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                color: '#F2F0E6'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>For Corporates</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  flex: '1'
                }}>
                  <li style={{ marginBottom: '15px' }}>🛡️ Source verified partners with compliance & ESG tracking</li>
                  <li style={{ marginBottom: '15px' }}>🌱 Meet CSI/ESD goals with impact-proven suppliers</li>
                  <li>⚡ Reduce procurement risk with real-time performance data</li>
                </ul>
              </div>
              
              {/* Column 4 */}
              <div style={{ 
                backgroundColor: '#754A2D',
                padding: '30px',
                borderRadius: '8px',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                color: '#F2F0E6'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '20px'
                }}>For Accelerators</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  flex: '1'
                }}>
                  <li style={{ marginBottom: '15px' }}>🎯 Identify cohort gaps and tailor support</li>
                  <li style={{ marginBottom: '15px' }}>📈 Demonstrate program ROI with score improvements</li>
                  <li>💡 Spot high-potential outliers for investor showcases</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            marginBottom: '60px'
          }}>
            <h2 style={{ 
              color: '#372C27', 
              fontSize: '2rem',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              How It Works
            </h2>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '40px'
            }}>
              <button 
                onClick={() => setActiveTab('funding')}
                style={{ 
                  backgroundColor: activeTab === 'funding' ? '#9E6E3C' : '#D3D2CE',
                  color: activeTab === 'funding' ? 'white' : '#372C27',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                BIG Score for Funding
              </button>
              <button 
                onClick={() => setActiveTab('service')}
                style={{ 
                  backgroundColor: activeTab === 'service' ? '#9E6E3C' : '#D3D2CE',
                  color: activeTab === 'service' ? 'white' : '#372C27',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                BIG Score for Customer Service
              </button>
            </div>
            
            {activeTab === 'funding' ? (
              <div>
                <h3 style={{ 
                  color: '#754A2D', 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>BIG Score for Funding</h3>
                <p style={{ 
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  marginBottom: '30px'
                }}>
                  For: SMSEs seeking capital or social enterprises proving impact. The BIG Score for funding evaluates organizations based on their investment readiness, operational reliability, and ESG/impact alignment.
                </p>
                
                <h4 style={{ 
                  color: '#9E6E3C',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>A. Traditional SMEs (Profit-Driven)</h4>
                <p style={{ 
                  fontStyle: 'italic',
                  color: '#754A2D',
                  marginBottom: '20px'
                }}>
                  Weightings Focus: Financial viability, market traction, and scalability. Weightings Shift as You Grow.
                </p>
                
                <div style={{ 
                  overflowX: 'auto',
                  marginBottom: '40px'
                }}>
                  <table style={{ 
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr style={{ 
                        backgroundColor: '#9E6E3C',
                        color: 'white'
                      }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Pre-Revenue</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Scaling</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Mature</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Data Sources</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Compliance</td>
                        <td style={{ padding: '12px' }}>15%</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>25%</td>
                        <td style={{ padding: '12px' }}>Uploaded docs + govt APIs</td>
                      </tr>
                      <tr style={{ backgroundColor: '#D3D2CE' }}>
                        <td style={{ padding: '12px' }}>Financial Health</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>30%</td>
                        <td style={{ padding: '12px' }}>35%</td>
                        <td style={{ padding: '12px' }}>Xero/QuickBooks + projections</td>
                      </tr>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Operational Strength</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>15%</td>
                        <td style={{ padding: '12px' }}>Team profiles + LinkedIn</td>
                      </tr>
                      <tr style={{ backgroundColor: '#D3D2CE' }}>
                        <td style={{ padding: '12px' }}>Pitch Quality</td>
                        <td style={{ padding: '12px' }}>25%</td>
                        <td style={{ padding: '12px' }}>15%</td>
                        <td style={{ padding: '12px' }}>10%</td>
                        <td style={{ padding: '12px' }}>ChatGPT deck analysis</td>
                      </tr>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Impact Proof</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>15%</td>
                        <td style={{ padding: '12px' }}>15%</td>
                        <td style={{ padding: '12px' }}>Sector benchmarks (Briter/AfDB)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h4 style={{ 
                  color: '#9E6E3C',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>B. Social Enterprises (Impact-Driven)</h4>
                <p style={{ 
                  fontStyle: 'italic',
                  color: '#754A2D',
                  marginBottom: '20px'
                }}>
                  Weightings Focus: Impact metrics, sustainability, and community alignment. Weightings Favor Real-World Change:
                </p>
                
                <div style={{ 
                  overflowX: 'auto',
                  marginBottom: '40px'
                }}>
                  <table style={{ 
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr style={{ 
                        backgroundColor: '#9E6E3C',
                        color: 'white'
                      }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Early-Stage</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Growing</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Mature</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>What We Measure</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Impact Proof</td>
                        <td style={{ padding: '12px' }}>40%</td>
                        <td style={{ padding: '12px' }}>35%</td>
                        <td style={{ padding: '12px' }}>30%</td>
                        <td style={{ padding: '12px' }}>SDG alignment, beneficiary stories</td>
                      </tr>
                      <tr style={{ backgroundColor: '#D3D2CE' }}>
                        <td style={{ padding: '12px' }}>Financial Sustainability</td>
                        <td style={{ padding: '12px' }}>15%</td>
                        <td style={{ padding: '12px' }}>25%</td>
                        <td style={{ padding: '12px' }}>30%</td>
                        <td style={{ padding: '12px' }}>Grant diversity, earned income %</td>
                      </tr>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Governance</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>25%</td>
                        <td style={{ padding: '12px' }}>Board diversity, transparency</td>
                      </tr>
                      <tr style={{ backgroundColor: '#D3D2CE' }}>
                        <td style={{ padding: '12px' }}>Community Roots</td>
                        <td style={{ padding: '12px' }}>25%</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>15%</td>
                        <td style={{ padding: '12px' }}>Local partnerships, participatory design</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ 
                  color: '#754A2D', 
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>BIG Score for Customer Service</h3>
                <p style={{ 
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  marginBottom: '30px'
                }}>
                  This version of the BIG Score validates SMEs and ESG-focused organizations providing services to customers, ensuring transparency, reliability, and satisfaction.
                </p>
                
                <h4 style={{ 
                  color: '#9E6E3C',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>A. Traditional SMEs (Profit-Driven)</h4>
                <p style={{ 
                  fontStyle: 'italic',
                  color: '#754A2D',
                  marginBottom: '20px'
                }}>
                  Weightings: Service quality > compliance > operational strength.
                </p>
                
                <div style={{ 
                  overflowX: 'auto',
                  marginBottom: '40px'
                }}>
                  <table style={{ 
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr style={{ 
                        backgroundColor: '#9E6E3C',
                        color: 'white'
                      }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Weighting</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Data Sources</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Compliance</td>
                        <td style={{ padding: '12px' }}>SME legitimacy, legal compliance, licensing</td>
                        <td style={{ padding: '12px' }}>20%</td>
                        <td style={{ padding: '12px' }}>Vendor management docs, Tax docs, certifications</td>
                      </tr>
                      <tr style={{ backgroundColor: '#D3D2CE' }}>
                        <td style={{ padding: '12px' }}>Reliability</td>
                        <td style={{ padding: '12px' }}>Financial and operational strength/health</td>
                        <td style={{ padding: '12px' }}>50%</td>
                        <td style={{ padding: '12px' }}>SLAs, Team capacity</td>
                      </tr>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Customer Love</td>
                        <td style={{ padding: '12px' }}>Real-time ratings and reviews from actual customers</td>
                        <td style={{ padding: '12px' }}>30%</td>
                        <td style={{ padding: '12px' }}>Net Promoter Score, repeat business</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h4 style={{ 
                  color: '#9E6E3C',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>B. Social Enterprises (Impact Driven)</h4>
                <p style={{ 
                  fontStyle: 'italic',
                  color: '#754A2D',
                  marginBottom: '20px'
                }}>
                  Weightings: Impact delivery > stakeholder feedback > compliance.
                </p>
                
                <div style={{ 
                  overflowX: 'auto',
                  marginBottom: '40px'
                }}>
                  <table style={{ 
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr style={{ 
                        backgroundColor: '#9E6E3C',
                        color: 'white'
                      }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Weighting</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Data Sources</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Compliance</td>
                        <td style={{ padding: '12px' }}>NGO legitimacy, legal compliance, licensing</td>
                        <td style={{ padding: '12px' }}>25%</td>
                        <td style={{ padding: '12px' }}>NGO registration, audits</td>
                      </tr>
                      <tr style={{ backgroundColor: '#D3D2CE' }}>
                        <td style={{ padding: '12px' }}>Impact Proof</td>
                        <td style={{ padding: '12px' }}>Environmental and social responsibility practices, ESG compliance</td>
                        <td style={{ padding: '12px' }}>40%</td>
                        <td style={{ padding: '12px' }}>Beneficiary testimonials, SDG reports</td>
                      </tr>
                      <tr style={{ backgroundColor: '#F2F0E6' }}>
                        <td style={{ padding: '12px' }}>Service Quality</td>
                        <td style={{ padding: '12px' }}>Reliability, consistency in service delivery, operational efficiency - Real-time ratings and reviews from actual customers</td>
                        <td style={{ padding: '12px' }}>35%</td>
                        <td style={{ padding: '12px' }}>Partner/corporate ratings</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Why BIG Score Works Section */}
          <div style={{ 
            backgroundColor: 'white',
            padding: '50px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            marginBottom: '60px'
          }}>
            <h2 style={{ 
              color: '#372C27', 
              fontSize: '2rem',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              Why the BIG Score Works
            </h2>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}>
              <div style={{ 
                backgroundColor: '#F2F0E6',
                padding: '30px',
                borderRadius: '8px',
                width: '450px'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '25px',
                  color: '#754A2D'
                }}>Traditional Due Diligence</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{ marginBottom: '20px' }}>❌ Subjective opinions</li>
                  <li style={{ marginBottom: '20px' }}>❌ Static PDF reports</li>
                  <li style={{ marginBottom: '20px' }}>❌ Hidden criteria</li>
                  <li>❌ Manual processes</li>
                </ul>
              </div>
              
              <div style={{ 
                backgroundColor: '#9E6E3C',
                padding: '30px',
                borderRadius: '8px',
                width: '450px',
                color: '#F2F0E6'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '25px'
                }}>BIG Score Advantage</h3>
                <ul style={{ 
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{ marginBottom: '20px' }}>✅ AI-driven objectivity</li>
                  <li style={{ marginBottom: '20px' }}>✅ Live score tracking</li>
                  <li style={{ marginBottom: '20px' }}>✅ Transparent weightings</li>
                  <li>✅ Blockchain-verified data</li>
                </ul>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: '#D3D2CE',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <p style={{ 
                fontStyle: 'italic',
                fontSize: '1.2rem',
                lineHeight: '1.8',
                marginBottom: '15px'
              }}>
                "The BIG Score helped us identify 3x more investable SMEs in half the time."
              </p>
              <p style={{ 
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>— [Investor Name], [Fund]</p>
            </div>
          </div>

          {/* Get Your BIG Score Section */}
          <div style={{ 
            backgroundColor: '#754A2D',
            padding: '60px 40px',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#F2F0E6'
          }}>
            <h2 style={{ 
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '20px'
            }}>Get Your BIG Score Today</h2>
            <p style={{ 
              fontSize: '1.2rem',
              maxWidth: '800px',
              margin: '0 auto 40px',
              lineHeight: '1.6'
            }}>
              Discover your organization's BIG Score and unlock growth and impact opportunities:
            </p>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              marginBottom: '50px',
              flexWrap: 'wrap'
            }}>
              {[
                { number: 1, title: "Onboard", desc: "Share basic docs (5 min)" },
                { number: 2, title: "Evaluate", desc: "AI reviews your profile and gives you a score" },
                { number: 3, title: "Enhance", desc: "Get targeted improvement suggestions" },
                { number: 4, title: "Expand", desc: "Connect confidently with investors, corporates, and customers" }
              ].map((step, index) => (
                <div key={index} style={{
                  width: '220px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#F2F0E6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px',
                    color: '#754A2D',
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                  }}>{step.number}</div>
                  <h3 style={{ 
                    fontWeight: '600',
                    fontSize: '1.2rem',
                    marginBottom: '10px'
                  }}>{step.title}</h3>
                  <p style={{ 
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}>{step.desc}</p>
                </div>
              ))}
            </div>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}>
              <button style={{ 
                backgroundColor: '#372C27',
                color: 'white',
                border: 'none',
                padding: '16px 40px',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Get Scored Now
              </button>
              <button style={{ 
                backgroundColor: '#F2F0E6',
                color: '#372C27',
                border: 'none',
                padding: '16px 40px',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                See Sample Report
              </button>
            </div>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap'
            }}>
              <p style={{ 
                fontStyle: 'italic',
                fontSize: '1.1rem'
              }}>"Backed by [Partner Logos]"</p>
              <p style={{ 
                fontStyle: 'italic',
                fontSize: '1.1rem'
              }}>"500+ SMEs scored"</p>
            </div>a
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default BIGScorePage;