
/**
 * ToDo:
 * 
 * can
 * cannot
 * 
 * has('rule-name') instead of hasAbility
 * 
 * can('edit','employee',id) // if number it defaults to id// maybe you can set this up
 * can('edit','employee',{'id': 13})
*/


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
      this.store.registerModule(['guard'], guardStore)

    this.showDebug('Store is set to ', this.store)
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

  addRule ({type, key, options} = {}) {
    // type should be string or array of strings
    if(!(typeof type === "string")) {
      throw new TypeError('Invalid type!');
      throw 'type must be a string';
    }

    // key must be a string
    if(!(typeof key === "string")) {
      throw new TypeError('Invalid key!');
    }

    // options must be an object
    if(!(typeof options === "object")) {
      throw new TypeError('Invalid options!');
    }

    
    this.store.dispatch('guard/addRule',{'type': type, 'key': key, 'options': options},{root: true});
  }

  listAbilities () {
    return this.store.getters['guard/abilities'];
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




