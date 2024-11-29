import React from 'react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">{question.content}</h5>
        <p className="card-text text-muted">
          By: {question.author.name}
        </p>
        <div className="mb-2">
          {question.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-1">
              #{tag}
            </span>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/question/${question._id}`} className="btn btn-link">
            View Details
          </Link>
          <div>
            <button className="btn btn-outline-success me-2">
              👍 {question.likes}
            </button>
            <button className="btn btn-outline-danger">
              👎 {question.dislikes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
