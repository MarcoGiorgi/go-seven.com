import { ticTacToe } from "i-am-not-a-robot"
import pdsp from "pdsp"
import * as React from "react"
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
  Title,
} from "trunx"

import EmailField from "../components/EmailField"
import PasswordField from "../components/PasswordField"

import PrivacyPolicy from "./PrivacyPolicy"
import TermsOfService from "./TermsOfService"

interface IProps {
}

interface IState {
  isHuman: boolean
}

export default class CreateAccount extends React.Component<IProps, IState> {
  static path = "/create-account"

  state = {
    isHuman: false
  }

  private antispamRef = React.createRef<HTMLInputElement>()
  private emailRef = React.createRef<HTMLInputElement>()
  private passwordRef = React.createRef<HTMLInputElement>()

  componentDidMount() {
    this.loadAntiSpam()
  }

  loadAntiSpam() {
    ticTacToe(this.antispamRef.current, () => {
      this.setState({ isHuman: true })
    })
  }

  onSubmit = (event) => {
    pdsp(event)
  }

  render() {
    const {
      isHuman
    } = this.state

    return (
      <Modal isActive>
        <Modal.Background />

        <Modal.Content>
          <Column>
            <Box>
              <Media>
                <Media.Left>
                  <Image is32x32 src="media/logo-32x32.png" />
                </Media.Left>

                <Media.Content>
                  <Content>
                    <Title is4 hasTextGrey>Create a Go7 account</Title>
                  </Content>
                </Media.Content>
              </Media>

              <form
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
                    <Checkbox>
                      I agree to the <a href={PrivacyPolicy.path} target="_blank">Privacy Policy</a>
                      and to the <a href={TermsOfService.path} target="_blank">Terms of Service</a>.
                    </Checkbox>
                  </Control>
                </Field>

                <Field>
                  <Control>
                    <Button
                      isSuccess
                      isSrOnly={!isHuman}
                      type="submit"
                      value="Create an account"
                    />
                  </Control>
                </Field>
              </form>

              {!isHuman && (
                <Message>
                  <Message.Header>
                    <p>Are you a robot? Play tic tac toe!</p>
                  </Message.Header>

                  <Message.Body>
                    <div ref={this.antispamRef} />
                  </Message.Body>
                </Message>
              )}
            </Box>
          </Column>
        </Modal.Content>
      </Modal>
    )
  }
}
