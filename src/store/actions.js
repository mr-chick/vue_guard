const allow = ({ commit, getters }, { permission, instance = null, id = null }) => {
  // check if already exist
  if(!getters['hasPermission'](permission, instance, id)) {
    commit('ADD_PERMISSION', { permission, instance, id });
  }

  // then, disallow it
  commit('ALLOW_DISALLOW_PERMISSION', { permission, instance, id, 'allow_value': true });
}

const disallow = ({ commit, getters }, { permission, instance = null, id = null }) => {
  // check if already exist
  if(!getters['hasPermission'](permission, instance, id)) {
    commit('ADD_PERMISSION', { permission, instance, id });
  }

  // then, disallow it
  commit('ALLOW_DISALLOW_PERMISSION', { permission, instance, id, 'allow_value': false });
}

export default {
  allow,
  disallow
}

