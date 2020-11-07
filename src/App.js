import React from 'react';
import axios from 'axios';
import './App.css';
import { server } from './config';
import { questions, personalities, personalityLabels } from './quiz';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      route: 'welcome',
      answers: [],
    }
    this.setUsername = this.setUsername.bind(this)
    this.saveUsername = this.saveUsername.bind(this)
    this.saveQuizAnswer = this.saveQuizAnswer.bind(this)
  }

  setUsername(e) {
    this.setState({username: e.target.value});
  }

  saveUsername(e) {
    const username = this.state.username;
    const url = server.url + '/routes/api/save_username';
    axios.post(url, {username: username}).then(response => {});
    this.setState({route: 'quiz'});
  }

  saveQuizAnswer(val) {
    const answers = this.state.answers;
    const username = this.state.username;
    answers.push(val);
    this.setState({answers: answers});
    if (this.state.answers.length === questions.length){
      const personalityIndex = getUserPersonality(answers);
      const personalityLabel = personalityLabels[personalityIndex];
      axios.post(server.url + '/routes/userDatabaseSave', {
        username: username,
        catpersonality: personalityLabel,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });     
    }
  }

  render() {
    return (
      <div id='container'>
        <div className='App'>
          <h1>Cat Shack</h1>

          {this.state.route === 'welcome'
            ? <Welcome
                setUsername={this.setUsername}
                saveUsername={this.saveUsername} />
            : null
          }

          {this.state.route === 'quiz' && this.state.answers.length < questions.length
            ? <Quiz
                saveQuizAnswer={this.saveQuizAnswer}
                questionIndex={this.state.answers.length} />
            : null
          }

          {this.state.answers.length === questions.length
            ? <ShowThemTheCat 
                answers={this.state.answers}
                username={this.state.username} 
            />
            : null
          }
        </div>
      </div>
    );
  }
}

class Welcome extends React.Component {
  render() {
    return (
      <div id='welcome'>
        <h2>Where Fur Pals Can Get Together</h2>
        <p>We joke about how cats love us when we are needed elsewhere, but in truth, we would not trade that type of demanding behavior for anything in the world; in fact, even when that truth has been stereotypically ingrained in our rationale, we still run to local animal shelters and pet stores to buy these lovable creatures. </p>
        <p>The Cat Shack is designed to help make that transition smoother. After you take our in-depth, under-utilizing scientific quiz, you will be paired with a celebrity cat, who will help you relate to other similar cats available for adoption.</p>
        <div>
          <label>Type Your Name To Begin:</label>
          <input
            id='name'
            type='text'
            onChange={this.props.setUsername} />
          <button onClick={this.props.saveUsername}>Start The Quiz</button>
        </div>
      </div>
    )
  }
}

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

const getUserPersonality = answers => { 
  const counts = {};
  let maxKey = null;
  let maxVal = 0;
  // answers is a list of numbers [0, 0, 1, 0, 2]
  answers.map(i => {
    i = parseInt(i);
    // update the counts of this answer
    if (i in counts) counts[i] += 1;
    else counts[i] = 1;
    // check to see if the count of i is greater than the current max count
    if (counts[i] > maxVal) {
      maxVal = counts[i];
      maxKey = i;
    }
  })
  return maxKey;
}

class ShowThemTheCat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const maxKey = getUserPersonality(this.props.answers);
    return (
      <div id='final-screen'>
        <h2 id='results'>{this.props.username}, your quiz results identify you as personality type {personalityLabels[maxKey]}</h2>
        <img src={personalities[maxKey]} />
        <br/>
        <h2>Find similar cats in a shelter near you:</h2>
        <img src={personalities[0]} />
        <img src={personalities[1]} />
        <img src={personalities[2]} />
      </div>
    )
  }
}

export default App;