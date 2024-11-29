import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import QuestionCard from '../components/QuestionCard';

const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await axios.get('/questions');
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  return (
    <div className="container mt-4">
      {questions.map((question) => (
        <QuestionCard key={question._id} question={question} />
      ))}
    </div>
  );
};

export default Home;
