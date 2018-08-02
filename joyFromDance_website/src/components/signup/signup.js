import {html} from '@polymer/lit-element';
import {PageViewElement} from './../page-view-element.js';
import './../form/success-self-hiding-message.js';
import './../form/failure-self-hiding-message.js';
import './../form/confirm-self-hiding-message.js';
import {connect} from 'pwa-helpers/connect-mixin.js';

import {store} from '../../store.js';

import {
    updateDancerPreferredPosition,
    updateEmail,
    signUpDancer,
    unsubscribe
} from '../../actions/signup/signup';

import signUpState from '../../reducers/signup/signup.js';
import EmailValidator from '../../validator/emailValidator.js';

store.addReducers({
    signUpState
});

import {SharedStyles} from './../shared-styles.js';
import {MDCTextField} from "@material/textfield";
import {MDCChipSet} from "@material/chips";
import {MDCRipple} from "@material/ripple";

class SignUpView extends connect(store)(PageViewElement) {
    _render(props) {
        return html`
      ${SharedStyles}
      <section>
        <h2>Dancer</h2>
        <p>Mark on map place where you would like to learn dance. It does not matter if there is any dancing school nearby. 
            We will try to find and organize dancing lesson for you.
        </p>
        <div>
            <div>
                <div class="mdc-text-field mdc-text-field--upgraded" id="dancerPlaceInputWrap">
                  <input type="text" class="mdc-text-field__input" id="dancerPlaceInput" value="Warsaw" placeholder="" aria-controls="dancer-place-helper-text" aria-describedby="dancer-place-helper-text" required>
                  <label for="dancerPlaceInput" class="mdc-floating-label mdc-floating-label--float-above">Search for a place...</label>
                  <div class="mdc-line-ripple" style="transform-origin: 74.5px center 0px;"></div>
                </div>
                <p id="dancer-place-helper-text" class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg" role="alert">
                    Place where you would like to dance is required
                </p>
            </div>
            <div>
                <div class="mdc-text-field mdc-text-field--upgraded" id="dancerPlaceDistanceInputWrap">
                  <input type="number" class="mdc-text-field__input" id="dancerPlaceDistanceInput" value="15" aria-controls="dancer-place-distance-helper-text" aria-describedby="dancer-place-distance-helper-text" required min="1"/>
                  <label for="dancerPlaceDistanceInput" class="mdc-floating-label mdc-floating-label--float-above">Distance (km or miles)</label>
                  <div class="mdc-line-ripple" style="transform-origin: 74.5px center 0px;"></div>
                </div>
                <p id="dancer-place-distance-helper-text" class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg" role="alert">
                    Max distance from your preferred place is required
                </p>
            </div>
        </div>
        <div>
            <div id="dancerMap" style="height: 400px; width: 100%; "/>
        </div>
        <p>
            Choose dancing style in which you are interested in. Write your email address so we could contact you if we are able to organize such lessons.
        </p>
        <div>
            <div class="mdc-text-field mdc-text-field--upgraded" id="dancerEmailInputWrap">
              <input type="email" class="mdc-text-field__input" id="dancerEmailInput" aria-controls="dancer-email-helper-text" aria-describedby="dancer-email-helper-text" required>
              <label for="dancerEmailInput" class="mdc-floating-label mdc-floating-label--float-above">Email</label>
              <div class="mdc-line-ripple" style="transform-origin: 74.5px center 0px;"></div>
            </div>
            <p id="dancer-email-helper-text" class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg" role="alert">
                Invalid email
            </p>
            
            <div id="dancer-dancing-styles" class="mdc-chip-set mdc-chip-set--filter" aria-controls="dancer-dancing-styles-helper-text" aria-describedby="dancer-dancing-styles-helper-text">
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Ballet</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Break dance</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Cha cha</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Disco dance</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Hip hop</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Jazz</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Modern</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Pop</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Rumba</div>
              </div>
              <div class=" mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Salsa</div>
              </div>
              <div class=" mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Swing</div>
              </div>
              <div class="mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Waltz</div>
              </div>
              <div class=" mdc-chip mdc-ripple-upgraded" tabindex="0">
                <div class="mdc-chip__checkmark">
                  <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                    <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                  </svg>
                </div>
                <div class="mdc-chip__text">Tango</div>
              </div>
            </div>
            <p id="dancer-dancing-styles-helper-text" class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg" role="alert">
                Choosing dancing style is required
            </p>
            <confirm-self-hiding-message 
                isVisible="${props._signUpStatus !== null}" 
                status="${props._signUpStatus}" 
                successStatus="SUBSCRIBE_SUCCESS" failureStatus="SUBSCRIBE_FAILURE" 
                successfulText="Signing up was successful" 
                unSuccessfulText="Signing up was unsuccessful">
            </confirm-self-hiding-message>
        </div>
        <div>
            <button class="mdc-button mdc-button--raised mdc-ripple-upgraded mdc-ripple-upgraded--foreground-activation" id="dancerSignUpButton">
              Sign up
            </button>
        </div>
      </section>
      <!--<section>-->
        <!--<h2>Dance teacher</h2>-->
        <!--<p>Struggling to find group of dancing lerner? We would like to help.-->
            <!--Write your email address and mark on map place where you can give lessons.-->
            <!--We will contact you when group of students will gather nearby.-->
        <!--</p>-->
      <!--</section>-->
      <!--<section>-->
        <!--<h2>Dance floor renting</h2>-->
        <!--<p>Do you have unused dance floor? Would you like to rent a dance floor for couple of hours for dancing lessons?-->
        <!--Write your email address and mark on map place where your dance floor is placed. -->
        <!--We will contact you when renting dance floor will be possible.-->
        <!--</p>-->
      <!--</section>-->
      <section>
        <h4>Unsubscribe</h4>
        <p>You can unsubscribe from lists above at any moment. Just write your email.</p>
        <div>
            <div class="mdc-text-field mdc-text-field--upgraded" id="unsubscribeInputWrap">
                  <input type="email" class="mdc-text-field__input" id="unsubscribeEmailInput" aria-controls="unsubscribe-email-helper-text" aria-describedby="unsubscribe-email-helper-text" required>
                  <label for="dancerEmailInput" class="mdc-floating-label mdc-floating-label--float-above">Email</label>
                  <div class="mdc-line-ripple" style="transform-origin: 74.5px center 0px;"></div>
            </div>           
            <p id="unsubscribe-email-helper-text" class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg" role="alert">
                Invalid email
            </p>
            <confirm-self-hiding-message 
                isVisible="${props._unsubscribeStatus !== null}" 
                status="${props._unsubscribeStatus}" 
                successStatus="UNSUBSCRIBE_SUCCESS" failureStatus="UNSUBSCRIBE_FAILURE" 
                successfulText="Unsubscribe was successful" 
                unSuccessfulText="Unsubscribe was unsuccessful">
            </confirm-self-hiding-message>
        </div>
        <div>
            <button class="mdc-button mdc-button--raised mdc-ripple-upgraded mdc-ripple-upgraded--foreground-activation" id="unsubscribeButton">
              Unsubscribe
            </button>
        </div>
      </section>
    `;
    }

    static get properties() {
        return {
            _dancer: {},
            _dancerEmail: String,
            _dancerSignUpIsDisabled: String,
            _signUpStatus: String,
            _unsubscribeStatus: String
        }
    }

    _stateChanged(state) {
        let self = this;
        this._dancer = state.signUpState.dancer;
        this._dancerEmail = state.signUpState.dancer.email;
        this._signUpStatus = state.signUpState.dancer.signUpStatus;
        this._unsubscribeStatus = state.signUpState.dancer.unsubscribeStatus;
        this._dancerSignUpIsDisabled = !EmailValidator.isValidEmail(this._dancerEmail);
    }

    initMap() {
        let self = this;
        let warsawLatLng = {lat: 52.237049, lng: 21.017532};
        let dancerMap = new google.maps.Map(this.shadowRoot.getElementById('dancerMap'), {
            zoom: 14,
            center: warsawLatLng
        });
        let marker = new google.maps.Marker({position: warsawLatLng, map: dancerMap});

        let autocomplete = new google.maps.places.Autocomplete(this.shadowRoot.getElementById('dancerPlaceInput'), {placeholder: undefined});
        autocomplete.bindTo('bounds', dancerMap);
        autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

        autocomplete.addListener('place_changed', function () {
            store.dispatch(updateDancerPreferredPosition(null, null));
            marker.setPosition(null);
            marker.setVisible(false);
            let place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                dancerMap.fitBounds(place.geometry.viewport);
            } else {
                dancerMap.setCenter(place.geometry.location);
                dancerMap.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            store.dispatch(updateDancerPreferredPosition(place.geometry.location.lat(), place.geometry.location.lng()));
            self.validateDancerPlace();
        });
    }

    validateDancerSignUp() {
        let validationResult = true;
        validationResult &= this.validateDancerPlace();
        validationResult &= this.validateDancerDistance();
        validationResult &= this.validateDancerEmail();
        validationResult &= this.validateDancerStyles();
        return validationResult;
    }

    validateDancerPlace() {
        let self = this;
        let validationResult = true;
        const place = self.shadowRoot.getElementById('dancerPlaceInput').value;
        if (self._dancer.mapLat === null || self._dancer.mapLng === null || place === null || place.trim() === '') {
            self.shadowRoot.getElementById('dancerPlaceInputWrap').classList.add('mdc-text-field--invalid');
            self.shadowRoot.getElementById('dancer-place-helper-text').classList.add('mdc-text-field-helper-text--persistent');
            validationResult = false;
        } else {
            self.shadowRoot.getElementById('dancerPlaceInputWrap').classList.remove('mdc-text-field--invalid');
            self.shadowRoot.getElementById('dancer-place-helper-text').classList.remove('mdc-text-field-helper-text--persistent');
        }
        return validationResult;
    }

    validateDancerStyles() {
        let self = this;
        let validationResult = true;
        const dancerChosenStyles = self.getDancerChosenDanceStyles();
        if (dancerChosenStyles.length === 0) {
            self.shadowRoot.getElementById('dancer-dancing-styles').classList.add('mdc-text-field--invalid');
            if (!self.shadowRoot.getElementById('dancer-dancing-styles-helper-text').classList.contains('mdc-text-field-helper-text--persistent')) {
                self.shadowRoot.getElementById('dancer-dancing-styles-helper-text').classList.add('mdc-text-field-helper-text--persistent');
            }
            validationResult = false;
        } else {
            self.shadowRoot.getElementById('dancer-dancing-styles').classList.remove('mdc-text-field--invalid');
            self.shadowRoot.getElementById('dancer-dancing-styles-helper-text').classList.remove('mdc-text-field-helper-text--persistent');
        }
        return validationResult;
    }

    validateDancerDistance() {
        let self = this;
        let validationResult = true;
        const distance = self.shadowRoot.getElementById('dancerPlaceDistanceInput').value;
        if (distance === null || distance <= 0) {
            self.shadowRoot.getElementById('dancerPlaceDistanceInputWrap').classList.add('mdc-text-field--invalid');
            if (!self.shadowRoot.getElementById('dancer-place-distance-helper-text').classList.contains('mdc-text-field-helper-text--persistent')) {
                self.shadowRoot.getElementById('dancer-place-distance-helper-text').classList.add('mdc-text-field-helper-text--persistent');
            }
            validationResult = false;
        } else {
            self.shadowRoot.getElementById('dancerPlaceDistanceInputWrap').classList.remove('mdc-text-field--invalid');
            self.shadowRoot.getElementById('dancer-place-distance-helper-text').classList.remove('mdc-text-field-helper-text--persistent');
        }
        return validationResult;
    }

    validateDancerEmail() {
        let self = this;
        let validationResult = true;
        const email = self.shadowRoot.getElementById('dancerEmailInput').value;
        if (EmailValidator.isValidEmail(email)) {
            self.shadowRoot.getElementById('dancerEmailInputWrap').classList.remove('mdc-text-field--invalid');
            self.shadowRoot.getElementById('dancer-email-helper-text').classList.remove('mdc-text-field-helper-text--persistent');
        } else {
            self.shadowRoot.getElementById('dancerEmailInputWrap').classList.add('mdc-text-field--invalid');
            self.shadowRoot.getElementById('dancer-email-helper-text').classList.add('mdc-text-field-helper-text--persistent');
            validationResult = false;
        }
        return validationResult;
    }

    bindDancerSignUpButton() {
        let self = this;
        this.shadowRoot.getElementById('dancerSignUpButton').addEventListener('click', function () {
            let dancerSignUpIsValid = self.validateDancerSignUp();
            if (dancerSignUpIsValid) {
                const email = self.shadowRoot.getElementById('dancerEmailInput').value;
                const distance = self.shadowRoot.getElementById('dancerPlaceDistanceInput').value;
                const chosenDanceStyles = self.getDancerChosenDanceStyles();
                store.dispatch(signUpDancer(email, self._dancer.mapLat, self._dancer.mapLng, distance, chosenDanceStyles));
            }
        })
    }

    bindUnsubscribeButton() {
        let self = this;
        this.shadowRoot.getElementById('unsubscribeButton').addEventListener('click', function () {
            let unsubscribeIsValid = self.validateUnsubscribeEmail();
            if (unsubscribeIsValid) {
                const email = self.shadowRoot.getElementById('unsubscribeEmailInput').value;
                store.dispatch(unsubscribe(email));
            }
        })
    }

    getDancerChosenDanceStyles() {
        let self = this;
        return Array.prototype.map.call(
            self.shadowRoot.querySelectorAll('.mdc-chip-set--filter .mdc-chip--selected > .mdc-chip__text'),
            function (t) {
                return t.textContent;
            }
        );
    }

    _firstRendered() {
        this.whenGoogleLoadedDo(this.afterGoogleMapsLoaded);
    }

    afterGoogleMapsLoaded() {
        let self = this;
        self.initMap();
        self.prepareDancerPlaceInput();
        self.prepareDancerDistanceInput();
        self.prepareDancerEmailInput();
        self.prepareUnsubscribeEmailInput();
        self.prepareDancerStylesValidation();
        self.bindDancerSignUpButton();
        self.bindUnsubscribeButton();
        self.prepareRippleEffect();
    }

    whenGoogleLoadedDo(fnt) {
        let self = this;
        if (typeof google !== 'undefined') {
            fnt();
        } else {
            setTimeout(function () {
                (function (fnt) {
                    self.whenGoogleLoadedDo(fnt);
                })(fnt)
            }, 500);
        }
    }

    prepareDancerPlaceInput() {
        let self = this;
        new MDCTextField(this.shadowRoot.getElementById('dancerPlaceInputWrap'));
        this.shadowRoot.getElementById('dancerPlaceInput').addEventListener('input', function () {
            store.dispatch(updateDancerPreferredPosition(null, null));
            self.validateDancerPlace();
        })
    }

    prepareRippleEffect() {
        let buttons = this.shadowRoot.querySelectorAll('.mdc-button');
        for (let i = 0, btn; btn = buttons[i]; i++) {
            new MDCRipple(btn);
        }
    }

    prepareDancerDistanceInput() {
        let self = this;
        new MDCTextField(this.shadowRoot.getElementById('dancerPlaceDistanceInputWrap'));
        this.shadowRoot.getElementById('dancerEmailInput').addEventListener('input', function () {
            store.dispatch(updateEmail(this.value));
            self.validateDancerDistance();
        })
    }

    prepareDancerEmailInput() {
        let self = this;
        new MDCTextField(this.shadowRoot.getElementById('dancerEmailInputWrap'));
        this.shadowRoot.getElementById('dancerEmailInput').addEventListener('input', function () {
            store.dispatch(updateEmail(this.value));
            self.validateDancerEmail();
        })
    }

    prepareDancerStylesValidation() {
        let self = this;
        this.shadowRoot.querySelectorAll('.mdc-chip-set:not(#input-chip-set)').forEach(function (chipSet) {
            new MDCChipSet(chipSet);
        });
        this.shadowRoot.getElementById('dancer-dancing-styles').addEventListener('click', function () {
            self.validateDancerStyles();
        })
    }

    prepareUnsubscribeEmailInput() {
        let self = this;
        new MDCTextField(this.shadowRoot.getElementById('unsubscribeInputWrap'));
        this.shadowRoot.getElementById('unsubscribeEmailInput').addEventListener('input', function () {
            self.validateUnsubscribeEmail();
        })
    }

    validateUnsubscribeEmail() {
        let self = this;
        let validationResult = true;
        const email = self.shadowRoot.getElementById('unsubscribeEmailInput').value;
        if (EmailValidator.isValidEmail(email)) {
            self.shadowRoot.getElementById('unsubscribeInputWrap').classList.remove('mdc-text-field--invalid');
            self.shadowRoot.getElementById('unsubscribe-email-helper-text').classList.remove('mdc-text-field-helper-text--persistent');
        } else {
            self.shadowRoot.getElementById('unsubscribeInputWrap').classList.add('mdc-text-field--invalid');
            self.shadowRoot.getElementById('unsubscribe-email-helper-text').classList.add('mdc-text-field-helper-text--persistent');
            validationResult = false;
        }
        return validationResult;
    }

}

window.customElements.define('sign-up', SignUpView);
