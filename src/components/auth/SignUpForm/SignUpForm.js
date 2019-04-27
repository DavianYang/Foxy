import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { insertUser } from '../../../actions/usersAction';

class SignUpForm extends React.Component {

    constructor(props){
        super(props);
        this.name = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
        this.confirm_password = React.createRef();

        this.state = {
            completeSignUp: false
        };
    }

    handOnSubmit = e => {
        e.preventDefault();

        if(this.password.current.value === this.confirm_password.current.value){
            this.props.insertUser(
                {
                    name: this.name.current.value,
                    email: this.email.current.value,
                    password: this.password.current.value
                },
                () => {
                    this.setState({
                        completeSignUp: true
                    })});
        };
    };

    render(){
        console.log('SignUpState', this.state.completeSignUp);
        if(this.state.completeSignUp) return <Redirect to="/" />
        
        return(
            <div className="section-form">
                <div className="row">
                    <div className="card">
                        <div className="card__form">
                            <form className="form" onSubmit={this.handOnSubmit}>
                                <h2 className="card__heading u-margin-bottom-medium">
                                    Sign Up
                                </h2>

                                <div className="form__group">
                                    <input type="text" className="form__input" placeholder="Full Name" id="name" ref={this.name} />
                                    <label htmlFor="name" className="form__label">Full Name</label>
                                </div>

                                <div className="form__group">
                                    <input type="email" className="form__input" placeholder="Email Address" id="email" ref={this.email} />
                                    <label htmlFor="email" className="form__label">Email Address</label>
                                </div>

                                <div className="form__group">
                                    <input type="password" className="form__input" placeholder="Enter Password" id="password" ref={this.password} />
                                    <label htmlFor="password" className="form__label">Enter Password</label>
                                </div>

                                <div className="form__group">
                                    <input type="password" className="form__input" placeholder="Confirm Password" id="confirm_password" ref={this.confirm_password} />
                                    <label htmlFor="confirm_password" className="form__label">Confirm Password</label>
                                </div>

                                <div className="form__group">
                                    <button className="btn btn--yellow" type="submit">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    insertUser
}

export default connect(null, mapDispatchToProps)(SignUpForm);