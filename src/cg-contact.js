import '../../@polymer/polymer/polymer-legacy.js';
import '../../@polymer/paper-card/paper-card.js';
import './components/contact-form.js';
import './shared-styles.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';

Polymer({
    is: 'cg-contact',
    template: html`    <style include="shared-styles">
    :host {
     display: block;
     position: relative;
     padding: 10px;
   }

 

   .contact-card {
     width: 100%;
     max-width: 90%;
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
   }
   :host .card-actions {
     max-width: 100%;
     padding:0 !important;
     width: 100%;
   }
   :host .wrap {
     flex:1;
   }
 </style>
 <div class="wrap">
   <p class="quote">If you'd wish to contact Charlie regarding guitar lessons or session work then please use the contact form below.<br/>Alternatively
     you can email <a href="mailto:charlie@cgguitar.co.uk">charlie@cgguitar.co.uk</a> or call <a href="tel:+447861538564">+447861538564</a>.</p>
     <paper-card heading="Contact" class="contact-card" animated-shadow="false">
       <div class="card-actions">

         <contact-form api="https://ksf1sko9ph.execute-api.eu-west-1.amazonaws.com/cgguitar/contact"></contact-form>
     </paper-card>
     </div>

 </div>`
});