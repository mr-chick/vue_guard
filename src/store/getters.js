const ability = state => (ability) => {
  // console.log("has property", state.ability.hasOwnProperty(ability));
  return (state.ability.hasOwnProperty(ability)) ? true : false;
}

const abilities = state => {
  return state.ability || {}
}

export default {
  ability,
  abilities
}  