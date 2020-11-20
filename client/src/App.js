import React from 'react';
import axios from 'axios';
import Quiz from './components/Quiz';
import ShowThemTheCat from './components/ShowThemTheCat';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/Login';
import RegisterOrg from './components/Register';
import { questions, personalityLabels } from './quiz';
import { getUserPersonality } from './utils'
import './App.css';
import {server} from './config.js';

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
    this.restartQuiz = this.restartQuiz.bind(this)
    this.registerOrgHere = this.registerOrgHere.bind(this)
    this.loginOrg = this.loginOrg.bind(this)
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  saveUsername(e) {
    this.setState({ route: 'quiz' });
  }

  registerOrgHere(e) {
    this.setState({ route: 'Register' });
  }

  loginOrg(e) {
    this.setState({ route: 'login' });
  }

  restartQuiz(e) {
    this.setState({ route: 'welcome', answers: [] });
  }

  registerCat(val) {
    const name = this.state.name;
    const organization = this.state.organization;
    const phone = this.state.phone;
    const address = this.state.address;
    const cats = this.state.cats;
    const catdescription = this.state.catdescripton;
    const password = this.state.password;
    name.push(val);
    organization.push(val);
    phone.push(val);
    address.push(val);
    cats.push(val);
    catdescription.push(val);
    password.push(val);
    this.setState({
      name: name,
        organization: organization,
        phone: phone,
        address: address,
        cats: cats,
        catdescription: catdescription,
        password: password
    });
    //Is an if statement necessary?
      axios.post(server + '/orgDatabaseSave', {
        name: name,
        organization: organization,
        phone: phone,
        address: address,
        cats: cats,
        catdescription: catdescription,
        password: password
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  saveQuizAnswer(val) {
    const answers = this.state.answers;
    const username = this.state.username;
    answers.push(val);
    this.setState({ answers: answers });
    if (this.state.answers.length === questions.length) {
      const personalityIndex = getUserPersonality(answers);
      const personalityLabel = personalityLabels[personalityIndex];
      axios.post(server + '/userDatabaseSave', {
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
  };

  render() {
    return (
      <div id='container'>
        <div className='App'>
          <Navbar />
          <h1>Cat Shack</h1>

          {this.state.route === 'welcome'
            ? <Welcome
              setUsername={this.setUsername}
              saveUsername={this.saveUsername}
              registerOrgHere = {this.registerOrgHere} />
            : null
          }

          {this.state.route === 'quiz' && this.state.answers.length < questions.length
            ? <Quiz
              saveQuizAnswer={this.saveQuizAnswer}
              questionIndex={this.state.answers.length} />
            : null
          }

          {this.state.route === 'Register'
            ? <RegisterOrg
              name={this.state.name}
              organization={this.state.organization}
              phone={this.state.phone}
              address={this.state.phone}
              cats={this.state.cats}
              catdescriptions={this.state.catDescriptions}
              password={this.state.password}
              setRegister={this.registerOrg} />
            : null
          }

          {this.state.route === 'login'
            ? <Login
              name={this.state.name}
              password={this.state.password}
              setLogin={this.loginOrg}
            />
            : null
          }

          {this.state.answers.length === questions.length
            ? <ShowThemTheCat
              answers={this.state.answers}
              username={this.state.username}
              restartQuiz={this.restartQuiz}
            />
            : null
          }
        </div>
        <Footer />
      </div>
    );
  }
}



export default App;