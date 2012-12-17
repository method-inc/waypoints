# Waypoints

Drop-in [web app mode](http://developer.apple.com/library/ios/#DOCUMENTATION/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) navigation fixes for HTML5 mobile apps on iOS.

Waypoints fixes these iOS web app quirks:
  * Links opening in Safari (instead if in your app).
  * Location and history being abandoned as soon as your app is closed.

```js
Waypoints.intercept('a').resume();
```

## Usage

```html
<script type='text/javascript' src='waypoints.js'></script>
<script>
  Waypoints.intercept('a').resume();
</script>
```
