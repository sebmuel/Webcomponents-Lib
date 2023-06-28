import { css, html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("sp-text-writer")
export class SpTextWriter extends LitElement {
  @property({ type: String })
  word = "";

  @property({ type: Array })
  words: string[] = [];

  static styles = css`
    p {
      color: #fff;
    }
  `;

  observer?: IntersectionObserver;

  connectedCallback() {
    super.connectedCallback();
    this.observer = new IntersectionObserver(this.handleIntersect);
    this.observer.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
  }

  handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.target === this) {
        if (entry.isIntersecting) {
          this.animateWords();
        } else {
          this.words = [];
        }
      }
    });
  };

  async animateWords() {
    const chars = this.word.split("");
    for (const char of chars) {
      this.words = [...this.words, char];
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  render() {
    return html`<p>${this.words}</p>`;
  }
}
