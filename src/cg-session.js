import '../../@polymer/polymer/polymer-legacy.js';
import '../../@polymer/paper-card/paper-card.js';
import '../../@polymer/paper-button/paper-button.js';
import './components/youtube-videos.js';
import './shared-styles.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';

Polymer({
    is: 'cg-session',
    properties: {
        apiKey: {
            type: String,
            value: 'AIzaSyCJCokkQUEbcz2hUSzk3CtYU-g2v9CS-uM'
        }
    },
    _template: html`    <style include="shared-styles">
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

 
 </style>
 <div class="wrap">

   <h2 class="heading">Musical Works</h2>
   <p class="quote">



       "I enjoy writing and performing a variety of styles. I am currently an active member of signed UK Metal group <a target="_blank" href="https://www.facebook.com/harbingerriffs">Harbinger</a> that I have toured extensively with 
       plus function band <a target="_blank" href="https://www.facebook.com/NoMoreAshesBand/">No More Ashes</a> that regularly gets hired for weddings, parties and various other functions."
   </p>
   <youtube-videos has-navigation id="band-playlist" search-url="https://www.googleapis.com/youtube/v3/playlistItems" order="viewCount"
     playlist-id="PLA0cAQ-2uoepYOLbiHYk4spJB6ugE7_v8" api-key="[[apiKey]]" max-results="10"></youtube-videos>

   </paper-card>

   <p class="quote">
     If you're looking for a band for your event or function please feel free to get in <a href="/contact">touch</a>.
   </p>

   <h2 class="heading">{{data.quotes.name}}</h2>
   <p class="quote">
       {{data.quotes.text}}
   </p>
   <youtube-videos has-navigation id="session-playlist" search-url="https://www.googleapis.com/youtube/v3/playlistItems" order="viewCount"
     playlist-id="PLA0cAQ-2uoerotCQc5YBpI2cC-MemAWt7" api-key="[[apiKey]]" max-results="20"></youtube-videos>


   <p  class="quote">
     If you'd like to hear what people have to say about me, please visit the <a href="/testimonials">Testimonials</a>        page.
     <br/> I also offer guitar lessons, for details please visit my <a href="/lessons">Lessons</a> page.
   </p>
 </div>
`
});