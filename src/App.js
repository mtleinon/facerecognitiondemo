import React, { Component } from 'react';
import './App.css';
import { Navigation} from "./components/Navigation/Navigation";
import { Logo } from "./components/Logo/Logo";
import { ImageLinkForm} from "./components/ImageLinkForm/ImageLinkForm";
import {Rank} from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import {FaceRecognition} from "./components/FaceRecognition/FaceRecognition";
import {SignIn} from "./components/SignIn/SignIn";
import {Register} from "./components/Register/Register";

const DATABASE_ADDRESS = 'http://127.0.0.1:3000/';
// const DATABASE_ADDRESS = 'https://shrouded-plateau-99023.herokuapp.com/';

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

const initialState = {
    input: '',
    imageUrl: '',
    boxes: [{}],
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {

  constructor() {
      super();
      this.state = {
          input: '',
          imageUrl: '',
          boxes: [{}],
          route: 'signin',
          isSignedIn: false,
          user: {
              id: '',
              name: '',
              email: '',
              entries: 0,
              joined: ''
          }
      }
  }

  loadUser = (userData) => {
      this.setState({user: {
         id: userData.id,
         name: userData.name,
         email: userData.email,
         entries: userData.entries,
         joined: userData.joined
      }});
  };

  componentDidMount() {
      fetch(DATABASE_ADDRESS)
          .then(response => {
              console.log('componentDidMount: fetch');
              console.log('componentDidMount', response);
          });
      console.log('componentDidMount');
  }
  onInputChange = (event) => {
      console.log(event.target.value);
      this.setState({input: event.target.value});
      console.log(this.state.input);
  };

  calculateAllFaceLocations(response) {
      let faceLocations = [];
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      response.outputs[0].data.regions.forEach((region) => {
          const clarifaiFace= region.region_info.bounding_box;
          faceLocations.push({
              leftCol: clarifaiFace.left_col * width,
              topRow: clarifaiFace.top_row * height,
              rightCol: width - (clarifaiFace.right_col * width),
              bottomRow: height - (clarifaiFace.bottom_row * height)
          });
      });
      return faceLocations;
  }

  displayFaceBoxes = (boxes) => {
      this.setState({boxes: boxes});
  };

  onSubmitButton = (event) => {
    this.setState({imageUrl: this.state.input, boxes: [{}]});
    fetch(DATABASE_ADDRESS + 'imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {input: this.state.input}
            )
    })
    .then(response => response.json())
    .then(response => {
        if (response) {
            fetch(DATABASE_ADDRESS + 'image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                })
            })
            .then(response => response.json())
            .then(count => {
                this.setState(Object.assign(
                    this.state.user, { entries: count}))
            })
            .catch(console.log);
        }
        this.displayFaceBoxes(this.calculateAllFaceLocations(response));
    })
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
      if (route === 'signin') {
          this.setState(initialState);
      } else if (route === 'home') {
          this.setState({isSignedIn: true})
      }
      this.setState({route: route});
  };

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}></Navigation>
          {this.state.route === 'home'
            ?   <div>
                    <Logo></Logo>
                    <Rank name={this.state.user.name}
                            entries={this.state.user.entries}/>
                    <ImageLinkForm
                        onInputChange={this.onInputChange}
                        onSubmitButton={this.onSubmitButton}></ImageLinkForm>
                    <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}></FaceRecognition>
                </div>
            : (this.state.route === 'signin'
                ? <SignIn loadUser={this.loadUser}
                          onRouteChange={this.onRouteChange}/>
                : <Register
                          loadUser={this.loadUser}
                          onRouteChange={this.onRouteChange}/>
              )
          }
      </div>
    );
  }
}

export default App;
