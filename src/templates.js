this["JST"] = this["JST"] || {};

this["JST"]["edit-display"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'row\'>\n    <div class=\'container-list col-md-6\'></div>\n    <div class=\'container-form col-md-6\'></div>\n</div>\n';

}
return __p
};

this["JST"]["image-cropper"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="cropper-container"><img src="/images/image-cropper.jpg" /></div>\n';

}
return __p
};

this["JST"]["list-item"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 _.each(displayFields, function (field) { ;
__p += '\n    <span class=\'field ' +
((__t = ( field )) == null ? '' : __t) +
'\'>' +
((__t = ( model[field] )) == null ? '' : __t) +
'</span>\n';
 }); ;
__p += '\n';

}
return __p
};

this["JST"]["list"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'scrollable\'>\n    <ul class=\'list\'></ul>\n    <div class=\'list-loading\'>\n        carregando...\n    </div>\n</div>\n';

}
return __p
};

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