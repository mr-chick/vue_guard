/**
 * Main object
 */

import guardStore from './store/';

const vue_guard = class VG {

  constructor() {
    this.debug = false;
    this.options = {}
  }


  // /**
  //  * Install function
  //  */

  install (Vue, settings) {
    // settings should be an object
    if (typeof settings !== "object") {
        // throw error
    }

    this.initialize(settings);
    Vue.prototype.$guard = this;

    // set the store
    if (settings.store && typeof settings.store === 'object') {
      this.store = settings.store
      this.showDebug('guard store', guardStore);
      this.store.registerModule(['guard'], guardStore, { preserveState: true })
    }
    this.showDebug('Store is set to ', this.store)
  }

  // /**
  //  * Initializing guard
  //  */

  initialize (settings) {
    // set debugger
    if (settings.debug && typeof settings.debug === "boolean") this.debug = settings.debug;
    this.showDebug("initializing!");

    // set broadcaster
    // if (settings.broadcaster && typeof settings.broadcaster === "object") {
    //   this.options.broadcaster.name = settings.broadcaster.name;
    //   // this.options.broadcaster.object = settings.broadcaster.object
    // }
  }

  can (rules = []) {
    console.log(rules);
  }

  /** 
   * Adds a new rule
   * type - ruye type string
   * key - rule key
   * value - rule value
   */

  addRule ({type, key, value}) {
    // type should be string or array of strings
    if(!(typeof type === "string")) {
      throw 'type must be a string';
    }

    // key must be a string
    if(!(typeof key === "string")) {
      throw 'key must be a string';
    }

    // value must be a string
    if(!(typeof value === "string")) {
      throw 'value must be a string';
    }
    
    // all should be ok

    console.log(type, key, value);
    this.store.dispatch('guard/addRule',{'type': type, 'key': key, 'value': value},{root: true});
  }


  /**
   * Has ability
   */

  hasAbility(ability) {
    // checks if the ability exist
    return this.store.getters['guard/ability'](ability);
  }
  /** 
   * Debug
   */

  showDebug (string, data = null) {
    if(this.debug) console.log(string, data)
  }
};


export default new vue_guard()




