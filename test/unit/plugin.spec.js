import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'

import Vuex from 'vuex'
import guard from 'dist/build.js'
// import guard from 'app'

describe('Plugin', () => {
  describe('missing parameters', () => {
    
    it('should throw MissingOptions', () => {
      let localVue = createLocalVue();
      expect(() => { localVue.use(guard); }).toThrow('MissingOptions');
    })

    it('should throw InvalidOptions', () => {
      let localVue = createLocalVue();
      expect(() => { localVue.use(guard, {}); }).toThrow('InvalidOptions');
    })

    it('invalid store. should throw InvalidOptions', () => {
      let localVue = createLocalVue();
      localVue.use(Vuex);
      const store = new Vuex.Store();

      expect(() => { localVue.use(guard, {
        'store': {}
      }); }).toThrow('InvalidOptions');
    })

    it('valid store. should pass', () => {
      let localVue = createLocalVue();
      localVue.use(Vuex);
      const store = new Vuex.Store();
      localVue.use(guard, {
        'store': store
      });
    });
  });
  describe('valid parameters', () => {

    it('adds an $guard method to the Vue prototype', () => {
      let localVue = createLocalVue();
      localVue.use(Vuex);
      const store = new Vuex.Store();
      localVue.use(guard, {
        'store': store
      });
      expect(typeof localVue.prototype.$guard).toBe('object');
    });

    describe('abilities', () => {
      let localVue = createLocalVue();
      localVue.use(Vuex);
      const store = new Vuex.Store();
      localVue.use(guard, {
        'store': store
      });

      it('should return false to non existing rule', () => {
        expect(localVue.prototype.$guard.can('rule-that-does-not-exist')).toBe(false);
      });

      it('shuld return true to negate an non existing rule', () => {
        expect(localVue.prototype.$guard.cannot('rule-that-does-not-exist')).toBe(true);
      })

      it('should return an empty list of rules', () => {
        expect(Object.keys(localVue.prototype.$guard.listRules()).length).toBe(0);
      })

      it('should increase rules count by adding a rule', () => {
        // add rule 
        localVue.prototype.$guard.allow({
          'rule': 'can-do-stuff'
        });
        
        expect(Object.keys(localVue.prototype.$guard.listRules()).length).toBe(1);
      })

      it('shuld return true to "can"', () => {
        expect(localVue.prototype.$guard.can('can-do-stuff')).toBe(true);
      });

      it('shuld return false to "cannot"', () => {
        expect(localVue.prototype.$guard.cannot('can-do-stuff')).toBe(false);
      })

      it('should remove the rule', () => {
        // add rule 
        localVue.prototype.$guard.disallow({
          'rule': 'can-do-stuff'
        });
      })

      it('shuld return false to "can"', () => {
        expect(localVue.prototype.$guard.can('can-do-stuff')).toBe(false);
      });

      it('shuld return true to "cannot"', () => {
        expect(localVue.prototype.$guard.cannot('can-do-stuff')).toBe(true);
      })

    });
  });
});

