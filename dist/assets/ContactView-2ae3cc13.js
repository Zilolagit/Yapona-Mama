import{_ as m,a as _,r as p,o as r,c,b as e,d as u,F as h,e as f,h as v,f as n,t,p as g,g as w}from"./index-b5226354.js";import{B as y}from"./BreadCrumb-0ea66ade.js";const b={data(){return{restaraunts:[]}},components:{BreadCrumb:y},async mounted(){let a=this.$progress.start();const d=await _.get("http://localhost:3000/restaraunts/");this.restaraunts=d.data,a.finish()}},s=a=>(g("data-v-21d1cc9e"),a=a(),w(),a),x={class:"container header__container"},k={class:"row contact"},B={class:"col-md-6"},C=s(()=>e("p",{class:"mt-5"},"Yapona Mama - delivery of sushi and rolls in Tashkent. We make our meals only from high quality products of world manufacturers, we are passionate about each order and always deliver on time.",-1)),V=s(()=>e("a",{href:"#"},"+99871-200-89-89 ",-1)),F=s(()=>e("p",null,"For complaints and suggestions, service management department - +99898-121-61-12 Rustam",-1)),I=s(()=>e("p",null,"For vacancies and employment, HR-department - +99898-125-50-20 (Tashkent), +99898-124-50-20 (regions) ",-1)),N=s(()=>e("p",null,"For commercial offers (advertising, cooperation): +99890-926-08-08 Vladimir",-1)),R=s(()=>e("p",null,"E-mail: info@yaponamama.uz",-1)),S=s(()=>e("h4",{class:"mb-4"},"Our Restaurants",-1)),T={class:"contact__box"},$={class:"mt-3"},z=s(()=>e("div",{class:"col-md-6"},[e("div",{class:"contact__img"},[e("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.088533406537!2d69.2535719!3d41.2851776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a89cfac6c2f%3A0xe4fa5b1f864e9ee8!2sYapona%20Mama!5e0!3m2!1sen!2s!4v1703615506985!5m2!1sen!2s",style:{border:"0"},allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade"})])],-1));function A(a,d,E,L,l,M){const i=p("BreadCrumb");return r(),c("div",null,[e("div",x,[u(i),e("div",k,[e("div",B,[C,V,F,I,N,R,S,l.restaraunts?(r(!0),c(h,{key:0},f(l.restaraunts,o=>(r(),c("div",T,[e("b",null,[n(t(o.name)+" ",1),e("span",null,t(o.work),1)]),e("h6",$,[n("Reserve: "),e("span",null,t(o.phone_numbers.join("; ")),1)]),e("h6",null,[n("Address: "),e("span",null,t(o.address),1)]),e("h6",null,[n("Landmark: "),e("span",null,t(o.location),1)])]))),256)):v("",!0)]),z])])])}const q=m(b,[["render",A],["__scopeId","data-v-21d1cc9e"]]);export{q as default};