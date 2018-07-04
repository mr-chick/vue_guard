
const ADD_RULE = (state, {type, key, value}) => {
  console.log(type, key, value);
  if(!state[type]) state[type] = {};
  if(!state[type][key]) state[type][key] = {};
  
  state[type][key][value] = 'bar';
}

export default {
  ADD_RULE
}
