import { useEffect, useState } from 'react'
import './App.css'
import Quiz from './Components/Quiz/Quiz'
const apiUrl = 'https://644982a3e7eb3378ca4ba471.mockapi.io/questions';
function App() {
  const [loading, setLoading] = useState(true);
  const [questions,setQuestions]=useState([])
  useEffect(()=>{
    fetchData();
},[])
const fetchData=async()=>  {
  try {
    const response = await fetch(apiUrl);
    const questionResponse=await response.json();
    setQuestions(questionResponse)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
      setLoading(false);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }finally{
    setLoading(false);
  }
}
if (loading) {
  return <h2 className='loading'>Loading...</h2>;
}

  return (
    <div className='App'>
      {questions.length&&<Quiz questions={questions}/>}
   </div>
  )
}
export default App
