import React from 'react';

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
            <button id='startQuiz' onClick={this.props.saveUsername}>Start The Quiz</button>
          </div>
        </div>
      )
    }
  }

  export default Welcome