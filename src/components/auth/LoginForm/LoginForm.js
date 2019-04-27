import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { loginUser, fetchUsers } from '../../../actions/usersAction';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.name = React.createRef();
        this.password = React.createRef();
        this.props.fetchUsers();

        this.state = {
            redirectToReferrer: false
        }
    }

    handOnSubmit = e => {
        e.preventDefault();

        const name = this.name.current.value;
        const password = this.password.current.value;


        const currentUser = this.props.users.find(user => user.name === name && user.password === password);
        console.log("Users", this.props.users);

        if(currentUser){
            this.props.loginUser(
                currentUser,
                () => {
                    this.setState({redirectToReferrer: true});
                }
            )
        } else {
            alert("Wrong Password");
        }

        console.log(currentUser);
    }


    render(){
        

        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if(redirectToReferrer) return <Redirect to={from} />

        return(
            <div className="section-form">
                <div className="row">
                    <div className="card">
                        <div className="card__form">
                            <form className="form" onSubmit={this.handOnSubmit}>
                                <h2 className="card__heading u-margin-bottom-medium">
                                    Login
                                </h2>

                                <div className="form__group">
                                    <input type="text" className="form__input" placeholder="Full Name" id="name" ref={this.name}/>
                                    <label htmlFor="name" className="form__label">Full Name</label>
                                </div>

                                <div className="form__group">
                                    <input type="password" className="form__input" placeholder="Enter Password" id="password" ref={this.password}/>
                                    <label htmlFor="password" className="form__label">Enter Password</label>
                                </div>

                                <div className="form__group">
                                    <button className="btn btn--yellow" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = {
    loginUser,
    fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);