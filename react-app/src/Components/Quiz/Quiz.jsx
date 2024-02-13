import React, { useState } from 'react';
import { resultIntialState } from '../Result/Result';
import Timer  from '../AnswerTimer/Timer';
import Result from '../Result/Result';
import './Quiz.scss';

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { question, choices, correctAnswer,type } = questions[currentQuestion];
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answerr, setAns] = useState(null);
  const [result, setResult] = useState(resultIntialState);
  const [showResult, setShowResult] = useState(false);
  const [FlagTimer,setFlagTimer]=useState(true);
  const [inputAnswer,setInputAnswer]=useState('')
  const onAnswer = (selectedAnswer, index) => {
    setAnswerIndex(index);
    if (selectedAnswer === correctAnswer) {
      setAns(true);
      setInputAnswer('');
    } else {
      setAns(false);
    }
  };

  const onNext = (finalAnswer) => {
    setAnswerIndex(null);
    setFlagTimer(false);
    setInputAnswer('');
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setTimeout(()=>{
      setFlagTimer(true);
    })
  };

  const TryAgain = () => {
    setResult(resultIntialState);
    setShowResult(false);
    setCurrentQuestion(0);
    setElapsedTime(0);
    
  };

  const handleTimeUp=()=>{
    setAns(false);
    onNext(false);
  }
  const handleInputChange=(e)=>{
    setInputAnswer(e.target.value);
    if(e.target.value===correctAnswer){
      setAns(true);
    }else{
      setAns(false);
    }
  }

  const getAnswerUI = () => {
    if (type === 'FIB') {
      return (
        <input
          type='text'
          placeholder='Type your answer here'
          value={inputAnswer}
          onChange={handleInputChange}
        />
      );
    } else if (type === 'MCQs') {
      return (
        <ul>
          {choices.map((choice, index) => (
            <li
              key={choice}
              onClick={() => onAnswer(choice, index)}
              className={answerIndex === index ? 'selected-answer' : ''}
            >
              {choice}
            </li>
          ))}
        </ul>
      );
    }
  };
  

  const isButtonDisabled = () => {
    return answerIndex === null && (!inputAnswer || inputAnswer.trim() === '');
  };

  return (
    <div className='quiz-container'>
      {!showResult ? (
        <>
        {FlagTimer&&<Timer duration={10} onTimeUp={handleTimeUp}/>}
          <span className='current-question-no'>
            {currentQuestion + 1}/
          </span>
          <span className='questions-no'>{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className='footer'>
            <button onClick={()=>{onNext(answerr)}} disabled={isButtonDisabled()}>
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <Result TotalQuestions={questions} result={result} TryAgain={TryAgain}/>
      )}
    </div>
  );
}

export default Quiz;
