import React from 'react';



class Login extends React.Component {
    constructor(props) {
      super(props)
    }
  
    render() {

      return (
        <div>

          <button onClick={() => {this.props.loginOrg()}}>Login</button>
        </div>
      )
    }
  }

  export default Login