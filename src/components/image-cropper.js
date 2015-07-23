(function(scope) {
    var ship = scope.ship;
    var Backbone = scope.Backbone;

    var defaultData = {
        aspectRatio: 1 / 1,
        strict: false,
        highlight: false,
        dragCrop: false,
        rotatable: false,
        zoomable: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        mouseWheelZoom: false,
        touchDragZoom: false,
        resizeX: 150,
        resizeY: 150
    };

    var ImageCropper = Backbone.View.extend({
        el: '.cropper-container',

        url: {
            upload: '/image/upload',
            crop: '/image/crop'
        },

        initialize: function(options) {
            this.$img = this.$('img');
            this.imageOptions = options || {}
            _.defaults(this.imageOptions, defaultData);
            this.$img.cropper(this.imageOptions);
        },

        uploadImage: function(postData, callback) {
            var $img = this.$img;
            var options = this.imageOptions;
            var $canvasImg = this.$('.cropper-canvas > img');
            var $viewBoxImg = this.$('.cropper-view-box > img');

            callback = callback || function() {};

            return $.ajax({
                url: this.url.upload,
                type: 'POST',
                data: new FormData(postData),
                cache: false,
                contentType: false,
                processData: false,

                error: function(err) {
                    console.log(err);
                },

                success: function(res) {
                    $img.cropper('destroy');
                    $img.attr('src', res.src);
                    $img.cropper(options);

                    callback();
                },

                xhr: function() {
                    var xhr = $.ajaxSettings.xhr();

                    if (xhr.upload) {
                        xhr.upload.addEventListener(
                            'progress',
                            function progressHandlingFunction(e) {
                                if (e.lengthComputable) {
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

        crop: function(callback) {
            var self = this;
            callback = callback || function() {};

            var data = this.$img.cropper('getData');
            data.src = this.$img.attr('src');
            data.resizeX = this.imageOptions.resizeX;
            data.resizeY = this.imageOptions.resizeY;

            return $.ajax({
                url: this.url.crop,
                type: 'POST',
                data: data,
                cache: false,

                success: function(res) {
                    self.dest = res.src;
                    callback(res);
                },

            });
        }
    });

    ship.components.ImageCropper = ImageCropper;

})(window);
