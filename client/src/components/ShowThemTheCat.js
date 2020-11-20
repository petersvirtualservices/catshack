import React from 'react';
import { personalities, personalityLabels } from '../quiz';
import { getUserPersonality } from '../utils';
//import MyApp from './HumaneResults/pages/_app.js';

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
          {/*<MyApp />*/}
          <br />
          <h2> Want to try again?</h2>
          <button onClick={() => {this.props.restartQuiz()}}>Start The Quiz</button>
        </div>
      )
    }
  }

  export default ShowThemTheCat