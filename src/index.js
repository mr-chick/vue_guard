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
   * Debug
   */

  showDebug (string, data = null) {
    if(this.debug) console.log(string, data)
  }
};


export default new vue_guard(guardStore)




