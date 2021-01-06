import '../../@polymer/polymer/polymer-legacy.js';
import './shared-styles.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';

Polymer({
    is: 'cg-privacy',
    properties: {
        apiKey: {
            type: String,
            value: 'AIzaSyCJCokkQUEbcz2hUSzk3CtYU-g2v9CS-uM'
        }
    },
    _template: html` <style include="shared-styles">
    :host {
     display: block;
   }



   .contact-btn {
     margin: 0px 0 10px 20px;
   }

   :host .quote {
     max-width:800px;
     width:auto;
   }

   p {
       padding: 10px;
   }

 
 </style>
 <div class="wrap">

   <h2 class="heading">Privacy Disclaimer and Terms Of Use</h2>
   <p>Any contact details I acquire from my clients and student records will be stored in a safe location and password protected. <br/>
     Only I will have access to them and will not share them with anybody else without your consent. </br>
     The reason for collecting this data and storing it is so I can keep in touch with you regarding lessons, payment, updates and from time to time marketing purposes. <br/>
     For example, workshops, new opportunities for my students, and activities alike. 
     <br/>
     If lessons are permanently terminated and you no longer wish me to keep your details on record then please inform me when doing so.</p>



 </div>
`
});