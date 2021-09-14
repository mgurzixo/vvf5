export default { "form": function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '\n<label\n';
 if (!ctx.component.widget || ctx.component.widget.type != "input") { ;
__p += '\n  class="label ' +
((__t = ( ctx.label.className )) == null ? '' : __t) +
'"\n';
 } else { ;
__p += '\n  class="label mb-0 ' +
((__t = ( ctx.label.className )) == null ? '' : __t) +
'"\n';
 } ;
__p += '\n>\n  ' +
((__t = ( ctx.t(ctx.component.label) )) == null ? '' : __t) +
'\n\n  ';
 if (ctx.component.tooltip) { ;
__p += '\n    <span class="has-tooltip-arrow" data-tooltip="' +
((__t = (ctx.component.tooltip)) == null ? '' : __t) +
'">\n      <i  class="' +
((__t = ( ctx.iconClass('question-sign') )) == null ? '' : __t) +
' text-muted"> </i>\n    </span>\n  ';
 } ;
__p += '\n\n</label>\n';
return __p
}}
