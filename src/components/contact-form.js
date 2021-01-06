import '../../../@polymer/polymer/polymer-legacy.js';
import '../../../@polymer/iron-form/iron-form.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-spinner/paper-spinner-lite.js';
import '../../../@polymer/paper-input/paper-textarea.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/paper-checkbox/paper-checkbox.js';
import '../../../@polymer/paper-radio-group/paper-radio-group.js';
import '../shared-styles.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../@polymer/polymer/lib/legacy/polymer.dom.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="contact-form" include="shared-styles">
    <template>
        <style>
             :host {
                display: block;
                width: 100%;
            }

            #contactForm {
                margin: 10%;
                max-width: 100%;
            }

            #prefer,
            .buttons {
                margin-top: 10px;
            }

            .buttons {
                flex-wrap: wrap;
            }

            .buttons {
                display: flex;
                justify-content: center;
            }

            .output {
                width: 100%;
                text-align: center;
                color: green;
            }

             :host .output.failed {
                color: red;
            }

            #spinner {
                align-self: center;
            }

            paper-spinner-lite {
                --paper-spinner-color: var(--primary-color);
            }

            .policy {
                display: flex;
                font-size: 14px;
                width: 100%;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;
            }
            paper-checkbox {
                margin-left: 5px;
                --paper-checkbox-unchecked-color : var(--app-primary-color) !important;
            }
        </style>
        <iron-form id="contactForm">
            <form method="post" action="[[api]]" enctype="application/json">
                <paper-input name="name" label="Name" required="" auto-validate=""></paper-input>
                <paper-input autocomplete="email" id="email" on-change="_emailMatch" name="email-address" label="Email" type="email" required=""></paper-input>
                <paper-input id="cEmail" on-change="_emailMatch" name="confirm-email-address" label="Confirm Email" type="email" required=""></paper-input>
                <paper-input id="telephone" on-change="_validateTelephone" name="telephone-no" label="Telephone" type="telephone"></paper-input>
    
                <paper-textarea rows="3" max-rows="6" label="Your Message" name="message"></paper-textarea>
                <label id="prefer">How would you prefer to be contacted?</label>
                <input style="display:none" name="telephonePreferred" value="[[_isPhonePreferred]]">
                <paper-radio-group id="preferSelect" on-selected-changed="_isTelephonePreferred" aria-labelledby="prefer" selected="email">
                    <paper-radio-button name="email">Email</paper-radio-button>
                    <paper-radio-button name="telephone">Telephone</paper-radio-button>
                </paper-radio-group>
                <template is="dom-if" if="{{success}}">
                    <div class="output">{{status}}</div>
                </template>
    <template is="dom-if" if="{{failed}}">
                    <div class="output failed">{{status}}</div>
                </template>
    <div class="buttons">
        <paper-spinner-lite id="spinner"></paper-spinner-lite>
        <div class="policy">
            <paper-checkbox required="" name="acceptPrivacyPolicy"><span>Please confirm that you have read and accept our <a on-tap="_priv" href="/privacy" target="_blank">Privacy Policy</a>.</span></paper-checkbox>
        </div>
        <br>
        <paper-button raised="" on-click="_submit" disabled="" id="contactFormSubmit">
            Submit</paper-button>
        <paper-button raised="" on-click="_reset">Reset</paper-button>
    </div>

    </form>
    </iron-form>



    </template>
    
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
    is: 'contact-form',
    properties: {
        api: {
            type: String,
            value: ''
        },
        _invalidEmails: {
            type: Boolean,
            value: false
        },
        _invalidTelephone: {
            type: Boolean,
            value: false
        },
        _isPhonePreferred: {
            type: Boolean,
            value: false
        },
        status: {
            type: String,
            value: null
        },
        failed: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        },
        success: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
        }
    },
    _priv : function(e) {
        e.stopPropagation();
    },
    _onResponse: function(e) {
        var status = e.detail.status;
        this.$.spinner.active = false;
        if (status === 200) {
            this.failed = false;
            this.success = true;
            this.status = 'Submission Successful!'
        } else {
            this.failed = true;
            this.success = false;
            this.status = 'Submission Failed.'
        }
    },
    _isTelephonePreferred: function(e) {
        var preferred = e.detail.value === 'telephone';
        if (preferred) {
            this._isPhonePreferred = true;
            this.$.telephone.invalid = !this._validateTelephone() && preferred;
        } else {
            this._isPhonePreferred = false;
            this.$.telephone.invalid = (!this.$.telephone.value) ? false : !this._validateTelephone();
        }
        this._validate();
    },
    _emailMatch: function() {
        var emailVal = this.$.email.value,
            cEmailValue = this.$.cEmail.value,
            invalid = emailVal !== cEmailValue,
            invalidE = !(!invalid && this.$.email.validate()),
            invalidC = !(!invalid && this.$.cEmail.validate());

        this.$.email.invalid = invalidE;
        this.$.cEmail.invalid = invalidC

        this._invalidEmails = (invalidE || invalidC);



    },
    _validateTelephone: function() {
        var input = this.$.telephone.value;
        var valid = false;
        var phones = {
            'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
            'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
            'en-ZA': /^(\+?27|0)\d{9}$/,
            'en-AU': /^(\+?61|0)4\d{8}$/,
            'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
            'fr-FR': /^(\+?33|0)[67]\d{8}$/,
            'pt-PT': /^(\+351)?9[1236]\d{7}$/,
            'el-GR': /^(\+30)?((2\d{9})|(69\d{8}))$/,
            'en-GB': /^(\+?44|0)7\d{9}$/,
            'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
            'en-ZM': /^(\+26)?09[567]\d{7}$/,
            'ru-RU': /^(\+?7|8)?9\d{9}$/
        };
        var keys = Object.keys(phones);

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key in phones) {
                var regex = new RegExp(phones[key]);
                if (regex.test(input)) {
                    valid = true;
                }
            }
        }
        this._invalidTelephone = !input && !this._isPhonePreferred ? false : !valid;
        this.$.telephone.invalid = this._invalidTelephone;
        return valid

    },
    _validate: function() {
        // Validate the entire form to see if we should enable the `Submit` button.
        var isValid = this.$.contactForm.validate();
        this._emailMatch();
        this._validateTelephone();
        this.$.contactFormSubmit.disabled = !(isValid && !this._invalidEmails && !this._invalidTelephone);
    },
    _validateForm: function(form) {
        form.addEventListener('change', function(event) {
            this._validate();
            this.status = null;
        }.bind(this));
    },
    _submit: function() {
        this.$.contactForm.submit();
    },
    _onSubmit: function(e) {
        this.$.spinner.active = true;
        this.$.contactFormSubmit.disabled = false;
    },
    ready: function() {
        var form = this.$.contactForm;
        this._validateForm(form);
        this._responseHandler = this._onResponse.bind(this);
        this._submitHandler = this._onSubmit.bind(this);
        form.addEventListener('iron-form-response', this._responseHandler);
        form.addEventListener('iron-form-error', this._responseHandler);
        form.addEventListener('iron-form-submit', this._submitHandler);
    },
    detached: function() {
        form.removeEventListener('iron-form-response', this._responseHandler);
        form.removeEventListener('iron-form-error', this._responseHandler);
        form.removeEventListener('iron-form-submit', this._submitHandler);
    },
    _reset: function(event) {
        var form = dom(event).localTarget.parentElement.parentElement;
        form.reset();
        this.$.preferSelect.selected = 'email';
        form.querySelector('.output').innerHTML = '';
    }
});
