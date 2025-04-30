import React, { useState } from 'react';
import './FindMatches.css';

const FindMatches = () => {
  const [activeTab, setActiveTab] = useState('investors');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minScore: 70,
    minInvestment: '',
    maxInvestment: '',
    minRating: 0,
    providerType: ''
  });

  // Sample investors data with more entries and additional fields
  const investorsData = [
    {
      id: 1,
      name: 'ABC Ventures',
      type: 'Venture Capital',
      focus: 'Technology, Healthcare',
      location: 'Johannesburg',
      investment: 'R100K - R5M',
      minInvestment: 100000,
      maxInvestment: 5000000,
      matchScore: 92,
      status: 'High',
      preferredStage: 'Early, Growth',
      avgDealSize: 'R2M'
    },
    {
      id: 2,
      name: 'SA Tech Fund',
      type: 'Private Equity',
      focus: 'Fintech, E-commerce',
      location: 'Cape Town',
      investment: 'R500K - R10M',
      minInvestment: 500000,
      maxInvestment: 10000000,
      matchScore: 85,
      status: 'Medium',
      preferredStage: 'Growth',
      avgDealSize: 'R4M'
    },
    {
      id: 3,
      name: 'East Africa Capital',
      type: 'Angel Network',
      focus: 'Agriculture, Renewable Energy',
      location: 'Nairobi',
      investment: 'R50K - R1M',
      minInvestment: 50000,
      maxInvestment: 1000000,
      matchScore: 78,
      status: 'Low',
      preferredStage: 'Seed, Early',
      avgDealSize: 'R500K'
    },
    {
      id: 4,
      name: 'Southern Star Investors',
      type: 'Venture Capital',
      focus: 'Education, SaaS',
      location: 'Johannesburg',
      investment: 'R250K - R3M',
      minInvestment: 250000,
      maxInvestment: 3000000,
      matchScore: 89,
      status: 'High',
      preferredStage: 'Early',
      avgDealSize: 'R1.5M'
    },
    {
      id: 5,
      name: 'Cape Innovation Partners',
      type: 'Corporate VC',
      focus: 'AI, Blockchain',
      location: 'Cape Town',
      investment: 'R1M - R8M',
      minInvestment: 1000000,
      maxInvestment: 8000000,
      matchScore: 95,
      status: 'High',
      preferredStage: 'Growth, Late',
      avgDealSize: 'R5M'
    },
    {
      id: 6,
      name: 'Pan-African Growth Fund',
      type: 'Private Equity',
      focus: 'Manufacturing, Logistics',
      location: 'Nairobi',
      investment: 'R5M - R20M',
      minInvestment: 5000000,
      maxInvestment: 20000000,
      matchScore: 82,
      status: 'Medium',
      preferredStage: 'Late',
      avgDealSize: 'R10M'
    }
  ];

  // Sample service providers data with more entries and additional fields
  const serviceProvidersData = [
    {
      id: 1,
      name: 'XYZ Consulting',
      type: 'Consulting Firm',
      services: 'Business Strategy, Marketing',
      expertise: 'SME Growth',
      location: 'Cape Town',
      rating: 4.8,
      matchScore: 88,
      status: 'Recommended',
      priceRange: 'R5K - R50K/month',
      minPrice: 5000,
      maxPrice: 50000,
      clients: 'Startups, SMEs'
    },
    {
      id: 2,
      name: 'Digital Growth SA',
      type: 'Marketing Agency',
      services: 'Digital Marketing, SEO',
      expertise: 'E-commerce',
      location: 'Johannesburg',
      rating: 4.5,
      matchScore: 79,
      status: 'Recommended',
      priceRange: 'R10K - R100K/project',
      minPrice: 10000,
      maxPrice: 100000,
      clients: 'All business sizes'
    },
    {
      id: 3,
      name: 'LegalEdge Partners',
      type: 'Legal Services',
      services: 'Contracts, IP Protection',
      expertise: 'Tech Startups',
      location: 'Nairobi',
      rating: 4.9,
      matchScore: 91,
      status: 'Top Rated',
      priceRange: 'R15K - R200K/case',
      minPrice: 15000,
      maxPrice: 200000,
      clients: 'Startups, Entrepreneurs'
    },
    {
      id: 4,
      name: 'FinTech Advisors',
      type: 'Financial Consulting',
      services: 'Fundraising, Financial Modeling',
      expertise: 'Fintech',
      location: 'Johannesburg',
      rating: 4.7,
      matchScore: 85,
      status: 'Recommended',
      priceRange: 'R20K - R150K/project',
      minPrice: 20000,
      maxPrice: 150000,
      clients: 'Tech Startups'
    },
    {
      id: 5,
      name: 'HR Solutions Africa',
      type: 'HR Services',
      services: 'Recruitment, Training',
      expertise: 'Scaling Teams',
      location: 'Cape Town',
      rating: 4.3,
      matchScore: 76,
      status: 'Verified',
      priceRange: 'R8K - R80K/month',
      minPrice: 8000,
      maxPrice: 80000,
      clients: 'SMEs, Corporates'
    },
    {
      id: 6,
      name: 'TechDev Partners',
      type: 'Development Agency',
      services: 'App Development, Cloud Solutions',
      expertise: 'MVP Development',
      location: 'Nairobi',
      rating: 4.6,
      matchScore: 83,
      status: 'Recommended',
      priceRange: 'R50K - R500K/project',
      minPrice: 50000,
      maxPrice: 500000,
      clients: 'Startups, SMEs'
    }
  ];

  // Filter functions with additional filters
  const filteredInvestors = investorsData.filter(investor =>
    (investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     investor.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
     investor.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filters.location ? investor.location.includes(filters.location) : true) &&
    investor.matchScore >= filters.minScore &&
    (filters.minInvestment ? investor.minInvestment >= Number(filters.minInvestment) : true) &&
    (filters.maxInvestment ? investor.maxInvestment <= Number(filters.maxInvestment) : true)
  );

  const filteredServiceProviders = serviceProvidersData.filter(provider =>
    (provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     provider.services.toLowerCase().includes(searchQuery.toLowerCase()) ||
     provider.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filters.location ? provider.location.includes(filters.location) : true) &&
    provider.matchScore >= filters.minScore &&
    provider.rating >= filters.minRating &&
    (filters.providerType ? provider.type.includes(filters.providerType) : true) &&
    (filters.minPrice ? provider.minPrice >= Number(filters.minPrice) : true) &&
    (filters.maxPrice ? provider.maxPrice <= Number(filters.maxPrice) : true)
  );

  return (
    <div className="professional-matches-container">
      {/* Header with Search */}
      <div className="matches-header">
        <h2>Find Matches</h2>
        <div className="search-filter-container">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by name, focus, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="matches-tabs">
        <button
          className={`tab ${activeTab === 'investors' ? 'active' : ''}`}
          onClick={() => setActiveTab('investors')}
        >
          Investors ({filteredInvestors.length})
        </button>
        <button
          className={`tab ${activeTab === 'serviceProviders' ? 'active' : ''}`}
          onClick={() => setActiveTab('serviceProviders')}
        >
          Growth Enablers ({filteredServiceProviders.length})
        </button>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="filter-group">
          <label>Location:</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          >
            <option value="">All Locations</option>
            <option value="Johannesburg">Johannesburg</option>
            <option value="Cape Town">Cape Town</option>
            <option value="Nairobi">Nairobi</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Min Match Score: {filters.minScore}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minScore}
            onChange={(e) => setFilters({...filters, minScore: e.target.value})}
          />
        </div>

        {activeTab === 'investors' && (
          <>
            <div className="filter-group">
              <label>Min Investment (R):</label>
              <input
                type="number"
                placeholder="Min"
                value={filters.minInvestment}
                onChange={(e) => setFilters({...filters, minInvestment: e.target.value})}
              />
            </div>
            <div className="filter-group">
              <label>Max Investment (R):</label>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxInvestment}
                onChange={(e) => setFilters({...filters, maxInvestment: e.target.value})}
              />
            </div>
          </>
        )}

        {activeTab === 'serviceProviders' && (
          <>
            <div className="filter-group">
              <label>Min Rating:</label>
              <select
                value={filters.minRating}
                onChange={(e) => setFilters({...filters, minRating: e.target.value})}
              >
                <option value="0">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Service Type:</label>
              <select
                value={filters.providerType}
                onChange={(e) => setFilters({...filters, providerType: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="Consulting">Consulting</option>
                <option value="Marketing">Marketing</option>
                <option value="Legal">Legal</option>
                <option value="Financial">Financial</option>
                <option value="HR">HR</option>
                <option value="Development">Development</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Min Price (R):</label>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              />
            </div>
            <div className="filter-group">
              <label>Max Price (R):</label>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
            </div>
          </>
        )}
      </div>

      {/* Tables */}
      <div className="table-container">
        {activeTab === 'investors' && (
          <table className="professional-table">
            <thead>
              <tr>
                <th>Investor</th>
                <th>Type</th>
                <th>Focus Areas</th>
                <th>Location</th>
                <th>Investment Range</th>
                <th>Preferred Stage</th>
                <th>Match Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestors.map((investor) => (
                <tr key={investor.id}>
                  <td>{investor.name}</td>
                  <td>{investor.type}</td>
                  <td>{investor.focus}</td>
                  <td>{investor.location}</td>
                  <td>{investor.investment}</td>
                  <td>{investor.preferredStage}</td>
                  <td>
                    <div className="score-cell">
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${investor.matchScore}%` }}
                        ></div>
                      </div>
                      <span>{investor.matchScore}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status ${investor.status.toLowerCase()}`}>
                      {investor.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">Connect</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'serviceProviders' && (
          <table className="professional-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Type</th>
                <th>Services</th>
                <th>Expertise</th>
                <th>Location</th>
                <th>Price Range</th>
                <th>Rating</th>
                <th>Match Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServiceProviders.map((provider) => (
                <tr key={provider.id}>
                  <td>{provider.name}</td>
                  <td>{provider.type}</td>
                  <td>{provider.services}</td>
                  <td>{provider.expertise}</td>
                  <td>{provider.location}</td>
                  <td>{provider.priceRange}</td>
                  <td>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(provider.rating) ? 'star filled' : 'star'}>
                          {i < Math.floor(provider.rating) || (i === Math.floor(provider.rating) && provider.rating % 1 >= 0.5) ? '★' : '☆'}
                        </span>
                      ))}
                      <span>({provider.rating.toFixed(1)})</span>
                    </div>
                  </td>
                  <td>
                    <div className="score-cell">
                      <div className="score-bar">
                        <div 
                          className="score-fill" 
                          style={{ width: `${provider.matchScore}%` }}
                        ></div>
                      </div>
                      <span>{provider.matchScore}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status ${provider.status.toLowerCase().replace(' ', '-')}`}>
                      {provider.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">Connect</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FindMatches;