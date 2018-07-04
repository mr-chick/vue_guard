
const ADD_RULE = (state, {type, key, value}) => {
  console.log(type, key, value);
  if(!state[type]) state[type] = {};
  if(!state[type][key]) state[type][key] = {};
  
  state[type][key][value] = 'bar';
}

const RESET_STATE = state => {
  state.ability = {}
}

export default {
  ADD_RULE,
  RESET_STATE
}
