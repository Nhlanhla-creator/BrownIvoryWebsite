import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  MdLightbulbOutline as EmojiObjects,
  MdAttachMoney as MonetizationOn,
  MdHandshake as Handshake,
  MdAssessment as Assessment,
  MdCompare as Compare,
  MdFormatQuote as FormatQuote,
  MdTimeline as Timeline,
  MdCheckCircle as CheckCircle,
  MdCancel as Cancel,
  MdGroupWork as GroupWork,
  MdDescription as Description,
  MdVerifiedUser as VerifiedUser,
  MdTrendingUp as TrendingUp,
  MdBarChart as BarChart,
  MdPeople as People,
  MdBusiness as Business,
  MdAccountBalance as AccountBalance,
  MdAssignment as Assignment,
  MdGavel as Gavel,
  MdEqualizer as Equalizer,
  MdThumbUp as ThumbUp,
  MdThumbDown as ThumbDown,
  MdArrowForward as ArrowForward
} from 'react-icons/md';
import Header from './Header';
import Footer from './Footer';

// Darker color palette
const colors = {
  darkBrown: '#2a211d',
  mediumBrown: '#5a3a25',
  lightBrown: '#8a5b36',
  cream: '#e8e2d6',
  warmGray: '#a89e8c',
  background: '#e0d8d0'
};

// Styled components
const PageWrapper = styled.div`
  background: ${colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  flex: 1;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(42, 33, 29, 0.85), rgba(42, 33, 29, 0.85)), 
              url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  padding: 4rem 2rem;
  border-radius: 8px;
  text-align: center;
  color: white;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const BenefitsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
  margin: 1rem 0;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.mediumBrown};
    border-radius: 3px;
  }
`;

const BenefitCard = styled.div`
  min-width: 280px;
  padding: 1.5rem;
  background: ${colors.cream};
  border-radius: 6px;
  display: flex;
  flex-direction: column;

  h3 {
    color: ${colors.mediumBrown};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    white-space: nowrap;
  }

  ul {
    flex-grow: 1;
    li {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      margin-bottom: 0.8rem;
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.active ? colors.mediumBrown : colors.cream};
  color: ${props => props.active ? 'white' : colors.darkBrown};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.active ? colors.lightBrown : colors.warmGray};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;

  th, td {
    padding: 0.8rem;
    text-align: left;
    border-bottom: 1px solid ${colors.warmGray};
  }

  th {
    background-color: ${colors.warmGray};
    font-weight: 600;
  }
`;

const Comparison = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 2rem 0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonCard = styled.div`
  padding: 1.5rem;
  background: ${props => props.negative ? colors.cream : colors.warmGray};
  border-radius: 6px;

  h3 {
    color: ${props => props.negative ? colors.mediumBrown : colors.darkBrown};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    gap: 0.5rem;
  }
`;

const Testimonial = styled.div`
  background: ${colors.mediumBrown};
  color: white;
  padding: 2rem;
  border-radius: 8px;
  margin: 3rem 0;
  position: relative;

  p {
    font-style: italic;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  cite {
    font-weight: 600;
    position: relative;
    z-index: 2;
  }
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem 0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.div`
  padding: 1rem;
  background: ${colors.cream};
  border-radius: 6px;
  text-align: center;
  transition: all 0.3s ease;

  span {
    font-weight: 600;
    display: block;
    color: ${colors.mediumBrown};
  }

  small {
    font-size: 0.9rem;
    display: block;
    color: ${colors.darkBrown};
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.primary ? colors.mediumBrown : 'transparent'};
  color: ${props => props.primary ? 'white' : colors.mediumBrown};
  border: ${props => props.primary ? 'none' : `2px solid ${colors.mediumBrown}`};

  &:hover {
    background: ${props => props.primary ? colors.lightBrown : colors.cream};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;
  flex-wrap: wrap;

  span {
    padding: 0.5rem 1rem;
    background: ${colors.cream};
    border-radius: 20px;
    font-size: 0.9rem;
  }
`;

const BigScorePage = () => {
  const [activeTab, setActiveTab] = useState('funding');

  return (
    <PageWrapper>
      <Header />
      <Container>
        <HeroSection>
          <Title>BIG Score</Title>
          <Subtitle>
            Africa's first AI-powered trust metric that validates SMEs, social enterprises, 
            and ESG-focused businesses as credible partners for funding, supply chains, 
            and impact collaborations.
          </Subtitle>
        </HeroSection>

        <Section>
          <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>Think of it as:</h2>
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Description /> A credit score for business credibility
            </li>
            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp /> A growth roadmap for SMEs
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <VerifiedUser /> A risk-reducer for funders and corporates
            </li>
          </ul>
          <p style={{ marginTop: '1rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart /> Powered by blockchain-backed data and dynamic AI analysis, it replaces guesswork with standardized, actionable insights.
          </p>
        </Section>

        <Section>
          <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>Why the BIG Score Wins for Everyone</h2>
          
          <BenefitsContainer>
            <BenefitCard>
              <h3><EmojiObjects /> SMEs & Social Enterprises</h3>
              <ul>
                <li><span>✅</span> See exactly where you stand with clear scoring breakdowns</li>
                <li><span>📈</span> Boost visibility to the right funders and customers</li>
                <li><span>🔍</span> Get tailored "next steps" to improve your score</li>
              </ul>
            </BenefitCard>
            <BenefitCard>
              <h3><MonetizationOn /> Funders & Investors</h3>
              <ul>
                <li><span>⏱️</span> Cut due diligence time by 70% with pre-vetted opportunities</li>
                <li><span>📊</span> Compare apples-to-apples with standardized metrics</li>
                <li><span>🤖</span> AI-matched recommendations aligned with your criteria</li>
              </ul>
            </BenefitCard>
            <BenefitCard>
              <h3><Business /> Corporates</h3>
              <ul>
                <li><span>🛡️</span> Source verified partners with compliance & ESG tracking</li>
                <li><span>🌱</span> Meet CSI/ESD goals with impact-proven suppliers</li>
                <li><span>⚡</span> Reduce procurement risk with real-time performance data</li>
              </ul>
            </BenefitCard>
            <BenefitCard>
              <h3><GroupWork /> Accelerators</h3>
              <ul>
                <li><span>🎯</span> Identify cohort gaps and tailor support</li>
                <li><span>📈</span> Demonstrate program ROI with score improvements</li>
                <li><span>💡</span> Spot high-potential outliers for investor showcases</li>
              </ul>
            </BenefitCard>
          </BenefitsContainer>
        </Section>

        <Section>
          <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>How It Works</h2>
          
          <Tabs>
            <Tab active={activeTab === 'funding'} onClick={() => setActiveTab('funding')}>
              <Assessment /> BIG Score for Funding
            </Tab>
            <Tab active={activeTab === 'service'} onClick={() => setActiveTab('service')}>
              <Handshake /> BIG Score for Service
            </Tab>
          </Tabs>

          {activeTab === 'funding' ? (
            <div>
              <h3 style={{ color: colors.lightBrown, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AccountBalance /> For: SMSEs seeking capital or social enterprises proving impact
              </h3>
              <p>The BIG Score for funding evaluates organizations based on their investment readiness, operational reliability, and ESG/impact alignment:</p>
              
              <h4 style={{ color: colors.lightBrown, marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowForward /> Traditional SMEs (Profit-Driven)
              </h4>
              <p>Weightings Focus: Financial viability, market traction, and scalability. Weightings Shift as You Grow.</p>
              
              <Table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Pre-Revenue</th>
                    <th>Scaling</th>
                    <th>Mature</th>
                    <th>Data Sources</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Compliance</td>
                    <td>Legal documentation, regulatory adherence, operational licenses.</td>
                    <td>15%</td>
                    <td>20%</td>
                    <td>25%</td>
                    <td>Uploaded docs + govt APIs</td>
                  </tr>
                  <tr>
                    <td>Financial Health</td>
                    <td>Revenue trends, cash flow management, profitability, debt-to-equity ratio, existing liabilities.</td>
                    <td>20%</td>
                    <td>30%</td>
                    <td>35%</td>
                    <td>Xero/QuickBooks + projections</td>
                  </tr>
                  <tr>
                    <td>Operational Strength</td>
                    <td>Team experience, operational capacity, industry benchmarks, scalability, sustainability</td>
                    <td>20%</td>
                    <td>20%</td>
                    <td>15%</td>
                    <td>Team profiles + LinkedIn</td>
                  </tr>
                  <tr>
                    <td>Pitch Quality</td>
                    <td>Business model viability, clarity, completeness, feasibility, market fit (Market demand, customer base, competitive positioning, innovation)</td>
                    <td>25%</td>
                    <td>15%</td>
                    <td>10%</td>
                    <td>ChatGPT deck analysis</td>
                  </tr>
                  <tr>
                    <td>Impact Proof</td>
                    <td>Basic environmental/social practices</td>
                    <td>20%</td>
                    <td>15%</td>
                    <td>15%</td>
                    <td>Sector benchmarks (Briter/AfDB)</td>
                  </tr>
                </tbody>
              </Table>

              <div style={{ margin: '1.5rem 0', padding: '1rem', background: colors.cream, borderRadius: '6px' }}>
                <h5 style={{ marginBottom: '0.5rem' }}>Examples:</h5>
                <p>1. A scaling SME with strong finances (90%) but weak compliance (60%):</p>
                <p style={{ fontStyle: 'italic' }}>(20%*60) + (30%*90) + (20%*70) + (15%*80) + (15%*50) = 72.5/100 → "Fundable with Conditions"</p>
                <p>2. "A scaling fintech SME with strong unit economics (85%) but no B-BBEE cert (0%) loses 5% instantly. We flag this as a quick win."</p>
              </div>

              <h4 style={{ color: colors.lightBrown, marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowForward /> Social Enterprises (Impact-Driven)
              </h4>
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

              <div style={{ margin: '1.5rem 0', padding: '1rem', background: colors.cream, borderRadius: '6px' }}>
                <h5 style={{ marginBottom: '0.5rem' }}>Examples:</h5>
                <p>1. An early-stage social enterprise with high impact (90%) but low finances (50%):</p>
                <p style={{ fontStyle: 'italic' }}>(40%*70) + (15%*50) + (20%*90) + (25%*60)= 74.5/100 → "High Impact, Needs Funding"</p>
                <p>2. A women's coop scores 95% on Impact but 30% on Financials? We recommend capacity-building grants first</p>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ color: colors.lightBrown, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <People /> BIG Score for Customer Service
              </h3>
              <p>This version of the BIG Score validates SMEs and ESG-focused organizations providing services to customers, ensuring transparency, reliability, and satisfaction.</p>
              
              <h4 style={{ color: colors.lightBrown, marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowForward /> Traditional SMEs (Profit-Driven)
              </h4>
              <p>Weightings: Service quality > compliance > operational strength.</p>
              
              <Table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Weighting</th>
                    <th>Data Sources</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Compliance</td>
                    <td>SME legitimacy, legal compliance, licensing</td>
                    <td>20%</td>
                    <td>Vendor management docs, Tax docs, certifications</td>
                  </tr>
                  <tr>
                    <td>Reliability</td>
                    <td>Financial and operational strength/health</td>
                    <td>50%</td>
                    <td>SLAs, Team capacity</td>
                  </tr>
                  <tr>
                    <td>Customer Satisfaction</td>
                    <td>Team experience, operational capacity, industry benchmarks scalability, sustainability</td>
                    <td>30%</td>
                    <td>Net Promoter Score, repeat business</td>
                  </tr>
                </tbody>
              </Table>

              <h4 style={{ color: colors.lightBrown, marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowForward /> Social Enterprises (Impact Driven)
              </h4>
              <p>Weightings: Impact delivery > stakeholder feedback > compliance.</p>
              
              <Table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Weighting</th>
                    <th>Data Sources</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Compliance</td>
                    <td>NGO legitimacy, legal compliance, licensing</td>
                    <td>25%</td>
                    <td>NGO registration, audits</td>
                  </tr>
                  <tr>
                    <td>Impact Proof</td>
                    <td>Environmental and social responsibility practices, ESG compliance</td>
                    <td>40%</td>
                    <td>Beneficiary testimonials, SDG reports</td>
                  </tr>
                  <tr>
                    <td>Service Quality</td>
                    <td>Reliability, consistency in service delivery, operational efficiency - Real-time ratings and reviews from actual customers</td>
                    <td>35%</td>
                    <td>Partner/corporate ratings</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Section>

        <Section>
          <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>Why the BIG Score Works</h2>
          
          <Comparison>
            <ComparisonCard negative>
              <h3><ThumbDown /> Traditional Due Diligence</h3>
              <p><span>❌</span> Subjective opinions</p>
              <p><span>❌</span> Static PDF reports</p>
              <p><span>❌</span> Hidden criteria</p>
              <p><span>❌</span> Manual processes</p>
            </ComparisonCard>
            <ComparisonCard>
              <h3><ThumbUp /> BIG Score Advantage</h3>
              <p><span>✅</span> AI-driven objectivity</p>
              <p><span>✅</span> Live score tracking</p>
              <p><span>✅</span> Transparent weightings</p>
              <p><span>✅</span> Blockchain-verified data</p>
            </ComparisonCard>
          </Comparison>
        </Section>

        <Testimonial>
          <p><FormatQuote /> "The BIG Score helped us identify 3x more investable SMEs in half the time."</p>
          <cite>— [Investor Name], [Fund]</cite>
        </Testimonial>

        <Section>
          <h2 style={{ color: colors.mediumBrown, textAlign: 'center' }}>Get Your BIG Score Today, in just 4 steps</h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Discover your organization's BIG Score in just 4 simple steps:
          </p>
          
          <Steps>
            <Step>
              <span>Onboard</span>
              <small>Share basic docs (5 min)</small>
            </Step>
            <Step>
              <span>Evaluate</span>
              <small>AI analyzes your profile</small>
            </Step>
            <Step>
              <span>Enhance</span>
              <small>Get improvement suggestions</small>
            </Step>
            <Step>
              <span>Connect</span>
              <small>Access new opportunities</small>
            </Step>
          </Steps>
          
          <ButtonGroup>
            <Button primary><Timeline /> Get Started Now</Button>
            <Button><Equalizer /> See Sample Report</Button>
          </ButtonGroup>
          
          <TrustBadges>
            <span>Backed by [Partner Logos]</span>
            <span>500+ SMEs scored</span>
          </TrustBadges>
        </Section>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default BigScorePage;