import '../../@polymer/polymer/polymer-legacy.js';
import '../../@polymer/iron-ajax/iron-ajax.js';
import './components/youtube-videos.js';
import './shared-styles.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';

Polymer({
    is: 'cg-videos',
    properties: {
        channelId: {
            type: String,
            value: 'UCReQS8UwfrhDRGTowiXqVKg'
        },
        apiKey: {
            type: String,
            value: 'AIzaSyCJCokkQUEbcz2hUSzk3CtYU-g2v9CS-uM'
        },
        nextPageToken: {
            type: String,
            value: ''
        },
        scrollPos: {
            type: String,
            value: null,
            notify: true,
            observer: '_loadMore'
        }
    },
    _filterPlaylists: function() {
        // exluce the playlists on the band session page
    },
    _loadMore: function() {
        if (this.scrollPos >= 0.7 || this.scrollPos === 'bottom') {
            //   this.$.videos.loadMore();
        }
    },
    _buildParams: function() {
        if (this.apiKey) {
            let output = {
                'key': this.apiKey,
                'part': 'snippet',
                'type': 'playlist',
                'maxResults': '50',
                'channelId': this.channelId
            };
            return output;
        } else {
            console.warn('No attribute "key" provided: API Key');
        }
    },
    _template: html`    <style include="shared-styles">
    :host {
     display: block;
     padding: 10px;
   }
 </style>

 </div>
 <div class="wrap">

   <p class="quote">
    Want to see videos of my Band? <a href="/session">Please click here.</a>
   </p>

   <iron-ajax id="ajaxRequest" auto url="https://www.googleapis.com/youtube/v3/search" params=[[_buildParams(channelId,apiKey)]]
     handle-as="json" last-response="{{response}}"></iron-ajax>
   <template is="dom-repeat" items={{response.items}} as=item index-as=index>
     <h2 class="heading">[[item.snippet.title]]</h2>
     <youtube-videos has-navigation search-url="https://www.googleapis.com/youtube/v3/playlistItems" order="viewCount" playlist-id="[[item.id.playlistId]]"
       api-key="[[apiKey]]" max-results="10"></youtube-videos>`
   </template>
 </div>`



});