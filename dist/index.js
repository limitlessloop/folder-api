"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var express=_interopDefault(require("express")),jsonata=_interopDefault(require("jsonata")),cors=_interopDefault(require("cors"));function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var defineProperty=_defineProperty;function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(r),!0).forEach(function(e){defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var fs=require("fs"),path=require("path"),smarkt=require("smarkt"),YAML=require("yaml"),JSON5=require("json5"),matter=require("gray-matter");function getFileExt(e){if(e.match(/\.([0-9a-z]+)(?:[?#]|$)/i))return e.match(/\.([0-9a-z]+)(?:[?#]|$)/i)[1]}function parseJson(e,t){if("json"===getFileExt(t)){var r=fs.readFileSync(path.join(e,t),"utf8");return JSON.parse(r)}}function parseJson5(e,t){if("json5"===getFileExt(t)){var r=fs.readFileSync(path.join(e,t),"utf8");return JSON5.parse(r)}}function parseMarkdown(e,t){if("md"===getFileExt(t)){var r=fs.readFileSync(path.join(e,t),"utf8"),n=matter(r),o=n.data,a=n.content;return _objectSpread(_objectSpread({},o),{},{content:a})}}function parseText(e,t){if("txt"===getFileExt(t))return smarkt.parse(fs.readFileSync(path.join(e,t),"utf8"))}function parseYaml(e,t){if("yml"===getFileExt(t)||"yaml"===getFileExt(t))return YAML.parse(fs.readFileSync(path.join(e,t),"utf8"))}function parseContent(e,t){return parseJson(e,t)||parseMarkdown(e,t)||parseText(e,t)||parseYaml(e,t)||parseJson5(e,t)}var fs$1=require("fs"),path$1=require("path"),pluralize=require("pluralize"),type={is:{file:function(e){return!!/\..+$/.test(e)&&e.split(".")[0]},folder:function(e){return!/\..+$/.test(e)&&e},singular:function(e){return pluralize.isSingular(e)},plural:function(e){return pluralize.isPlural(e)},index:function(e){return/^index..+$/.test(e)},collection:function(e,t){var r=!1;return type.is.folder(t)&&(r=!0),r},item:function(e,t){var r=!1;return(type.is.file(t)||type.has.index(e,t))&&(r=!0),r},hidden:function(e){return/^_/.test(e)}},has:{index:function(e,t){var r=!1;return type.is.folder(t)&&fs$1.readdirSync(path$1.join(e+t)).map(function(e){type.is.index(e)&&(r=!0)}),r},children:function(e,t){var r=!1;return type.is.folder(t)&&fs$1.readdirSync(path$1.join(e+t)).map(function(){r=!0}),r}}};function createResrouce(t,e,r,n,o){if(!type.is.hidden(e)){var a={_index:r,_name:e.split(".")[0]},i=e.split(".")[0];"home"===e&&(i="");var c=t.replace(o.replace(path$1.sep,""),"");if(a.url=path$1.join(c+i),a._source=path$1.join(t+i),type.is.singular(e),type.is.folder(e)&&type.has.index(t,e),type.is.item(t,e)&&(a._collection=n,a._type=n||e.split(".")[0]),type.is.folder(e)){var u=path$1.join(t+e+"/"),s=e;fs$1.readdirSync(u).map(function(e,t){createResrouce(u,e,t,s,o)})}if(type.is.file(e)&&Object.assign(a,parseContent(t,e)),type.is.folder(e)&&!type.is.item(t,e)){var l="";fs$1.readdirSync(t).map(function(e){/index..+$/.test(e)&&(l=parseContent(t,e))}),Object.assign(a,l)}if(type.is.folder(e)){var f=path$1.join(t+e+"/"),p=e;a[p]=[],fs$1.readdirSync(path$1.join(t+e)).map(function(e,t){type.is.index(e)||a[p].push(createResrouce(f,e,t,p,o))})}return a}}function createDatabase(r){var n=r;return fs$1.readdirSync(r).map(function(e,t){return createResrouce(r,e,t,null,n)})}function database(e){return createDatabase(e)}function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}var runtime_1=createCommonjsModule(function(e){var t=function(i){var u,e=Object.prototype,l=e.hasOwnProperty,t="function"==typeof Symbol?Symbol:{},o=t.iterator||"@@iterator",r=t.asyncIterator||"@@asyncIterator",n=t.toStringTag||"@@toStringTag";function c(e,t,r,n){var a,i,c,u,o=t&&t.prototype instanceof g?t:g,s=Object.create(o.prototype),l=new k(n||[]);return s._invoke=(a=e,i=r,c=l,u=p,function(e,t){if(u===y)throw new Error("Generator is already running");if(u===d){if("throw"===e)throw t;return T()}for(c.method=e,c.arg=t;;){var r=c.delegate;if(r){var n=O(r,c);if(n){if(n===v)continue;return n}}if("next"===c.method)c.sent=c._sent=c.arg;else if("throw"===c.method){if(u===p)throw u=d,c.arg;c.dispatchException(c.arg)}else"return"===c.method&&c.abrupt("return",c.arg);u=y;var o=f(a,i,c);if("normal"===o.type){if(u=c.done?d:h,o.arg===v)continue;return{value:o.arg,done:c.done}}"throw"===o.type&&(u=d,c.method="throw",c.arg=o.arg)}}),s}function f(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}i.wrap=c;var p="suspendedStart",h="suspendedYield",y="executing",d="completed",v={};function g(){}function a(){}function s(){}var m={};m[o]=function(){return this};var b=Object.getPrototypeOf,w=b&&b(b(L([])));w&&w!==e&&l.call(w,o)&&(m=w);var _=s.prototype=g.prototype=Object.create(m);function j(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function x(u,s){var t;this._invoke=function(r,n){function e(){return new s(function(e,t){!function t(e,r,n,o){var a=f(u[e],u,r);if("throw"!==a.type){var i=a.arg,c=i.value;return c&&"object"==typeof c&&l.call(c,"__await")?s.resolve(c.__await).then(function(e){t("next",e,n,o)},function(e){t("throw",e,n,o)}):s.resolve(c).then(function(e){i.value=e,n(i)},function(e){return t("throw",e,n,o)})}o(a.arg)}(r,n,e,t)})}return t=t?t.then(e,e):e()}}function O(e,t){var r=e.iterator[t.method];if(r===u){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=u,O(e,t),"throw"===t.method))return v;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var n=f(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,v;var o=n.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=u),t.delegate=null,v):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,v)}function S(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function k(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(S,this),this.reset(!0)}function L(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(l.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=u,e.done=!0,e};return n.next=n}}return{next:T}}function T(){return{value:u,done:!0}}return a.prototype=_.constructor=s,s.constructor=a,s[n]=a.displayName="GeneratorFunction",i.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===a||"GeneratorFunction"===(t.displayName||t.name))},i.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,s):(e.__proto__=s,n in e||(e[n]="GeneratorFunction")),e.prototype=Object.create(_),e},i.awrap=function(e){return{__await:e}},j(x.prototype),x.prototype[r]=function(){return this},i.AsyncIterator=x,i.async=function(e,t,r,n,o){void 0===o&&(o=Promise);var a=new x(c(e,t,r,n),o);return i.isGeneratorFunction(t)?a:a.next().then(function(e){return e.done?e.value:a.next()})},j(_),_[n]="Generator",_[o]=function(){return this},_.toString=function(){return"[object Generator]"},i.keys=function(r){var n=[];for(var e in r)n.push(e);return n.reverse(),function e(){for(;n.length;){var t=n.pop();if(t in r)return e.value=t,e.done=!1,e}return e.done=!0,e}},i.values=L,k.prototype={constructor:k,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=u,this.done=!1,this.delegate=null,this.method="next",this.arg=u,this.tryEntries.forEach(E),!e)for(var t in this)"t"===t.charAt(0)&&l.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=u)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function e(e,t){return a.type="throw",a.arg=r,n.next=e,t&&(n.method="next",n.arg=u),!!t}for(var t=this.tryEntries.length-1;0<=t;--t){var o=this.tryEntries[t],a=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var i=l.call(o,"catchLoc"),c=l.call(o,"finallyLoc");if(i&&c){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&l.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),E(r),v}},catch:function(e){for(var t=this.tryEntries.length-1;0<=t;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:L(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=u),v}},i}(e.exports);try{regeneratorRuntime=t}catch(e){Function("r","regeneratorRuntime = r")(t)}}),regenerator=runtime_1;function _arrayWithHoles(e){if(Array.isArray(e))return e}var arrayWithHoles=_arrayWithHoles;function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}}var iterableToArrayLimit=_iterableToArrayLimit;function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var arrayLikeToArray=_arrayLikeToArray;function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?arrayLikeToArray(e,t):void 0}}var unsupportedIterableToArray=_unsupportedIterableToArray;function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var nonIterableRest=_nonIterableRest;function _slicedToArray(e,t){return arrayWithHoles(e)||iterableToArrayLimit(e,t)||unsupportedIterableToArray(e,t)||nonIterableRest()}var slicedToArray=_slicedToArray;function asyncGeneratorStep(e,t,r,n,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}function _asyncToGenerator(c){return function(){var e=this,i=arguments;return new Promise(function(t,r){var n=c.apply(e,i);function o(e){asyncGeneratorStep(n,t,r,o,a,"next",e)}function a(e){asyncGeneratorStep(n,t,r,o,a,"throw",e)}o(void 0)})}}var asyncToGenerator=_asyncToGenerator;function isObjectEmpty(e){return 0===Object.keys(e).length&&e.constructor===Object}function getContent(e,t){return _getContent.apply(this,arguments)}function _getContent(){return(_getContent=asyncToGenerator(regenerator.mark(function e(t,r){var n,o,a,i,c,u,s,l,f,p,h,y,d,v,g,m,b,w,_,j,x,O,S,E,k;return regenerator.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.resource1,o=r.resource2,a=r.query,i=jsonata('**[_type="'.concat(n,'"]')),!n||o){e.next=5;break}if(a){for(c=[],u=0,s=Object.entries(a);u<s.length;u++)l=slicedToArray(s[u],2),f=l[0],p=l[1],h="[".concat(f,"=").concat(p,"]"),c.push(h);i=jsonata('**[_type="'.concat(n,'"]').concat(c.toString()))}return e.abrupt("return",i.evaluate(t));case 5:if(!n||!o){e.next=8;break}if(a){for(y=[],d=0,v=Object.entries(a);d<v.length;d++)g=slicedToArray(v[d],2),m=g[0],b=g[1],w="[".concat(m,"=").concat(b,"]"),y.push(w);i=jsonata('**[_type="'.concat(n,'"][_name="').concat(o,'"]').concat(y.toString()))}return e.abrupt("return",i.evaluate(t));case 8:if(n&&o){e.next=16;break}if(!a){e.next=16;break}if(isObjectEmpty(a))return e.abrupt("return",t);e.next=12;break;case 12:for(_=[],j=0,x=Object.entries(a);j<x.length;j++)O=slicedToArray(x[j],2),S=O[0],E=O[1],k="[".concat(S,"=").concat(E,"]"),_.push(k);return i=jsonata("**".concat(_.toString())),e.abrupt("return",i.evaluate(t));case 16:case"end":return e.stop()}},e)}))).apply(this,arguments)}var chokidar=require("chokidar"),http=require("http"),watcher=chokidar.watch("content/",{ignored:/(^|[/\\])\../,persistent:!0});function _serve(t,r,n){r=r||3e3,n=n||"/";var o,a="";function e(){var e;(a=http.createServer((e=express(),o=database(t),e.use(cors({origin:"*",methods:"GET,HEAD,PUT,PATCH,POST,DELETE",preflightContinue:!1,optionsSuccessStatus:204})),e.set("json spaces",4),e.get(n,function(t,r){getContent(o,{resource1:null,resource2:null,query:t.query}).then(function(e){e?(r.json(e),console.log("0")):r.send("No value that matches query \n ".concat(t.url))})}),e.get(n+":resource1",function(t,r){getContent(o,{resource1:t.params.resource1,resource2:null,query:t.query}).then(function(e){e?(r.json(e),console.log("1")):r.send("No value that matches query \n ".concat(t.url))})}),e.get(n+":resource1/:resource2",function(t,r){getContent(o,{resource1:t.params.resource1,resource2:t.params.resource2,query:t.query}).then(function(e){e?r.json(e):r.send("No value that matches query \n ".concat(t.url))})}),e))).listen(r,function(){console.log("Server listening at http://localhost:".concat(r).concat(n)),console.log("test")})}e(),watcher.on("change",function(){console.log("restart"),a.close(),console.log("start"),e()})}function send(e){var r=e.base,t=e.method,n=e.path,o=e.data,a=e.token,i=process.browser?window.fetch:require("node-fetch").default,c={method:t,headers:{}};return o&&(c.headers["Content-Type"]="application/json",c.body=JSON.stringify(o)),a&&(c.headers.Authorization="Token ".concat(a)),i("".concat(r,"/").concat(n),c).then(function(e){return e.text()}).then(function(t){try{return JSON.parse(t)}catch(e){return console.log("".concat(r,"/").concat(n)),t}})}function _get(e,t,r){return send({method:"GET",path:t,token:r,base:e})}function stancy(r){return{serve:function(e,t){return _serve(r,e,t)},get:function(e,t){return _get(e,t)},database:function(){return database(r)}}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var classCallCheck=_classCallCheck;function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}var createClass=_createClass,Client=function(){function e(){classCallCheck(this,e),this._config={}}return createClass(e,[{key:"_process",value:function(e,t){return e=JSON.parse(e),t.process&&(Array.isArray(e)?e.map(function(e){e=e&&t.process({item:e})}):e=e&&t.process({item:e})),e}},{key:"config",value:function(e){this._config=e}},{key:"fetch",value:function(e){var r=this,n=this._config,t=process.browser?window.fetch:require("node-fetch").default,o=n.preview||"http://localhost:3000/api/";return o=("development"===process.env.NODE_ENV&&n.preview&&(o=n.preview),n.production),t("".concat(o).concat(e)).then(function(e){return e.text()}).then(function(t){try{return r._process(t,n)}catch(e){return t}})}}]),e}(),client=new Client,myModule=module.exports=stancy;myModule.client=client;
