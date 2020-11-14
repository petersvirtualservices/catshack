import React from 'react';



class Login extends React.Component {
    constructor(props) {
      super(props)
    }
  
    render() {

      return (
        <div>

          <button onClick={() => {this.props.loginOrg()}}>Start The Quiz</button>
        </div>
      )
    }
  }

  export default Login