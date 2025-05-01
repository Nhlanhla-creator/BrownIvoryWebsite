import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import Footer from './Footer';

// Color palette
const colors = {
  darkBrown: '#372C27',
  mediumBrown: '#754A2D',
  lightBrown: '#9E6E3C',
  lightGray: '#D3D2CE',
  cream: '#F2F0E6',
  warmGray: '#BCAE9C',
  background: '#EFE7E0' // Lighter brown background
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Styled components
const PageWrapper = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: ${colors.darkBrown};
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(239, 231, 224, 0.8), rgba(239, 231, 224, 0.8)), 
              url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  padding: 3rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  color: ${colors.mediumBrown};
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${colors.darkBrown};
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border: 1px solid ${colors.warmGray};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  padding: 1.5rem;
  background: ${colors.cream};
  border-radius: 6px;
  border: 1px solid ${colors.warmGray};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }

  h3 {
    color: ${colors.mediumBrown};
    border-bottom: 2px solid ${colors.lightBrown};
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.2rem;
  }

  li {
    margin-bottom: 0.8rem;
    line-height: 1.5;
  }
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 2px solid ${colors.warmGray};
`;

const Tab = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? colors.mediumBrown : 'transparent'};
  color: ${props => props.active ? 'white' : colors.darkBrown};
  border: none;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? colors.lightBrown : colors.lightGray};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;

  th, td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid ${colors.lightGray};
  }

  th {
    background-color: ${colors.warmGray};
    font-weight: 600;
  }

  tr:hover {
    background-color: ${colors.lightGray};
  }
`;

const Comparison = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonColumn = styled.div`
  padding: 1.5rem;
  background: ${props => props.negative ? colors.cream : colors.warmGray};
  border-radius: 6px;

  h3 {
    color: ${props => props.negative ? colors.mediumBrown : colors.darkBrown};
    margin-bottom: 1rem;
  }

  p {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;

    span:first-child {
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }
  }
`;

const Testimonial = styled.div`
  background: ${colors.mediumBrown};
  color: white;
  padding: 2rem;
  border-radius: 8px;
  margin: 3rem 0;
  position: relative;

  &:before {
    content: '"';
    font-size: 5rem;
    color: rgba(255,255,255,0.1);
    position: absolute;
    top: 0;
    left: 1rem;
    line-height: 1;
  }

  p {
    font-style: italic;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 2;
  }

  cite {
    font-weight: 600;
    position: relative;
    z-index: 2;
  }
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 3rem 0;

  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 4px;
    background: ${colors.lightGray};
    z-index: 1;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  text-align: center;
  width: 24%;

  &:before {
    content: '${props => props.number}';
    width: 40px;
    height: 40px;
    background: ${props => props.active ? colors.mediumBrown : colors.lightGray};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    font-weight: 600;
    position: relative;
    z-index: 2;
  }

  span {
    font-weight: 600;
    color: ${colors.mediumBrown};
    margin-bottom: 0.3rem;
  }

  small {
    color: ${colors.darkBrown};
    font-size: 0.9rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const Button = styled.button`
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.primary ? `
    background: ${colors.mediumBrown};
    color: white;
    border: none;
    
    &:hover {
      background: ${colors.lightBrown};
    }
  ` : `
    background: transparent;
    color: ${colors.mediumBrown};
    border: 2px solid ${colors.mediumBrown};
    
    &:hover {
      background: ${colors.lightGray};
    }
  `}
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;

  span {
    padding: 0.5rem 1rem;
    background: ${colors.lightGray};
    border-radius: 20px;
    font-size: 0.9rem;
  }
`;

const BigScorePage = () => {
  const [activeTab, setActiveTab] = useState('funding');
  const [activeStep, setActiveStep] = useState(1);

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <Container>
          <HeroSection>
            <Title>BIG Score</Title>
            <Subtitle>
              Africa's first AI-powered trust metric that validates SMEs, social enterprises, and ESG-focused businesses as credible partners for funding, supply chains, and impact collaborations.
            </Subtitle>
          </HeroSection>

          <Section>
            <Card>
              <h2 style={{ color: colors.mediumBrown }}>Think of it as:</h2>
              <ul style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                <li>A credit score for business credibility</li>
                <li>A growth roadmap for SMEs</li>
                <li>A risk-reducer for funders and corporates</li>
              </ul>
              <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                Powered by blockchain-backed data and dynamic AI analysis, it replaces guesswork with standardized, actionable insights.
              </p>
            </Card>
          </Section>

          <Section>
            <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>Why the BIG Score Wins for Everyone</h2>
            
            <Grid>
              <BenefitCard>
                <h3>For SMEs & Social Enterprises</h3>
                <ul>
                  <li>✅ See exactly where you stand with clear scoring breakdowns</li>
                  <li>📈 Boost visibility to the right funders and customers</li>
                  <li>🔍 Get tailored "next steps" to improve your score</li>
                </ul>
              </BenefitCard>
              <BenefitCard>
                <h3>For Funders & Investors</h3>
                <ul>
                  <li>⏱️ Cut due diligence time by 70% with pre-vetted opportunities</li>
                  <li>📊 Compare apples-to-apples with standardized metrics</li>
                  <li>🤖 AI-matched recommendations aligned with your criteria</li>
                </ul>
              </BenefitCard>
              <BenefitCard>
                <h3>For Corporates</h3>
                <ul>
                  <li>🛡️ Source verified partners with compliance & ESG tracking</li>
                  <li>🌱 Meet CSI/ESD goals with impact-proven suppliers</li>
                  <li>⚡ Reduce procurement risk with real-time performance data</li>
                </ul>
              </BenefitCard>
              <BenefitCard>
                <h3>For Accelerators</h3>
                <ul>
                  <li>🎯 Identify cohort gaps and tailor support</li>
                  <li>📈 Demonstrate program ROI with score improvements</li>
                  <li>💡 Spot high-potential outliers for investor showcases</li>
                </ul>
              </BenefitCard>
            </Grid>
          </Section>

          <Section>
            <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>How It Works</h2>
            
            <Tabs>
              <Tab active={activeTab === 'funding'} onClick={() => setActiveTab('funding')}>
                BIG Score for Funding
              </Tab>
              <Tab active={activeTab === 'service'} onClick={() => setActiveTab('service')}>
                BIG Score for Customer Service
              </Tab>
            </Tabs>

            {activeTab === 'funding' ? (
              <Card>
                <h3 style={{ color: colors.mediumBrown }}>For: SMSEs seeking capital or social enterprises proving impact</h3>
                <p>The BIG Score for funding evaluates organizations based on their investment readiness, operational reliability, and ESG/impact alignment:</p>
                
                <h4 style={{ color: colors.lightBrown, marginTop: '1.5rem' }}>A. Traditional SMEs (Profit-Driven)</h4>
                <p>Weightings Focus: Financial viability, market traction, and scalability. Weightings Shift as You Grow.</p>
                
                <Table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Pre-Revenue</th>
                      <th>Scaling</th>
                      <th>Mature</th>
                      <th>Data Sources</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Compliance</td>
                      <td>15%</td>
                      <td>20%</td>
                      <td>25%</td>
                      <td>Uploaded docs + govt APIs</td>
                    </tr>
                    <tr>
                      <td>Financial Health</td>
                      <td>20%</td>
                      <td>30%</td>
                      <td>35%</td>
                      <td>Xero/QuickBooks + projections</td>
                    </tr>
                    <tr>
                      <td>Operational Strength</td>
                      <td>20%</td>
                      <td>20%</td>
                      <td>15%</td>
                      <td>Team profiles + LinkedIn</td>
                    </tr>
                    <tr>
                      <td>Pitch Quality</td>
                      <td>25%</td>
                      <td>15%</td>
                      <td>10%</td>
                      <td>ChatGPT deck analysis</td>
                    </tr>
                    <tr>
                      <td>Impact Proof</td>
                      <td>20%</td>
                      <td>15%</td>
                      <td>15%</td>
                      <td>Sector benchmarks (Briter/AfDB)</td>
                    </tr>
                  </tbody>
                </Table>

                <div style={{ margin: '1.5rem 0', padding: '1rem', background: colors.lightGray, borderRadius: '6px' }}>
                  <h5 style={{ marginBottom: '0.5rem' }}>Examples:</h5>
                  <p>1. A scaling SME with strong finances (90%) but weak compliance (60%):</p>
                  <p style={{ fontStyle: 'italic' }}>(20%*60) + (30%*90) + (20%*70) + (15%*80) + (15%*50) = 72.5/100 → "Fundable with Conditions"</p>
                  <p>2. "A scaling fintech SME with strong unit economics (85%) but no B-BBEE cert (0%) loses 5% instantly. We flag this as a quick win."</p>
                </div>

                <h4 style={{ color: colors.lightBrown, marginTop: '1.5rem' }}>B. Social Enterprises (Impact-Driven)</h4>
                <p>Weightings Focus: Impact metrics, sustainability, and community alignment. Weightings Favor Real-World Change:</p>
                
                <Table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Early-Stage</th>
                      <th>Growing</th>
                      <th>Mature</th>
                      <th>What We Measure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Impact Proof</td>
                      <td>40%</td>
                      <td>35%</td>
                      <td>30%</td>
                      <td>SDG alignment, beneficiary stories</td>
                    </tr>
                    <tr>
                      <td>Financial Sustainability</td>
                      <td>15%</td>
                      <td>25%</td>
                      <td>30%</td>
                      <td>Grant diversity, earned income %</td>
                    </tr>
                    <tr>
                      <td>Governance</td>
                      <td>20%</td>
                      <td>20%</td>
                      <td>25%</td>
                      <td>Board diversity, transparency</td>
                    </tr>
                    <tr>
                      <td>Community Roots</td>
                      <td>25%</td>
                      <td>20%</td>
                      <td>15%</td>
                      <td>Local partnerships, participatory design</td>
                    </tr>
                  </tbody>
                </Table>

                <div style={{ margin: '1.5rem 0', padding: '1rem', background: colors.lightGray, borderRadius: '6px' }}>
                  <h5 style={{ marginBottom: '0.5rem' }}>Examples:</h5>
                  <p>1. An early-stage social enterprise with high impact (90%) but low finances (50%):</p>
                  <p style={{ fontStyle: 'italic' }}>(40%*70) + (15%*50) + (20%*90) + (25%*60)= 74.5/100 → "High Impact, Needs Funding"</p>
                  <p>2. A women's coop scores 95% on Impact but 30% on Financials? We recommend capacity-building grants first</p>
                </div>
              </Card>
            ) : (
              <Card>
                <h3 style={{ color: colors.mediumBrown }}>BIG Score for Customer Service</h3>
                <p>This version of the BIG Score validates SMEs and ESG-focused organizations providing services to customers, ensuring transparency, reliability, and satisfaction.</p>
                
                <h4 style={{ color: colors.lightBrown, marginTop: '1.5rem' }}>A. Traditional SMEs (Profit-Driven)</h4>
                <p>Weightings: Service quality > compliance > operational strength.</p>
                
                <Table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Weighting</th>
                      <th>Data Sources</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Compliance</td>
                      <td>20%</td>
                      <td>Vendor management docs, Tax docs, certifications</td>
                    </tr>
                    <tr>
                      <td>Reliability</td>
                      <td>50%</td>
                      <td>SLAs, Team capacity</td>
                    </tr>
                    <tr>
                      <td>Customer Love</td>
                      <td>30%</td>
                      <td>Net Promoter Score, repeat business</td>
                    </tr>
                  </tbody>
                </Table>

                <h4 style={{ color: colors.lightBrown, marginTop: '1.5rem' }}>B. Social Enterprises (Impact Driven)</h4>
                <p>Weightings: Impact delivery > stakeholder feedback > compliance.</p>
                
                <Table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Weighting</th>
                      <th>Data Sources</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Compliance</td>
                      <td>25%</td>
                      <td>NGO registration, audits</td>
                    </tr>
                    <tr>
                      <td>Impact Proof</td>
                      <td>40%</td>
                      <td>Beneficiary testimonials, SDG reports</td>
                    </tr>
                    <tr>
                      <td>Service Quality</td>
                      <td>35%</td>
                      <td>Partner/corporate ratings</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            )}
          </Section>

          <Section>
            <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>Why the BIG Score Works</h2>
            
            <Comparison>
              <ComparisonColumn negative>
                <h3>Traditional Due Diligence</h3>
                <p><span>❌</span> Subjective opinions</p>
                <p><span>❌</span> Static PDF reports</p>
                <p><span>❌</span> Hidden criteria</p>
                <p><span>❌</span> Manual processes</p>
              </ComparisonColumn>
              <ComparisonColumn>
                <h3>BIG Score Advantage</h3>
                <p><span>✅</span> AI-driven objectivity</p>
                <p><span>✅</span> Live score tracking</p>
                <p><span>✅</span> Transparent weightings</p>
                <p><span>✅</span> Blockchain-verified data</p>
              </ComparisonColumn>
            </Comparison>
          </Section>

          <Testimonial>
            <p>"The BIG Score helped us identify 3x more investable SMEs in half the time."</p>
            <cite>— [Investor Name], [Fund]</cite>
          </Testimonial>

          <Section>
            <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>Get Your BIG Score Today, in just 3 steps</h2>
            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
              Discover your organization's BIG Score and unlock growth and impact opportunities:
            </p>
            
            <Steps>
              <Step number="1" active={activeStep >= 1} onClick={() => setActiveStep(1)}>
                <span>Onboard</span>
                <small>Share basic docs (5 min)</small>
              </Step>
              <Step number="2" active={activeStep >= 2} onClick={() => setActiveStep(2)}>
                <span>Evaluate</span>
                <small>AI reviews your profile</small>
              </Step>
              <Step number="3" active={activeStep >= 3} onClick={() => setActiveStep(3)}>
                <span>Enhance</span>
                <small>Get targeted suggestions</small>
              </Step>
              <Step number="4" active={activeStep >= 4} onClick={() => setActiveStep(4)}>
                <span>Expand</span>
                <small>Connect with partners</small>
              </Step>
            </Steps>
            
            <ButtonGroup>
              <Button primary>Get Scored Now</Button>
              <Button>See Sample Report</Button>
            </ButtonGroup>
            
            <TrustBadges>
              <span>Backed by [Partner Logos]</span>
              <span>500+ SMEs scored</span>
            </TrustBadges>
          </Section>
        </Container>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default BigScorePage;
