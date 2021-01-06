import '../../@polymer/polymer/polymer-legacy.js';

import '../../@polymer/paper-item/paper-icon-item.js';
import '../../@polymer/iron-icon/iron-icon.js';
import '../../@polymer/iron-icons/iron-icons.js';
import '../../@polymer/iron-icons/image-icons.js';
import '../../@polymer/iron-icons/communication-icons.js';
import '../../@polymer/iron-icons/social-icons.js';
import '../../@polymer/iron-icons/av-icons.js';
import '../../@polymer/iron-icons/maps-icons.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                display: block;
                color: var(--app-primary-color);
            }
            :host a {
                display:flex;
                color: var(--app-link-dark);
                text-decoration: none;
            }
            iron-icon {
                color: var(--app-link-dark);            
                }
            #item {
                flex:1;
                width:100%;
                border-top: solid 1px transparent;
                border-bottom: solid 1px transparent;

                --paper-item-focused-before :{
                    background: #f3f3f3 !important;
                        color: var(--app-primary-color);

                border-top: solid 1px #ddd;
                border-bottom: solid 1px #ddd;
                  
                };
                --paper-item-selected : {
                   background: #f3f3f3 !important;
                border-top: solid 1px #ddd;
                border-bottom: solid 1px #ddd;
                        color: var(--app-primary-color);

                };
                --paper-item-focused : {
                    background: #f3f3f3 !important;
                    border-top: solid 1px #ddd;
                    border-bottom: solid 1px #ddd;
                    color: var(--app-primary-color);

                };
                
              
            }
            #item.active-link, #item:focus, #item:active {
                background: #f3f3f3 !important;
                border-top: solid 1px #ddd;
                border-bottom: solid 1px #ddd;
                color: var(--app-primary-color);
             


            }
            #item:focus iron-icon, #item:active iron-icon{
                color: var(--app-primary-color);
            }
            :host([is-active]) iron-icon, :host([is-active]) a {
                color: var(--app-primary-color, black);
            }

            #item span {
                margin-left: 0px;
            }

           
        </style>
        <div class="wrap">
             <a class="paper-item-link" tab-index="-1" name="[[name]]" href="[[href]]">
            <paper-icon-item id="item">
                <iron-icon src\$="[[src]]" icon\$="[[icon]]" slot="item-icon"></iron-icon>
               <span>[[text]]</span>
            </paper-icon-item>
            </a>
        </div>
`,

  is: 'cg-links',

  properties: {
      text: {
          type: String,
          value: ""
      },
      name: {
          type: String,
          value: ""
      },
      href: {
          type: String,
          value: ""
      },
      icon: {
          type: String,
          value: ""
      },
      src: {
          type: String,
          value: ""
      },
      active: {
          type: String,
          value: false,
          notify: true,
          observer: '_toggleActive'
      },
      isActive: {
          type: Boolean,
          value: false,
          notify: true,
          reflectToAttribute: true,
          observer: '_toggleActive'
      }
  },

  _toggleActive: function() {
      this.isActive = this.name === this.active;
      this.$.item.toggleClass('active-link', this.isActive);
  }
});
