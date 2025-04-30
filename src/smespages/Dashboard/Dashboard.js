import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, TrendingUp, Award, Users, CheckCircle, ChevronRight, ChevronLeft, Star, Plus, X } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth] = useState(new Date().getMonth());
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newDeadline, setNewDeadline] = useState({ title: '', date: '' });
  const [deadlines, setDeadlines] = useState([
    { date: 15, title: 'Tax Submission' },
    { date: 30, title: 'Compliance Review' }
  ]);

  // Profile completion data
  const profileCompletion = 80;
  
  // Big Score data
  const bigScoreData = [
    { name: 'Funding', value: 25, color: '#F59E0B' },
    { name: 'Compliance', value: 20, color: '#10B981' },
    { name: 'Financial', value: 15, color: '#3B82F6' },
    { name: 'Operations', value: 25, color: '#6366F1' },
    { name: 'Pitch', value: 15, color: '#EC4899' }
  ];
  
  // Total score calculation
  const totalScore = bigScoreData.reduce((sum, item) => sum + item.value, 0);
  
  // Monthly score data
  const monthlyScoreData = [
    { name: 'Jan', score: 45 },
    { name: 'Feb', score: 50 },
    { name: 'Mar', score: 55 },
    { name: 'Apr', score: 60 },
    { name: 'May', score: 65 },
    { name: 'Jun', score: 70 },
    { name: 'Jul', score: 75 },
    { name: 'Aug', score: null },
    { name: 'Sep', score: null },
    { name: 'Oct', score: null },
    { name: 'Nov', score: null },
    { name: 'Dec', score: null }
  ];

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Get days in month and first day of month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  // Upcoming events
  const upcomingEvents = [
    { title: 'Investor Meetup', date: 'May 15, 2023', type: 'meeting' },
    { title: 'Pitch Workshop', date: 'May 20, 2023', type: 'workshop' },
    { title: 'Funding Deadline', date: 'May 30, 2023', type: 'deadline' }
  ];
  
  // Ratings data
  const ratings = [
    { name: 'Investor A', rating: 4, date: 'Apr 15, 2023' },
    { name: 'Investor B', rating: 3, date: 'Apr 10, 2023' },
    { name: 'Investor C', rating: 5, date: 'Apr 5, 2023' }

  ];
  
  // Dealflow steps with clear names
  const dealflowSteps = [
    { label: 'Investor Interest', description: 'Investors showing interest', completed: true },
    { label: 'Application Sent', description: 'Submitted applications', completed: true },
    { label: 'Under Review', description: 'Under investor review', completed: true },
    { label: 'Due Diligence', description: 'Current stage', active: true },
    { label: 'Term Sheet', description: 'Negotiating terms', completed: false },
    { label: 'Final Review', description: 'Final approval process', completed: false },
    { label: 'Approved', description: 'Funding approved', completed: false },
    { label: 'Closed', description: 'Deal completed', completed: false }
  ];
  
  // Matches data
  const matches = [
    { name: 'VC Firm A', match: 92, stage: 'Due Diligence' },
    { name: 'Angel Investor B', match: 87, stage: 'Term Sheet' },
    { name: 'Corporate Fund C', match: 79, stage: 'Review' }
  ];
  
  // Recommendations based on score
  const getRecommendations = () => {
    const currentMonthScore = monthlyScoreData[currentMonth]?.score || 0;
    if (currentMonthScore < 50) {
      return [
        "Improve financial documentation",
        "Complete compliance checklist",
        "Update pitch deck"
      ];
    } else if (currentMonthScore < 70) {
      return [
        "Enhance operational metrics",
        "Practice investor pitch",
        "Expand investor outreach"
      ];
    } else {
      return [
        "Explore additional funding rounds",
        "Network with tier-1 investors",
        "Optimize financial projections"
      ];
    }
  };

  // Handle calendar day click
  const handleDayClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setNewDeadline({
      title: '',
      date: `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    });
    setShowDeadlineModal(true);
  };

  // Add new deadline
  const addDeadline = () => {
    if (newDeadline.title.trim() && newDeadline.date) {
      const day = new Date(newDeadline.date).getDate();
      setDeadlines([...deadlines, { date: day, title: newDeadline.title }]);
      setShowDeadlineModal(false);
      setNewDeadline({ title: '', date: '' });
    }
  };

  // Remove deadline
  const removeDeadline = (index) => {
    const newDeadlines = [...deadlines];
    newDeadlines.splice(index, 1);
    setDeadlines(newDeadlines);
  };

  return (
    <div className="dashboard-content">
      {/* First Row - Progress Tracker */}
      <div className="tracker-card">
        <h3 className="card-title">Funding Tracker</h3>
        <div className="tracker-steps">
          {dealflowSteps.map((step, index) => (
            <div 
              key={index} 
              className={`tracker-step ${step.completed ? 'completed' : step.active ? 'active' : ''}`}
              onClick={() => navigate('/application')}
            >
              <div className="step-marker">
                {step.completed ? (
                  <CheckCircle size={16} />
                ) : step.active ? (
                  <div className="active-dot"></div>
                ) : (
                  <div className="inactive-dot"></div>
                )}
              </div>
              <div className="step-info">
                <span className="step-label">{step.label}</span>
                {step.active && <span className="step-description">{step.description}</span>}
              </div>
              {index < dealflowSteps.length - 1 && (
                <ChevronRight size={16} className="step-arrow" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Second Row - Profile, Readiness, Matches */}
      <div className="stats-row">
        {/* Profile Completion */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Profile Completion</h3>
            <button className="update-btn" onClick={() => navigate('/profile')}>
              Update Profile
            </button>
          </div>
          <div className="completion-ring">
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={[{ value: profileCompletion }, { value: 100 - profileCompletion }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={45}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill="#8B5A2B" /> {/* Brown color */}
                  <Cell fill="#E5E7EB" />
                </Pie>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  className="completion-percent"
                >
                  {profileCompletion}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="completion-text">
            {profileCompletion >= 70 
              ? "Your profile looks strong!" 
              : "Complete your profile for better matches"}
          </p>
        </div>

        {/* Funding Readiness */}
        <div className="readiness-card">
          <div className="card-header">
            <h3>Big Score</h3>
            <span className="score-badge">{totalScore}/100</span>
          </div>
          <div className="score-donut">
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={bigScoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={45}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {bigScoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  className="donut-score"
                >
                  {totalScore}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="score-legend">
            {bigScoreData.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}</span>
                <span className="legend-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Matches */}
        <div className="matches-card">
          <div className="card-header">
            <h3>Top Matches</h3>
            <button className="view-all" onClick={() => navigate('/find-matches')}>
              View All
            </button>
          </div>
          <div className="matches-list">
            {matches.map((match, index) => (
              <div 
                key={index} 
                className="match-item"
                onClick={() => navigate('/investor')}
              >
                <div className="match-info">
                  <h4>{match.name}</h4>
                  <span className="match-stage">{match.stage}</span>
                </div>
                <div className="match-score">
                  <div className="match-bar" style={{ width: `${match.match}%` }}></div>
                  <span>{match.match}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row - Score Trend, Calendar, Ratings */}
      <div className="bottom-row">
        {/* Score Trend with Recommendations */}
        <div className="trend-card">
          <div className="card-header">
            <h3>Big Score Summary </h3>
            <div className="trend-actions">
              <button className="time-filter active">3M</button>
              <button className="time-filter">6M</button>
              <button className="time-filter">12M</button>
            </div>
          </div>
          <div className="trend-chart">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={monthlyScoreData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value) => [`Score: ${value}`, null]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5A2B" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5A2B', stroke: '#fff', strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 1, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="recommendations">
            <h4>Recommendations</h4>
            <ul>
              {getRecommendations().map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Calendar & Events */}
        <div className="calendar-card">
          <div className="card-header">
            <h3>Calendar</h3>
            <div className="month-navigation">
              <button onClick={() => navigateMonth('prev')}><ChevronLeft size={16} /></button>
              <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => navigateMonth('next')}><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="mini-calendar">
            <div className="calendar-header">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="day-header">{day}</div>
              ))}
            </div>
            <div className="calendar-days">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="empty-day"></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isDeadline = deadlines.some(d => d.date === day);
                const isToday = day === new Date().getDate() && 
                               currentDate.getMonth() === new Date().getMonth() && 
                               currentDate.getFullYear() === new Date().getFullYear();
                
                return (
                  <div 
                    key={`day-${day}`}
                    className={`calendar-day ${isDeadline ? 'deadline' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day}
                    {isDeadline && <div className="deadline-dot"></div>}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="upcoming-events">
            <h4>Upcoming Events</h4>
            <div className="events-list">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-item">
                  <div className={`event-icon ${event.type}`}>
                    {event.type === 'meeting' && <Users size={12} />}
                    {event.type === 'workshop' && <TrendingUp size={12} />}
                    {event.type === 'deadline' && <Award size={12} />}
                  </div>
                  <div className="event-details">
                    <h5>{event.title}</h5>
                    <p>{event.date}</p>
                  </div>
                </div>
              ))}
              {deadlines.map((deadline, index) => (
                <div key={`deadline-${index}`} className="event-item">
                  <div className="event-icon deadline">
                    <Award size={12} />
                  </div>
                  <div className="event-details">
                    <h5>{deadline.title}</h5>
                    <p>{currentDate.toLocaleString('default', { month: 'long' })} {deadline.date}</p>
                    <button 
                      className="remove-deadline"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeDeadline(index);
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="ratings-card">
          <div className="card-header">
            <h3>My Ratings</h3>
            <button className="view-all" onClick={() => navigate('/investor')}>
              View All
            </button>
          </div>
          <div className="ratings-list">
            {ratings.map((rating, index) => (
              <div key={index} className="rating-item">
                <div className="rating-info">
                  <h4>{rating.name}</h4>
                  <p>{rating.date}</p>
                </div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < rating.rating ? '#F59E0B' : '#E5E7EB'} 
                      color={i < rating.rating ? '#F59E0B' : '#E5E7EB'} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deadline Modal */}
      {showDeadlineModal && (
        <div className="modal-overlay">
          <div className="deadline-modal">
            <div className="modal-header">
              <h3>Add New Deadline</h3>
              <button onClick={() => setShowDeadlineModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newDeadline.title}
                  onChange={(e) => setNewDeadline({...newDeadline, title: e.target.value})}
                  placeholder="Enter deadline title"
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newDeadline.date}
                  onChange={(e) => setNewDeadline({...newDeadline, date: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowDeadlineModal(false)}>
                Cancel
              </button>
              <button className="add-btn" onClick={addDeadline}>
                <Plus size={16} /> Add Deadline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;