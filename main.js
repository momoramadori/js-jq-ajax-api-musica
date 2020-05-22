$(document).ready(function(){
    var source   = $("#template").html();
    var template = Handlebars.compile(source);

    //chiamata ajax per recuperare i dati dall'API
    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'GET',
        'success': function(data) {
            //utilizzo un ciclo per scorrere tutti gli oggetti dentro l'array response che è una chiave di data
            gestisci_dati(data.response)
        },
        'error': function() {
            alert('ops.. qualcosa è andato storto!')
        }
    })
    //bonus select generi
    //quando cambio il select
    $('#generi').change(function() {
        //rendo tutti invisibili
        $('.cd').removeClass('active');
        // leggo il valore della select
        var genere = $(this).val();
        //trovo i cd che hanno lo stesso value e li rendo visibili
        $('.cd[value ='+genere+']').addClass('active');
        //se il valore è all li rendo tutti visibili
        if(genere == 'All') {
            $('.cd').addClass('active')
        }
    })

    //funzione per disegnare il disco in pagina
    function disegna_dischi(oggetto) {
        var context = {
            'src' : oggetto.poster,
            'title': oggetto.title,
            'author': oggetto.author,
            'genre': oggetto.genre,
            'year': oggetto.year
        }
        var html = template(context);
        $('main').append(html)
    }

    //funzione per ciclare tutti i dischi dischi
    function gestisci_dati(dischi) {
        for (var i = 0; i < dischi.length; i++) {
            var disco = dischi[i];
            disegna_dischi(disco)
        }
    }
});
