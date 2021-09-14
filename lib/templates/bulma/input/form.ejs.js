export default { "form": function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (ctx.component.prefix || ctx.component.suffix) { ;
__p += '\n  <div class="field has-addons mb-0">\n';
 } else { ;
__p += '\n  <div class="field mb-0">\n';
 } ;
__p += '\n';
 if (ctx.component.prefix) { ;
__p += '\n<div class="control">\n  <a class = "button is-static">\n    ' +
((__t = (ctx.component.prefix)) == null ? '' : __t) +
'\n  </a>\n</div>\n';
 } ;
__p += '\n\n<div class="control" style="flex-grow:99;">\n  <input\n  class="' +
((__t = (`${ctx.input.type === 'textarea' ? 'textarea' : 'input'} ${ctx.component.customClass} `)) == null ? '' : __t) +
'""\n  type="' +
((__t = (`${ctx.component.type === 'textfield' ? 'text' : ctx.component.type}`)) == null ? '' : __t) +
'"\n  placeholder="' +
((__t = (ctx.component.placeholder)) == null ? '' : __t) +
'"\n  ref="' +
((__t = (ctx.input.ref ? ctx.input.ref : 'input')) == null ? '' : __t) +
'"\n  ';
 for (var attr in ctx.input.attr) { ;
__p += '\n    ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.input.attr[attr])) == null ? '' : __t) +
'"\n  ';
 } ;
__p += '\n  >\n  ' +
((__t = (ctx.input.content)) == null ? '' : __t) +
'\n  </input>\n</div>\n\n';
 if (ctx.component.suffix) { ;
__p += '\n<div class="control">\n  ';
 if (ctx.component.suffix=='%password%') { ;
__p += '\n  <a class = "button">\n    <i class="icon ' +
((__t = ( ctx.iconClass(ctx.input.attr.type == 'password'? 'eye' : 'eye-slash') )) == null ? '' : __t) +
'"> </i>\n  </a>\n  ';
 } else { ;
__p += '\n  <a class = "button is-static">\n    ' +
((__t = (ctx.component.suffix)) == null ? '' : __t) +
'\n  </a>\n  ';
 } ;
__p += '\n</div>\n';
 } ;
__p += '\n\n\n';
 if (ctx.component.showCharCount) { ;
__p += '\n<span class="text-muted pull-right" ref="charcount"></span>\n';
 } ;
__p += '\n';
 if (ctx.component.showWordCount) { ;
__p += '\n<span class="text-muted pull-right" ref="wordcount"></span>\n';
 } ;
__p += '\n\n</div>\n\n<p ref="messageContainer" class="help is-danger"></p>\n<div class="mb-3"></div>\n';
return __p
}}