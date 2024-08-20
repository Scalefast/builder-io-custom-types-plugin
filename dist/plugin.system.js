System.register(["@builder.io/react","@emotion/core","@material-ui/core","mobx-react","react","@material-ui/icons","@emotion/styled"],(function(e,t){var n={},o={},r={},u={},l={},a={},i={};return{setters:[function(e){n.Builder=e.Builder},function(e){o.jsx=e.jsx},function(e){r.Button=e.Button,r.Chip=e.Chip,r.FormControl=e.FormControl,r.FormControlLabel=e.FormControlLabel,r.IconButton=e.IconButton,r.InputLabel=e.InputLabel,r.MenuItem=e.MenuItem,r.Select=e.Select,r.Switch=e.Switch,r.TextField=e.TextField},function(e){u.useObserver=e.useObserver},function(e){l.useEffect=e.useEffect,l.useReducer=e.useReducer,l.useState=e.useState},function(e){a.Clear=e.Clear},function(e){i.default=e.default}],execute:function(){e((()=>{"use strict";var e={522:e=>{e.exports=n},576:e=>{e.exports=o},992:e=>{e.exports=i},509:e=>{e.exports=r},420:e=>{e.exports=a},979:e=>{e.exports=u},726:e=>{e.exports=l}},t={};function c(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,c),r.exports}c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};return(()=>{c.r(s);var e=c(522),t=c(576),n=c(509),o=function(e){return"number"==e.value.type?(0,t.jsx)(n.FormControl,{fullWidth:!0},(0,t.jsx)(n.TextField,{fullWidth:!0,css:{marginTop:30},label:e.value.key,onChange:function(t){return e.onChange(t.target.value)},value:e.currentValue,type:"number"})):"boolean"==e.value.type?(0,t.jsx)(n.FormControl,{fullWidth:!0},(0,t.jsx)(n.FormControlLabel,{control:(0,t.jsx)(n.Switch,{checked:!!e.currentValue,onChange:function(t){return e.onChange(t.target.checked)},value:e.currentValue,inputProps:{"aria-label":"controlled"}}),label:e.value.key})):"select"==e.value.type?(0,t.jsx)(n.FormControl,{fullWidth:!0},(0,t.jsx)(n.InputLabel,null,e.value.key),(0,t.jsx)(n.Select,{value:e.currentValue,onChange:function(t){return e.onChange(t.target.value)}},e.value.values&&e.value.values.map((function(e){return(0,t.jsx)(n.MenuItem,{value:e},e)})))):(0,t.jsx)(n.FormControl,{fullWidth:!0},(0,t.jsx)(n.TextField,{fullWidth:!0,label:e.value.key,onChange:function(t){return e.onChange(t.target.value)},value:e.currentValue}))},r=c(979),u=c(726),l=c(420),a=[{key:"text",type:"Text"},{key:"boolean",type:"Boolean"},{key:"number",type:"Number"},{key:"select",type:"Select"}],i=[{id:"submenu",title:"Subcategory Navigation",options:[{key:"item",type:"list",subOptions:[{key:"name",type:"text"},{key:"url",type:"text"},{key:"image",type:"image"}]}]}],p=c(992),f=p.default.div({display:"flex",alignItems:"center",flexDirection:"column"}),d=p.default.div({display:"flex",alignItems:"start",flexDirection:"row",width:"100%",gap:10}),v=p.default.div({display:"flex",alignItems:"start",flexDirection:"column",width:"100%",gap:10}),m=function(e,t,n){if(n||2===arguments.length)for(var o,r=0,u=t.length;r<u;r++)!o&&r in t||(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))},y=function(e){var o,i=(0,u.useState)(e.opt.key),c=i[0],s=i[1],p=(0,u.useState)(e.opt.type),f=p[0],y=p[1],x=(0,u.useState)(null!==(o=e.opt.values)&&void 0!==o?o:[]),g=x[0],h=x[1],b=(0,u.useState)(""),C=b[0],j=b[1],k=(0,u.useState)("ìnput-component-prop-".concat(e.index))[0];return(0,u.useEffect)((function(){}),[]),(0,r.useObserver)((function(){return(0,t.jsx)(d,{css:{marginTop:5,marginBottom:10}},(0,t.jsx)("div",null,(0,t.jsx)(n.FormControl,null,(0,t.jsx)(n.TextField,{label:"Key",value:c,onChange:function(t){return function(t){s(t);var n={key:t,type:f};"select"==f&&(n.values=g),e.onChange("update_option",e.index,n)}(t.target.value)},id:k+"-value"}))),(0,t.jsx)("div",null,(0,t.jsx)(n.InputLabel,{css:{display:"block",paddingBottom:10,fontSize:14,fontWeight:500},id:k+"-label"},"Type"),(0,t.jsx)(n.Select,{label:"Type",id:k,onChange:function(t){return n=t.target.value,o={key:c,type:n},g&&"select"!=n&&h([]),"select"==n&&(o.values=g),y(n),void e.onChange("update_option",e.index,o);var n,o},value:f},a.map((function(e){return(0,t.jsx)(n.MenuItem,{value:e.key},e.type)})))),(0,t.jsx)(v,null,"select"==f&&(0,t.jsx)("div",null,(0,t.jsx)(n.FormControl,null,(0,t.jsx)(n.TextField,{label:"Values (insert value a push Enter)",value:C,onKeyDown:function(t){return function(t){if("Enter"==t){var n=g;e.onChange("update_option",e.index,{key:c,type:f,values:m(m([],n,!0),[C],!1)}),h(m(m([],n,!0),[C],!1)),j("")}}(t.key)},onChange:function(e){return j(e.target.value)},defaultValue:"",id:k+"-values"}))),g&&(0,t.jsx)("div",null,g.map((function(o,r){return(0,t.jsx)(n.Chip,{css:{marginRight:"5px"},label:o,onDelete:function(){return function(t){var n=g.filter((function(e,n){return t!=n}));h(n),e.onChange("update_option",e.index,{key:c,type:f,values:n})}(r)},deleteIcon:(0,t.jsx)(l.Clear,null)})})))),(0,t.jsx)("div",null,(0,t.jsx)(n.IconButton,{"aria-label":"delete",size:"small",onClick:function(t){return e.onChange("delete_option",e.index)}},(0,t.jsx)(l.Clear,null))))}))},x=function(e,t,n){if(n||2===arguments.length)for(var o,r=0,u=t.length;r<u;r++)!o&&r in t||(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))};const g=function(){function e(){this.baseUrl="https://cdn.builder.io/api/v3/content/"}return e.prototype.getModels=function(e,t){return n=this,o=void 0,u=function(){return function(e,t){var n,o,r,u,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return u={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function a(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;u&&(u=0,a[0]&&(l=0)),l;)try{if(n=1,o&&(r=2&a[0]?o.return:a[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,o=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!((r=(r=l.trys).length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){l=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){l.label=a[1];break}if(6===a[0]&&l.label<r[1]){l.label=r[1],r=a;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(a);break}r[2]&&l.ops.pop(),l.trys.pop();continue}a=t.call(e,l)}catch(e){a=[6,e],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}(this,(function(n){switch(n.label){case 0:return[4,fetch("".concat(this.baseUrl).concat(e),{headers:t}).then((function(e){return e.json()}))];case 1:return[2,n.sent()]}}))},new((r=void 0)||(r=Promise))((function(e,t){function l(e){try{i(u.next(e))}catch(e){t(e)}}function a(e){try{i(u.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(l,a)}i((u=u.apply(n,o||[])).next())}));var n,o,r,u},e}();var h=function(e,t,n){if(n||2===arguments.length)for(var o,r=0,u=t.length;r<u;r++)!o&&r in t||(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))},b=function(e){var r=function(){var t,n,o=[];return"object"==typeof(null===(t=e.currentValue)||void 0===t?void 0:t.options[e.value.key])&&(o=null===(n=e.currentValue)||void 0===n?void 0:n.options[e.value.key]),o}(),a=(0,u.useState)(r),i=a[0],c=a[1];return(0,u.useEffect)((function(){}),[]),(0,t.jsx)(v,{id:"column-item-list"},i.map((function(r,u){return(0,t.jsx)(v,{id:"column-item-list"+u,css:{backgroundColor:"#1e1e1e",borderRadius:"4px",padding:"12px"}},e.value.subOptions&&e.value.subOptions.map((function(n){return(0,t.jsx)(o,{css:{marginTop:"30px"},value:n,onChange:function(t){return function(t,n,o){c((function(e){var r=e;return r[n][o]=t,r})),e.onChange(i)}(t,u,n.key)},currentValue:r[n.key]})})),(0,t.jsx)(n.Button,{"aria-label":"delete",size:"small",onClick:function(t){return n=u,o=i.filter((function(e,t){return n!=t})),c(o),void e.onChange(o);var n,o}},(0,t.jsx)(l.Clear,null)," Delete"))})),(0,t.jsx)(d,{css:{marginTop:5,marginBottom:10}},(0,t.jsx)(n.Button,{onClick:function(){if(e.value.subOptions){var t={};e.value.subOptions.map((function(e){t[e.key]=""})),c((function(e){return h(h([],e,!0),[t],!1)}))}},variant:"text"},"+ New item")))},C=function(){return C=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},C.apply(this,arguments)},j={set_selected_component:function(e,t){return C(C({},e),{selectedComponent:t.selectedComponent})},set_list_components:function(e,t){return C(C({},e),{customPageComps:t.customPageComps})},set_list_components_and_selected:function(e,t){return C(C({},e),{customPageComps:t.customPageComps,selectedComponent:t.selectedComponent})},set_type_change:function(e,t){return C(C({},e),{selectedId:t.selectedId,currentValue:t.currentValue,selectedComponent:t.selectedComponent})},set_option_change:function(e,t){return C(C({},e),{currentValue:t.currentValue})}},k=function(e,t){var n,o=null!==(n=j[t.type])&&void 0!==n?n:null;return o?o(e,t):e};e.Builder.registerEditor({name:"Custom Page Component",component:function(e){var l=e.context.user,a=new g,c=e.value?e.value.toJSON():void 0,s={currentValue:c,customPageComps:[],selectedComponent:void 0,selectedId:c?c.id:""},p=(0,u.useReducer)(k,s),d=p[0],m=p[1];function y(t){var n=d.customPageComps.find((function(e){return e.id==t.target.value}));if(n){var o={id:n.id,title:n.title,options:{}};m({type:"set_type_change",selectedId:t.target.value,currentValue:o,selectedComponent:n}),e.onChange(o)}}function x(t,n){if(d.currentValue){var o=d.currentValue;o.options[n]=t,o.updated=(new Date).valueOf(),m({type:"set_option_change",currentValue:o}),e.onChange(o)}}return(0,u.useEffect)((function(){!function(){var e,t,n,o;e=this,t=void 0,o=function(){var e,t,n,o;return function(e,t){var n,o,r,u,l={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return u={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function a(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;u&&(u=0,a[0]&&(l=0)),l;)try{if(n=1,o&&(r=2&a[0]?o.return:a[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,a[1])).done)return r;switch(o=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return l.label++,{value:a[1],done:!1};case 5:l.label++,o=a[1],a=[0];continue;case 7:a=l.ops.pop(),l.trys.pop();continue;default:if(!((r=(r=l.trys).length>0&&r[r.length-1])||6!==a[0]&&2!==a[0])){l=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){l.label=a[1];break}if(6===a[0]&&l.label<r[1]){l.label=r[1],r=a;break}if(r&&l.label<r[2]){l.label=r[2],l.ops.push(a);break}r[2]&&l.ops.pop(),l.trys.pop();continue}a=t.call(e,l)}catch(e){a=[6,e],o=0}finally{n=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}(this,(function(r){switch(r.label){case 0:return e="page-components?apiKey=".concat(l.apiKey,"&query.published.$ne=archived&limit=50&cachebust=true"),[4,a.getModels(e,l.authHeaders)];case 1:return t=r.sent(),n=Array.isArray(t.results)?function(e){var t;return t=e.map((function(e){var t,n,o,r,u,l=null!==(n=null===(t=e.data)||void 0===t?void 0:t.name)&&void 0!==n?n:"";return{id:l,options:null!==(r=null===(o=e.data)||void 0===o?void 0:o.options)&&void 0!==r?r:[],title:null!==(u=e.name)&&void 0!==u?u:l}})),t}(t.results):[],n=n.concat(i),o=d.selectedId?n.find((function(e){return e.id==d.selectedId})):void 0,m(n&&o?{type:"set_list_components_and_selected",selectedComponent:o,customPageComps:n}:{type:"set_list_components",customPageComps:n}),[2]}}))},new((n=void 0)||(n=Promise))((function(r,u){function l(e){try{i(o.next(e))}catch(e){u(e)}}function a(e){try{i(o.throw(e))}catch(e){u(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,a)}i((o=o.apply(e,t||[])).next())}))}()}),[]),(0,r.useObserver)((function(){return(0,t.jsx)(f,{css:{marginTop:5,marginBottom:10}},(0,t.jsx)(n.FormControl,{fullWidth:!0},(0,t.jsx)(n.InputLabel,{id:"input-component-template-label"},"Select custom component template"),(0,t.jsx)(n.Select,{labelId:"input-component-template-label",id:"input-component-template",css:{marginTop:30},value:d.selectedId,onChange:y},d.customPageComps.map((function(e){return(0,t.jsx)(n.MenuItem,{value:e.id},e.title)})))),(0,t.jsx)(v,{css:{gap:"30px",marginTop:"20px"}},d.selectedComponent&&d.selectedComponent.options.map((function(e){var n;return"list"==e.type?(0,t.jsx)(b,{value:e,onChange:function(t){return x(t,e.key)},currentValue:d.currentValue}):(0,t.jsx)(o,{css:{marginTop:"30px"},value:e,onChange:function(t){return x(t,e.key)},currentValue:null===(n=d.currentValue)||void 0===n?void 0:n.options[e.key]})}))))}))}}),e.Builder.registerEditor({name:"Custom Map",component:function(e){var o=e.value?e.value.map((function(e){return e.toJSON()})):[],l=(0,u.useState)(o),a=l[0],i=l[1];function c(){var t=x(x([],a,!0),[{key:"",type:""}],!1);i(t),e.onChange(t)}function s(t,n,o){var r=a;"update_option"==t&&o?(r[n]=o,i(r)):"delete_option"==t&&(r=r.filter((function(e,t){return n!=t})),i(r)),e.onChange(r)}return(0,u.useEffect)((function(){}),[]),(0,r.useObserver)((function(){return(0,t.jsx)("div",null,a.map((function(e,n){return(0,t.jsx)(d,{css:{marginTop:5,marginBottom:10}},(0,t.jsx)(y,{opt:e,index:n,onChange:s}))})),(0,t.jsx)(d,{css:{marginTop:5,marginBottom:10}},(0,t.jsx)(n.Button,{onClick:c,variant:"text"},"+ New")))}))}}),e.Builder.registerComponent((function(e){return console.log("Props: ",e),(0,t.jsx)("h1",null,"Test")}),{name:"EswCustomMedia",type:"react",inputs:[{name:"text",type:"string",defaultValue:"Hello, world!"}]})})(),s})())}}}));