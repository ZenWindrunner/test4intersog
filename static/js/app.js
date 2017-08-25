$( document ).ready(function() {

    var mediaRecieved = false;
    var results = [];

    function addTags(tags){
        for (var i = 0; i < tags.length; i++) {
            $(".tags").append('<li class="tag">#'+tags[i]+'</li>')
        }
    }

    function checkMediaLength(media){
        if (COUNT > media.length) {
            $(".warning").text("User have only " + media.length + " media objects")
        }
    }


    function getMedia() {
        $.ajax({
            type: "GET",
            url: "/content/",
            data: {'task_id': TASK_ID},
            dataType: "json",
            async: false,
            success: function(data, statusText, xhr) {
                if (xhr.status != 204) {
                    mediaRecieved = true;
                    results = data.results;
                    stopLoading();
                    addTags(data.results.tags)
                    placeMedia(data.results.media);
                    checkMediaLength(data.results.media);
                }
            }.bind([this.mediaRecieved, this.results]),
            error: function(rs, e) {
                console.log(e.responseText);
            }
        });
    }


    function filterMedia(tag) {
        if( tag.charAt( 0 ) === '#' )
            tag = tag.slice( 1 );
        $( "#media" ).empty();
        var filtered = [];
        for (var i = 0; i < results.media.length; i++) {
            for (var j = 0; j < results.media[i][1].length; j++) {
                if (results.media[i][1][j] === tag) {
                    filtered.push(results.media[i])
                }
            }
        }
        placeMedia(filtered);
    }


    $('.tags').on('click', '.tag', function() {
        var tag = $(this).text();
        $(this).parents(".dropdown").find('.btn').html(tag + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
        filterMedia(tag);
    });


    function placeMedia(media) {
        for (var i = 0; i < media.length; i++) {
            img = '<img class="img-responsive img-thumbnail" src="' + media[i][0] + '">';

            tags = "";
            for (var j = 0; j < media[i][1].length; j++) {
                tags += "#" + media[i][1][j] + " ";
            }
            caption = '<div class="caption"> <p>' + tags + '</p> </div>';
            $( "#media" ).append('<div  class="col-md-3 col-sm-4 col-xs-6 top-buffer">' + img + caption + '</div>');
        }
    }


    function stopLoading() {
        $("#loading").removeClass("layer-second");
    }


    while (!mediaRecieved) {
        getMedia();
    }
});