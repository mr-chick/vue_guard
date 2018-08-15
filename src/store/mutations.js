
const ADD_PERMISSION = (state, {permission, instance, id}) => {
  let permission_obj = {};

  // if permission doesn't exist, make an array for it;
  if (!state.permissions[permission]) state.permissions[permission] = [];

  // if instance is null, allow all
  permission_obj = { instance, id: (instance && id) ? id : null, allowed: true }

  // add the new permission
  state.permissions[permission].push(permission_obj);

  // update the permissions, so it's reactive
  state.permissions = Object.assign({}, state.permissions);
}


const ALLOW_DISALLOW_PERMISSION = (state, {permission, instance, id, allow_value }) => {
  // permission should exist.
  // map the permissions, then filter for the permission
  const new_permissions = state.permissions[permission].map(perm => {
    if (perm.instance === instance && perm.id === id) {
      perm.allowed = allow_value;
    }

    return perm;
  });

  state.permissions = Object.assign({}, state.permissions);
}

const REMOVE_PERMISSION = (state, {permission, instance, id}) => {
  // // if instaqnce is null, remove everything
  // if(!instance) {
  //   delete state.permissions[permission];
  // }
  // else {
  //   // check if permissions exist
  //   if (state.permissions.hasOwnProperty[permission]) return false;

  //   let index_to_be_deleted = [];
  //   state.permissions[permission].forEach((perm, index) => {
  //     if((perm.instance === ((instance) ? instance : 'all') && perm.id === ((id) ? id : 'all'))) {
  //       index_to_be_deleted.push(index);
  //     }
  //   });
    
  //   index_to_be_deleted = index_to_be_deleted.sort((a, b) => b - a);

  //   index_to_be_deleted.forEach((index) => {
  //     state.permissions[permission].splice(index, 1);
  //   })
  // }

  // // update the permissions, so it's reactive
  // state.permissions = Object.assign({}, state.permissions);
}

const RESET_STATE = state => {
  state.permissions = Object.assign({}, {});
}

export default {
  ADD_PERMISSION,
  ALLOW_DISALLOW_PERMISSION,
  REMOVE_PERMISSION,
  RESET_STATE
}
