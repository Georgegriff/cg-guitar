import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/polymer/polymer-legacy.js';
import '../shared-styles.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style include="shared-styles">
             :host {
                display: block;
            }
        </style>
        <a href="[[href]]"><paper-button class="contact-btn">[[text]]</paper-button></a>
`,

  properties :{
      href :{
          type: String,
          value :''
      },
      text : {
          type : String,
          value :''
      }
  },

  is: 'app-link'
});
