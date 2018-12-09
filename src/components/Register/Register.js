import React from 'react';
//({onRouteChange})
const DATABASE_ADDRESS = 'http://127.0.0.1:3000/';
// const DATABASE_ADDRESS = 'https://shrouded-plateau-99023.herokuapp.com/';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    };
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    };
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };
    onSubmitRegister = () => {
        console.log('onSubmitRegister');
        fetch(DATABASE_ADDRESS + 'register',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            })
            .then(response => response.json())
            .then(userData => {
                console.log('onSubmitRegister', userData);
                if (userData.id) {
                    this.props.loadUser(userData)
                    this.props.onRouteChange('home');
                } else {
                    console.log('onSubmitRegister registration failed');
                }
            })
            .catch(err => console.log('onSubmitRegister err', err.error));
    };


    render = () =>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="text"
                                   name="name" id="name"
                                   onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="email"
                                   name="email-address" id="email-address"
                                   onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="password" name="password" id="password"
                                   onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                               type="submit"
                               value="Register"
                               onClick={this.onSubmitRegister}
                        />
                    </div>
                </div>
            </main>
        </article>;
}