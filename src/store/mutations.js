
const ADD_RULE = (state, {rule, id=null}) => {
  state.rules = Object.assign({}, state.rules, { [rule]: {
    id
  }
  })
}

const REMOVE_RULE = (state, {rule}) => {
  delete state.rules[rule];
  state.rules = Object.assign({}, state.rules);
}

const RESET_STATE = state => {
  state.rules = Object.assign({}, {});
}

export default {
  ADD_RULE,
  REMOVE_RULE,
  RESET_STATE
}
