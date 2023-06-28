import { html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("sp-modal")
export class SpModal extends LitElement {
  @property({ type: Boolean })
  show?: boolean;

  @property({ type: Boolean })
  consent?: boolean;

  handleAccept() {
    this.dispatchEvent(new CustomEvent("consent-given"));
  }

  handleDecline() {
    this.show = false;
  }

  render() {
    if (this.show) {
      return html`
        <div class="modal">
          <button @click=${this.handleAccept}>Accept</button>
          <button @click=${this.handleDecline}>Decline</button>
        </div>
      `;
    }
  }
}
