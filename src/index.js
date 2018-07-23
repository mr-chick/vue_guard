
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
    if(typeof settings === "undefined") throw 'MissingOptions';

    const default_settings = {
      'debug': false
    }

    settings = Object.assign({}, default_settings, settings || {});
    
    // checking for store
    if(
      !settings.hasOwnProperty('store') || 
      typeof settings.store !== "object" || 
      typeof settings.store.registerModule !== "function"
    ) throw 'InvalidOptions'

    // store should exist?

    this.initialize(settings);
    Vue.prototype.$guard = this;

  }

  // /**
  //  * Initializing guard
  //  */

  initialize (settings) {
    // set debugger
    if (settings.debug && typeof settings.debug === "boolean") this.debug = settings.debug;
    this.showDebug("initializing!");
    
    // set the store
      this.store = settings.store
      this.store.registerModule(['guard'], guardStore, { preserveState: !!this.store.state.guard} )

    this.showDebug('Store is set to ', this.store)
  }

  can (rule) {
    return this.store.getters['guard/can'](rule);
  }

  cannot (rule) {
    return !this.can(rule);
  }

  cant (rule) {
    return this.cannot(rule);
  }
  /** 
   * Adds a new rule
   * type - ruye type string
   * key - rule key
   * value - rule value
   */

  allow ({rule, instance = null, options = {}}) {

    // rule must be a string
    if(!(typeof rule === "string")) {
      throw new TypeError('Invalid rule!');
    }
    
    this.store.dispatch('guard/allow',{'rule': rule}, {'root': true});
  }

  disallow ({ rule }) {
    this.store.dispatch('guard/disallow', {'rule': rule}, {'root': true});
  }

  listRules () {
    return this.store.getters['guard/rules'];
  }
  
  /** 
   * Debug
   */

  showDebug (string, data = null) {
    if(this.debug) console.log(string, data)
  }
};


export default new vue_guard()




