Polymer({
    is: 'cg-photos',
    properties: {
        scrollPos: {
            type: String,
            value: null,
            notify: true,
            reflectToAttribute: true,
            observer: '_loadMore'
        }
    },
    ready: function() {
        this.feed = this.$.feed;
    },
    _loadMore: function() {
        if (this.feed && (this.scrollPos >= 0.7 || this.scrollPos === 'bottom')) {
            this.feed.next();
        }
    },
    _template: html`
    <style include="shared-styles">
    :host {
      display: block;

      padding: 10px;
    }
  </style>
  <instagram-feed id="feed"></instagram-feed>`
});