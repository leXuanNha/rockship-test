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
  Button,
  Notification
} from "bloomer";
import firebaseApp from "../../config/firebase";
import * as AuthActionType from "../constants";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
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
        .createUserWithEmailAndPassword(email, password);

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

  handleClickBack = () => {
    this.props.history.push("/login");
  };

  render() {
    const { email, password, error, isLoading } = this.state;

    const disabledRegisterBtn = !email || !password;

    return (
      <Columns isCentered>
        <Column isSize="1/2">
          <Card>
            <h2>Register</h2>
            {error && <Notification isColor="danger">{error}</Notification>}
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
                  disabled={disabledRegisterBtn}
                  isLoading={isLoading}
                >
                  Register
                </Button>
              </Control>
              <Control>
                <Button isLink onClick={this.handleClickBack}>
                  Back
                </Button>
              </Control>
            </Field>
          </Card>
        </Column>
      </Columns>
    );
  }
}

export default connect()(Register);
