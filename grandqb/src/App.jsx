import { useState } from "react";
import './App.css'

const App = () => {

  // state
  const [questions, setQuestions] = useState([])

  // store array
  let titleArr = [];
  let optionAarr = [];
  let optionBarr = [];
  let optionCarr = []; 
  let optionDarr = [];
  let refArr = [];
  let ansArr = [];
  let questionsArr = []

  const handelSubmitBtn = () =>{
    
    const questionInp = document.getElementById('questions_inp');
    const singleLineInp = questionInp.value.split('\n');
    

    // clear data
    titleArr = [];
    optionAarr = []
    optionBarr = []
    optionCarr = []
    optionDarr = []
    refArr = []
    ansArr = []
    questionsArr = []

    for(let i=0; i<singleLineInp.length; i++){
      if(singleLineInp[i].includes('tt/')){
        titleArr.push(singleLineInp[i].slice(4))
      }
      else if(singleLineInp[i].includes('(a)')){
        optionAarr.push(singleLineInp[i].slice(4))
      }
      else if(singleLineInp[i].includes('(b)')){
        optionBarr.push(singleLineInp[i].slice(4))
      }
      else if(singleLineInp[i].includes('(c)')){
        optionCarr.push(singleLineInp[i].slice(4))
      }
      else if(singleLineInp[i].includes('(d)')){
        optionDarr.push(singleLineInp[i].slice(4))
      }
      else if(singleLineInp[i].includes('rr/')){
        refArr.push(singleLineInp[i].slice(4))
      }
      else if(singleLineInp[i].includes('ans/')){
        ansArr = singleLineInp[i].slice(5).split(" ");
      }
    }


    // create questions obj
    optionAarr.map((item, index) => questionsArr.push({id:index, title: titleArr[index], optionA: item, optionB: optionBarr[index], optionC: optionBarr[index], optionD: optionBarr[index], ref: refArr[index], ans: ansArr[index]}))
    if(!questionsArr.length){
      return alert("Please Input Questions.")
    }
    setQuestions(questionsArr)
  } 

  const handelFainalSubmit = () =>{
    
    if(!questions.length){
      return alert("No questions found!")
    }

    questions.map(item => {
      delete item.id;
    })
  }

  return (
    <div className="hero">
      <h1>Save Question Multiple</h1>
      <textarea name="" id="questions_inp" className="input_quesitons"></textarea>
      <button onClick={handelSubmitBtn}>Test Submit</button>
      

     {
        questions && questions?.map(q => 
            <div className="demo_single_question" key={q.id}>
              <h2>{q.title} {q.ref}</h2>
              <p>{`(a) ${q.optionA}`}</p>
              <p>{`(b) ${q.optionB}`}</p>
              <p>{`(c) ${q.optionC}`}</p>
              <p>{`(d) ${q.optionD}`}</p>
              <p>{`[Ans- ${q?.ans.toUpperCase()}]`}</p>
            </div>
          )
      }

      {questions.length !=0 && <button onClick={handelFainalSubmit}>Fainal Submit</button>}
      
    </div>
  );
};

export default App;
