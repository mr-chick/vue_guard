
const ADD_RULE = (state, {type, key, options}) => {
  if(!state[type]) state[type] = {};
  if(!state[type][key]) state[type][key] = {};
  
  state[type][key] = options;
}

const RESET_STATE = state => {
  state.ability = {}
}

export default {
  ADD_RULE,
  RESET_STATE
}
