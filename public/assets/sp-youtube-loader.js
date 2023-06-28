import{s as u,x as l,i as p,n as a,e as d}from"./query-assigned-elements.js";import"./sp-modal.js";class b{constructor(){this.listeners=[]}subscribe(e,t){let n=this.listeners.find(s=>s.eventName===e);n||(n={eventName:e,callbacks:[]},this.listeners.push(n)),n.callbacks.push(t)}unsubscribe(e,t){let n=this.listeners.find(s=>s.eventName===e);n&&(n.callbacks=n.callbacks.filter(s=>s!==t))}publish(e,t){const n=this.listeners.find(s=>s.eventName===e);if(!n)throw new Error(`No listeners for event: ${e}`);n.callbacks.forEach(s=>s(t))}}const f=new b;class v{getItem(e){let t=window.localStorage.getItem(e);return t!==null&&(t=JSON.parse(t)),t}setItem(e,t){window.localStorage.setItem(e,JSON.stringify(t))}}const w=new v;var m=Object.defineProperty,y=Object.getOwnPropertyDescriptor,i=(o,e,t,n)=>{for(var s=n>1?void 0:n?y(e,t):e,c=o.length-1,h;c>=0;c--)(h=o[c])&&(s=(n?h(e,t,s):h(s))||s);return n&&s&&m(e,t,s),s};let r=class extends u{constructor(){super(),this.height=null,this.src=null,this.showModal=!1,this.ytUrl=null,this.bus=f,this.storage=w,this.handleConsentGiven=()=>{this.consent=!0},this.consentGiven=()=>{this.bus.publish("consent",!0),this.storage.setItem("yt-consent",!0)},this.bus.subscribe("consent",this.handleConsentGiven);const o=this.storage.getItem("yt-consent");this.consent=o===null?!1:o}firstUpdated(){this.addEventListener("consent-given",this.consentGiven.bind(this))}connectedCallback(){super.connectedCallback();const o=this.extractYoutubeID(this.src);this.ytUrl=o!==null?`https://www.youtube.com/embed/${o}`:null,this.removeAttribute("src")}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("consent-given",this.consentGiven),this.bus.unsubscribe("consent",this.handleConsentGiven)}showConsentBox(){this.showModal=!this.showModal}extractYoutubeID(o){if(o===null)return null;let e=new URL(o),t=null;return e.pathname.startsWith("/embed/")?t=e.pathname.slice(7):e.hostname==="www.youtube.com"||e.hostname==="youtube.com"?t=e.searchParams.get("v"):e.hostname==="youtu.be"&&(t=e.pathname.slice(1)),t}render(){if(this.consent===!1)return l`
        <div class="consent-wrapper">
          ${this.ytUrl===""||this.ytUrl===null?l`<p>No Valid Youtube Url Provided</p> `:l`<button data-show="${this.showModal}" @click=${this.showConsentBox}>Show</button>`}
          <sp-modal @consent-given=${this.consentGiven} .show=${this.showModal}></sp-modal>
        </div>
      `;if(this.consent===!0)return l`
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
      `}};r.styles=[p`
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
    `];i([a()],r.prototype,"height",2);i([a({type:String,reflect:!1})],r.prototype,"src",2);i([a({type:Boolean})],r.prototype,"consent",2);i([a({type:Boolean,reflect:!1})],r.prototype,"showModal",2);r=i([d("sp-youtube-loader")],r);export{r as SpYoutubeLoader};
