var source   = $("#template").html();
var template = Handlebars.compile(source);

$.ajax({
    'url': 'https://flynn.boolean.careers/exercises/api/array/music',
    'method': 'GET',
    'success': function(data) {
        //utilizzo un ciclo per scorrere tutti gli oggetti dentro l'array response che è una chiave di data
        for (var i = 0; i < data.response.length; i++) {
            console.log(data.response[i]);
            //creo un oggetto a cui attribuisco i valori delle singole chiavi egli oggetti di response
            var context = {
                'src' : data.response[i].poster,
                'title': data.response[i].title,
                'author': data.response[i].author,
                'genre': data.response[i].genre,
                'year': data.response[i].year
            }
            //bonus select generi
            //quando cambio il select
            $('#generi').change(function() {
                //rendo tutti invisibili
                $('.cd').removeClass('active');
                // prendo ogni opzione selezionata
                $('#generi option:selected').each(function(){
                    //creo una variabile per salvare il genere dell'opzione selezionata
                    var genere = $(this).attr('value');
                    //identifico i cd che hanno lo stesso genere e li rendo visibili
                    $('.cd[value ='+genere+']').addClass('active');
                    //se l'utente clicca su All tutti tornano visibili
                    if($(this).text() == 'All') {
                        $('.cd').addClass('active')
                    }
                });
            });
            var html = template(context);
            $('main').append(html)
        };
    },
    'error': function() {
        alert('ops.. qualcosa è andato storto!')
    }
})
