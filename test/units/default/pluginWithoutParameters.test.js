// https://markus.oberlehner.net/blog/testing-vuex-powered-vue-components-with-jest/
// https://github.com/metachris/vue-highlightjs/blob/master/test/index.test.js
// https://www.metachris.com/2017/05/how-to-test-vue.js-plugins-and-extensions/

// describe('testing plugin with options', function() {
//   const options = {
//     'debug': true
//   }
//   Vue.use(guard.default, options);

//   vm = new Vue({
//     template,
//     data: {
//       'foo': 'bar'
//     },
//   }).$mount();

//   test('debug should be set to true', function() {
//     expect(vm.$guard.debug).toEqual(true);
//   });

//   // test('can function', function() {
//   //   expect(vm.$guard.can(['bla','bla'])).toEqual(['bla','bla']);
//   // });

//   // test('can should return ? if ability doesn\'t exist', function() {
//   //   expect(vm.$guard.hasAbility('not_an_actual_ability')).toEqual(false);
//   // });
// });