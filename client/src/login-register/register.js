import React from 'react';
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

const Signup = styled.form`
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

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        errorMessage: null
      };
    }
  
    handleChanges = e => {
      e.preventDefault();
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    };
  
    handleSubmit = e => {
      e.preventDefault();
      const endpoint =
        'http://localhost:5000/register';
      axios
        .post(endpoint, {
          username: this.state.username,
          password: this.state.password
        })
        .then(res => {
          console.log(res.data);
          localStorage.setItem("jwt", res.data.token);
          this.props.history.push("/users");
        })
        .catch(err => {
          this.setState({ errorMessage: err.response.data.message });
        });
    };
  
    render() {
        return(
            <FormContainer>
                <h1>Register</h1>
                <Signup onChange={this.handleRegisterChange} onSubmit={this.handleRegister}>
                <h2>Username:</h2>
                <input type="text" name="username" required/>
                <h2>Password:</h2>
                <input type="password" name="password" required/>
                <button type="submit">Register</button>
            </Signup>
            </FormContainer>
        )
    }
}

export default Register;