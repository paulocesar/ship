this["JST"] = this["JST"] || {};

this["JST"]["loading"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="ship-loader">\n    <img src=\'' +
((__t = ( src )) == null ? '' : __t) +
'\'> <div>' +
((__t = ( label )) == null ? '' : __t) +
'</div>\n</div>\n';

}
return __p
};