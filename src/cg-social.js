import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style>
            :host {
                display:block;
                box-sizing: content-box;
            }
            .container {
                width:100%;
                display: -webkit-flex;
                display: flex;
                -webkit-align-items: center;
                align-items: center;
                -webkit-justify-content: center;
                justify-content: center;
                -webkit-flex-flow: row wrap;
                flex-flow: row wrap;
                -webkit-align-content: center;
                align-content: center;
            }
            .block {
                height:var(--cg-social-icon-size, 57px);
                width:var(--cg-social-icon-size, 57px);
                margin: var(--cg-social-icon-margin, 13px);
                background:none;
                background-size:100%;
                background-repeat: no-repeat;
                background-position: center;
            }

            @media (max-width: 650px) { 
                .block {
                    height:var(--cg-social-icon-size, 40px);
                    width:var(--cg-social-icon-size, 40px);
                    margin: var(--cg-social-icon-margin, 10px);
                }

                .container {
                    display: flex;
                }
                
                .ifb {
                    order: 4;
                }

            }
            
            .fb {
                background-image: url('../images/facebook.svg');
            }
             .ig {
                background-image: url('../images/instagram.svg');
            }
             .tw {
                background-image: url('../images/twitter.svg');
            }
             .yt {
                background-image: url('../images/youtube.svg');
            }
            .info {
            }
            .name {
                font-weight: bold;
            }
          
        </style>
        <div class="container">
            <a class="ifb" target="_blank" href="https://www.facebook.com/CGGuitar"><div class="fb block"></div></a>
            <a target="_blank" href="https://www.youtube.com/channel/UCReQS8UwfrhDRGTowiXqVKg"><div class="yt block"></div></a>
            <a target="_blank" href="https://instagram.com/cg_guitar/"><div class="ig block"></div></a>
            <a target="_blank" href="https://twitter.com/cg_guitar"><div class="tw block"></div></a>

        </div>
`,

  is: 'cg-social'
});
