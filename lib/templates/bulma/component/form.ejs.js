export default { "form": function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div id="' +
((__t = (ctx.id)) == null ? '' : __t) +
'"\n    ';
 if (ctx.classes.split(' ')[0] == 'row') { ;
__p += '\n      class = "' +
((__t = ( ctx.classes.replace(/row/g, 'columns'))) == null ? '' : __t) +
'"\n    ';
 } else { ;
__p += '\n      class = ""\n    ';
 } ;
__p += '\n    ';
 if (ctx.styles) { ;
__p += '\n      styles=\'' +
((__t = (ctx.styles)) == null ? '' : __t) +
'\'\n    ';
 } ;
__p += '\n     ref=\'component\'\n >\n  ';
 if (ctx.visible) { ;
__p += '\n    ' +
((__t = (ctx.children)) == null ? '' : __t) +
'\n    ';
 if (!ctx.component.widget || (ctx.component.widget.type != "input")) { ;
__p += '\n    <p ref="messageContainer" class="help is-danger"></p>\n  ';
 } ;
__p += '\n  ';
 } ;
__p += '\n</div>\n';
return __p
}}