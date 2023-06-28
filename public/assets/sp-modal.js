import{s as a,x as h,n as i,e as v}from"./query-assigned-elements.js";var d=Object.defineProperty,f=Object.getOwnPropertyDescriptor,p=(r,t,s,n)=>{for(var e=n>1?void 0:n?f(t,s):t,l=r.length-1,c;l>=0;l--)(c=r[l])&&(e=(n?c(t,s,e):c(e))||e);return n&&e&&d(t,s,e),e};let o=class extends a{handleAccept(){this.dispatchEvent(new CustomEvent("consent-given"))}handleDecline(){this.show=!1}render(){if(this.show)return h`
        <div class="modal">
          <button @click=${this.handleAccept}>Accept</button>
          <button @click=${this.handleDecline}>Decline</button>
        </div>
      `}};p([i({type:Boolean})],o.prototype,"show",2);p([i({type:Boolean})],o.prototype,"consent",2);o=p([v("sp-modal")],o);export{o as SpModal};
