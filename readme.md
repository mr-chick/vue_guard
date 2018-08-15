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

You can add an `Instance` and an `ID` to the allow / disallow, and it will be a more specific way of setting permission

`this.$guard.allow('i-can-do-this','User','12')`

That means, only the `can('i-can-do-this', 'User', '12')` will return true, anything else, will allow false.

#### To disallow a permission

`this.$guard.disallow('i-can-do-this')`

Same as allow, you can pass the optional `Instance` and `ID` if you need more granual permissions

You use disallow when you use a specific permission, for a specific Instance / ID, but you still want a global permission

For ex

```
this.$guard.allow('i-can-do-this')
this.$guard.disallow('i-can-do-this', 'User', 12)
```

will return false only for `this.$guard.can('i-can-do-this', 'User', 12)`
`this.$guard.can('i-can-do-this', 'User', {any_other_id})` or `this.$guard.can('i-can-do-this', { Any other instance })` or `this.$guard.can('i-can-do-this')` will return true


### getters

#### To check if you can do something, you can use 

`this.$guard.can('i-can-do-this')` returns true if permission exists, false if not

You can pass the optional parameters Instance and ID for more granual check

`this.$guard.can('permission')`

`this.$guard.can('permission', 'Instance')`

`this.$guard.can('permission', 'Instance', 'ID')`


#### The inverse is `cannot` or `cant` with the same parameters

`this.$guard.cannot('permission', 'Instance', 'ID')`

`this.$guard.cant('permission', 'Instance', 'ID')` (alias for cannot)


#### you can get the list object via `this.$guard.listPermissions()` 


#### the permissions are so the getters will update if you use `allow` / `disallow`
