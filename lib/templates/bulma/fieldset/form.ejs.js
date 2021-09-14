export default { "form": function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<fieldset class="fieldset">\n    ';
 if (ctx.component.legend) { ;
__p += '\n    <legend\n        ref="header"\n        class="' +
((__t = (
            ctx.component.collapsible ? 'formio-clickable' : '' + 'label px-1'
        )) == null ? '' : __t) +
'"\n    >\n        ' +
((__t = ( ctx.t(ctx.component.legend) )) == null ? '' : __t) +
'\n        ';
 if (ctx.component.tooltip) { ;
__p += '\n        <i\n            ref="tooltip"\n            class="' +
((__t = ( ctx.iconClass('question-sign') )) == null ? '' : __t) +
' text-muted"\n        ></i>\n        ';
 } ;
__p += '\n    </legend>\n    ';
 } ;
__p += ' ';
 if (!ctx.collapsed) { ;
__p += '\n    <div class="fieldset-body" ref="' +
((__t = ( ctx.nestedKey )) == null ? '' : __t) +
'">\n        ' +
((__t = ( ctx.children )) == null ? '' : __t) +
'\n    </div>\n    ';
 } ;
__p += '\n</fieldset>\n';
return __p
}}
