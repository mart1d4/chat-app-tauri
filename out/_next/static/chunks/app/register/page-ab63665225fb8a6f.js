(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[11],{9344:function(e,t,a){Promise.resolve().then(a.bind(a,3673)),Promise.resolve().then(a.t.bind(a,4490,23))},3673:function(e,t,a){"use strict";a.r(t);var s=a(9268),r=a(6006),n=a(8921),o=a(4501),l=a(6008),i=a(4490),u=a.n(i),d=a(5846),c=a.n(d);let h=/^.{2,32}$/,p=/^.{8,256}$/;t.default=()=>{let[e,t]=(0,r.useState)(!1),[a,i]=(0,r.useState)(""),[d,f]=(0,r.useState)(""),[m,g]=(0,r.useState)(""),[_,b]=(0,r.useState)(""),[v,w]=(0,r.useState)(""),x=(0,r.useRef)(null),C=(0,l.useRouter)(),{auth:j,loading:y}=(0,n.Z)({context:"auth"});(0,r.useEffect)(()=>{!y&&(null==j?void 0:j.accessToken)&&C.push("/channels/me")},[y]),(0,r.useEffect)(()=>{let e=e=>{e.stopPropagation(),"Enter"===e.key&&k(e)};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},[a,d,m,e]),(0,r.useEffect)(()=>{var e;null===(e=x.current)||void 0===e||e.focus()},[]),(0,r.useEffect)(()=>{var e;null===(e=x.current)||void 0===e||e.focus()},[_]),(0,r.useEffect)(()=>{b("")},[a]),(0,r.useEffect)(()=>{w("")},[d,m]);let k=async s=>{if(s.preventDefault(),e||!a||!d||!m)return;t(!0);let r=h.test(a),n=p.test(d);if(r||(b("Invalid Username"),t(!1)),n||(w("Invalid Password"),t(!1)),!r||!n)return;if(d!==m){w("Passwords do not match"),t(!1);return}let o=await fetch("".concat("http://localhost:3000/api","/auth/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:a,password:d})}).then(e=>e.json());o.success?(i(""),f(""),g(""),t(!1),C.push("/login")):(o.message.includes("Username")?b(o.message):(o.message.includes("Password")||b(o.message),w(o.message)),t(!1))};return(0,s.jsxs)("div",{className:u().loginBlock,children:[(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{htmlFor:"uid",style:{color:_.length?"var(--error-light)":"var(--foreground-3)"},children:["Username",_.length>0&&(0,s.jsxs)("span",{className:u().errorLabel,children:["- ",_]})]}),(0,s.jsx)("div",{className:u().inputContainer,children:(0,s.jsx)("input",{ref:x,id:"uid",type:"text",name:"username","aria-label":"Username",autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",minLength:2,maxLength:32,spellCheck:"false","aria-labelledby":"uid","aria-describedby":"uid",value:a,onChange:e=>i(e.target.value)})})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{htmlFor:"password",style:{color:v.length?"var(--error-light)":"var(--foreground-3)"},children:["Password",v.length>0&&(0,s.jsxs)("span",{className:u().errorLabel,children:["- ",v]})]}),(0,s.jsx)("div",{className:u().inputContainer,children:(0,s.jsx)("input",{id:"password",type:"password",name:"password","aria-label":"Password",autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",maxLength:256,spellCheck:"false","aria-labelledby":"password","aria-describedby":"password",value:d,onChange:e=>f(e.target.value)})})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("label",{htmlFor:"password-match",style:{color:v.length?"var(--error-light)":"var(--foreground-3)"},children:["Password Match",v.length>0&&(0,s.jsxs)("span",{className:u().errorLabel,children:["- ",v]})]}),(0,s.jsx)("div",{className:u().inputContainer,children:(0,s.jsx)("input",{id:"password-match",type:"password",name:"password-match","aria-label":"Password Match",autoCapitalize:"off",autoComplete:"off",autoCorrect:"off",maxLength:256,spellCheck:"false","aria-labelledby":"password-match","aria-describedby":"password-match",value:m,onChange:e=>g(e.target.value)})})]}),(0,s.jsx)("button",{type:"submit",className:u().buttonSubmit,onClick:e=>k(e),children:e?(0,s.jsx)(o.xg,{}):"Register"}),(0,s.jsx)("div",{className:u().bottomText,children:(0,s.jsx)(c(),{href:"/login",children:"Already have an account?"})})]})}},4490:function(e){e.exports={wrapper:"Auth_wrapper__Zn7VT",wrapperRegister:"Auth_wrapperRegister__M8Z_e",popIn:"Auth_popIn__jTlJD",loginContainer:"Auth_loginContainer__f_9TX",header:"Auth_header__zgmId",loginBlock:"Auth_loginBlock__bL_Lq",errorLabel:"Auth_errorLabel__4QfIn",inputContainer:"Auth_inputContainer__eevBb",passwordForgot:"Auth_passwordForgot__ETKbL",buttonSubmit:"Auth_buttonSubmit__F5_r_",bottomText:"Auth_bottomText__miBKJ"}}},function(e){e.O(0,[891,971,501,253,769,744],function(){return e(e.s=9344)}),_N_E=e.O()}]);