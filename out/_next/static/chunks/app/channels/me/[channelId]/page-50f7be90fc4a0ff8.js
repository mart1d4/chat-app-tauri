(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[753],{7842:function(e,n,s){Promise.resolve().then(s.bind(s,178))},178:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return f}});var a=s(9268),t=s(6006),r=s(8921),i=s(4501),l=s(1344),c=s(730),d=(e,n)=>{let{auth:s}=(0,r.Z)({context:"auth"}),a=s.accessToken,i=(0,t.useMemo)(()=>n?{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)},body:JSON.stringify(n)}:{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a)}},[a,n]),{data:l,error:d,isLoading:o}=(0,c.ZP)(e,e=>fetch("".concat("http://localhost:3000/api").concat(e),i).then(e=>(e.ok||console.error(e),e.json())));return{data:l,isLoading:o,isError:d}},o=s(250),u=s.n(o),m=s(6462),h=s(1633),g=s.n(h),p=e=>{let{channel:n}=e,[s,c]=(0,t.useState)(null),[o,h]=(0,t.useState)(null),[p,_]=(0,t.useState)(null),[f,x]=(0,t.useState)([]),{data:j,isLoading:C}=d("/users/me/channels/".concat(n.id,"/messages")),v=(0,t.useRef)(!1),y=(0,t.useRef)(null);(0,t.useEffect)(()=>{j&&x((null==j?void 0:j.messages)||[])},[j]);let b=(null==j?void 0:j.hasMore)||!1,{auth:N}=(0,r.Z)({context:"auth"}),S=N.accessToken;(0,t.useEffect)(()=>(v.current&&(y.current=new(g())("7021ce394d98aaf3717d",{cluster:"eu"}),k()),()=>{var e;v.current=!0,null===(e=y.current)||void 0===e||e.unsubscribe("chat-app")}),[]);let k=()=>{var e;let s=null===(e=y.current)||void 0===e?void 0:e.subscribe("chat-app");null==s||s.bind("message-sent",e=>{e.channel===n.id&&e.message.author.id!==N.user.id&&x(n=>[...n,e.message])}),null==s||s.bind("message-edited",e=>{e.channel===n.id&&x(n=>n.map(n=>n.id===e.message.id?e.message:n))}),null==s||s.bind("message-deleted",e=>{console.log("Mess del: ",e.channel,e.messageId),e.channel===n.id&&x(n=>n.filter(n=>n.id!==e.messageId))})},D=(0,t.useCallback)(e=>{e&&(e.scrollTop=e.scrollHeight)},[f]);(0,t.useEffect)(()=>{localStorage.setItem("channel-url","/channels/me/".concat(n.id));let e=JSON.parse(localStorage.getItem("channel-".concat(n.id))||"{}");if((null==e?void 0:e.edit)&&h(e.edit),(null==e?void 0:e.reply)&&c(e.reply),"DM"===n.type){let e=n.recipients.find(e=>e.id!==N.user.id);_(e)}},[n]);let I=(e,n)=>{let s=Math.abs(new Date(e).getTime()-new Date(n).getTime());return s/6e4>=5},w=e=>!!(0===e||!["DEFAULT","REPLY"].includes(f[e-1].type)||f[e-1].author.id!==f[e].author.id||I(f[e-1].createdAt,f[e].createdAt)),E=e=>{if(0===e)return!0;let n=new Date(f[e-1].createdAt),s=new Date(f[e].createdAt);return n.getDate()!==s.getDate()||n.getMonth()!==s.getMonth()||n.getFullYear()!==s.getFullYear()},T=(0,a.jsxs)("div",{className:u().firstTimeMessageContainer,children:[(0,a.jsx)("div",{className:u().imageWrapper,children:(0,a.jsx)(i.qE,{src:n.icon,alt:n.name,size:80})}),(0,a.jsx)("h3",{className:u().friendUsername,children:n.name}),(0,a.jsxs)("div",{className:u().descriptionContainer,children:[p?(0,a.jsxs)(a.Fragment,{children:["This is the beginning of your direct message history with",(0,a.jsxs)("strong",{children:[" @",n.name]}),"."]}):(0,a.jsxs)(a.Fragment,{children:["Welcome to the beginning of the",(0,a.jsxs)("strong",{children:[" ",n.name]})," group."]}),p&&(0,a.jsxs)("div",{className:u().descriptionActions,children:[N.user.friendIds.includes(p.id)?(0,a.jsx)("button",{className:"grey",onClick:async()=>await (0,l.tJ)(S,p.username),children:"Remove Friend"}):N.user.requestSentIds.includes(p.id)?(0,a.jsx)("button",{className:"blue disabled",children:"Friend Request Sent"}):N.user.requestReceivedIds.includes(p.id)?(0,a.jsx)("button",{className:"grey",onClick:async()=>await (0,l.SK)(S,p.username),children:"Accept Friend Request"}):!N.user.blockedUserIds.includes(p.id)&&(0,a.jsx)("button",{className:"blue",onClick:async()=>await (0,l.SK)(S,p.username),children:"Add Friend"}),N.user.blockedUserIds.includes(p.id)?(0,a.jsx)("button",{className:"grey",onClick:async()=>await (0,l.zv)(S,p.id),children:"Unblock"}):(0,a.jsx)("button",{className:"grey",onClick:async()=>await (0,l.rf)(S,p.id),children:"Block"})]})]})]});return(0,a.jsxs)("div",{className:u().container,children:[(0,a.jsx)(i.tf,{channel:n}),(0,a.jsxs)("div",{className:u().content,children:[(0,a.jsxs)("main",{className:u().main,children:[(0,a.jsx)("div",{className:u().messagesWrapper,children:(0,a.jsx)("div",{ref:D,className:u().messagesScrollableContainer+" scrollbar",children:(0,a.jsx)("div",{className:u().scrollContent,children:(0,a.jsxs)("ol",{className:u().scrollContentInner,children:[C?(0,a.jsx)(i.ty,{}):(0,a.jsxs)(a.Fragment,{children:[b?(0,a.jsx)(i.ty,{}):T,f.map((e,n)=>(0,a.jsxs)("div",{children:[E(n)&&(0,a.jsx)("div",{className:u().messageDivider,children:(0,a.jsx)("span",{children:new Intl.DateTimeFormat("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}).format(new Date(e.createdAt))})}),(0,a.jsx)(i.v0,{message:e,large:w(n),last:n===f.length-1,edit:o,setEdit:h,reply:s,setReply:c})]},(0,m.Z)()))]}),(0,a.jsx)("div",{className:u().scrollerSpacer})]})})})}),(0,a.jsx)(i.Kx,{channel:n,friend:p,reply:s,setReply:c,setMessages:x})]}),(0,a.jsx)(i.r1,{channel:n})]})]})},_=s(6008),f=e=>{let{params:n}=e,[s,i]=(0,t.useState)(!0),[l,c]=(0,t.useState)(null),{auth:d}=(0,r.Z)({context:"auth"}),o=(0,_.useRouter)();return((0,t.useEffect)(()=>{var e;i(!0);let s=null===(e=d.user.channels)||void 0===e?void 0:e.find(e=>e.id===n.channelId);if(!s){o.push("/channels/me");return}let a=null==s?void 0:s.name;if("DM"===s.type){let e=s.recipients.find(e=>e.id!==d.user.id);a=e.username}else if("GROUP_DM"===s.type&&!s.name){let e=s.recipients.filter(e=>e.id!==d.user.id);a=e.map(e=>e.username).join(", ")}let t=null==s?void 0:s.icon;if("DM"===s.type){let e=s.recipients.find(e=>e.id!==d.user.id);t=e.avatar}c({...s,name:a,icon:t}),i(!1)},[n.channelId]),s)?(0,a.jsx)(a.Fragment,{}):(0,a.jsx)(p,{channel:l})}},250:function(e){e.exports={container:"Channels_container__QQyGq",content:"Channels_content__9YSR8",main:"Channels_main__AXBuI",messagesWrapper:"Channels_messagesWrapper__w93s4",messagesScrollableContainer:"Channels_messagesScrollableContainer__DEZ57",scrollContent:"Channels_scrollContent__hmTXp",scrollContentInner:"Channels_scrollContentInner__JiqVd",firstTimeMessageContainer:"Channels_firstTimeMessageContainer__3o6nD",imageWrapper:"Channels_imageWrapper__xO5Sq",friendUsername:"Channels_friendUsername__Bq7IW",descriptionContainer:"Channels_descriptionContainer__S4eIE",descriptionActions:"Channels_descriptionActions__P6Gde",scrollerSpacer:"Channels_scrollerSpacer__G0_Vn",messageDivider:"Channels_messageDivider__7mlOY"}}},function(e){e.O(0,[891,971,730,501,253,769,744],function(){return e(e.s=7842)}),_N_E=e.O()}]);