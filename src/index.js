import guardStore from './store/';

const vue_guard = ({_guard_store = null } = {}) => {
  let _store = null;

  return {
    getDebug() { return debug; },
    setDebug(value) {
      debug = value;
      return this;
    },
    // /**
    //  * Install function
    //  * @param Vue instance
    //  * @param settings
    //  */

    install(Vue, {
      debug = 'false',
      store = null
      } = {}) {
      if(store == null) throw 'MissingStore';

      if(
        typeof store !== "object" ||
        typeof store.registerModule !== "function"
      ) throw 'InvalidStore'

      this._store = store;

      // this.showDebug('Store is set to ', this._store);

      this._store.registerModule(['guard'], _guard_store, { preserveState: !!this._store.state.guard} )

      Vue.prototype.$guard = this;
    },

    can (permission, instance = null, id = null) {
      return this._store.getters['guard/can'](permission, instance, id);
    },

    cannot (permission, instance = null, id = null) {
      return !this.can(permission, instance, id);
    },

    cant (permission) {
      return this.cannot(permission);
    },

    listpermissions () {
      return this._store.getters['guard/permissions'];
    },

    allow (permission, instance = null, id = null) {

      // permission must be a string
      if (!(typeof permission === "string")) {
        throw new TypeError('Invalidpermission');
      }

      // if instance, must be string
      if(instance && !(typeof instance === "string")) {
        throw new TypeError('InvalidInstance');
      }

      this._store.dispatch('guard/allow',{permission, instance, id}, {'root': true});
    },

    disallow (permission, instance = null, id = null) {

      // permission must be a string
      if (!(typeof permission === "string")) {
        throw new TypeError('Invalidpermission');
      }

      // if instance, must be string
      if(instance && !(typeof instance === "string")) {
        throw new TypeError('InvalidInstance');
      }

      this._store.dispatch('guard/disallow', { permission, instance, id}, {'root': true});
    },

    /**
     * Debug
     */

    showDebug (string, data = null) {
      if(this.debug) console.log(string, data)
    }
  }
}

export default vue_guard({'_guard_store': guardStore});