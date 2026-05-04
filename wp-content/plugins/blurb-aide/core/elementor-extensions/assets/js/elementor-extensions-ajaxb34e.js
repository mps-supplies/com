

!function($) {

    // Quick view.
    $( "body" ).on( "click", '.ajax-model', function(e) {
        e.preventDefault();

        // overlay
        var model = $('.product-view-modal');
        var modelBody = $('.modal-body');
        var watingReq = $('#ajax-modal-awating-req');
        var mask = $('<div class="mask-overlay">');

        model.toggleClass('cs-modal-open');
        mask.hide().appendTo('body').fadeIn('fast');

        $('.mask-overlay, .qv-cross').on('click', function() {
            model.removeClass('cs-modal-open');
            $('.mask-overlay').remove();
        });

        var $this = $(this),
            data = JSON.parse(decodeURIComponent($this.attr("data-post")));        

        modelBody.html('');
        watingReq.show();
        model.show();

        $.ajax({
            type: 'POST',
            url: el_ext.ajaxurl,
            cache: false,
            dataType: 'JSON',
            data : {
                action : 'blurb_quick_view',
                post_data : data
            },
            success:function(res){  
                // console.log(res);                  
                watingReq.hide();
                modelBody.html(res.result);
            },
            error:function(request, status, error) {
                console.log(request);
            }
        });

        return false;
    });





    $(document).on('ready','product-slider-e9a1e94',function () {
        var product_crauosal_responsive_items ={};
        if(blurb.page_layout == 'section-full-width-1650'){
           product_crauosal_responsive_items = {0: {items: 1}, 576: {items: 2},992: {items: 3},1200: {items: 4}, 1500: {items: 5}};

        }

        if(blurb.page_layout == 'section-1170'){
            product_crauosal_responsive_items ={0: {items: 1}, 576: {items: 2},992: {items: 3},1200: {items: 4}};
        }

        $( "section" ).each(function( index ) {
            var data_id = $( this ).attr( "data-id" );
            if(data_id){
                $( this ).addClass( blurb.page_layout );
            }
        });
    })


} (jQuery);




