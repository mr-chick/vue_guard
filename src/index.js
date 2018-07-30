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
    

    can (rule) {
      return this._store.getters['guard/can'](rule);
    },

    cannot (rule) {
      return !this.can(rule);
    },

    cant (rule) {
      return this.cannot(rule);
    },

    listRules () {
      return this._store.getters['guard/rules'];
    },

    allow (rule) {

      // rule must be a string
      if(!(typeof rule === "string")) {
        throw new TypeError('Invalid rule!');
      }
      
      this._store.dispatch('guard/allow',{'rule': rule}, {'root': true});
    },

    disallow (rule) {
      this._store.dispatch('guard/disallow', {'rule': rule}, {'root': true});
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