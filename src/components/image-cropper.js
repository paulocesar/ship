(function (scope) {
    var ship = scope.ship;
    var Backbone = scope.Backbone;

    var defaultData = {
        aspectRatio: 1 / 1,
        strict: false,
        highlight: false,
        dragCrop: false,
        rotatable:false,
        zoomable: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        mouseWheelZoom: false,
        touchDragZoom: false,
        crop: function (data) {
            console.log(data);
        }
    };

    var ImageCropper = Backbone.View.extend({
        el: '.cropper-container',

        url: {
            upload: '/image/upload',
            crop: '/image/crop'
        },

        initialize: function (options) {
            this.$img = this.$('img');
            this.$img.cropper(_.defaults(options, defaultData));
        },

        uploadImage: function (postData, callback) {
            var $img = this.$img;
            var $canvasImg = this.$('.cropper-canvas > img');
            var $viewBoxImg = this.$('.cropper-view-box > img');

            callback = callback || function () {};

            return $.ajax({
                url: this.url.upload,
                type: 'POST',
                data: new FormData(postData),
                cache: false,
                contentType: false,
                processData: false,

                error: function (err) { console.log(err); },

                success: function (res) {
                    $img.attr('src', res.src);
                    $canvasImg.attr('src', res.src);
                    $viewBoxImg.attr('src', res.src);
                    callback();
                },

                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();

                    if (xhr.upload) {
                        xhr.upload.addEventListener(
                            'progress',
                            function progressHandlingFunction(e){
                                if(e.lengthComputable){
                                    console.log(e.loaded, e.total);
                                }
                            },
                            false
                        );
                    }

                    return xhr;
                }
            });
        },

        crop: function (callback) {
            callback = callback || function () {};

            var data = this.$img.cropper('getData');

            return $.ajax({
                url: this.url.crop,
                type: 'POST',
                data: data,
                cache: false,

                success: function (res) {
                    callback();
                },

            });
        }
    });

    ship.components.ImageCropper = ImageCropper;

})(window);
