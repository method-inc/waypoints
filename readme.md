# Waypoints

Drop-in fixes for [web app mode](http://developer.apple.com/library/ios/#DOCUMENTATION/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) navigation on iOS.

  1. Fixes links exiting full-screen mode.
  2. Fixes losing state when backgrounded.
  3. Fixes forward/back navigation (`history.go`).
  3. Fixes creating new browser windows (`window.open`)

```js
Waypoints.intercept('a').resume();
```

Waypoints fixes these issues so your users can use your HTML5 app like a native app.
The [problems and fixes](#fixes) are documented in detail below.

## Using Waypoints

Waypoints depends on either Zepto or jQuery (Zepto recommended for mobile development).

### Downloads:
- [Production](https://raw.github.com/Skookum/waypoints/master/build/waypoints-0.0.1.min.js) (3kb, minified)
- [Debug](https://raw.github.com/Skookum/waypoints/master/build/waypoints-0.0.1.js) (5kb)

```html
<a href='/account.html'>This will stay in your app</a>
<a href='http://usesafari.com' class='external'>This will open with Safari</a>

<script type='text/javascript' src='zepto.js'></script>
<script type='text/javascript' src='waypoints-0.0.1.js'></script>
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

## API

### .intercept(selector)

```js
Waypoints.intercept('a'); // Handle links in your full-screen app (and not in Safari)
```

### .resume(callback)

```js
Waypoints.resume(); // Navigate to the last visited page of your application
```
`callback` is an optional function that will be called only once the application is at the correct URL.

### .ignore(selector)

```js
Waypoints.ignore('.external'); // Links with the 'external' class will be ignored by Waypoints
```

### .debug(value)

```js
Waypoints.debug(true); // Get verbose debugging info in the console. False by default
```

### .back()

```js
Waypoints.back(); // Navigates to the previous page
```

### .open(url)

```js
Waypoints.open('files/resume.pdf'); // Opens a link in Safari
```

# Fixes

These are the iOS 'web app mode' issues that Waypoints fixes:

## Links exit full-screen mode.
In full-screen mode, regular links are opened in Safari, but JavaScript-based navigation stays within the app.
Thus, when your user taps a link, they're kicked out of your app and into Safari.
Waypoints fixes regular links by intercepting them and navigating to their `href` attribute with JavaScript.

* [http://stackoverflow.com/questions/12161479/apple-mobile-web-app-capable-site-switches-to-mobile-safari-after-logout](http://stackoverflow.com/questions/12161479/apple-mobile-web-app-capable-site-switches-to-mobile-safari-after-logout)
* [http://stackoverflow.com/questions/6429492/how-do-you-keep-an-iphone-ipad-web-app-in-full-screen-mode](http://stackoverflow.com/questions/6429492/how-do-you-keep-an-iphone-ipad-web-app-in-full-screen-mode)

## History is forgotten.
When your full-screen app is backgrounded, iOS forgets its history, and returns the user to your homepage instead of her last location.
Waypoints keeps its own history in LocalStorage. When you call `Waypoints.resume()`, your app is redirected to the user's last visited page.

* [http://stackoverflow.com/questions/6930771/stop-reloading-of-web-app-launched-from-iphone-home-screen](http://stackoverflow.com/questions/6930771/stop-reloading-of-web-app-launched-from-iphone-home-screen)
* [http://stackoverflow.com/questions/4291784/stop-native-web-app-from-reloading-itself-upon-opening-on-ios](http://stackoverflow.com/questions/4291784/stop-native-web-app-from-reloading-itself-upon-opening-on-ios)
* [http://stackoverflow.com/questions/12816286/resume-webapp-from-previous-position](http://stackoverflow.com/questions/12816286/resume-webapp-from-previous-position)

## Relative navigation.
Web app mode breaks `history.go/back/forward`, but Waypoints provides `Waypoints.back()`.

* [http://stackoverflow.com/questions/8884376/iphone-safari-web-app-opens-links-in-new-window-when-using-javascripthistory-go](http://stackoverflow.com/questions/8884376/iphone-safari-web-app-opens-links-in-new-window-when-using-javascripthistory-go)

## Window.open() with targets.
Web app mode also breaks `window.open()`, but Waypoints provides `Waypoints.open()` with the same signature.

* [http://stackoverflow.com/questions/8436676/iphone-window-openurl-blank-does-not-open-links-in-mobile-safari](http://stackoverflow.com/questions/8436676/iphone-window-openurl-blank-does-not-open-links-in-mobile-safari)
* [http://stackoverflow.com/questions/8738873/open-external-page-from-iphone-web-app-using-javascript](http://stackoverflow.com/questions/8738873/open-external-page-from-iphone-web-app-using-javascript)
* [http://stackoverflow.com/questions/6766280/how-do-i-open-a-url-in-a-web-browser-from-an-ios-standalone-webapp](http://stackoverflow.com/questions/6766280/how-do-i-open-a-url-in-a-web-browser-from-an-ios-standalone-webapp)
