const ability = state => (ability) => {
  // console.log("has property", state.ability.hasOwnProperty(ability));
  return (state.ability.hasOwnProperty(ability)) ? true : false;
}

export default {
  ability
}  