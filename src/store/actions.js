const addRule = ({ commit }, rule) => {
  // do stuff with the rule first
  commit('ADD_CHANNEL', rule)
}

export default {
  addRule
}
