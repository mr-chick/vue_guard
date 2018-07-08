import { expect } from 'chai';
import Vue from 'vue';

import GuardTest from '@/components/GuardTest.vue';


// import guard from '../../../vue/node_modules/@mr_chick/vue_guard/dist/build.js';
import guard from '@mr_chick/vue_guard';
// import guard from '../../../src/index.js';

//../../../dist/build.js

describe('guard plugin without options', () => {
  Vue.use(guard);
  const vm = new Vue(GuardTest).$mount();

  it('shold expect debug to be false', () => {
    expect(vm.$guard.debug).to.equal(false);
  })

  describe('addRule', function() {
    it('should throw error if missing arguments', function() {
      expect(() => vm.$guard.addRule()).to.throw('Invalid type!');
    })
    it('should throw error if missing type', function() {
      expect(() => vm.$guard.addRule({'key': 'test', 'value': 'test'})).to.throw('Invalid type!');
    })
    it('should throw error if missing key', function() {
      expect(() => vm.$guard.addRule({'type': 'test', 'value': 'test'})).to.throw('Invalid key!');
    })
    it('should throw error if missing value', function() {
      expect(() => vm.$guard.addRule({'type': 'test', 'key': 'test'})).to.throw('Invalid value!');
    })
    it('should add the rule', function() {
      expect(() => vm.$guard.addRule({
        'type': 'ability',
        'key': 'employee.' + value.name,
        'value': 'foo'
      })).to.equal(true);
    })
  })
})
