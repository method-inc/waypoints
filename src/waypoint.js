;(function($, window, document, undefined) {

var HISTORY_KEY = 'Waypoint.history';
var TARGET_KEY = 'Waypoint.target';
var HISTORY_LENGTH = 5;

function Waypoint() {
  this._ignore = undefined;
}

Waypoint.prototype = {

  resume: function(done) {
    var history = this.history();
    var target = this.target();
    // Is the user following a link?
    if (target) {
      this.target(undefined);
      // If this is not the link target, redirect to the last page in our history
      if (target !== this.route()) {
        this.redirect();
        return this;
      }
      this.bookmark();
    }
    // If this route is not in the history, it was unintentional, and we should get back on track
    else if (this.route() !== this.latest()) {
      this.redirect();
      return this;
    }
    // Callback if we're staying on this page
    if (done) done();
    return this;
  },

  // Methods that manipulate state

  clear: function() {
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(TARGET_KEY);
    return this;
  },

  bookmark: function() {
    this.push(this.route());
    return this;
  },

  push: function(route) {
    var history = this.history();
    history.push(route);
    if (history.length > HISTORY_LENGTH) history.shift();
    this.history(history);
    return this;
  },

  history: function(val) {
    if (arguments.length === 0) {
      var item = localStorage.getItem(HISTORY_KEY);
      return JSON.parse(item) || [];
    }
    if (val) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(val));
      return;
    }
    localStorage.removeItem(HISTORY_KEY);
  },

  target: function(val) {
    if (arguments.length === 0) {
      var item = localStorage.getItem(TARGET_KEY);
      return JSON.parse(item);
    }
    if (val) {
      localStorage.setItem(TARGET_KEY, JSON.stringify(val));
      return;
    }
    localStorage.removeItem(TARGET_KEY);
  },

  ignore: function(selector) {
    if (arguments.length === 0) return this._ignore;
    this._ignore = selector;
    return this;
  },

  // Methods that change the URL

  // change the route silently
  route: function(route) {
    if (arguments.length === 0) return window.location.href;
    window.location = route;
  },

  // redirect to the latest history entry
  redirect: function() {
    var latest = this.latest();
    if (latest) this.route(latest);
    return this;
  },

  // pop the latest history entry and redirect to previous
  back: function() {
    var history = this.history();
    if (history.length > 1) {
      history.pop();
      this.history(history);
      this.redirect();
    }
  },

  // store a url as a link target and navigate to it
  navigate: function(url) {
    this.target(url);
    this.route(url);
  },

  // Getters

  latest: function() {
    var history = this.history();
    if (history.length) return history[history.length - 1];
    return undefined;
  },

  // Event handlers

  intercept: function(selector) {
    var self = this;
    $(document).on('click', selector, function(event) {
      return self._onClick(event.target);
    });
    return this;
  },

  _onClick: function(target) {
    if ($(target).is(this._ignore)) return true;

    var href = $(target).attr('href');
    var route = qualifyUrl(href);

    this.navigate(route);
    return false;
  }
};

function qualifyUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.href;
}

window.Waypoint = new Waypoint();

})(window.jQuery || window.Zepto, window, document);