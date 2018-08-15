import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'

import Vuex from 'vuex'
// import guard from 'dist/build.js'
import guard from 'app'

describe('Plugin', () => {
  describe('missing parameters', () => {
    it('should throw MissingStore', () => {
      let localVue = createLocalVue();
      expect(() => { localVue.use(guard, {}); }).toThrow('MissingStore');
    })

    it('invalid store. should throw InvalidOptions', () => {
      let localVue = createLocalVue();
      localVue.use(Vuex);
      const store = new Vuex.Store();

      expect(() => { localVue.use(guard, {
        'store': {}
      }); }).toThrow('InvalidStore');
    })
  });
  describe('valid parameters', () => {
    it('valid store. should pass', () => {
      let localVue = createLocalVue();
      localVue.use(Vuex);
      const store = new Vuex.Store();
      localVue.use(guard, {
        'store': store
      });
    });
    it('adds an $guard method to the Vue prototype', () => {
      let localVue = createLocalVue();
      localVue.use(Vuex);
      const store = new Vuex.Store();
      localVue.use(guard, {
        'store': store
      });
      expect(typeof localVue.prototype.$guard).toBe('object');
    });

    describe('permissions', () => {
      let localVue = createLocalVue();
      localVue.use(Vuex);
      const store = new Vuex.Store();
      localVue.use(guard, {
        'store': store
      });

      it('should return false to non existing permission', () => {
        expect(localVue.prototype.$guard.can('permission-that-does-not-exist')).toBe(false);
      });

      it('should return true to negate an non existing permission', () => {
        expect(localVue.prototype.$guard.cannot('permission-that-does-not-exist')).toBe(true);
      })

      it('should return an empty list of permissions', () => {
        expect(Object.keys(localVue.prototype.$guard.listpermissions()).length).toBe(0);
      })

      it('should throw invalid permission on empty permission', () => {
        expect(() => { localVue.prototype.$guard.allow(); }).toThrow('Invalidpermission');
      })

      it('should throw invalid instance on empty instance', () => {
        expect(() => { localVue.prototype.$guard.allow('can-do-suff', {}); }).toThrow('InvalidInstance');
      })

      it('should increase permissions count by adding a permission', () => {
        // add permission 
        localVue.prototype.$guard.allow('can-do-stuff');
        localVue.prototype.$guard.allow('can-do-stuff','Client');
        localVue.prototype.$guard.allow('can-do-other-stuff','Client');
        localVue.prototype.$guard.allow('can-do-other-stuff','Client','1');
        
        expect(Object.keys(localVue.prototype.$guard.listpermissions()).length).toBe(2);
      })
    });
  });

  describe('allow multiple', () => {
    let localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store();
    localVue.use(guard, {
      'store': store
    });

    it ('should not add duplicates', () => {
      // add permission 
      localVue.prototype.$guard.allow('can-do-stuff');
      localVue.prototype.$guard.allow('can-do-stuff');
      localVue.prototype.$guard.allow('can-do-stuff','SomeInstance');
      localVue.prototype.$guard.allow('can-do-stuff', 'SomeInstance', 34);

      expect(Object.keys(localVue.prototype.$guard.listpermissions()).length).toBe(2);
    });

    describe ('check permissions', () => {
      it ('simple permission should work', () => {
        expect(localVue.prototype.$guard._store.getters['guard/hasPermission']('can-do-stuff')).toBe(true);
        expect(localVue.prototype.$guard._store.getters['guard/hasPermission']('can-do-stuff', 'Instance')).toBe(false);
        expect(localVue.prototype.$guard._store.getters['guard/hasPermission']('can-do-stuff', 'Instance', 1)).toBe(false);
      });
      
      it ('should work with permission with instance', () => {
        expect(localVue.prototype.$guard._store.getters['guard/hasPermission']('can-do-stuff', 'SomeInstance')).toBe(true);
      });
       
      it ('should work with permission with instance AND id', () => {
        expect(localVue.prototype.$guard._store.getters['guard/hasPermission']('can-do-stuff', 'SomeInstance', 34)).toBe(true);  
      })
    })
    

    describe ('check can', () => {
      it('should return true for simple permission', () => {
        expect(localVue.prototype.$guard.can('can-do-stuff')).toBe(true);
      });
      it('should return false for non existing for simple permission', () => {
        expect(localVue.prototype.$guard.can('can-doz-stuff')).toBe(false);
      });
      it('should return true for simple permission, with correct instance', () => {
        expect(localVue.prototype.$guard.can('can-do-stuff','SomeInstance')).toBe(true);
      });
      it('should return true for simple permission, with non existing instance', () => {
        expect(localVue.prototype.$guard.can('can-do-stuff','WrongInstance')).toBe(true);
      });
      it('should return true for simple permission, with correct instance, with correct id', () => {
        expect(localVue.prototype.$guard.can('can-do-stuff','SomeInstance', 34)).toBe(true);
      });
      it('should return true for simple permission, with correct instance, with wrong id', () => {
        expect(localVue.prototype.$guard.can('can-do-stuff','WrongInstance', 34)).toBe(true);
      });
    })

    describe ('disallow', () => {
      // add permission 
      it ('should allow can-do-foobs', () => {
        localVue.prototype.$guard.allow('can-do-foobs');  
        expect(localVue.prototype.$guard.can('can-do-foobs')).toBe(true);
      })
      it ('should disallow can-do-foobs', () => {
        localVue.prototype.$guard.disallow('can-do-foobs');  
        expect(localVue.prototype.$guard.can('can-do-foobs')).toBe(false);
      })
      it ('should allow can-do-foobs', () => {
        localVue.prototype.$guard.allow('can-do-foobs');  
        expect(localVue.prototype.$guard.can('can-do-foobs')).toBe(true);
      })
      it ('should return false to can-do-bars, Instance', () => {
        expect(localVue.prototype.$guard.can('can-do-bars', 'Instance')).toBe(false);
      })
      it ('should return true to can-do-bars, Instance', () => {
        localVue.prototype.$guard.allow('can-do-bars', 'Instance'); 
        expect(localVue.prototype.$guard.can('can-do-bars', 'Instance')).toBe(true);
      })
      it ('should return false to can-do-bars, Instance', () => {
        localVue.prototype.$guard.allow('can-do-bars'); 
        localVue.prototype.$guard.disallow('can-do-bars', 'Instance'); 
        expect(localVue.prototype.$guard.can('can-do-bars', 'Instance')).toBe(false);
        expect(localVue.prototype.$guard.can('can-do-bars')).toBe(true);
      })
      
      it ('should return false to can-do-bars, Instance, 12', () => {
        localVue.prototype.$guard.allow('can-do-bars', 'Instance', '12'); 
        localVue.prototype.$guard.disallow('can-do-bars', 'Instance', '13'); 
        expect(localVue.prototype.$guard.can('can-do-bars', 'Instance', 12)).toBe(true);
        expect(localVue.prototype.$guard.can('can-do-bars', 'Instance', 13)).toBe(false);
      })

    })
  });
});