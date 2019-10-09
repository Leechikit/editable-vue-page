!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is an entry point */function(t,e,n){"use strict";n.r(e);n(/*! ./javascript/index.js */1),n(/*! ./style/index.scss */2)},
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e){e.exportJavascript={props:{opacity:{type:String,default:"1"},display:{type:String,default:"block"}},data:function(){return{appListShow:!1,popoverShow:!1,logoImg:"",userName:"用户",currentPath:[{title:"首页",path:"home",name:"home_index"}]}},methods:{toName:function(t){return t?{name:t}:""},itemTitle:function(t){return t.title},gotoMyWork:function(){this.$router.push({name:"my-work"})},gotoDocumentLib:function(){this.$router.push({name:"document-lib"})},gotoPersonalInformation:function(){this.$router.push({name:"personal_information"})},goAppManager:function(){this.$router.push({name:"workflow-design"})},gotoPage:function(){this.$router.push({name:"people-manage"})},toApp:function(t,e){},getModuleList:function(){!(arguments.length>0&&void 0!==arguments[0])||arguments[0]},goSystem:function(t){}}}},
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */function(t,e,n){}]);