import '../../../@polymer/polymer/polymer-legacy.js';
import '../../../@google-web-components/google-apis/google-youtube-api.js';
import '../../../@polymer/paper-card/paper-card.js';
import '../../../@polymer/iron-icon/iron-icon.js';
import '../../../@polymer/iron-icons/iron-icons.js';
import '../../../@polymer/iron-icons/av-icons.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
             :host {
                display: block;
            }

             :host #card {
                width: var(--youtube-player-card-width, 240px);
            }

             :host .card-content {
                width: var(--youtube-player-card-width, 240px);
                height: var(--youtube-player-card-height, 135px);
                padding: 0 !important;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            button.play-btn {
                background: var(--youtube-player-play-background-color, white);
                border: none;
                outline: none;
                width: 75px;
                height: 75px;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99;
                border-radius: 100%;
                cursor: pointer;
                opacity: 0.3;
                transition: opacity .3s ease-in-out;
            }

             :host #contentVideo:hover .play-btn {
                opacity: 0.9;
            }

             :host .play-button {
                color: var(--youtube-player-play-button-color, black);
                width: 54px;
                height: 54px;
                z-index: 100;
            }

             :host .video {}

            #video {
                position: absolute;
                top: 0;
                left: 0;
            }

            .thumb-cont {
                width: var(--youtube-player-card-width, 240px);
                height: var(--youtube-player-card-height, 135px);
                background: var(--youtube-player-thumbnail-background, #757575);
                transition: opacity .5s ease-in-out;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 51;
                pointer-events: none;
            }

            .thumbnail {
                position: absolute;
                top: 0;
                left: 0;
                width: var(--youtube-player-card-width, 240px);
                height: var(--youtube-player-card-height, 135px);
                background-repeat: no-repeat;
                background-position: center center;
                background-size: cover;
                transition: opacity .3s ease-in-out;
                z-index: 50;
            }

             :host .video-title {
                font-size: 1em;
                letter-spacing: -.012em;
                line-height: 2em;
                flex: 1;
                margin-right: 15px;
                color: var(--youtube-player-video-title-color, black);
            }

            .ellipsis {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .channel-title {
                font-size: 1em;
                margin-right: 15px;
                text-decoration: none;
                display: block;
                margin-top: -8px;
                color: var(--youtube-player-channel-color, #757575);
            }

            .title-wrap {
                text-align: left;
                padding-bottom: 5px;
                padding-left: 5px;
            }

            .actions-top {
                padding: 1%;
            }

            .card-actions {
                padding: 0 !important;
            }

            .actions {
                display: flex;
                color: #757575;
                padding: 4px 16px;
            }

            .open-yt {
                border: none;
                outline: none;
                background: none;
                cursor: pointer;
                padding: 6px;
            }

            .views {
                display: flex;
                flex-direction: row;
                align-items: center;
                border-top: 1px solid #e8e8e8;
                padding: 2%;
                font-size: 0.8em;
            }

            .duration {
                flex: 1;
            }

            iron-icon {
                margin-right: 3px;
            }

            .duration,
            .views .view {
                display: flex;
                align-items: center;
                margin: 0 3px 0 3px;
            }

            .views,
            .open-yt,
            .duration {
                color: #757575;
            }

            .yt-card-wrap {
                padding: 10px;
            }
        </style>
        <div class="yt-card-wrap">
            <google-youtube-api id="yapi" on-api-load="onLoad"></google-youtube-api>
            <!-- Make title click able -->
            <paper-card id="card" elevation="1" animated-shadow="false">
                <div class="card-content" id="contentVideo">
                    <button id="playBtn" on-click="playVideo" class="play-btn">
                    <iron-icon class="play-button" icon="av:play-arrow"></iron-icon>
                </button>
                    <div id="imageThumb" class="thumbnail"></div>
                    <div id="imageCont" class="thumb-cont"></div>
                    <div id="videoElement">
                                            <div class="video" id="video"></div>

                    </div>
                </div>
                <div class="card-actions">
                    <div class="actions-top">
                        <div class="title-wrap">
                            <div class="video-title ellipsis">
                                [[videoTitle]]
                            </div>
                            <a class="channel-title ellipsis" target="_blank" href="[[_openInYoutube(_youtubeChannel, channelId)]]"> [[channelTitle]] </a>
                        </div>
                    </div>
                    <div class="views">
                        <div class="view">

                            <template is="dom-if" if="[[viewCount]]">

                                <iron-icon icon="icons:visibility"></iron-icon>
                                [[viewCount]]

                            </template>
    </div>
    <template is="dom-if" if="[[duration]]">
                            <div class="duration">
                                <iron-icon icon="icons:query-builder"></iron-icon>
                                [[convertDuration(duration)]]
                            </div>

                        </template>

    <a target="_blank" title="[[openExternal]]" class="open-yt" href="[[_openVideoYoutube(videoId, _youtubeVideo, _youtubePlaylist)]]">
        <iron-icon icon="icons:exit-to-app"></iron-icon>
    </a>
    </div>
    </div>
    </paper-card>
    </div>
`,

  is: 'youtube-player-card',

  properties: {
      YT: {
          type: Object,
          value: null
      },
      channelId: {
          type: String,
          value: '',
          notify: true
      },
      videoTitle: {
          type: String,
          value: ''
      },
      openExternal: {
          type: String,
          value: 'Open in YouTube'
      },
      description: {
          type: String,
          value: ''
      },
      thumbnail: {
          type: String,
          value: '',
          observer: '_updateThumb'
      },
      videoId: {
          type: String,
          value: '',
          notify: true
      },
      player: {
          type: Object,
          value: null
      },
      viewCount: {
          type: Number,
          value: 0
      },
      channelTitle: {
          type: String,
          value: ''
      },
      videoKind: {
          type: String,
          value: ''
      },
      _youtubePlaylist: {
          type: String,
          value: '//youtube.com/playlist?list='
      },
      _youtubeVideo: {
          type: String,
          value: '//youtube.com/watch?v='
      },
      _youtubeChannel: {
          type: String,
          value: '//youtube.com/channel/'
      },
      isFullScreen: {
          type: Boolean,
          value: false,
          reflectToAttribute: true
      },
      playAttempted: {
          type: Boolean,
          value: false
      }
  },

  stop: function() {
      if (this.player) {
          this.player.stopVideo();
      }
  },

  _openInYoutube: function(link, id) {
      return link + id;
  },

  _openVideoYoutube: function(id) {
      if (this.videoKind === 'youtube#playlist') {
          return this._openInYoutube(this._youtubePlaylist, id);
      } else {
          return this._openInYoutube(this._youtubeVideo, id);
      }
  },

  _updateThumb: function() {
      if (this.thumbnail) {
          this.$.imageThumb.style['background-image'] = "url('" + this.thumbnail + "')";
          setTimeout(function() {
              this.$.imageCont.style['opacity'] = '0';
          }.bind(this), 100);
      }
  },

  convertDuration: function(input) {
      var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
      var hours = 0,
          minutes = 0,
          seconds = 0,
          timeString = '';

      if (reptms.test(input)) {
          var matches = reptms.exec(input);
          if (matches[1]) hours = Number(matches[1]);
          if (matches[2]) minutes = Number(matches[2]);
          if (matches[3]) seconds = Number(matches[3]);
      }
      if (hours) {
          hours = hours < 10 ? '0' + hours : hours;
          timeString += hours + ':';
      }
      minutes = minutes < 10 ? '0' + minutes : minutes;
      timeString += minutes + ':';
      seconds = seconds < 10 ? '0' + seconds : seconds;
      timeString += seconds;
      return timeString;
  },

  loadVideo: function(type, width, height, callback) {
      // check if ready first...
      if (this.YT) {
          this.player = new this.YT.Player(this.$.video, {
              height: height,
              width: width,
              playerVars: {
                  'autoplay': 0,
                  'controls': 1,
                  hd: 1,
                  'showinfo': 0
              },
              events: {
                  'onReady': function(e) {
                      if (type === 'playlist') {
                          this.player.cuePlaylist({
                              listType: "playlist",
                              list: this.videoId
                          });
                      } else {
                          this.player.loadVideoById(this.videoId);
                          this.attachFSEvents();

                      }
                  }.bind(this),
                  'onStateChange': function(e) {
                      this.onPlayerStateChange(e, function() {
                          return callback();
                      }.bind(this));
                  }.bind(this)
              },
          });
      } else {
          this.playAttempted = true;
      }
  },

  onPlayerStateChange: function onPlayerStateChange(event, callback) {
      if (event.data === this.YT.PlayerState.CUED) {
          if (callback) {
              return callback();
          }
      }
  },

  attachFSEvents: function() {
      document.addEventListener("fullscreenchange", function(e) {
          this.isFullScreen = !!document.fullscreenElement;
      }.bind(this), false);

      document.addEventListener("msfullscreenchange", function(e) {
          this.isFullScreen = !!document.msFullscreenElement;
      }.bind(this), false);

      document.addEventListener("mozfullscreenchange", function(e) {
          this.isFullScreen = document.mozFullScreen;
      }.bind(this), false);

      document.addEventListener("webkitfullscreenchange", function(e) {
          this.isFullScreen = !!document.webkitFullscreenElement;
      }.bind(this), false);
  },

  getPlayerSize: function() {
      var video = getComputedStyle(this.$.contentVideo);
      if (video) {
          return {
              width: video.width,
              height: video.height
          }
      }
  },

  playVideo: function() {
      this.$.imageThumb.style.opacity = 0;
      this.$.playBtn.style.opacity = 0;
      this.$.imageThumb.style['pointer-events'] = 'none';
      this.$.playBtn.style['pointer-events'] = 'none';
      var size = this.getPlayerSize();
      this.loadVideo('video', size.width, size.height, function() {
          console.log('stopped');
      });
  },

  onLoad: function(e) {
      this.YT = e.target.api;
      if (this.playAttempted) {
          var size = this.getPlayerSize();
          this.loadVideo('video', size.width, size.height, function() {
              console.log('stopped');
          });
      }
  }
});
