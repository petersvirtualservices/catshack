import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';



class Footer extends React.Component {
  render() {
  return (
    <div id='footer' >
      <Breadcrumbs aria-label="breadcrumb">
      <Button color="inherit" onClick={this.props.restartQuiz}>
        Home
      </Button>
      <Button color="inherit" onClick={this.props.loginOrg}>
        Login
      </Button>
      <Button color="inherit" onClick={this.props.registerOrg}>
        Register
      </Button>
    </Breadcrumbs>
    </div>
  );
}
}

export default Footer;