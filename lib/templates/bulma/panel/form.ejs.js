export default { "form": function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="card">\n    <div\n        class="card-header ' +
((__t = (
            ctx.transform('class', 'bg-' + ctx.component.theme)
        )) == null ? '' : __t) +
'"\n        ref="header"\n    >\n        <span class="mb-0 card-header-title">\n            ';
 if (ctx.component.collapsible) { ;
__p += '\n            <i\n                class="formio-collapse-icon ' +
((__t = (
                    ctx.iconClass(
                        ctx.collapsed ? 'plus-square-o' : 'minus-square-o'
                    )
                )) == null ? '' : __t) +
' text-muted"\n                data-title="Collapse Panel"\n            ></i>\n            ';
 } ;
__p += '\n            ' +
((__t = ( ctx.t(ctx.component.title) )) == null ? '' : __t) +
'\n            ';
 if (ctx.component.tooltip) { ;
__p += '\n            <i\n                ref="tooltip"\n                class="' +
((__t = ( ctx.iconClass('question-sign') )) == null ? '' : __t) +
' text-muted"\n            ></i>\n            ';
 } ;
__p += '\n        </span>\n    </div>\n    ';
 if (!ctx.collapsed || ctx.builder) { ;
__p += '\n    <div class="card-content" ref="' +
((__t = ( ctx.nestedKey )) == null ? '' : __t) +
'">\n        ' +
((__t = ( ctx.children )) == null ? '' : __t) +
'\n    </div>\n    ';
 } ;
__p += '\n</div>\n';
return __p
}}