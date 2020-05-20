var source   = $("#template").html();
var template = Handlebars.compile(source);

$.ajax({
    'url': 'https://flynn.boolean.careers/exercises/api/array/music',
    'method': 'GET',
    'success': function(data) {
        var source   = $("#template").html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < data.response.length; i++) {
            console.log(data.response[i]);
            var context = {
                'src' : data.response[i].poster,
                'title': data.response[i].title,
                'author': data.response[i].author,
                'genre': data.response[i].genre,
                'year': data.response[i].year
            }
            $('#generi').change(function() {
                $('.cd').removeClass('active');
                $('#generi option:selected').each(function(){
                    var genere = $(this).attr('value');
                    $('.cd.'+genere).addClass('active');
                    if($(this).text() == 'All') {
                        $('.cd').addClass('active')
                    }
                });
            });
            var html = template(context);
            $('main').append(html)
        }
    },
    'error': function() {
        alert('ops.. qualcosa è andato storto!')
    }
})
