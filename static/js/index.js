$( document ).ready(function() {
        addNums();
});

$('.nums').on('click', '.num', function() {
        var num = $(this).text();
        var url = "/media/count/".concat(num);
        $(this).parents(".dropdown").find('.btn').html(num + ' <span class="caret"></span>');
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
        window.location.href = url;
});

function addNums(){
        for (var i = 1; i <= 25; i++) {
            $(".nums").append('<li class="num">'+i+'</li>')
        }
}