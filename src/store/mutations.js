
const ADD_RULE = (state, {rule}) => {
  state.rules[rule] = null; // todo, if not null, check stuff
}

const REMOVE_RULE = (state, {rule}) => {
  delete state.rules[rule];
}

const RESET_STATE = state => {
  state.rules = Object.assign({}, {});
}

export default {
  ADD_RULE,
  REMOVE_RULE,
  RESET_STATE
}
