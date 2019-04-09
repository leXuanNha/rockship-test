import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Columns,
  Column,
  Card,
  Field,
  Label,
  Control,
  Input,
  Button
} from "bloomer";
import firebaseApp from "../../config/firebase";
import * as AuthActionType from "../constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false
    };
  }

  handleChangeInput = (e, field) => {
    this.setState({
      [field]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      error: "",
      isLoading: true
    });

    const { email, password } = this.state;

    try {
      const user = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password);

      this.props.dispatch({
        type: AuthActionType.SET_CURRENT_USER,
        data: user.user
      });

      localStorage.setItem("rockship_uid", user.user.uid);

      this.props.history.push("/");
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false
      });
    }
  };

  handleClickRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    const { email, password, isLoading } = this.state;

    const disabledLoginBtn = !email || !password;

    return (
      <Columns isCentered>
        <Column isSize="1/2">
          <Card>
            <h2>Login</h2>
            <Field>
              <Label>Email</Label>
              <Control>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={e => this.handleChangeInput(e, "email")}
                />
              </Control>
            </Field>
            <Field>
              <Label>Password</Label>
              <Control>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => this.handleChangeInput(e, "password")}
                />
              </Control>
            </Field>
            <Field isGrouped>
              <Control>
                <Button
                  isColor="primary"
                  onClick={this.handleSubmit}
                  disabled={disabledLoginBtn}
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </Control>
              <Control>
                <Button isLink onClick={this.handleClickRegister}>
                  Register
                </Button>
              </Control>
            </Field>
          </Card>
        </Column>
      </Columns>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserStore: state.UserStore
  };
};

export default connect(mapStateToProps)(Login);
