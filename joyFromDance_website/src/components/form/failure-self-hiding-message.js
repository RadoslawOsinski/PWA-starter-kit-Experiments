import {html, LitElement} from '@polymer/lit-element';

// These are the shared styles needed by this element.
import {SharedStyles} from './../shared-styles.js';

class FailureSelfHidingMessage extends LitElement {

    _render(props) {
        return html`
      ${SharedStyles}
      <p class="mdc-text-field-helper-text mdc-text-field-helper-text--validation-msg mdc-text-field-helper-text--persistent" style="color: #b00020;margin-bottom: 8px;opacity: 1; visibility: ${props.isVisible ? 'visible' : 'hidden'}" role="alert">
        ${props.text}
      </p>
    `;
    }

    static get properties() {
        return {
            isVisible: Boolean,
            text: String
        }
    }

}


window.customElements.define('failure-self-hiding-message', FailureSelfHidingMessage);
