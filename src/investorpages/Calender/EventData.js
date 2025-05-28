import React from 'react';
import './EventData.css';

const EventData = ({ stats }) => {
  const cards = [
    { 
      title: 'Events Created', 
      value: stats.created,
      description: 'Total events created in your calendar',
      className: 'created-card'
    },
    { 
      title: 'Events Completed', 
      value: stats.completed,
      description: 'Events successfully finished',
      className: 'completed-card'
    },
    { 
      title: 'Events Rescheduled', 
      value: stats.rescheduled,
      description: 'Events that changed their time',
      className: 'rescheduled-card'
    },
    { 
      title: 'Events Cancelled', 
      value: stats.cancelled,
      description: 'Events that got called off',
      className: 'cancelled-card'
    }
  ];

  return (
    <div className="event-data-container">
      <h2 className="event-data-title">Event Data</h2>
      <div className="event-data-pipeline">
        {cards.map((card, index) => (
          <div key={index} className={`pipeline-card ${card.className}`}>
            <div className="pipeline-value">{card.value}</div>
            <div className="pipeline-title">{card.title}</div>
            <div className="pipeline-tooltip">{card.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventData;