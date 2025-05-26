import React from 'react';
import './EventData.css';

const EventData = ({ stats }) => {
  const cards = [
    { 
      title: 'Created', 
      value: stats.created,
      description: 'Total events created',
      className: 'created-card'
    },
    { 
      title: 'Completed', 
      value: stats.completed,
      description: 'Events completed',
      className: 'completed-card'
    },
    { 
      title: 'Rescheduled', 
      value: stats.rescheduled,
      description: 'Events rescheduled',
      className: 'rescheduled-card'
    },
    { 
      title: 'Cancelled', 
      value: stats.cancelled,
      description: 'Events cancelled',
      className: 'cancelled-card'
    }
  ];

  return (
    <div className="event-data-pipeline">
      {cards.map((card, index) => (
        <div key={index} className={`pipeline-card ${card.className}`}>
          <div className="pipeline-value">{card.value}</div>
          <div className="pipeline-title">{card.title}</div>
          <div className="pipeline-tooltip">{card.description}</div>
        </div>
      ))}
    </div>
  );
};

export default EventData;