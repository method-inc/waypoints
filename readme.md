# Waypoints

Drop-in fixes for [web app mode](http://developer.apple.com/library/ios/#DOCUMENTATION/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) navigation on iOS.

  1. Fixes links exiting full-screen mode.
  2. Fixes losing state when backgrounded.
  3. Fixes forward/back navigation (`history.go`).
  3. Fixes creating new browser windows (`window.open`)

```js
Waypoints.intercept('a').resume();
```

## The Problem

You want your users to be able to use your HTML5 app like a native app. However:

### 1. iOS opens links in a new Safari window instead of navigating within your full-screen app.
* [http://stackoverflow.com/questions/12161479/apple-mobile-web-app-capable-site-switches-to-mobile-safari-after-logout](http://stackoverflow.com/questions/12161479/apple-mobile-web-app-capable-site-switches-to-mobile-safari-after-logout)
* [http://stackoverflow.com/questions/6429492/how-do-you-keep-an-iphone-ipad-web-app-in-full-screen-mode](http://stackoverflow.com/questions/6429492/how-do-you-keep-an-iphone-ipad-web-app-in-full-screen-mode)

### 2. Web app mode forgets history as soon as your app loses focus, kicking the user back to home.
* [http://stackoverflow.com/questions/6930771/stop-reloading-of-web-app-launched-from-iphone-home-screen](http://stackoverflow.com/questions/6930771/stop-reloading-of-web-app-launched-from-iphone-home-screen)
* [http://stackoverflow.com/questions/4291784/stop-native-web-app-from-reloading-itself-upon-opening-on-ios](http://stackoverflow.com/questions/4291784/stop-native-web-app-from-reloading-itself-upon-opening-on-ios)
* [http://stackoverflow.com/questions/12816286/resume-webapp-from-previous-position](http://stackoverflow.com/questions/12816286/resume-webapp-from-previous-position)

### 3. You can't navigate back/forward from within a full-screen web app.
* [http://stackoverflow.com/questions/8884376/iphone-safari-web-app-opens-links-in-new-window-when-using-javascripthistory-go](http://stackoverflow.com/questions/8884376/iphone-safari-web-app-opens-links-in-new-window-when-using-javascripthistory-go)

### 4. Opening a new browser window (target='_new') from within JavaScript doesn't work in full-screen mode.
* [http://stackoverflow.com/questions/8436676/iphone-window-openurl-blank-does-not-open-links-in-mobile-safari](http://stackoverflow.com/questions/8436676/iphone-window-openurl-blank-does-not-open-links-in-mobile-safari)
* [http://stackoverflow.com/questions/8738873/open-external-page-from-iphone-web-app-using-javascript](http://stackoverflow.com/questions/8738873/open-external-page-from-iphone-web-app-using-javascript)
* [http://stackoverflow.com/questions/6766280/how-do-i-open-a-url-in-a-web-browser-from-an-ios-standalone-webapp](http://stackoverflow.com/questions/6766280/how-do-i-open-a-url-in-a-web-browser-from-an-ios-standalone-webapp)

## Using Waypoints

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
