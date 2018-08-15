const can = (state, getters) => (permission, instance = null, id = null) => {
  if(id != null && typeof id !== 'string') id = String(id);

  if (getters['hasPermission'](permission, instance, id)) {
    return getters['getPermission'](permission, instance, id)['allowed'];
  }
  // else
  if (getters['hasPermission'](permission, instance)) {
    return getters['getPermission'](permission, instance)['allowed'];
  }
  // else
  if (getters['hasPermission'](permission)) {
    return getters['getPermission'](permission)['allowed'];
  }

  return false;
}

/**
 * check if permission exists
 */

const hasPermission = state => (permission, instance = null, id = null) => {
  if(!state.permissions[permission]) return false;

  return !!(state.permissions[permission].filter(perm => {
    return (perm.instance === instance && perm.id === id);
  })).length;
}

/**
 * Get specific permission
 */

const getPermission = state => (permission, instance = null, id = null) => {
  if(!state.permissions[permission]) return false;

  let local_permissions = state.permissions[permission].filter(perm => {
    return (perm.instance === instance && perm.id === id);
  });

  return (local_permissions.length >= 0) ? local_permissions[0] : false;
}

/**
 * Get all permissions
 */

const permissions = state => {
  return state.permissions || {}
}

export default {
  can,
  hasPermission,
  getPermission,
  permissions
}