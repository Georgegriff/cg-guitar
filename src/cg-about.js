import "../../@polymer/polymer/polymer-legacy.js";
import "../../@polymer/paper-card/paper-card.js";
import "../../@polymer/paper-button/paper-button.js";
import "./shared-styles.js";
import { Polymer } from "../../@polymer/polymer/lib/legacy/polymer-fn.js";
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  is: "cg-about",
  properties: {
    data: {
      type: Object,
      value: null,
    },
  },
  _parseText: function (text) {
    return text;
  },
  _template: html`<style include="shared-styles">
    :host {
     display: block;
     padding: 10px;
   }
   :host .wrap {
       flex-direction: row;
       align-items: flex-start;
   }
   :host .text-card {
       margin: 0 9px 18px 9px;
   }

 </style>
 <div id="scroller">
   <div class="wrap">

     <div class="levels">
       <div class="text-flex-cards">
          <template is="dom-repeat" items={{data.infoCards}} 
         as=item index-as=index>
         <paper-card image="{{item.image}}" class="text-card wide-card" animated-shadow="false" alt="CG Guitar Live">
          <div class="card-content">
         <div class="card-header">{{item.name}}</div>

             <p class="card-light" inner-h-t-m-l="{{item.text}}">
               <p>
           </div>
           </div
         </paper-card>
          </template>
 </div>

 </div>

 <paper-card class="big-card" id="sign" image="images/pageimages/about-card.jpg" alt="Session Performance">
     <div class="card-content">
         <div class="card-header">Band & Session Work</div>
         <p class="card-light">
             I'm available to hire for Session Work, for details please visit the <a href="/session">Band/Sessions</a> page.
     </div>
     <div class="card-actions">
         <div class="horizontal justified">
             <div class="btn-cnt">
                 Please don't hesitate to get in touch.
             </div>

             <paper-button class="contact-btn"><a href="/contact">Contact</a></paper-button>
         </div>
     </div>
 </paper-card>
 </div>
 </div>`,
});
