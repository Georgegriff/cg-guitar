import '../../@polymer/polymer/polymer-legacy.js';
import './components/quote-card.js';
import './shared-styles.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
    is: 'cg-testimonials',
    properties: {
        testimonials: {
            type: Array,
            value: null
        },
        data: {
            type: Object,
            value: null
        }
    },
    _template: html`<style include="shared-styles">
             :host {
                display: block;
            }   
         
            .levels {
                 display: flex;
                justify-content: center;
                align-items: center;
                
            }
            .lvl-title {
                text-align: center;
            }

               .t-wrap {
                display: flex;
                flex-wrap: wrap;
                max-width:75vw;
                flex:1;
                width:100%;
                padding-bottom: 10%;
            }
             @media (max-width: 650px) {
                .t-wrap {
                    max-width:100%;
                }
             }
        
        </style>
        <div id="scroller">
            <div>
                <div class="levels">
                    
                    <div class="lvl-title quote">
                       {{data.title}}
                    </div>
                    <div class="t-wrap">

                        <template is="dom-repeat" items="{{testimonials}}">
                            <quote-card image="{{item.image}}" default-image="../../images/default-test.svg" author="{{item.name}}" text="{{item.text}}"></quote-card>

                        </template>
    </div>
    </div>
    </div>`
});