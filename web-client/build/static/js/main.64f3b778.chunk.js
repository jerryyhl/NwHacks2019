(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{154:function(e,t,n){e.exports=n(373)},159:function(e,t,n){},161:function(e,t,n){},177:function(e,t){},179:function(e,t){},211:function(e,t){},212:function(e,t){},281:function(e,t){},373:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(153),l=n.n(r),s=(n(159),n(17)),c=n(18),i=n(20),u=n(19),d=n(21),b=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).handleChange=function(e){n.props.onChange(e.target.value)},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("select",{className:"form-control",onChange:this.handleChange,value:this.props.value},this.props.labels.map(function(e){return o.a.createElement("option",{key:e.toString()},e)})))}}]),t}(a.Component),h=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={passwordIncorrect:!1,password:""},n.validatePassword=function(){console.log(n.state.password),n.setState({passwordIncorrect:!0})},n.handlePasswordChange=function(e){n.setState({password:e.target.value,passwordIncorrect:!1})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("form",null,o.a.createElement("div",{className:"was-validated"},o.a.createElement("input",{type:"password",className:"form-control",onChange:this.handlePasswordChange,value:this.state.password,placeholder:"Password"}))),o.a.createElement("button",{type:"submit",onClick:this.validatePassword,className:"btn btn-primary"},"Submit"))}}]),t}(a.Component),p=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,"Please unlock the password manager.",o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(h,null))}}]),t}(a.Component),m=(n(161),n(163)),f=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",null,this.props.sendingCompleted?o.a.createElement("div",null,"Sending Password For ",this.props.label,"..."):o.a.createElement("div",null,"Sent Password for ",this.props.label,"!")))}}]),t}(a.Component),g=(a.Component,function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(b,{labels:this.props.labels,value:this.props.labelSelected,onChange:this.props.onChange}),o.a.createElement("div",null,o.a.createElement("form",null,this.props.labelSelected?o.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:this.props.sendToKeyboard},"Send Password for ",this.props.labelSelected," to Keyboard"):null)))}}]),t}(a.Component)),y=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).CurrentState={SendingToKeyboard:"SendingToKeyboard",SentToKeyboard:"SentToKeyboard",DoingNothing:"DoingNothing",labelSelected:null},n.state={currentState:n.CurrentState.DoingNothing},n.sendToKeyboard=function(){n.setState({currentState:n.CurrentState.SendingToKeyboard}),m("/to-keyboard/"+n.state.labelSelected,function(e,t,a){console.log("error:",e),console.log("statusCode:",t&&t.statusCode),console.log("body:",a),n.setState({currentState:n.CurrentState.SentToKeyboard}),setTimeout(function(){n.setState({currentState:n.CurrentState.DoingNothing})},3e3)})},n.handleLabelSelectedChange=function(e){n.setState({labelSelected:e})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,"What password would you like to use?",o.a.createElement(g,{labels:this.props.labels,sendToKeyboard:this.sendToKeyboard,labelSelected:this.state.labelSelected,onChange:this.handleLabelSelectedChange}),this.state.currentState===this.state.SendingToKeyboard||this.state.currentState===this.state.SentToKeyboard?o.a.createElement(f,{sendingCompleted:this.state.currentState===this.state.SentToKeyboard,label:this.state.labelSelected}):null,o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("button",{type:"button",onClick:this.handleGeneratePasswordClick,className:"btn btn-primary"},"Generate New Password"))}}]),t}(a.Component),S=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={locked:!1,labels:[]},n.updateLabels=function(){m("http://localhost:5000/get-all-labels",function(e,t,a){console.log("error:",e),console.log("statusCode:",t&&t.statusCode),console.log("body:",a),Array.isArray(JSON.parse(a))&&n.setState({labels:JSON.parse(a)})})},n.lockScreen=function(){m("http://localhost:5000/lock",function(e,t,a){console.log("error:",e),console.log("statusCode:",t&&t.statusCode),console.log("body:",a),n.setState({locked:!0})})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){this.updateLabels()}},{key:"componentDidMount",value:function(){this.updateLabels()}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("h1",null,"Dragon Lock"),this.state.locked?o.a.createElement(p,null):o.a.createElement(y,{labels:this.state.labels}),o.a.createElement("br",null),this.state.locked?null:o.a.createElement("button",{type:"button",onClick:this.lockScreen,className:"btn btn-danger"},"Lock")))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[154,2,1]]]);
//# sourceMappingURL=main.64f3b778.chunk.js.map