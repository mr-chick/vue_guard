const can = state => (rule) => {
  return (state.rules.hasOwnProperty(rule)) ? true : false;
}

const rules = state => {
  return state.rules || {}
}

export default {
  can,
  rules
}  