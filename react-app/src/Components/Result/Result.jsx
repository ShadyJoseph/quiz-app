
import React from 'react'
import './Result.scss'
import { useState ,useEffect} from 'react'

export const resultIntialState={
    score:0,
    correctAnswers:0,
    wrongAnswers:0,
}

function Result({TotalQuestions,result,TryAgain}) {

const [name,setName]=useState('');

const[highScores,setHighScores]=useState([]);

const[showScores,setShowScores]=useState(false);

useEffect(()=>{
setHighScores(JSON.parse(localStorage.getItem('highScores'))||[])
},[])

const handleSave=()=>{
const scoree={
name,
score:result.score
}
const newHighScore=[...highScores,scoree].sort((a,b)=>b.score-a.score)
setHighScores(newHighScore);
setShowScores(true);
localStorage.setItem('highScores',JSON.stringify(newHighScore))
}
const handleTryAgain=()=>{
  setShowScores(false);
  setHighScores([]);
  TryAgain();
}
  return (
   <>
   <div className='result'>
        <h3>Result</h3>
          <p>
            Total questions:<span>{TotalQuestions.length}</span>
          </p>
          <p>
            Correct answers:<span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong answers:<span>{result.wrongAnswers}</span>
          </p>
          <p>
            Total score:<span>{result.score}</span>
          </p>
          <button onClick={handleTryAgain}>Try Again</button>
         {!showScores ? <>
          <h3>write your name below to save your progress</h3>
          <input placeholder="your name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <button onClick={handleSave}>Save</button>
          </> :<>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
                {highScores.map((highScor,i)=>{
                 return(
                  <tr key={`${highScor.score}${highScor.name}${i}`}>
                    <td>{i+1}</td>
                    <td>{highScor.name}</td>
                    <td>{highScor.score}</td>
                  </tr>
                 ) 
                })}
            </tbody>
          </table>
          </>}

       </div>
   </>
  )
}

export default Result
