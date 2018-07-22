import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'

import Vuex from 'vuex'
import guard from 'app'

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

      it('should return false to non existing ability', () => {
        expect(localVue.prototype.$guard.hasAbility('ability-that-does-not-exist')).toBe(false);
      });

      it('should return an empty list of abilities', () => {
        expect(Object.keys(localVue.prototype.$guard.listAbilities()).length).toBe(0);
      })

      it('should increase abilities count by adding an ability', () => {
        // add ability 
        localVue.prototype.$guard.addRule({
          'type': 'ability',
          'key': 'ability-name',
          'options': {}
        });
        
        expect(Object.keys(localVue.prototype.$guard.listAbilities()).length).toBe(1);
      })

      it('should return true to the ability', () => {
        expect(localVue.prototype.$guard.hasAbility('ability-name')).toBe(true);
      });
    });
  });
});

