import '../../@polymer/polymer/polymer-legacy.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';

Polymer({
    is: 'cg-view404',
    _template: html`    <style>
      :host {
        display: block;

        padding: 10px 20px;
      }
    </style>

    <!-- 
      If deploying in a folder replace href="/" with the full path to your site.
      Such as: href=="http://polymerelements.github.io/polymer-starter-kit"
    -->
    Oops you hit a 404. <a href="/">Head back to home.</a>`
});