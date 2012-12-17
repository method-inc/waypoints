# Waypoints

Drop-in HTML5 navigation fixes for [web app mode](http://developer.apple.com/library/ios/#DOCUMENTATION/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) on iOS.

  * Opens app links in your app (instead of exiting your app and opening in Safari).
  * Retains navigation for your app (instead of returning the user to the bookmarked homepage every time the app is opened).

```js
Waypoints.intercept('a').resume();
```

## The Problem

You want your users to be able to add your HTML5 app to the iOS home screen (like a native app).

However, 'web app mode' does all sorts of screwy things to your app.
If the user is interrupted by a text message while using your app, all of her navigation will be undone and she will be kicked back to the homepage.
If she clicks on a regular `<a href...>` link, your app will close and the link will be opened in Safari.

## Example

```html
<a href='/account.html'>This will stay in your app</a>
<a href='http://usesafari.com' class='external'>This will open with Safari</a>

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

# API

## .intercept(selector)

Intercepts clicks (and taps) on `selector`, opening their `href` target within the app.

Without interception, links in home-screen web apps exit the app and open in Safari.

## .resume(callback)

Restores the app's last observed state, optionally triggering a callback function once the app has been resumed.

Home-screen web apps don't have state in iOS.
Returning the user to your home screen every time they navigate away from your app, then back, is a terrible user experience.
Every time Waypoint intercepts a link, it adds that link to its own history object in LocalStorage so that your app can return the user to where she left off.

## .ignore(selector)

Intercepted clicks that match `selector` will be ignored and passed on as regular events.

Sometimes you want a link to open outside of your app (for example, a maps link).

## .debug(value)

Turns verbose console debugging on (true) or off (false). False by default.
