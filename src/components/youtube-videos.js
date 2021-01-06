import '../../../@polymer/polymer/polymer-legacy.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/iron-icons/av-icons.js';
import '../../../@polymer/iron-ajax/iron-ajax.js';
import '../../../@polymer/paper-spinner/paper-spinner-lite.js';
import './youtube-player-card.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                display: block;
            }

            :host .video-cards {
                max-width: var(--youtube-videos-container-max-width, 100%);
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }

            :host .flex-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .yt-card {
                --youtube-player-card-width: var(--youtube-videos-width, 264px);
                --youtube-player-card-height: var(--youtube-videos-height, 149px);
            }



            :host([has-navigation]) .video-wrap {
                height: var(--youtube-video-navigator-height, 270px);
                overflow: hidden;
            }

            :host .nav-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            :host .nav-text {
                text-align: center;
            }

            .video-transition {
                transition: transform var(--youtube-videos-transition-speed, 800ms) cubic-bezier(0.26, 0.86, 0.44, 0.985) 0s;
                transform: translateY(var(--youtube-videos-translatey, 0px));
            }

            a:not([disabled]) {
                cursor: pointer;
            }

            a[disabled] {
                opacity: 0.3;
            }

            a:not([disabled]):hover {
                text-decoration: underline;
            }

            :host .spin-wrap {
                position: relative;
                z-index: 101;
                pointer-events: none;
            }

            :host #spins {
                position: absolute;
                ;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 10px;
                height: var(--youtube-video-navigator-height, 270px);
            }

            paper-spinner-lite {
                width: 75px;
                height: 75px;
                --paper-spinner-stroke-width: 6px;
                --paper-spinner-color: var(--primary-color);
            }

            @media (max-width: 650px) and (orientation: portrait) {

                .yt-card {
                    --youtube-player-card-width: var(--youtube-videos-width, 80vw);
                    --youtube-player-card-height: var(--youtube-videos-height, 45vw);
                }

                :host([has-navigation]) .video-wrap {
                    height: var(--youtube-video-navigator-height, 79vw);
                }

                :host #spins {
                    height: var(--youtube-video-navigator-height, 79vw);
                }
            }
        </style>
        <div class="spin-wrap">
            <div id="spins">
                <paper-spinner-lite id="spinner" active=""></paper-spinner-lite>
            </div>
        </div>
        <div class="video-wrap">
            <div id="videoAnim" class="video-transition">
                <iron-ajax id="ajaxRequest" auto="" url="[[searchUrl]]" params="[[_buildParams(pageToken,_part,apiKey,channelId,query,order,types,maxResults, playlistId)]]" handle-as="json"></iron-ajax>
                <iron-ajax id="ajaxVideos" url="[[videoUrl]]" params="[[_buildVideoParams(_videoIds,_part,apiKey,types)]]" handle-as="json"></iron-ajax>
                <div class="flex-wrapper">
                    <div class="video-cards">
                        <template is="dom-repeat" items="{{videos}}" sort="sortItems">
                            <youtube-player-card id="playerCard" class="yt-card" duration="[[item.contentDetails.duration]]" view-count="[[item.statistics.viewCount]]" channel-id="[[item.snippet.channelId]]" video-title="[[item.snippet.title]]" channel-title="[[item.snippet.channelTitle]]" thumbnail="[[_getThumb(item)]]" video-id="[[item.id]]"></youtube-player-card>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <template is="dom-if" if="{{hasNavigation}}">
            <div class="nav-wrap">
                <paper-icon-button disabled\$="[[_atTop]]" on-click="_showPrevious" icon="av:skip-previous" title="Previous"></paper-icon-button>
                <a disabled\$="[[_atTop]]" on-click="_showPrevious" class="nav-text">[[previousText]]</a>
                <span>&nbsp; | &nbsp; </span>
                <a disabled\$="[[_atBottom]]" on-click="_showNext" class="nav-text">[[nextText]]</a>
                <paper-icon-button disabled\$="[[_atBottom]]" on-click="_showNext" icon="av:skip-next" title="Next">
                </paper-icon-button>


            </div>
        </template>
`,

  is: 'youtube-videos',

  properties: {
      hasNavigation: {
          type: Boolean,
          value: false,
          reflectToAttribute: true,
          observer: '_onHasNav'
      },
      previousText: {
          type: String,
          value: 'Previous'
      },
      nextText: {
          type: String,
          value: 'Next'
      },
      videos: {
          type: Array,
          value: null,
          notify: true
      },
      searchUrl: {
          type: String,
          value: 'https://www.googleapis.com/youtube/v3/search'
      },
      videoUrl: {
          type: String,
          value: 'https://www.googleapis.com/youtube/v3/videos'
      },
      playlistUrl: {
          type: String,
          value: 'https://www.googleapis.com/youtube/v3/playlistItems'
      },
      playlistId: {
          type: String,
          value: ''
      },
      apiKey: {
          type: String,
          value: ''
      },
      channelId: {
          type: String,
          value: ''
      },
      query: {
          type: String,
          value: ''
      },
      order: {
          type: String,
          value: 'date'
      },
      types: {
          type: String,
          value: 'video, playlist'
      },
      _part: {
          type: String,
          value: 'snippet'
      },
      maxResults: {
          type: String,
          value: '20'
      },
      pageToken: {
          type: String,
          value: ''
      },
      noGetStats: {
          type: Boolean,
          value: false
      },
      _atTop: {
          type: Boolean,
          value: true
      },
      _atBottom: {
          type: Boolean,
          value: false
      },
      thumbQuality: {
          type: String,
          value: "maxres"
      }
  },

  sortItems: function (a, b) {
      if (a.statistics && b.statistics) {
          return parseInt(a.statistics.viewCount) <= parseInt(b.statistics.viewCount) ? 1 : -1;
      } else {
          return 0;
      }
  },

  _getThumb: function (item) {
      var thumb = item.snippet.thumbnails[this.thumbQuality];
      if (thumb) {
          return thumb.url;
      }
      return undefined;
  },

  _onHasNav: function () {
      if (this.hasNavigation) {
          // need to force for decent lazy loading of pages
          this.maxResults = '10';
      }
  },

  _showNext: function () {
      if (!this._atBottom) {
          //TODO:: when resize window reset transform
          var card = this.$$('#playerCard');
          if (!card) {
              return;
          }
          var height = card.offsetHeight,
              animateHeight = this.$.videoAnim.offsetHeight,
              THRESHOLD = height * 2;
          var currentTranslate = parseInt(this.getComputedStyleValue('--youtube-videos-translatey'), 10);
          currentTranslate = !currentTranslate ? 0 : currentTranslate;
          currentTranslate -= height;
          this._atTop = false;
          if (Math.abs(currentTranslate) >= animateHeight) {
              if (!this._nextPageToken) {
                  this._atBottom = true;
                  return;
              }
          }
          if (Math.abs(currentTranslate) + THRESHOLD >= animateHeight) {
              this.loadMore();
              this._navigate(currentTranslate);
          } else {
              // if the translate would be bigger than height, load more, lazy load ?
              this._atBottom = false;
              this._navigate(currentTranslate);
          }
      }

  },

  _showPrevious: function () {
      if (!this._atTop) {
          this._atBottom = false;
          var card = this.$$('#playerCard');
          if (!card) {
              return;
          }
          var height = card.offsetHeight;
          var currentTranslate = parseInt(this.getComputedStyleValue('--youtube-videos-translatey'), 10);
          currentTranslate = !currentTranslate ? 0 : currentTranslate;
          currentTranslate = !currentTranslate ? 0 : currentTranslate + height;
          if (currentTranslate === 0) {
              this._atTop = true;
          }
          this._navigate(currentTranslate);
      }


  },

  _navigate: function (updated) {
      this.updateStyles({
          '--youtube-videos-translatey': updated + 'px'
      })
  },

  _handleResponse: function (response) {
      var noStats,
          items;
      if (response && (response.items || response.snippet)) {
          items = response.items ? response.items : response.snippet;
          this.videos = this.videos || [];

          this._noStats = this.videos || [];
          // fill in most o the data and then lazy load stats
          this.videos = this.videos.concat(items);
          if (!this.noGetStats) {
              // update new videos videos with stats info
              this._videoIds = this._extractId(items);
              this.$.ajaxVideos.generateRequest();

          }
      }
  },

  _extractId: function (items) {
      // need to update for playlists
      ids = '';

      if (items && items.length) {
          var i,
              item;
          for (i = 0; i < items.length; i++) {
              item = items[i];
              if (item.id && item.id.videoId) {
                  ids += item.id.videoId + ',';
              } else if (item.id && item.id.playlistId) {
                  ids += item.id.playlistId + ',';
              } else {
                  if (item.snippet) {
                      item = item.snippet;
                      if (item.resourceId && item.resourceId.videoId) {
                          ids += item.resourceId.videoId + ',';
                      }
                  }
              }
          }
          ids = ids.slice(0, -1);
      }
      return ids;

  },

  _buildVideoParams: function () {
      if (this.apiKey) {
          let output = {
              'key': this.apiKey,
              'part': 'snippet, statistics, contentDetails',
              'type': this.types,
              'id': this._videoIds
          };
          return output;
      } else {
          console.warn('No attribute "key" provided: API Key');
      }
  },

  _buildParams: function () {
      if (this.apiKey) {
          let output = {
              'key': this.apiKey,
              'part': this._part,
              'type': this.types,
              'order': this.order,
              'maxResults': this.maxResults
          };
          if (this.playlistId) {
              output.playlistId = this.playlistId;
          }
          if (this.query) {
              output.query = this.query;
          }
          if (this.channelId) {
              output.channelId = this.channelId;
          }
          if (this.pageToken) {
              output.pageToken = this.pageToken
          }
          return output;
      } else {
          console.warn('No attribute "key" provided: API Key');
      }
  },

  loadMore: function () {
      this.nextPage();
  },

  nextPage: function () {
      this.pageToken = this._nextPageToken;
  },

  previousPage: function () {
      // doesnt work properly
      this.pageToken = this._prevPageToken;
  },

  onResize: function () {
      this.updateStyles();
  },

  attached: function () {
      this.listen(this.$.ajaxVideos, 'iron-ajax-request', '_onRequest');
      this.listen(this.$.ajaxRequest, 'iron-ajax-response', '_onResponse');
      this.listen(this.$.ajaxVideos, 'iron-ajax-response', '_updateWithStats');
      this.listen(window, 'resize', 'onResize');

  },

  detached: function () {
      this.unlisten(this.$.ajaxRequest, 'iron-ajax-response', '_onResponse');
      this.unlisten(this.$.ajaxVideoss, 'iron-ajax-response', '_updateWithStats');
      this.unlisten(window, 'resize', 'onResize');
  },

  _updateWithStats: function (e) {
      var response = e.target.lastResponse;
      if (response && response.items && response.items.length) {
          this.videos = this._noStats.concat(response.items);
      }
  },

  _onRequest: function () {
      this.$.spinner.active = true;
      this.$.spinner.hidden = false;

  },

  _onResponse: function (e) {
      var response = e.target.lastResponse;
      if (response) {
          this._handleResponse(response);
          this.$.spinner.active = false;
          this.$.spinner.hidden = true;

          if (response.nextPageToken || response.prevPageToken) {
              this._nextPageToken = response.nextPageToken;
              this._prevPageToken = response.prevPageToken;
          }
      }
  }
});
