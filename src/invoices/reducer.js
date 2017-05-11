import ACTION_TYPES from './actionTypes'

const invoice = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_INVOICE:
      return {
        id: action.id,
        desc: action.desc,
        status: action.status
      }
    case ACTION_TYPES.EDIT_INVOICE:
      if (state.id !== action.id) {
        return state
      }
      break

    default:
      return state
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_INVOICE:
      return [
        ...state,
        invoice(undefined, action)
      ]
    case ACTION_TYPES.DELETE_INVOICE:
      return state
    case ACTION_TYPES.EDIT_INVOICE:
      return state.map(t =>
        invoice(t, action)
      )
    default:
      return state
  }
}

export default reducer
