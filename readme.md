# Info

This is a basic "guard" that you can use with simple permissions

This is still *work in progress*, but the basic works.

There will be a vue directive guard too in the near future.

### Install

#### Install the package 

```js
npm i @mr_chick/vue_guard
```

#### with the package installed, you have to import it in your vue project

```js
import guard from '@mr_chick/vue_guard'
```

#### then, you have to initialize the plugin
#### the plugin uses vuex to store the permissions, so you *must* provide the store object to the plugin

`Vue.use(guard, {'store': store});
`

### Usage

#### You have access to the guard via `this.$guard` (or a directive, soon)


#### To allow a permission

`this.$guard.allow('i-can-do-this');`

#### To remove a permission

`this.$guard.disallow('i-can-do-this')`


#### To check if you can do something, you can use 

`this.$guard.can('i-can-do-this')` returns true if rule exists, false if not

### getters

`this.$guard.can('rule')`

`this.$guard.cannot('rule')`

`this.$guard.cant('rule')` (alias for cannot)


#### you can get the list object via `this.$guard.listRules()`


#### the rules are so the getters will update if you use `allow` / `disallow`
