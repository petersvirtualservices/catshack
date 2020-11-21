import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';


  const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

class Navbar extends React.Component {
  render() {
  return (
    <div id='navbar'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h1" >
            Cat Shack
          </Typography>
          <br />
          <MyButton color="inherit" id="loginBtn" onClick={this.props.loginOrg}>LOGIN</MyButton>
          <MyButton color="inherit" id="homeBtn" onClick={this.props.restartQuiz}>HOME</MyButton>
          <MyButton color="inherit" id="registerBtn" onClick={this.props.register}>REGISTER</MyButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}

export default Navbar;