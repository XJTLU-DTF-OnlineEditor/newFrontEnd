(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[774],{71418:function(re,z,e){"use strict";e.r(z),e.d(z,{default:function(){return S}});var m=e(49111),H=e(19650),o=e(71153),r=e(60331),X=e(57663),R=e(71577),J=e(98858),Y=e(4914),q=e(12968),Q=e(62462),x=e(34792),O=e(48086),F=e(3182),y=e(69610),p=e(54941),a=e(81306),t=e(72936),n=e(402),c=e(97272),v=e(94043),u=e.n(v),l=e(67294),L=e(7477),A=e(11021),W=e(39265),ee=e(50339),K=e(28991),i={icon:function($,D){return{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",fill:$}},{tag:"path",attrs:{d:"M184 840h656V184H184v656zm339.5-223h185c4.1 0 7.5 3.6 7.5 8v48c0 4.4-3.4 8-7.5 8h-185c-4.1 0-7.5-3.6-7.5-8v-48c0-4.4 3.4-8 7.5-8zM308 610.3c0-2.3 1.1-4.6 2.9-6.1L420.7 512l-109.8-92.2a7.63 7.63 0 01-2.9-6.1V351c0-6.8 7.9-10.5 13.1-6.1l192 160.9c3.9 3.2 3.9 9.1 0 12.3l-192 161c-5.2 4.4-13.1.7-13.1-6.1v-62.7z",fill:D}},{tag:"path",attrs:{d:"M321.1 679.1l192-161c3.9-3.2 3.9-9.1 0-12.3l-192-160.9A7.95 7.95 0 00308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 00-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48z",fill:$}}]}},name:"code",theme:"twotone"},s=i,d=e(27029),g=function($,D){return l.createElement(d.Z,(0,K.Z)((0,K.Z)({},$),{},{ref:D,icon:s}))};g.displayName="CodeTwoTone";var Z=l.forwardRef(g),T=e(49657),E=e(30381),M=e.n(E),f=e(85893),V=c.Z.Title,S=function(j){(0,a.Z)(D,j);var $=(0,t.Z)(D);function D(){var h;(0,y.Z)(this,D);for(var B=arguments.length,N=new Array(B),_=0;_<B;_++)N[_]=arguments[_];return h=$.call.apply($,[this].concat(N)),h.state={related_topic:"",course_list:[],views:"",topic_content:"",topic_img:""},h.listData=[],h.getCatalog=(0,F.Z)(u().mark(function I(){var C,w,b,G,U;return u().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return C=h.props.match.params.related_topic,P.next=3,(0,A.G$)(C);case 3:w=P.sent,w.error_code==200?(b=w.course_list,G=w.topic_content,U=w.topic_img,b=b.map(function(te){return te.fields.id=te.pk,te.fields}),h.setState({course_list:b,related_topic:C,topic_content:G,topic_img:U})):O.default.error(w.msg),console.log(h.state.course_list);case 6:case"end":return P.stop()}},I)})),h}return(0,p.Z)(D,[{key:"componentDidMount",value:function(){this.getCatalog()}},{key:"render",value:function(){var B=this,N=this.props.match.params.related_topic;return this.listData=[{href:this.props.location.pathname,title:this.props.match.params.related_topic,avatar:"https://joeschmoe.io/api/v1/random",description:this.state.topic_content}],(0,f.jsx)(L.ZP,{header:{title:(0,f.jsx)(V,{level:2,children:N}),breadcrumb:{}},content:(0,f.jsxs)(W.ZP,{split:"vertical",layout:"center",children:[(0,f.jsx)(W.ZP,{colSpan:"28%",children:(0,f.jsx)(Q.Z,{src:"/media/"+this.state.topic_img,width:180})}),(0,f.jsx)(W.ZP,{colSpan:"60%",children:(0,f.jsx)(Y.Z,{children:(0,f.jsx)(Y.Z.Item,{contentStyle:{color:"rgba(0, 0, 0, 0.45)",fontSize:"16px",lineHeight:1.5715},children:this.state.topic_content})})})]}),children:(0,f.jsx)(ee.Z,{toolBarRender:function(){return[(0,f.jsx)(R.Z,{onClick:(0,F.Z)(u().mark(function I(){var C;return u().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:return b.next=2,(0,T.G7)({topic:N,collect_time:M()().format("YYYY-MM-DD HH:mm:ss")});case 2:C=b.sent,console.log(C),C.error_code===204?O.default.error("User collection already exists!"):C.error_code===200&&O.default.success("user collection add success");case 5:case"end":return b.stop()}},I)})),type:"primary",children:"Add to Collection"},"add")]},rowKey:"id",headerTitle:"Course List",dataSource:this.state.course_list,showActions:"hover",onRow:function(I){return{onClick:function(){var C=(0,F.Z)(u().mark(function b(G){var U;return u().wrap(function(P){for(;;)switch(P.prev=P.next){case 0:return console.log(I),P.next=3,(0,T.PB)({topic:N,course_id:I.subtopic_id,last_practice_time:M()().format("YYYY-MM-DD HH:mm:ss")});case 3:U=P.sent,console.log(U);case 5:case"end":return P.stop()}},b)}));function w(b){return C.apply(this,arguments)}return w}()}},showExtra:"hover",metas:{title:{dataIndex:"title",render:function(I,C){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(c.Z.Text,{mark:!0,children:["[",C.subtopic_id,"]"]}),(0,f.jsx)("a",{href:B.props.location.pathname+"/"+C.id,style:{textDecoration:"none",color:"black"},children:C.title})]})}},avatar:{render:function(){return(0,f.jsx)(Z,{style:{fontSize:"inherit"}})}},subTitle:{dataIndex:"labels",render:function(I,C){return(0,f.jsxs)(H.Z,{size:0,children:[(0,f.jsx)(r.Z,{color:"blue",children:"in process"},C.id),(0,f.jsx)(r.Z,{color:"green",children:"done"},C.id),(0,f.jsx)(r.Z,{color:"red",children:"to do"},C.id)]})},search:!1}}})})}}]),D}(l.Component)},11021:function(re,z,e){"use strict";e.d(z,{D0:function(){return X},wA:function(){return R},tu:function(){return J},rq:function(){return Y},xH:function(){return q},G$:function(){return Q},Sp:function(){return x},A:function(){return O},BK:function(){return F},BW:function(){return y},EI:function(){return p}});var m=e(3182),H=e(94043),o=e.n(H),r=e(21010),X=function(){var a=(0,m.Z)(o().mark(function t(n){var c;return o().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return c="/server/V1/course/topicsByTeacher/?teacher_id=".concat(n),u.abrupt("return",(0,r.WY)(c));case 2:case"end":return u.stop()}},t)}));return function(n){return a.apply(this,arguments)}}(),R=function(){var a=(0,m.Z)(o().mark(function t(n,c){var v;return o().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return v="/server/V1/course/edit/",l.abrupt("return",(0,r.WY)(v,{method:"post",data:{request_entity:"Topic",content:{topic_id:n,topic_info:c}}}));case 2:case"end":return l.stop()}},t)}));return function(n,c){return a.apply(this,arguments)}}(),J=function(){var a=(0,m.Z)(o().mark(function t(n,c,v,u,l,L,A){var W;return o().wrap(function(K){for(;;)switch(K.prev=K.next){case 0:return W="/server/V1/course/edit/",K.abrupt("return",(0,r.WY)(W,{method:"post",data:{request_entity:"Course",content:{id:n,related_topic:c,title:v,content:u,answer:l,hint:L,teacher_id:A}}}));case 2:case"end":return K.stop()}},t)}));return function(n,c,v,u,l,L,A){return a.apply(this,arguments)}}(),Y=function(){var a=(0,m.Z)(o().mark(function t(n,c,v,u){var l;return o().wrap(function(A){for(;;)switch(A.prev=A.next){case 0:return l="/server/V1/course/create/",A.abrupt("return",(0,r.WY)(l,{method:"post",data:{request_entity:"Topic",content:{topic_title:n,topic_content:c,topic_img:v,teacher_id:u}}}));case 2:case"end":return A.stop()}},t)}));return function(n,c,v,u){return a.apply(this,arguments)}}(),q=function(){var a=(0,m.Z)(o().mark(function t(n,c,v,u,l){var L;return o().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:return L="/server/V1/course/create/",W.abrupt("return",(0,r.WY)(L,{method:"post",data:{request_entity:"Course",content:{related_topic:n,title:c,content:v,answer:u,hint:l}}}));case 2:case"end":return W.stop()}},t)}));return function(n,c,v,u,l){return a.apply(this,arguments)}}(),Q=function(){var a=(0,m.Z)(o().mark(function t(n){var c;return o().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return c="/server/V1/course/courses/".concat(n,"/"),u.abrupt("return",(0,r.WY)(c));case 2:case"end":return u.stop()}},t)}));return function(n){return a.apply(this,arguments)}}(),x=function(){var a=(0,m.Z)(o().mark(function t(n,c){var v;return o().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return v="/server/V1/course/courseDetail/".concat(n,"/").concat(c,"/"),l.abrupt("return",(0,r.WY)(v));case 2:case"end":return l.stop()}},t)}));return function(n,c){return a.apply(this,arguments)}}(),O=function(){var a=(0,m.Z)(o().mark(function t(n,c){var v;return o().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return v="/server/V1/course/delete/",l.abrupt("return",(0,r.WY)(v,{method:"post",data:{request_entity:"Course",related_topic:n,content:c}}));case 2:case"end":return l.stop()}},t)}));return function(n,c){return a.apply(this,arguments)}}(),F=function(){var a=(0,m.Z)(o().mark(function t(n){var c;return o().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return c="/server/V1/course/delete/",u.abrupt("return",(0,r.WY)(c,{method:"post",data:{request_entity:"Topic",content:n}}));case 2:case"end":return u.stop()}},t)}));return function(n){return a.apply(this,arguments)}}(),y=function(){var a=(0,m.Z)(o().mark(function t(n,c){var v;return o().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return v="/server/V1/course/sort/",l.abrupt("return",(0,r.WY)(v,{method:"post",data:{request_entity:"Course",related_topic:n,content:c}}));case 2:case"end":return l.stop()}},t)}));return function(n,c){return a.apply(this,arguments)}}(),p=function(){var a=(0,m.Z)(o().mark(function t(n,c){var v;return o().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return v="/server/V1/course/delete_img/",l.abrupt("return",(0,r.WY)(v,{method:"post",data:{request_entity:c,fname:n}}));case 2:case"end":return l.stop()}},t)}));return function(n,c){return a.apply(this,arguments)}}()},49657:function(re,z,e){"use strict";e.d(z,{BN:function(){return X},XQ:function(){return R},yC:function(){return J},UE:function(){return Y},PB:function(){return Q},ei:function(){return x},G7:function(){return O},P4:function(){return F}});var m=e(3182),H=e(94043),o=e.n(H),r=e(21010),X=function(){var y=(0,m.Z)(o().mark(function p(){return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,r.WY)("/server/V1/course/topic/6",{method:"GET"}));case 1:case"end":return t.stop()}},p)}));return function(){return y.apply(this,arguments)}}(),R=function(){var y=(0,m.Z)(o().mark(function p(){return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,r.WY)("/server/V1/course/topic/all",{method:"GET"}));case 1:case"end":return t.stop()}},p)}));return function(){return y.apply(this,arguments)}}(),J=function(){var y=(0,m.Z)(o().mark(function p(a){var t;return o().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return t="/server/V1/course/search/".concat(a),c.abrupt("return",(0,r.WY)(t));case 2:case"end":return c.stop()}},p)}));return function(a){return y.apply(this,arguments)}}(),Y=function(){var y=(0,m.Z)(o().mark(function p(){return o().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,r.WY)("/server/V1/course/newtopic/",{method:"GET"}));case 1:case"end":return t.stop()}},p)}));return function(){return y.apply(this,arguments)}}(),q=null,Q=function(){var y=(0,m.Z)(o().mark(function p(a){return o().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(a),n.abrupt("return",(0,r.WY)("/server/V1/course/change_user_progress/",{method:"POST",data:a,headers:{Token:localStorage.getItem("token"),currentAuthority:localStorage.getItem("currentAuthority")}}));case 2:case"end":return n.stop()}},p)}));return function(a){return y.apply(this,arguments)}}(),x=function(){var y=(0,m.Z)(o().mark(function p(a){return o().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(a),n.abrupt("return",(0,r.WY)("/server/V1/course/remove_user_progress/",{method:"POST",data:a,headers:{Token:localStorage.getItem("token"),currentAuthority:localStorage.getItem("currentAuthority")}}));case 2:case"end":return n.stop()}},p)}));return function(a){return y.apply(this,arguments)}}(),O=function(){var y=(0,m.Z)(o().mark(function p(a){return o().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(a),n.abrupt("return",(0,r.WY)("/server/V1/course/add_user_collection/",{method:"POST",data:a,headers:{Token:localStorage.getItem("token"),currentAuthority:localStorage.getItem("currentAuthority")}}));case 2:case"end":return n.stop()}},p)}));return function(a){return y.apply(this,arguments)}}(),F=function(){var y=(0,m.Z)(o().mark(function p(a){return o().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(a),n.abrupt("return",(0,r.WY)("/server/V1/course/delete_user_collection/",{method:"POST",data:a,headers:{Token:localStorage.getItem("token"),currentAuthority:localStorage.getItem("currentAuthority")}}));case 2:case"end":return n.stop()}},p)}));return function(a){return y.apply(this,arguments)}}()},4914:function(re,z,e){"use strict";e.d(z,{K:function(){return u},Z:function(){return K}});var m=e(96156),H=e(28481),o=e(90484),r=e(67294),X=e(94184),R=e.n(X),J=e(50344),Y=e(24308),q=e(21687),Q=e(65632),x=e(22122);function O(i){return i!=null}var F=function(s){var d=s.itemPrefixCls,g=s.component,Z=s.span,T=s.className,E=s.style,M=s.labelStyle,f=s.contentStyle,V=s.bordered,S=s.label,j=s.content,$=s.colon,D=g;if(V){var h;return r.createElement(D,{className:R()((h={},(0,m.Z)(h,"".concat(d,"-item-label"),O(S)),(0,m.Z)(h,"".concat(d,"-item-content"),O(j)),h),T),style:E,colSpan:Z},O(S)&&r.createElement("span",{style:M},S),O(j)&&r.createElement("span",{style:f},j))}return r.createElement(D,{className:R()("".concat(d,"-item"),T),style:E,colSpan:Z},r.createElement("div",{className:"".concat(d,"-item-container")},S&&r.createElement("span",{className:R()("".concat(d,"-item-label"),(0,m.Z)({},"".concat(d,"-item-no-colon"),!$)),style:M},S),j&&r.createElement("span",{className:R()("".concat(d,"-item-content")),style:f},j)))},y=F;function p(i,s,d){var g=s.colon,Z=s.prefixCls,T=s.bordered,E=d.component,M=d.type,f=d.showLabel,V=d.showContent,S=d.labelStyle,j=d.contentStyle;return i.map(function($,D){var h=$.props,B=h.label,N=h.children,_=h.prefixCls,I=_===void 0?Z:_,C=h.className,w=h.style,b=h.labelStyle,G=h.contentStyle,U=h.span,k=U===void 0?1:U,P=$.key;return typeof E=="string"?r.createElement(y,{key:"".concat(M,"-").concat(P||D),className:C,style:w,labelStyle:(0,x.Z)((0,x.Z)({},S),b),contentStyle:(0,x.Z)((0,x.Z)({},j),G),span:k,colon:g,component:E,itemPrefixCls:I,bordered:T,label:f?B:null,content:V?N:null}):[r.createElement(y,{key:"label-".concat(P||D),className:C,style:(0,x.Z)((0,x.Z)((0,x.Z)({},S),w),b),span:1,colon:g,component:E[0],itemPrefixCls:I,bordered:T,label:B}),r.createElement(y,{key:"content-".concat(P||D),className:C,style:(0,x.Z)((0,x.Z)((0,x.Z)({},j),w),G),span:k*2-1,component:E[1],itemPrefixCls:I,bordered:T,content:N})]})}var a=function(s){var d=r.useContext(u),g=s.prefixCls,Z=s.vertical,T=s.row,E=s.index,M=s.bordered;return Z?r.createElement(r.Fragment,null,r.createElement("tr",{key:"label-".concat(E),className:"".concat(g,"-row")},p(T,s,(0,x.Z)({component:"th",type:"label",showLabel:!0},d))),r.createElement("tr",{key:"content-".concat(E),className:"".concat(g,"-row")},p(T,s,(0,x.Z)({component:"td",type:"content",showContent:!0},d)))):r.createElement("tr",{key:E,className:"".concat(g,"-row")},p(T,s,(0,x.Z)({component:M?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0},d)))},t=a,n=function(s){var d=s.children;return d},c=n,v=e(96159),u=r.createContext({}),l={xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function L(i,s){if(typeof i=="number")return i;if((0,o.Z)(i)==="object")for(var d=0;d<Y.c4.length;d++){var g=Y.c4[d];if(s[g]&&i[g]!==void 0)return i[g]||l[g]}return 3}function A(i,s,d){var g=i;return(s===void 0||s>d)&&(g=(0,v.Tm)(i,{span:d}),(0,q.Z)(s===void 0,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),g}function W(i,s){var d=(0,J.Z)(i).filter(function(E){return E}),g=[],Z=[],T=s;return d.forEach(function(E,M){var f,V=(f=E.props)===null||f===void 0?void 0:f.span,S=V||1;if(M===d.length-1){Z.push(A(E,V,T)),g.push(Z);return}S<T?(T-=S,Z.push(E)):(Z.push(A(E,S,T)),g.push(Z),T=s,Z=[])}),g}function ee(i){var s,d=i.prefixCls,g=i.title,Z=i.extra,T=i.column,E=T===void 0?l:T,M=i.colon,f=M===void 0?!0:M,V=i.bordered,S=i.layout,j=i.children,$=i.className,D=i.style,h=i.size,B=i.labelStyle,N=i.contentStyle,_=r.useContext(Q.E_),I=_.getPrefixCls,C=_.direction,w=I("descriptions",d),b=r.useState({}),G=(0,H.Z)(b,2),U=G[0],k=G[1],P=L(E,U);r.useEffect(function(){var ae=Y.ZP.subscribe(function(ne){(0,o.Z)(E)==="object"&&k(ne)});return function(){Y.ZP.unsubscribe(ae)}},[]);var te=W(j,P),oe=r.useMemo(function(){return{labelStyle:B,contentStyle:N}},[B,N]);return r.createElement(u.Provider,{value:oe},r.createElement("div",{className:R()(w,(s={},(0,m.Z)(s,"".concat(w,"-").concat(h),h&&h!=="default"),(0,m.Z)(s,"".concat(w,"-bordered"),!!V),(0,m.Z)(s,"".concat(w,"-rtl"),C==="rtl"),s),$),style:D},(g||Z)&&r.createElement("div",{className:"".concat(w,"-header")},g&&r.createElement("div",{className:"".concat(w,"-title")},g),Z&&r.createElement("div",{className:"".concat(w,"-extra")},Z)),r.createElement("div",{className:"".concat(w,"-view")},r.createElement("table",null,r.createElement("tbody",null,te.map(function(ae,ne){return r.createElement(t,{key:ne,index:ne,colon:f,prefixCls:w,vertical:S==="vertical",bordered:V,row:ae})}))))))}ee.Item=c;var K=ee},98858:function(re,z,e){"use strict";var m=e(38842),H=e.n(m),o=e(25290),r=e.n(o)},25290:function(){}}]);