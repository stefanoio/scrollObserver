/*!
 * scrollObserver
 *
 * Stefano Peloso - https://github.com/stefanoio/scrollObserver
 *
 * Free to use under terms of WTFPL version 2 license
 */

window.scrollObserver = window.scrollObserver || (function() {
	"use strict";

	var
		_watchList = [],
		_lastYOffset = false,
		_viewportHeight = document.documentElement.clientHeight,

		observe = function(selector, callback) {
			Array.prototype.forEach.call(document.querySelectorAll(selector), function($el) {
				_refreshItemSizes(_watchList[_watchList.push({$: $el, callback: callback}) - 1]);
			});
		},

		forget = function(selector) {
			_watchList = _watchList.filter(function(item) { return !item.$.matches(selector); });
		},

		refresh = function() {
			_viewportHeight = document.documentElement.clientHeight;
			_lastYOffset = false;
			_watchList.forEach(_refreshItemSizes);
		},

		_refreshItemSizes = function(item) {
			var
				$el = item.$,
				top = 0,
				height = $el.offsetHeight;
			while($el) {
				top += $el.offsetTop;
				$el = $el.offsetParent;
			}
			item.top = top;
			item.bottom = top + height;
			item.range = _viewportHeight + height;
		},

		_watchLoop = function() {
			var
				yOffset = pageYOffset,
				maxYOffest = yOffset + _viewportHeight;
			requestAnimationFrame(_watchLoop);
			if(_lastYOffset !== yOffset) {
				_watchList.forEach(function(item) {
					if((item.top < maxYOffest) && (item.bottom > yOffset)) {
						item.callback.call(item.$, 1 - (item.bottom - yOffset) / item.range);
					}
				});
				_lastYOffset = yOffset;
			}
		},

		_init = function() {
			if("requestAnimationFrame" in window) {
				if(!("matches" in Element.prototype)) {
					Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
				}
				requestAnimationFrame(_watchLoop);
				window.addEventListener("resize", refresh);
				return {
					refresh: refresh,
					observe: observe,
					forget: forget
				};
			} else {
				console.error("scrollObserver: unsupported browser");
				return false;
			}
		};

	return _init();

})();