import { CSSResult, css, html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import "./sp-modal.ts";
import { ytBus } from "./EventBus/YoutubeBus.ts";
import { ISessionStorage } from "./Interfaces/ISessionStorage.ts";
import { youtubeConsentStorage } from "./SessionStorage/YoutubeConsentStorage.ts";

@customElement("sp-youtube-loader")
export class SpYoutubeLoader extends LitElement {
  @property()
  height: CSSResult | null = null;

  @property({ type: String, reflect: false })
  private src: string | null = null;

  @property({ type: Boolean })
  private consent: boolean;

  @property({ type: Boolean, reflect: false })
  private showModal: boolean = false;

  private ytUrl: string | null = null;
  private bus: IEventBus<boolean> = ytBus;
  private storage: ISessionStorage<boolean> = youtubeConsentStorage;

  static styles = [
    css`
      :host {
        color: #fff;
      }

      button {
        padding: 8px 8px;
        background-color: var(--bs-primary);
        border: 1px solid var(--bs-primary);
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
      }

      button:hover {
        background-color: transparent;
      }

      .consent-wrapper,
      .video-wrapper {
        display: flex;
        background-color: gray;
        height: 30vh;
        min-height: 300px;
        justify-content: center;
        align-items: center;
      }
    `,
  ];

  constructor() {
    super();
    this.bus.subscribe("consent", this.handleConsentGiven);
    const consent = this.storage.getItem("yt-consent");
    this.consent = consent === null ? false : consent;
  }

  firstUpdated(): void {
    this.addEventListener("consent-given", this.consentGiven.bind(this));
  }

  connectedCallback(): void {
    super.connectedCallback();
    const ytId = this.extractYoutubeID(this.src);
    this.ytUrl = ytId !== null ? `https://www.youtube.com/embed/${ytId}` : null;
    this.removeAttribute("src");
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("consent-given", this.consentGiven);
    this.bus.unsubscribe("consent", this.handleConsentGiven);
  }

  showConsentBox() {
    this.showModal = !this.showModal;
  }

  handleConsentGiven = () => {
    this.consent = true;
  };

  consentGiven = () => {
    this.bus.publish("consent", true);
    this.storage.setItem("yt-consent", true);
  };

  extractYoutubeID(url: string | null) {
    if (url === null) return null;

    let urlObj = new URL(url);
    let videoId: string | null = null;

    if (urlObj.pathname.startsWith("/embed/")) {
      videoId = urlObj.pathname.slice(7);
    } else if (urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") {
      videoId = urlObj.searchParams.get("v");
    } else if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    }

    return videoId;
  }

  render() {
    if (this.consent === false) {
      return html`
        <div class="consent-wrapper">
          ${this.ytUrl === "" || this.ytUrl === null
            ? html`<p>No Valid Youtube Url Provided</p> `
            : html`<button data-show="${this.showModal}" @click=${this.showConsentBox}>Show</button>`}
          <sp-modal @consent-given=${this.consentGiven} .show=${this.showModal}></sp-modal>
        </div>
      `;
    } else if (this.consent === true) {
      return html`
        <div class="video-wrapper">
          <iframe
            width="100%"
            height="100%"
            src="${this.ytUrl}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      `;
    }
  }
}
