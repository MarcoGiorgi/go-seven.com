const AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE"
const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST"
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS"
export const CHECK_AUTHENTICATION = "CHECK_AUTHENTICATION"
const CREATE_ACCOUNT_FAILURE = "CREATE_ACCOUNT_FAILURE"
const CREATE_ACCOUNT_REQUEST = "CREATE_ACCOUNT_REQUEST"
const CREATE_ACCOUNT_SUCCESS = "CREATE_ACCOUNT_SUCCESS"
export const EXIT = "EXIT"

export interface ICredentials {
  email: string
  password: string
}

export interface IAuthenticationState {
  expiresAt?: string
  hasExpired?: boolean
  isValid: boolean
  isWaiting: boolean
  token?: string
}

const basePath = "https://api.go-seven.com/v1"

const headersForJson = {
  "Accept": "application/json",
  "Content-Type": "application/json",
}

const checkResponse = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    throw new Error(response.statusText)
  }
}

export function createAccount(credentials: ICredentials) {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_ACCOUNT_REQUEST })

    fetch(`${basePath}/account`, {
      body: JSON.stringify(credentials),
      headers: headersForJson,
      method: "POST",
    })
      .then(checkResponse)
      .then(() => { dispatch({ type: CREATE_ACCOUNT_SUCCESS }) })
      .catch((error) => { dispatch({ type: CREATE_ACCOUNT_FAILURE, error }) })
  }

}

export function enter(credentials: ICredentials) {
  return (dispatch, getState) => {
    dispatch({ type: AUTHENTICATION_REQUEST })

    fetch(`${basePath}/account`, {
      body: JSON.stringify(credentials),
      headers: headersForJson,
      method: "POST",
    })
      .then(checkResponse)
      .then(() => { dispatch({ type: AUTHENTICATION_SUCCESS }) })
      .catch((error) => { dispatch({ type: AUTHENTICATION_FAILURE, error }) })
  }

}
export function exit() { return { type: EXIT } }

export const initialState: IAuthenticationState = {
  isValid: false,
  isWaiting: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        isWaiting: false,
      }

    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        isWaiting: true,
      }

    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isValid: true,
        isWaiting: false,
      }

    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isWaiting: false,
      }

    case CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        isWaiting: true,
      }

    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isWaiting: false,
      }

    case EXIT:
      return {
        ...state,
        token: null
      }

    default: return state
  }
}
