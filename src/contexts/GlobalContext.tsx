import React, {createContext, Dispatch, useContext, useReducer} from "react"
import GlobalSnackbar from "../layouts/shared/Snackbar"

type GlobalState = {
  snackbar: {
    open: boolean
    severity: "success" | "info" | "warning" | "error"
    message: string
  }
  dispatch: Dispatch<ReducerAction>
}

type ReducerAction = {
  type: string
  payload?: any
}

const defaultState: GlobalState = {
  snackbar: {
    open: false,
    severity: "success",
    message: "",
  },
  dispatch: () => {}
}

const globalReducer = (state: GlobalState, action: ReducerAction) => {
  switch (action.type) {
    case "SET_SNACKBAR":
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity,
        }
      }
    case "RESET_SNACKBAR":
      return {...state, snackbar: defaultState.snackbar}
    default:
      return state
  }
}

export const GlobalContext = createContext(defaultState)

export const GlobalProvider = (props: any) => {
  const [state, dispatch] = useReducer(globalReducer, defaultState)

  const providerValue = {
    ...state,
    dispatch,
  }

  return (
    <GlobalContext.Provider value={providerValue}>
      <GlobalSnackbar open={state.snackbar.open} message={state.snackbar.message} severity={state.snackbar.severity} />
      {props.children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
