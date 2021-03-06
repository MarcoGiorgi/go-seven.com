import * as pdsp from "pdsp"
import * as React from "react"
import { connect } from "react-redux"
import {
  Button,
} from "trunx"

import Navbar from "../components/Navbar"

import {
  deleteAccount,
  exit,
  IAuthentication,
} from "../reducers/account"

interface IProps {
  authentication: IAuthentication
  deleteAccount: () => void
  exit: () => void
  isDeletingAccount: boolean
}

class Settings extends React.Component<IProps> {
  static path = "/settings"

  onClickDeleteAccount = (event) => {
    pdsp(event)

    this.props.deleteAccount()
  }

  render() {
    const {
      authentication,
      deleteAccount,
      exit,
      isDeletingAccount,
    } = this.props

    if (authentication === null) {
      return null
    }

    return (
      <React.Fragment>
        <Navbar noMenu />

        <Button
          isDanger
          isLoading={isDeletingAccount}
          onClick={this.onClickDeleteAccount}
        >
          Delete Account
        </Button>

      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.account.authentication,
  isDeletingAccount: state.account.isDeleteing,
})

const mapDispatchToProps = (dispatch) => ({
  deleteAccount: (url) => dispatch(deleteAccount()),
  exit: () => dispatch(exit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
