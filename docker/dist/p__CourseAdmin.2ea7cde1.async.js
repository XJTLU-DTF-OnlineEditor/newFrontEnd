(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[667],{13745:function(H,B,e){"use strict";e.r(B),e.d(B,{default:function(){return k}});var T=e(62350),R=e(75443),l=e(57663),D=e(71577),U=e(86582),z=e(34792),O=e(48086),w=e(3182),L=e(69610),Z=e(54941),K=e(81306),F=e(72936),S=e(402),$=e(97272),V=e(94043),n=e.n(V),t=e(67294),i=e(95357),a=e(8212),_=e(73171),o=e(50339),r=e(7477),j=e(39265),v=e(11021),C=e(90672),Y=e(26743),y=e(37476),N=e(5966),J=e(49101),Q=e(29811),c=e(85893),X=$.Z.Title,k=function(q){(0,K.Z)(A,q);var G=(0,F.Z)(A);function A(){var f;(0,L.Z)(this,A);for(var P=arguments.length,I=new Array(P),b=0;b<P;b++)I[b]=arguments[b];return f=G.call.apply(G,[this].concat(I)),f.state={topics:[],file:""},f.teacher_info=t.createRef(),f.formRef=t.createRef(),f.getTopics=(0,w.Z)(n().mark(function E(){var p,d;return n().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,(0,Q.ar)();case 2:return p=u.sent,f.teacher_info.current=p.data,u.next=6,(0,v.D0)(f.teacher_info.current.userid);case 6:d=u.sent,d.error_code==200&&f.setState({topics:d.data.map(function(h){var s=h.fields;return s.topic_id=h.pk,s.topic_img&&(s.topic_img={url:"/media/"+s.topic_img,name:s.topic_img}),s})});case 8:case"end":return u.stop()}},E)})),f.addNewTopic=function(){var E=(0,w.Z)(n().mark(function p(d){var m,u,h,s;return n().wrap(function(M){for(;;)switch(M.prev=M.next){case 0:if(console.log(d),m=f.teacher_info.current.userid,!(!d.topic_content||!d.topic_title)){M.next=5;break}return O.default.error("please input the topic_title and the topic_content"),M.abrupt("return",!1);case 5:return M.next=7,(0,v.rq)(d.topic_title,d.topic_content,f.state.file,m);case 7:if(u=M.sent,u.error_code!=200){M.next=16;break}return s={topic_id:u.id,topic_title:d.topic_title,topic_content:d.topic_content,topic_img:f.state.file},f.setState({topics:[].concat((0,U.Z)(f.state.topics),[s])}),O.default.success("topic has been created successfully"),(h=f.formRef.current)===null||h===void 0||h.resetFields(),M.abrupt("return",!0);case 16:return O.default.error(u.msg),M.abrupt("return",!1);case 18:case"end":return M.stop()}},p)}));return function(p){return E.apply(this,arguments)}}(),f.confirm=function(){var E=(0,w.Z)(n().mark(function p(d){var m;return n().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return h.next=2,(0,v.BK)(d);case 2:m=h.sent,m.error_code==200?(O.default.success("Delete success."),f.getTopics()):O.default.success("Fail to delete. Please try again later");case 4:case"end":return h.stop()}},p)}));return function(p){return E.apply(this,arguments)}}(),f.handleChange=function(){var E=(0,w.Z)(n().mark(function p(d){var m,u;return n().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(console.log(d),m=d.file,!(m&&m.status=="done"&&m.response)){s.next=6;break}m.name=m.response.imgUrl,s.next=12;break;case 6:if(m.status!="removed"){s.next=12;break}return s.next=9,(0,v.EI)(m.name,"Topic");case 9:u=s.sent,console.log(u),m=void 0;case 12:f.setState({file:m});case 13:case"end":return s.stop()}},p)}));return function(p){return E.apply(this,arguments)}}(),f}return(0,Z.Z)(A,[{key:"componentDidMount",value:function(){this.getTopics()}},{key:"render",value:function(){var P=this,I=function(E){var p=E.icon,d=E.text;return(0,c.jsxs)("span",{children:[t.createElement(p,{style:{marginRight:8}}),d]})};return(0,c.jsx)("div",{style:{background:"#F5F7FA"},children:(0,c.jsx)(r.ZP,{header:{title:(0,c.jsx)(X,{level:2,children:"Course Management"}),ghost:!0,breadcrumb:{}},children:(0,c.jsx)(j.ZP,{children:(0,c.jsx)(o.Z,{toolBarRender:function(){return[(0,c.jsxs)(y.Z,{title:"Add a new topic",trigger:(0,c.jsxs)(D.Z,{type:"primary",children:[(0,c.jsx)(J.Z,{}),"NEW"]}),formRef:P.formRef,autoFocusFirstInput:!0,onFinish:function(p){return P.addNewTopic(p)},submitter:{searchConfig:{submitText:"submit",resetText:"cancel"}},children:[(0,c.jsx)(N.Z,{width:"md",name:"topic_title",label:"Topic Title",placeholder:"please input a topic title"}),(0,c.jsx)(C.Z,{name:"topic_content",label:"topic description",placeholder:"please input topic description",width:"xl"}),(0,c.jsx)(Y.Z,{name:"topic_img",label:"Upload",max:1,beforeUpload:P.handleBeforeUpload,fieldProps:{name:"topic_img",listType:"picture-card",accept:".jpg, .png, .jpeg, .gif"},action:"/server/V1/course/upload_topic_img/",onChange:P.handleChange})]})]},itemLayout:"vertical",rowKey:"topic_id",headerTitle:"Topics",dataSource:this.state.topics,metas:{title:{dataIndex:"topic_title",render:function(E){return(0,c.jsx)("a",{href:"/courseAdmin/courseList?topic_title=".concat(E),style:{textDecoration:"none",color:"#333"},children:E})}},actions:{render:function(E,p){return[(0,c.jsx)("a",{href:"/courseAdmin/courseList?topic_title=".concat(p.topic_title),children:(0,c.jsx)(I,{icon:i.Z,text:"view"},"list-vertical-message")}),(0,c.jsxs)(y.Z,{title:"EDIT",initialValues:p,trigger:(0,c.jsx)("a",{children:(0,c.jsx)(I,{icon:a.Z,text:"edit"},"list-vertical-star-o")}),autoFocusFirstInput:!0,onFinish:function(){var d=(0,w.Z)(n().mark(function m(u){var h;return n().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:if(console.log(u),!(!u.topic_content&&!u.topic_title&&!u.topic_img)){g.next=6;break}return O.default.info("Nothing changed"),g.abrupt("return",!0);case 6:return u.topic_img&&(u.topic_img=u.topic_img[0]),g.next=9,(0,v.wA)(p.topic_id,u);case 9:if(h=g.sent,h.error_code!=200){g.next=16;break}return P.getTopics(),O.default.success("topic infomation changed success"),g.abrupt("return",!0);case 16:return O.default.error(h.msg),g.abrupt("return",!1);case 18:case"end":return g.stop()}},m)}));return function(m){return d.apply(this,arguments)}}(),submitter:{searchConfig:{submitText:"submit",resetText:"cancel"}},children:[(0,c.jsx)(N.Z,{width:"md",name:"topic_title",label:"Topic Title",placeholder:"please input a topic title"}),(0,c.jsx)(C.Z,{name:"topic_content",label:"topic description",placeholder:"please input topic description"}),(0,c.jsx)(Y.Z,{name:"topic_img",beforeUpload:P.handleBeforeUpload,fieldProps:{name:"topic_img",listType:"picture-card",accept:".jpg, .png, .jpeg, .gif"},action:"/server/V1/course/upload_topic_img/",onChange:function(){var d=(0,w.Z)(n().mark(function m(u){var h,s,g;return n().wrap(function(W){for(;;)switch(W.prev=W.next){case 0:if(console.log(u),h=P.state.topics,s=u.file,s.status!="removed"){W.next=8;break}return W.next=6,(0,v.EI)(s.name,"Topic");case 6:g=W.sent,console.log(g);case 8:h.map(function(x){return x.topic_id==p.topic_id&&(s.status=="removed"?x.topic_img="":(s&&s.status=="done"&&s.response&&(s.name=s.response.imgUrl),x.topic_img=s)),x}),P.setState({topics:h});case 10:case"end":return W.stop()}},m)}));return function(m){return d.apply(this,arguments)}}(),label:"Upload",max:1,value:p.topic_img?[p.topic_img]:[]})]}),(0,c.jsx)(R.Z,{title:"Are you sure to delete this topic? This action will also delets all courses attached to this topic",onConfirm:function(){return P.confirm(p.topic_id)},okText:"Yes",cancelText:"No",children:(0,c.jsx)("a",{children:(0,c.jsx)(I,{icon:_.Z,text:"delete"},"list-vertical-like-o")})})]}},extra:{dataIndex:"topic_img",render:function(E){if(E)return(0,c.jsx)("img",{width:"180px",alt:"logo",src:"".concat(E.url)})}},content:{dataIndex:"topic_content",render:function(E){return(0,c.jsx)("div",{children:E})}}}})})})})}}]),A}(t.Component)},11021:function(H,B,e){"use strict";e.d(B,{D0:function(){return U},wA:function(){return z},tu:function(){return O},rq:function(){return w},xH:function(){return L},G$:function(){return Z},Sp:function(){return K},A:function(){return F},BK:function(){return S},BW:function(){return $},EI:function(){return V}});var T=e(3182),R=e(94043),l=e.n(R),D=e(21010),U=function(){var n=(0,T.Z)(l().mark(function t(i){var a;return l().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return a="/server/V1/course/topicsByTeacher/?teacher_id=".concat(i),o.abrupt("return",(0,D.WY)(a));case 2:case"end":return o.stop()}},t)}));return function(i){return n.apply(this,arguments)}}(),z=function(){var n=(0,T.Z)(l().mark(function t(i,a){var _;return l().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return _="/server/V1/course/edit/",r.abrupt("return",(0,D.WY)(_,{method:"post",data:{request_entity:"Topic",content:{topic_id:i,topic_info:a}}}));case 2:case"end":return r.stop()}},t)}));return function(i,a){return n.apply(this,arguments)}}(),O=function(){var n=(0,T.Z)(l().mark(function t(i,a,_,o,r,j,v){var C;return l().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return C="/server/V1/course/edit/",y.abrupt("return",(0,D.WY)(C,{method:"post",data:{request_entity:"Course",content:{id:i,related_topic:a,title:_,content:o,answer:r,hint:j,teacher_id:v}}}));case 2:case"end":return y.stop()}},t)}));return function(i,a,_,o,r,j,v){return n.apply(this,arguments)}}(),w=function(){var n=(0,T.Z)(l().mark(function t(i,a,_,o){var r;return l().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return r="/server/V1/course/create/",v.abrupt("return",(0,D.WY)(r,{method:"post",data:{request_entity:"Topic",content:{topic_title:i,topic_content:a,topic_img:_,teacher_id:o}}}));case 2:case"end":return v.stop()}},t)}));return function(i,a,_,o){return n.apply(this,arguments)}}(),L=function(){var n=(0,T.Z)(l().mark(function t(i,a,_,o,r){var j;return l().wrap(function(C){for(;;)switch(C.prev=C.next){case 0:return j="/server/V1/course/create/",C.abrupt("return",(0,D.WY)(j,{method:"post",data:{request_entity:"Course",content:{related_topic:i,title:a,content:_,answer:o,hint:r}}}));case 2:case"end":return C.stop()}},t)}));return function(i,a,_,o,r){return n.apply(this,arguments)}}(),Z=function(){var n=(0,T.Z)(l().mark(function t(i){var a;return l().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return a="/server/V1/course/courses/".concat(i,"/"),o.abrupt("return",(0,D.WY)(a));case 2:case"end":return o.stop()}},t)}));return function(i){return n.apply(this,arguments)}}(),K=function(){var n=(0,T.Z)(l().mark(function t(i,a){var _;return l().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return _="/server/V1/course/courseDetail/".concat(i,"/").concat(a,"/"),r.abrupt("return",(0,D.WY)(_));case 2:case"end":return r.stop()}},t)}));return function(i,a){return n.apply(this,arguments)}}(),F=function(){var n=(0,T.Z)(l().mark(function t(i,a){var _;return l().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return _="/server/V1/course/delete/",r.abrupt("return",(0,D.WY)(_,{method:"post",data:{request_entity:"Course",related_topic:i,content:a}}));case 2:case"end":return r.stop()}},t)}));return function(i,a){return n.apply(this,arguments)}}(),S=function(){var n=(0,T.Z)(l().mark(function t(i){var a;return l().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return a="/server/V1/course/delete/",o.abrupt("return",(0,D.WY)(a,{method:"post",data:{request_entity:"Topic",content:i}}));case 2:case"end":return o.stop()}},t)}));return function(i){return n.apply(this,arguments)}}(),$=function(){var n=(0,T.Z)(l().mark(function t(i,a){var _;return l().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return _="/server/V1/course/sort/",r.abrupt("return",(0,D.WY)(_,{method:"post",data:{request_entity:"Course",related_topic:i,content:a}}));case 2:case"end":return r.stop()}},t)}));return function(i,a){return n.apply(this,arguments)}}(),V=function(){var n=(0,T.Z)(l().mark(function t(i,a){var _;return l().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return _="/server/V1/course/delete_img/",r.abrupt("return",(0,D.WY)(_,{method:"post",data:{request_entity:a,fname:i}}));case 2:case"end":return r.stop()}},t)}));return function(i,a){return n.apply(this,arguments)}}()}}]);