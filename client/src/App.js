import React from 'react';
import axios from 'axios';
import Quiz from './components/Quiz';
import ShowThemTheCat from './components/ShowThemTheCat';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AnimalCards from './components/AnimalCards'
import Register from './components/Register';
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
      animals: [],
    }
    this.setUsername = this.setUsername.bind(this)
    this.saveUsername = this.saveUsername.bind(this)
    this.saveQuizAnswer = this.saveQuizAnswer.bind(this)
    this.restartQuiz = this.restartQuiz.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.setRoute = this.setRoute.bind(this)
  }

  componentDidMount(){
    const self=this;
    axios.get(server + '/api/petfinderget')
    .then(response => {
      self.setState({
        animals: response.data.animals,
      })
    })

  }

  setRoute(e) {
    this.setState({ route: 'animals' });
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  saveUsername(e) {
    this.setState({ route: 'quiz' });
  }

  register(e) {
    this.setState({ route: 'Register' });
  }

  login(e) {
    this.setState({ route: 'login' });
  }

  restartQuiz(e) {
    this.setState({ route: 'welcome', answers: [] });
  }

  
  registerNow(val) {
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const password = this.state.password;
    firstName.push(val);
    lastName.push(val);
    email.push(val);
    password.push(val);
    this.setState({
      firstName: firstName,
      lastName:lastName,
      email: email,
      password:password
    });
    //Is an if statement necessary?
      axios.post(server + '/orgDatabaseSave', {
        firstName: firstName,
        lastName:lastName,
        email: email,
        password:password
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

          {this.state.route === 'welcome'
            ? <Welcome
              setUsername={this.setUsername}
              saveUsername={this.saveUsername}
              register = {this.register} />
            : null
          }

          {this.state.route === 'quiz' && this.state.answers.length < questions.length
            ? <Quiz
              saveQuizAnswer={this.saveQuizAnswer}
              questionIndex={this.state.answers.length} />
            : null
          }

          {this.state.route === 'register'
            ? <Register
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

          {this.state.answers.length === questions.length && this.state.route != 'animals'
            ? <ShowThemTheCat
              answers={this.state.answers}
              username={this.state.username}
              setRoute={this.setRoute}
              restartQuiz={this.restartQuiz}
            />
            : null
          }

            {this.state.route === 'animals'
            ? <AnimalCards
              results = {this.state.animals}
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