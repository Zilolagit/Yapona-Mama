import{B as h}from"./BreadCrumb-0ea66ade.js";import{_ as v,m as f,a as m,r as g,o as e,c,b as s,d as b,F as _,e as P,t as a,u as y}from"./index-b5226354.js";const S={data(){return{news:[]}},computed:{...f(y)},components:{BreadCrumb:h},async mounted(){let t=this.$progress.start();const d=await m.get("http://localhost:3000/posts");this.news=d.data,t.finish()}},B={class:"container header__container"},C={class:"news__row"},$=["onClick"],k={class:"col-md-3"},N=["src","alt"],V={class:"col-md-9 mt-4 mt-md-0"},z={class:"offcanvas offcanvas-top",tabindex:"-1",id:"newsPop","aria-labelledby":"newsPop"},F={class:"offcanvas-body"},x={class:"row"},D={class:"col-md-4"},E=["src","alt"],L={class:"col-md-8 mt-3 mt-md-0"};function j(t,d,q,A,p,G){var r,l,n,i;const u=g("BreadCrumb");return e(),c(_,null,[s("div",null,[s("div",B,[b(u),s("div",C,[(e(!0),c(_,null,P(p.news,o=>(e(),c("div",{class:"row mb-4","data-bs-toggle":"offcanvas","data-bs-target":"#newsPop","aria-controls":"newsPop",onClick:H=>t.cardsStore.selectedPost=o},[s("div",k,[s("img",{src:`https://cdn.yaponamama.uz/news/${o==null?void 0:o.image}`,alt:o==null?void 0:o.title},null,8,N)]),s("div",V,[s("h3",null,a(o==null?void 0:o.title),1),s("p",null,a(o==null?void 0:o.desc.split(".")[0]),1)])],8,$))),256))])])]),s("div",z,[s("div",F,[s("div",x,[s("div",D,[s("img",{src:`https://cdn.yaponamama.uz/news/${(r=t.cardsStore.selectedPost)==null?void 0:r.image}`,alt:(l=t.cardsStore.selectedPost)==null?void 0:l.title},null,8,E)]),s("div",L,[s("h2",null,a((n=t.cardsStore.selectedPost)==null?void 0:n.title),1),s("p",null,a((i=t.cardsStore.selectedPost)==null?void 0:i.desc),1)])])])])],64)}const M=v(S,[["render",j],["__scopeId","data-v-92005c91"]]);export{M as default};
