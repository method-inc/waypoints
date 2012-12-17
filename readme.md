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
  Waypoints
    .debug(true)
    .intercept('a')
    .ignore('.external')
    .resume(onReady);

  function onReady() {
    // At this point, we know our application has restored its state and is in the right place.

    // If the web app was opened from the home screen, it has been redirected to the last
    // location the user had navigated to.
  }
</script>
```
