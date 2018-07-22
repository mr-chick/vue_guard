const allow = ({ commit }, payload) => {
  commit('ADD_RULE', payload)
}

const disallow = ({ commit }, payload) => {
  commit('REMOVE_RULE', payload)
}
export default {
  allow,
  disallow
}
