import React, { Component } from 'react';
import './App.css';
import { Navigation} from "./components/Navigation/Navigation";
import { Logo } from "./components/Logo/Logo";
import { ImageLinkForm} from "./components/ImageLinkForm/ImageLinkForm";
import {Rank} from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import {FaceRecognition} from "./components/FaceRecognition/FaceRecognition";
import {SignIn} from "./components/SignIn/SignIn";
import {Register} from "./components/Register/Register";

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
class App extends Component {

  constructor() {
      super();
      this.state = {
          input: '',
          imageUrl: '',
          box: {},
          route: 'signin',
          isSignedIn: false
      }
  }
  onInputChange = (event) => {
      console.log(event.target.value);
      this.setState({input: event.target.value});
      console.log(this.state.input);
  };

  calculateFaceLocation(response) {
    const clarifaiFace= response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox = (box) => {
      console.log(box);
      this.setState({box: box});
  }
  onSubmitButton = (event) => {
    // instantiate a new Clarifai app passing in your api key.
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);
    console.log(this.state.imageUrl);
    const app = new Clarifai.App({
        apiKey: 'fff7ffe539854edba72adf558d091497'
    });

    // predict the contents of an image by passing in a url
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
        .then(response =>
            this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
      if (route === 'signin') {
          this.setState({isSignedIn: false});
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
                    <Rank/>
                    <ImageLinkForm
                        onInputChange={this.onInputChange}
                        onSubmitButton={this.onSubmitButton}></ImageLinkForm>
                    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}></FaceRecognition>
                </div>
            : (this.state.route === 'signin'
                ? <SignIn onRouteChange={this.onRouteChange}/>
                : <Register onRouteChange={this.onRouteChange}/>
              )
          }
      </div>
    );
  }
}

export default App;
