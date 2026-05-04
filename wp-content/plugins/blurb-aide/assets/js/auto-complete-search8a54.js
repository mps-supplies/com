 jQuery(function($) {

    $('.search-form .blurb-search').keyup( function() {
           var txt = $(this).val();
           if (txt != '') {
             $('#bb-search-result').fadeIn('');
           }
           else {
              $('#bb-search-result').fadeOut('');
           }
    });

    $('.search-form .blurb-search').autocomplete({
        source: function(request, response) {
            $.ajax({
                type : "POST",
                dataType: 'json',
                minLength: 1,
                url: ProuctSearch.ajax_url,
                data: {
                    term: request.term,
                    action: 'productSearch',
                    security: ProuctSearch.ajax_nonce,
                },
                beforeSend: function () {
                    $('#bb-search-result').html('');
                },
                success: function(data) {

                    //response(data);

                    $('#bb-search-result').addClass('bb-product-list-wrapper');

                    for (let index = 0; index < data.length; ++index) {
                        let elem = data[index];

                        $('#bb-search-result').append('<div class="bb-product-list">'+
                            '<div class="row justify-content-between align-items-center bb-row">' +
                            '<div class="col-md-2"><a href="'+elem.link+'" class="bb-product-thumbnail">'+ elem.thumbnail +'</a></div>'+
                            '<div class="col-md-7"><a href="'+elem.link+'" class="bb-product-label">'+ elem.label +'</a></div>'+
                            '<div class="col-md-3"><a class="pp-product-btn" href="'+elem.link+'" class="bb-product-label"> See More</a></div>'+
                            '</div>'+
                            '</div>');

                    }

                }
            });
        },
        select: function(event, ui) {
            window.location.href = ui.item.link;
        },
    });
     $(document).on('click', function(e) {
        if ($(e.target).closest('#bb-search-result').length == 0) {
            $('#bb-search-result').hide();
        }
    }); 
}); 