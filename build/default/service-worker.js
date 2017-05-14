/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","21cd30c752f21f263821f2cde18c5888"],["/bower_components/app-layout/app-drawer/app-drawer.html","5b08f2edb0ec91795365b011db36fec5"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","b3569d445db00a6e6c8ff4598dc165e9"],["/bower_components/app-layout/app-header/app-header.html","2e0506a9bb1e166f8e501c003952c89c"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","349f3c6d1728e0187fff4d3d073f7b9f"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","334eac7f54a828baedbe8f09574571b7"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","53ab90982adbe7457d8603d722c98d2f"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","593bd7855bcc277f33e8c256c45ef039"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","09fc23898ebd40bf11160760df03de86"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","d50c47e6d50fe8a33e65d10a9c189684"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","a9dcfcb21b7af4dbe25d8ca6d8099463"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","372a9ebaa9d642e878c47da476c171ec"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","0d19840e1b4112985dacaf8a99513abe"],["/bower_components/app-layout/app-scrollpos-control/app-scrollpos-control.html","d8f629383153c034f081438c0ab7b873"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","0f1e0b29d1769e45fe9ca9fc84dc955e"],["/bower_components/app-layout/helpers/helpers.html","c3e82580bbb4c5e4ac5ebf5c22647016"],["/bower_components/app-route/app-location.html","e3bd813962e634bd71009586ddd39db1"],["/bower_components/app-route/app-route-converter-behavior.html","5ed794fad917e6c6cae8ecc2da6a1840"],["/bower_components/app-route/app-route.html","25c486d42a8a5370b7f636c77f3aea78"],["/bower_components/font-roboto/roboto.html","72f619d65202f4693621c4d70662ca8f"],["/bower_components/instafeed.js/instafeed.min.js","1b9d5439b41e462220f9e6937df15b60"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","26309806bc5a08dab92ec43a33bf85ad"],["/bower_components/iron-behaviors/iron-button-state.html","477c03ed546186de581ee1b2495bef3f"],["/bower_components/iron-behaviors/iron-control-state.html","c206f87dd46f347d33c37004913a24b1"],["/bower_components/iron-flex-layout/iron-flex-layout.html","98da82570410cf19e8867b3518e065a5"],["/bower_components/iron-icon/iron-icon.html","531c4dce3ccc0ca17182d137fb82e2f7"],["/bower_components/iron-icons/av-icons.html","9926bdf47fe074657acf2e8b3822f1ad"],["/bower_components/iron-icons/communication-icons.html","0b7b0a7174dec1b80e3c86c42dc75ea5"],["/bower_components/iron-icons/image-icons.html","88718ecb8e6a153b45edd9218c5b3176"],["/bower_components/iron-icons/iron-icons.html","263c425f0e794d1e2fd636f8039a8586"],["/bower_components/iron-icons/maps-icons.html","1af7057c841895cf1da6d9a58d5ba658"],["/bower_components/iron-icons/social-icons.html","d745c44f9d41e383dc0875da9c739320"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","df2b26b9f276a709bfe9e75d5f46fbfa"],["/bower_components/iron-image/iron-image.html","45a91e7ed5e339fc446e1bc5eb819ff0"],["/bower_components/iron-location/iron-location.html","632fb5f2d963b7096f3ee6786bef3bf4"],["/bower_components/iron-location/iron-query-params.html","7af5593d2603020de94ba9e63af91b5b"],["/bower_components/iron-media-query/iron-media-query.html","65ec581bf71b4acffa3703a5964e1232"],["/bower_components/iron-meta/iron-meta.html","9a240eda67672e29b82e15898a9619d1"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","e22494690a6d3affa8dbb051c4822641"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","aa108ab483825128d97a10a609f9e3c8"],["/bower_components/iron-selector/iron-multi-selectable.html","c3a5407e403189d9ffbb26a94253cac9"],["/bower_components/iron-selector/iron-selectable.html","a179d62580cfdf7c022dcdf24841487a"],["/bower_components/iron-selector/iron-selection.html","3343a653dfada7e893aad0571ceb946d"],["/bower_components/iron-selector/iron-selector.html","eaec85c290f2dfa24f778a676bf56e15"],["/bower_components/neon-animation/animations/cascaded-animation.html","c05c7f9f5406c98eee7302dfaa041cd2"],["/bower_components/neon-animation/animations/fade-in-animation.html","26b21e695a65d591b30795754a038755"],["/bower_components/neon-animation/animations/fade-out-animation.html","77ece160cc65d32025522d4a2ba57f86"],["/bower_components/neon-animation/animations/hero-animation.html","97104821ce8757b7fb7cd00856e07fe3"],["/bower_components/neon-animation/animations/opaque-animation.html","87efe071f36accb3271ce5c3ce792d8a"],["/bower_components/neon-animation/animations/reverse-ripple-animation.html","d1f303cb531aed972b67cf246203e0f5"],["/bower_components/neon-animation/animations/ripple-animation.html","6af7e9ff0041e59bc439d93949b699be"],["/bower_components/neon-animation/animations/scale-down-animation.html","615cd63357ba9e076be5123f765f1eab"],["/bower_components/neon-animation/animations/scale-up-animation.html","053333e11658b01e622dc9ea8eefc0cc"],["/bower_components/neon-animation/animations/slide-down-animation.html","69c79a807e08d7811be8f0eb08608cf6"],["/bower_components/neon-animation/animations/slide-from-bottom-animation.html","33199b88c9f28b5d9eeeb2c1a80255ae"],["/bower_components/neon-animation/animations/slide-from-left-animation.html","d8a0859b0c680cc162d0984998074fc0"],["/bower_components/neon-animation/animations/slide-from-right-animation.html","a122b547fb5a856c3d0f92baaa51181f"],["/bower_components/neon-animation/animations/slide-from-top-animation.html","c515ad03256a36a70f530f35ec43d5c9"],["/bower_components/neon-animation/animations/slide-left-animation.html","759014b27b0bade5c52b03ff1b4fa264"],["/bower_components/neon-animation/animations/slide-right-animation.html","65adf64bf3d602277e26ec778b10d78c"],["/bower_components/neon-animation/animations/slide-up-animation.html","6116ea37f519f1548c62dfcba3b6fad6"],["/bower_components/neon-animation/animations/transform-animation.html","d80227298998c86d7c02529b83376d91"],["/bower_components/neon-animation/neon-animatable-behavior.html","c35ffb9c73e580cc6b87152ab2d55ba2"],["/bower_components/neon-animation/neon-animated-pages.html","7d1383c968ae015858fc81ee889ffcde"],["/bower_components/neon-animation/neon-animation-behavior.html","e6e4a7616535ea4e4f8e2558ba4969db"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","e95447da3c19360a9d6182aa394c9edf"],["/bower_components/neon-animation/neon-animations.html","61fbe41694d2e32df112f8d54bcc63a7"],["/bower_components/neon-animation/neon-shared-element-animation-behavior.html","7be958d41331e47468e7f144393f6d14"],["/bower_components/neon-animation/web-animations.html","e83d816f67ab3e8778d4c46f052b8656"],["/bower_components/paper-behaviors/paper-button-behavior.html","1b832001d3a6001ddeb2380e4b5bee47"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","07276537aed6235c4126ff8f2f38db6a"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","26f84434724812da0631633cdd54676e"],["/bower_components/paper-button/paper-button.html","ce857a5d05931fef7fbb2090ae0feb06"],["/bower_components/paper-card/paper-card.html","8ef0423eefd261730b2df36663223cba"],["/bower_components/paper-icon-button/paper-icon-button.html","d2302a27079e142d6cf27ecb26e21e06"],["/bower_components/paper-item/paper-icon-item.html","ac37b81ba8051772289260696c4d3bc7"],["/bower_components/paper-item/paper-item-behavior.html","b592d0dc10be683c685d3d771b3d0ae5"],["/bower_components/paper-item/paper-item-shared-styles.html","4178a2695e9295e7f141ff3537509603"],["/bower_components/paper-material/paper-material-shared-styles.html","96e347b417f6c92a317813cc08a23c8d"],["/bower_components/paper-material/paper-material.html","9547582b0f34e682b1bc93aeca9c7c87"],["/bower_components/paper-ripple/paper-ripple.html","ab48a97fb99a146ad6eff4bf3e6d0ad8"],["/bower_components/paper-styles/color.html","731b5f7949a2c3f26ce829fd9be99c2d"],["/bower_components/paper-styles/default-theme.html","9e845d4da61bd65308eb8e4682cd8506"],["/bower_components/paper-styles/shadow.html","17203fd5db371a3e5cb4efabb11951f9"],["/bower_components/paper-styles/typography.html","dc2b6f8af5ebcb16a63800b46017a08a"],["/bower_components/polymer/polymer-micro.html","f55bf45fbcf057d0fcea513bb0a75301"],["/bower_components/polymer/polymer-mini.html","cdf24190fbcbcb424aca65ee845ed1c6"],["/bower_components/polymer/polymer.html","0b6da554b0825cf0ee44db81d1d05748"],["/bower_components/web-animations-js/web-animations-next-lite.min.js","5ad79556ec7b425bc8c886d50fc79274"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","77e8e847349cec08b0e83848fc4e0023"],["/manifest.json","2eefc15db4b58758cddc0d666e27d399"],["/src/cg-links.html","f323ff85fc96c0469825944e0c653823"],["/src/cg-sidebar.html","a36b2cd3351c0ae52b8d42b67c4485d0"],["/src/cg-social.html","14c8bf4b4d74a7bf712ac233e0833bb2"],["/src/components/cg-icons.html","91f64e16cbbc6c6d6ccfdad4ba2d42a0"],["/src/components/instagram-feed.html","44c8a9ec2029a9296b51531a178a0a4b"],["/src/my-about.html","88d39dc744c192efc72fd0e9dab5866a"],["/src/my-app.html","c21f3cc3e9d02cf6d622e2c34015c848"],["/src/my-contact.html","8c06585f4812b4072fed029e83b79d0f"],["/src/my-icons.html","46a164b81d130beeec8b4409481eed8c"],["/src/my-lessons.html","aa9a2f24c135cfd1d40b78915144d5d6"],["/src/my-photos.html","f72515d241367e2b0ae48186c156093f"],["/src/my-session.html","a242047807f955e931c66b6f7b82d434"],["/src/my-testimonials.html","6166da68098188f4043e54a548d0e9d0"],["/src/my-videos.html","5852d84b805c998167e1e1f5ac9d3d3a"],["/src/my-view404.html","b942e5f8daad056a4d7ac9ad82a9ebe7"],["/src/shared-styles.html","33e2b401f9e0a600d6c5d137d9c9e7ae"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







