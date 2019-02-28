import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
    width: 350px;
    margin: 0 auto;
    padding: 15px;
    border: 1px solid black;
    background: rgb(26, 26, 26, 0.7);
    opacity: 0.8;
    border-radius: 5px;
    h1{
        text-align: center;
        margin: unset;
        color: white;
    }
`;

const Signin = styled.form`
    display: flex;
    flex-direction: column;
    input,button{
        padding: 10px 5px;
        margin: 5px 0;
        border: 1px solid red;
        border-radius: 5px;
    }
    button{
        margin-top: 10px
    }
    h2{
        font-size: 1.6rem;
        margin: unset;
        color: white;
    }
`;

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        errorMessage: null
      };
    }
  
    handleInputChange = event => {
        const { name, value } = event.target;
    
        this.setState({ [name]: value });
      };
    
      handleSubmit = event => {
        event.preventDefault();
    
        const endpoint = 'http://localhost:5000/login';
    
        axios
          .post(endpoint, this.state)
          .then(res => {
            localStorage.setItem('jwt', res.data.token);
    
            this.props.history.push('/users');
          })
          .catch(error => console.error(error));
      };
  
    render() {
        return(
            <FormContainer>
                <h1>Login</h1>
                <Signin onSubmit={this.handleSubmit}>
                    <h2>Username:</h2>
                    <input
                        name="username"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        type="text"
                    />
                    <h2>Password:</h2>
                    <input
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        type="password"
                    />
                    <button type="submit">Login</button>
                    <Link to='/register' style={{color: 'white'}}>No account? Click here to Register</Link>
                </Signin>
            </FormContainer>
        )
    }
}

export default Login;