import {html, LitElement} from '@polymer/lit-element';

import './success-self-hiding-message.js'
import './failure-self-hiding-message.js'

// These are the shared styles needed by this element.
import {SharedStyles} from './../shared-styles.js';

class ConfirmSelfHidingMessage extends LitElement {

    _render(props) {
        return html`
      ${SharedStyles}
      <div style="visibility: ${props.isVisible ? 'visible' : 'hidden'}">
        <success-self-hiding-message isVisible="${props.status === props.successStatus}" text="${props.successfulText}"></success-self-hiding-message>
        <failure-self-hiding-message isVisible="${props.status === props.failureStatus}" text="${props.unSuccessfulText}"></failure-self-hiding-message>
      </div>
    `;
    }

    static get properties() {
        return {
            isVisible: Boolean,
            status: Boolean,
            successStatus: String,
            failureStatus: String,
            successfulText: String,
            unSuccessfulText: String
        }
    }

}

window.customElements.define('confirm-self-hiding-message', ConfirmSelfHidingMessage);
