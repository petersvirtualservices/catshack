import React from 'react';
import {questions} from '../quiz';

class Quiz extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        idx: '',
      }
    }
  
    setAnswerIndex(val) {
      this.setState({idx: val})
    }
  
    render() {
      const q = questions[this.props.questionIndex];
      return (
        <div id='quiz'>
          <h2>QUIZ</h2>
          <div id='question-container'>
            <div id='question'>{q.question}</div>
            {q.answers.map((a, idx) => {
              return (
                <div className='answer' key={a} onClick={() => this.setAnswerIndex(idx)}>
                  <input type='radio' id={idx} name='quiz-answer' value={a} />
                  <label>{a}</label>
                </div>
              )
            })}
            <button onClick={() => {this.props.saveQuizAnswer(this.state.idx)}}>Submit</button>
          </div>
        </div>
      )
    }
  }

  export default Quiz