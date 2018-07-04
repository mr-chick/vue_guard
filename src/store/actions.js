const addRule = ({ commit }, payload) => {
  console.log("adding rule");
  commit('ADD_RULE', payload)
}

export default {
  addRule
}
