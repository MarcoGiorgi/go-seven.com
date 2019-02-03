import * as pdsp from "pdsp"
import * as React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import {
  Box,
  Button,
  Checkbox,
  Column,
  Content,
  Control,
  Field,
  Image,
  Media,
  Message,
  Modal,
  Section,
  Title,
} from "trunx"

import EmailField from "../components/EmailField"
import PasswordField from "../components/PasswordField"

import {
  enter,
  IAuthenticationState,
  ICredentials,
} from "../reducers/authentication"

import Dashboard from "./Dashboard"
import Homepage from "./Homepage"

interface IProps {
  authentication: IAuthenticationState
  enter: (ICredentials) => void
}

interface IState {
  redirect?: string
}

class Enter extends React.Component<IProps, IState> {
  static path = "/enter"

  state: IState = {}

  private emailRef = React.createRef<HTMLInputElement>()
  private passwordRef = React.createRef<HTMLInputElement>()

  onClickLogo = (event) => {
    this.setState({
      redirect: Homepage.path
    })
  }

  onSubmit = (event) => {
    pdsp(event)

    const email = this.emailRef.current && this.emailRef.current.value
    const password = this.passwordRef.current && this.passwordRef.current.value

    this.props.enter({ email, password })
  }

  render() {
    const {
      authentication,
    } = this.props

    const {
      redirect,
    } = this.state

    if (redirect) {
      return (
        <Redirect push to={redirect} />
      )
    }

    if (authentication.isValid) {
      return (
        <Redirect push to={Dashboard.path} />
      )
    }

    return (
      <Modal isActive>
        <Modal.Background />

        <Modal.Content>
          <Column>
            <Box>
              <Media>
                <Media.Left>
                  <Image onClick={this.onClickLogo} width="28" height="28" src="media/logo.svg" />
                </Media.Left>

                <Media.Content>
                  <Content hasTextCentered>
                    <Title is4 hasTextGrey>Enter GoSeven</Title>
                  </Content>
                </Media.Content>
              </Media>

              <form
                autoComplete="on"
                onSubmit={this.onSubmit}
              >
                <EmailField
                  inputRef={this.emailRef}
                />

                <PasswordField
                  inputRef={this.passwordRef}
                />

                <Field>
                  <Control>
                    <Button
                      isLoading={authentication.isWaiting}
                      isSuccess
                      type="submit"
                      value="Enter"
                    />
                  </Control>
                </Field>
              </form>
            </Box>
          </Column>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => ({
  enter: (credentials) => dispatch(enter(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Enter)
