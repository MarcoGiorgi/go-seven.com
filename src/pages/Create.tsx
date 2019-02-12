import * as React from "react"
import { connect } from "react-redux"

import Navbar from "../components/Navbar"
import UrlCollection, { IUrlCollectionProps } from "../components/UrlCollection"
import UrlCreator, { IUrlCreatorProps } from "../components/UrlCreator"

import {
  exit,
  IAuthentication,
} from "../reducers/account"
import {
  createUrl,
  fetchCollectionIfNeeded,
  ICollectionsState,
} from "../reducers/collections"

interface IProps {
  authentication: IAuthentication
  createUrl: IUrlCreatorProps["createUrl"]
  collection: ICollectionsState["current"]
  fetchCollection: IUrlCollectionProps["fetchCollection"]
  exit: () => void
  itIsCreatingUrl: ICollectionsState["itIsCreatingUrl"]
  setWantedUrl: (IUrl) => void
  wantedUrl: ICollectionsState["wantedUrl"]
}

class Create extends React.Component<IProps> {
  static path = "/create"

  render() {
    const {
      authentication,
      collection,
      createUrl,
      exit,
      fetchCollection,
      itIsCreatingUrl,
      setWantedUrl,
      wantedUrl,
    } = this.props

    if (authentication === null) {
      return null
    }

    return (
      <React.Fragment>
        <Navbar
          authenticationIsValid={authentication.isValid}
          exit={exit}
        />

        <UrlCreator
          createUrl={createUrl}
          itIsCreating={itIsCreatingUrl}
          setUrl={setWantedUrl}
          url={wantedUrl}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  authentication: state.account.authentication,
  collection: state.collections.current,
  itIsCreatingUrl: state.collections.itIsCreatingUrl,
  wantedUrl: state.collections.wantedUrl,
})

const mapDispatchToProps = (dispatch) => ({
  createUrl: (url) => dispatch(createUrl(url)),
  exit: () => dispatch(exit()),
  fetchCollection: () => dispatch(fetchCollectionIfNeeded())
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
