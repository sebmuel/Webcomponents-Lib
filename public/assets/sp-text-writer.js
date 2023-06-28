import{s as p,x as d,i as l,n as h,e as f}from"./query-assigned-elements.js";var w=Object.defineProperty,v=Object.getOwnPropertyDescriptor,a=(s,e,t,i)=>{for(var r=i>1?void 0:i?v(e,t):e,n=s.length-1,c;n>=0;n--)(c=s[n])&&(r=(i?c(e,t,r):c(r))||r);return i&&r&&w(e,t,r),r};let o=class extends p{constructor(){super(...arguments),this.word="",this.words=[],this.handleIntersect=s=>{s.forEach(e=>{e.target===this&&(e.isIntersecting?this.animateWords():this.words=[])})}}connectedCallback(){super.connectedCallback(),this.observer=new IntersectionObserver(this.handleIntersect),this.observer.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.observer&&(this.observer.disconnect(),this.observer=void 0)}async animateWords(){const s=this.word.split("");for(const e of s)this.words=[...this.words,e],await new Promise(t=>setTimeout(t,100))}render(){return d`<p>${this.words}</p>`}};o.styles=l`
    p {
      color: #fff;
    }
  `;a([h({type:String})],o.prototype,"word",2);a([h({type:Array})],o.prototype,"words",2);o=a([f("sp-text-writer")],o);export{o as SpTextWriter};
