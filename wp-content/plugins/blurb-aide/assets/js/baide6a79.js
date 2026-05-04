(function( $ ) {
    'use strict';

    var prefix = "";
    var action = "extensions_search";

    // Getting url parameter.
    $.urlParam = function(name, url){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // Change search param in url
    $.changeUrl = function(key, value) {
        //Get query string value
        var searchUrl = location.search;
        if(searchUrl.indexOf("?")== "-1") {
            var urlValue='?'+key+'='+value;
            history.pushState({state:1, rand: Math.random()}, '', urlValue);
        }
        else {
            //Check for key in query string, if not present
            if(searchUrl.indexOf(key)== "-1") {
                var urlValue=searchUrl+'&'+key+'='+value;
            }
            else {  
                key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var oldValue = new RegExp("[\\?&]" + key + "=([^&#]*)").exec(location.search);
                oldValue = oldValue === null ? "" : decodeURIComponent(oldValue[1].replace(/\+/g, " "));

                if(searchUrl.indexOf("?"+key+"=")!= "-1") {
                    urlValue = searchUrl.replace('?'+key+'='+oldValue,'?'+key+'='+value);
                } else {
                    urlValue = searchUrl.replace('&'+key+'='+oldValue,'&'+key+'='+value);   
                }
            }
            history.pushState({state:1, rand: Math.random()}, '', urlValue);
        }
    }

    // Remove search param in url
    $.removeQString = function(key) {
        var urlValue=document.location.href;        
        //Get query string value
        var searchUrl =location.search;     
        if(key!="") {

            key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var removeVal = new RegExp("[\\?&]" + key + "=([^&#]*)").exec(location.search);
            removeVal = removeVal === null ? "" : decodeURIComponent(removeVal[1].replace(/\+/g, " "));

            removeVal=key+"="+removeVal;
            if(searchUrl.indexOf('?'+removeVal+'&')!= "-1") {
                urlValue=urlValue.replace('?'+removeVal+'&','?');
            }
            else if(searchUrl.indexOf('&'+removeVal+'&')!= "-1") {
                urlValue=urlValue.replace('&'+removeVal+'&','&');
            }
            else if(searchUrl.indexOf('?'+removeVal)!= "-1") {
                urlValue=urlValue.replace('?'+removeVal,'');
            }
            else if(searchUrl.indexOf('&'+removeVal)!= "-1") {
                urlValue=urlValue.replace('&'+removeVal,'');
            }
        }
        else {
            var searchUrl=location.search;
            urlValue=urlValue.replace(searchUrl,'');
        }
        history.pushState({state:1, rand: Math.random()}, '', urlValue);
    }


    // The sameHeight functions makes all the selected elements of the same height.
    $.fn.SAME_HEIGHT = function() {
        var selector = this;
        var heights = [];
        // Save the heights of every element into an array
        selector.each(function(){
            var height = $(this).height();
            heights.push(height);
        });
        // Get the biggest height
        var maxHeight = Math.max.apply(null, heights);
        // Set the maxHeight to every selected element
        selector.each(function(){
            $(this).height(maxHeight);
        }); 
    };

    // Remove Next To All Select Field
    $.fn.RemoveNextAllLvl = function(){
        return this.each(function(){
            var $this = $(this);
            var parent = $this.parent();          
            var title = parent.prev();
            var nextAllLvl;

            if (title.hasClass('cs-title')) {
                nextAllLvl = parent.parent().nextAll();
            } else {
                nextAllLvl = parent.nextAll();
            }
            nextAllLvl.each(function(key, element){
                element.remove();
            });
        });
    }

    // Circle process bar
    $.fn.circleProcessBar = function () {
        var DEFAULTS = {
            backgroundColor: '#ffb401',
            progressColor: '#006cff',
            percent: 75,
            duration: 2000
        };  
        
        $(this).each(function () {
            var $target  = $(this);

            var opts = {
            backgroundColor: $target.data('color') ? $target.data('color').split(',')[0] : DEFAULTS.backgroundColor,
            progressColor: $target.data('color') ? $target.data('color').split(',')[1] : DEFAULTS.progressColor,
            percent: $target.data('percent') ? $target.data('percent') : DEFAULTS.percent,
            duration: $target.data('duration') ? $target.data('duration') : DEFAULTS.duration
            };
    
            $target.append('<div class="background"></div><div class="rotate"></div><div class="left"></div><div class="right"></div><div class=""><span>' + opts.percent + '%</span></div>');
    
            $target.find('.background').css('background-color', opts.backgroundColor);
            $target.find('.left').css('background-color', opts.backgroundColor);
            $target.find('.rotate').css('background-color', opts.progressColor);
            $target.find('.right').css('background-color', opts.progressColor);
    
            var $rotate = $target.find('.rotate');
            setTimeout(function () {    
                $rotate.css({
                    'transition': 'transform ' + opts.duration + 'ms linear',
                    'transform': 'rotate(' + opts.percent * 3.6 + 'deg)'
                });
            },1);       

            if (opts.percent > 50) {
                var animationRight = 'toggle ' + (opts.duration / opts.percent * 50) + 'ms step-end';
                var animationLeft = 'toggle ' + (opts.duration / opts.percent * 50) + 'ms step-start';  
                $target.find('.right').css({
                    animation: animationRight,
                    opacity: 1
                });
                $target.find('.left').css({
                    animation: animationLeft,
                    opacity: 0
                });
            } 
        });
    }

    // Product shop list view
    $.fn.listView = function( selector, type ) {
        var $this = $(this);
        $this.each(function () {
            $this.on("click", selector, function(event){
                event.preventDefault();
                var productItem = $('#product_grid_container article.type-'+type);
                if (productItem.hasClass('col-lg-6')) {
                    productItem.removeClass('col-lg-6 shop-grid-view').addClass('exta-col-lg-6 col-lg-12 shop-list-view');
                } else if (productItem.hasClass('col-lg-3')) {
                    productItem.removeClass('col-lg-3 shop-grid-view').addClass('exta-col-lg-3 col-lg-12 shop-list-view');                
                } else if (productItem.hasClass('col-lg-4')) {
                    productItem.removeClass('col-lg-4 shop-grid-view').addClass('exta-col-lg-4 col-lg-12 shop-list-view');
                }
                $('.shop-filter-item').children('i').removeClass('active-color');
                $(this).children('i').addClass('active-color');
            });            
        });
    }

    // Product shop grid view
    $.fn.gridView = function( selector, type ) {
        var $this = $(this);
        $this.each(function () {
            $this.on("click", selector, function(event){
                event.preventDefault();
                var productItem = $('#product_grid_container article.type-'+type);
                if (productItem.hasClass('col-lg-12') ) {
                    if ( productItem.hasClass('exta-col-lg-6') ) {
                        productItem.removeClass('exta-col-lg-6 col-lg-12 shop-list-view').addClass('col-lg-6 shop-grid-view');                    
                    } else if( productItem.hasClass('exta-col-lg-3') ){
                        productItem.removeClass('exta-col-lg-3 col-lg-12 shop-list-view').addClass('col-lg-3 shop-grid-view');
                    } else if( productItem.hasClass('exta-col-lg-4') ){
                        productItem.removeClass('exta-col-lg-4 col-lg-12 shop-list-view').addClass('col-lg-4 shop-grid-view');
                    } else {
                        productItem.removeClass('col-lg-12 shop-list-view').addClass('col-lg-4');
                    }
                }
                $('.shop-filter-item').children('i').removeClass('active-color');
                $(this).children('i').addClass('active-color');
            });            
        });
    }


    $(document).ready(function () {

        // Sidebar widget slider
        $('.blurb_post_widget .sidebar-slider').owlCarousel({
            loop: true,
            autoplay: true,
            items: 1,
            dots: false,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
        });

        // List view and grid view
        $('.product-shop-page').listView('#shop-list-view', 'blurb_product');
        $('.product-shop-page').gridView('#shop-grid-view', 'blurb_product');

        $('.product-shop-page').listView('#shop-list-view', 'product');
        $('.product-shop-page').gridView('#shop-grid-view', 'product');
        
        $('.product-reviews-page').listView('#shop-list-view', 'blurb_product_review');
        $('.product-reviews-page').gridView('#shop-grid-view', 'blurb_product_review');

        // Price history circle bar
        $(".dial").knob({
            width: '85',
            height: '85',
            thickness: '.18',
            bgColor: '#006cff',
            inputColor: '#575757',
            fgColor: '#ffb401',
            readOnly: true,
            lineCap: 'round',
            parse: function(e){
                return parseInt(e, 10);
            }
        });
        $('.dial').each(function() {
            var element = $(this),
                number = element.data('number');
            $('.progress_bar_wrap').appear(function() {
                $(this).css('opacity', 1);
                $({value: 0}).animate({value: number}, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        element.val(Math.ceil(this.value)).trigger('change');
                    }
                });                
            });
        });


        //============= Compare  ============ 
        $(".compare-cart").on('click', function (e) {
            e.preventDefault();
            $("#blurb-compare-bar").toggleClass("active");
        });

        $("#blurb-compare-bar").on('click', '.closeme', function () {
            $('#blurb-compare-bar').removeClass("active");
        });

        $("#blurb-compare-bar").on('click', 'ul li', function () {
            var tabId = $(this).attr('data-term');
            var url = $(this).attr('data-url');
            var compareIds = $(this).attr('data-comparing');
            var cat = $(this).attr('data-term');

            // compare tab
            $("#blurb-compare-bar ul li").removeClass('active');
            $(this).addClass('active');

            // compare tab content 
            $(".compare-tab-content").removeClass('active');
            $(".compare-tab-content-"+tabId).addClass('active');

            // comparing button
            $("#blurb-compare-btn").attr('data-compareurl',url+'?compareids='+compareIds+'&cat='+cat+'&filter=avg');
        });

        // Table chart carousel      
        $('.chart_col_wrap').owlCarousel({
            loop: false,
            autoplay:false,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            items: 4,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });

        $('#shop-slider .item.bc-slider-bg, .shop-slider-section').each(function(e){
            let url = $(this).attr('data-slider-url');

            if (url !== '') {
                $(this).css('background-image', 'url(' + url + ')');
            } else {
                $(this).removeAttr('data-slider-url');
            }
        });
        
        // Compare chart table row make equal height.
        var totalRow = $('.total_row').html();
        for (var i = 1; i <= totalRow; i++) {
            $('.chart_row_'+i).SAME_HEIGHT();           
        }
        $(window).resize(function(){
            for (var i = 1; i <= totalRow; i++) {
            $('.chart_row_'+i).SAME_HEIGHT();                       
            }
        });
        // market product compare chart sub row equel height.
        $('.chart_sub_row_0').SAME_HEIGHT();            
        $(window).resize(function(){
            $('.chart_sub_row_0'+i).SAME_HEIGHT();                      
        });     


        
    });


    // Product filter by category
    $(document).on('submit', '#blurb_filter_form', function( e ) {
        e.preventDefault();
        var $this = $(this),
            markets = [];

        $('#blurb_market_filter input:checkbox:checked').each(function() {
           markets.push($(this).val());
        });

        $.ajax({
            type: 'POST',
            url: baide.ajaxurl,
            data : {
                action : 'product_filter',
                selected_value : $('#blurb_items_filter').val(),
                markets : markets,
                type : $this.attr('data-type'),           
                nonce : $this.attr('data-nonce'),
            },
            success:function(response){
                $('#product_grid_container').html(response.shop);
                $('#product_number').text(response.count);
            },
            complete:function( ){
                // List view and grid view
                if ($('#shop-list-view i').hasClass('active-color')) {
                    $("#shop-list-view").click();                   
                } else if ($('#shop-grid-view i').hasClass('active-color')) {
                    $("#shop-grid-view").click()
                }

                // Set use currency top bar
                $(".blurb_curency_select").text('USD');
                
            }
        });

        return false;

    }).on('change', '#blurb_items_filter', function(){
        $("#blurb_filter_form").submit();
    }).on("change", "#blurb_market_filter :checkbox", function(){
        $("#blurb_filter_form").submit();
    });


    // Load more 
    $(document).on('click', '#blurb_load_More', function( e ) {
        e.preventDefault();
        var $this = $(this),
            markets = [],
            conttainer = $('#product_grid_container');

        $('#blurb_market_filter input:checkbox:checked').each(function() {
           markets.push($(this).val());
        });

        $.ajax({
            type: 'POST',
            url: baide.ajaxurl,
            data : {
                action : 'load_more',
                selected_value : $('#blurb_items_filter').val(),
                markets : markets,
                offset : conttainer.children('article').length,    
                type : $this.attr('data-type'),           
                active : $this.attr('data-active'),           
                nonce : $this.attr('data-nonce'),
            },
            success:function(response){
                conttainer.append(response.shop);

                $('#product_number').text(response.count);
                // Set use currency top bar
                $(".blurb_curency_select").text('USD');
            },
            complete:function( ){
                // List view and grid view
                if ($('#shop-list-view i').hasClass('active-color')) {
                    $("#shop-list-view").click();                   
                } else if ($('#shop-grid-view i').hasClass('active-color')) {
                    $("#shop-grid-view").click()
                }

                // Set use currency top bar
                $(".blurb_curency_select").text('USD');
                
            }
        });
        return false;
    });





    // Compare Product filter by category
    $(document).on('change', '#compare_filter', function() {
        var market = $(this),
        marketId = market.val(),
        compareIds = $.urlParam('compareids', window.location.href),
        catId = $.urlParam('cat', window.location.href),
        security = market.attr('data-nonce'),
        current_filter = $.urlParam('filter', window.location.href);

        if (marketId != '') {
            $.ajax({
                type: 'POST',
                url: baide.ajaxurl,
                cache : false,
                data : {
                    action : 'compare_product_filter',
                    market_id : marketId,            
                    compare_ids : compareIds,            
                    cat_id : catId,            
                    nonce : security,
                },
                success:function(response){
                    $.changeUrl('filter',marketId);
                    $('.compare-products').html(response.result);
                    // location.reload();

                },
                error: function(xhr) {
                    $.changeUrl('filter',current_filter);
                    $('.compare-products').prepend(xhr.statusText + xhr.responseText);
                },
                complete: function(data) {
                    // Compare chart table row make equal height.
                    var totalRow = $('.total_row').html();
                    for (var i = 1; i <= totalRow; i++) {
                        $('.chart_row_'+i).SAME_HEIGHT();           
                    }
                    $(window).resize(function(){
                        for (var i = 1; i <= totalRow; i++) {
                            $('.chart_row_'+i).SAME_HEIGHT();                       
                        }
                    });
                }
            });
        }
        return false;
    });

    // Remove post from wish-list, compare-list, coupon-list.
    $(document).on('click', '.blurb-remove', function(e) {
        e.preventDefault();
        var button = $(this);
        var postId = button.attr('data-post-id');
        var security = button.attr('data-nonce');
        var type = button.attr('data-type');

        var wishCount = $('.header-wishlist .count');
        var wishPost = $('#wishlist');

        var couponCount = $('.coupon-save .count');
        var couponPost = $('#saved-coupon');

        var compareCount = $('.compare-cart .count');
        var compareBar = $('#blurb-compare-bar');

        if (postId != '') {
            $.ajax({
                type: 'POST',
                url: ob_remove.ajaxurl,
                data : {
                    'action' : 'blurb_remove_action',
                    'post_id' : postId,
                    'nonce' : security,
                    'type' : type,
                },      
                success:function(response){
                    var count = response.total_count;
                    if ( type == 'wish' ) {
                        wishPost.html(response.result);
                        if( typeof(count) != "undefined" && count !== null ) {
                            wishCount.text(count);
                        }
                    } else if ( type == 'coupon' ) {
                        couponPost.html(response.result);
                        if( typeof(count) != "undefined" && count !== null ) {
                            couponCount.text(count);
                        }
                    } else if ( type == 'compare' ) {
                        // get comparing product ids from url
                        var comparingIds = $.urlParam('compareids', window.location.href);
                        // get current product item in compare page
                        var comparing_item = button.parents('.owl-item.active'); //parents('.chart_item');
                        // string to array
                        comparingIds = comparingIds.split(',');
                        // remove curent id from array
                        comparingIds = $.grep(comparingIds, function(value) {
                          return value != postId;
                        });
                        // array  to string
                        comparingIds = comparingIds.join(',');
                        // remove current product item in compare page.
                        comparing_item.remove();
                        // compare bar html from ajax action.
                        compareBar.html(response.comparing); // Compare bar
                        // modifiy compare page url.
                        if (comparingIds != '') {
                            $.changeUrl('compareids',comparingIds);
                        } else {
                            $.removeQString('compareids');
                            $.removeQString('cat');
                            $.removeQString('filter');
                        }
                        // change count value in manu bar
                        if( typeof(count) != "undefined" && count !== null ) {
                            compareCount.text(count);
                        }
                        // change current product compare button text.
                        $('.baide_compare .sl-button').each(function(i) {
                            var currentId = $(this).attr('data-post-id');
                            if (currentId === postId) {
                                $(this).removeClass('liked');
                                $(this).children('span').text('Add to compare');
                            }
                        });

                    }
                }
            });
        }
        return false;
    });



    // Compare bar process.
    $(document).on('click', '#blurb-compare-btn', function(e) {
        e.preventDefault();
        var $this = $(this),
            url = $this.attr('data-compareurl'),
            compareIds = $.urlParam('compareids',url);

        compareIds = compareIds.split(',');
        if (compareIds.length > 1) {
            window.location.href = url;         
        } else {
            $this.after('<span class="error-notice">Please, add items to this compare group or choose not empty group</span>');
            setTimeout(function(){
                $this.next('.error-notice').remove();
            }, 2000);
        }
    });


    // Product filter by category.
    $(document).on('click', '.blurb-register-form input[name="submit"]', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: ob_reg.ajaxurl,
            data : {
                action      : 'registration_process',
                user_login  : $('.blurb-register-form input[name="user_login"]').val(),
                user_email  : $('.blurb-register-form input[name="user_email"]').val(),
                user_pass   : $('.blurb-register-form input[name="user_pass"]').val(),
                user_url    : $('.blurb-register-form input[name="user_url"]').val(),
                first_name  : $('.blurb-register-form input[name="first_name"]').val(),
                last_name   : $('.blurb-register-form input[name="last_name"]').val(),
                nickname    : $('.blurb-register-form input[name="nickname"]').val(),
                description : $('.blurb-register-form textarea[name="description"]').text(),
                nonce       : $('#reg_nonce').val(),
            },
            success:function(response){
                $('.blurb-register-form .error-notice').remove();
                $('.blurb-register-form input').removeClass('error-field');
                if ( ! response.success ) {
                    $.each(response.reg_errors, function(index, value) {
                        $('input[name="'+index+'"]').addClass('error-field');
                        $('input[name="'+index+'"]').parent().find('label').append('<small class="error-notice">'+value+'</small>');
                    });
                } else if ( response.success ) {
                    $('.blurb-register-form').before( response.success_link );
                    $( "#reg-success" ).click(function() {
                        $('#sign-up-tab').removeClass('active');                      
                    });
                }
                
            }
        });
        return false;
    });


    // Add review.
    $(document).on('click', '#blurb-rating-form #review-submit', function(e) {
        e.preventDefault();
        var $from = $('#blurb-rating-form'),
            loader = $('#blurb-rating-form .posting-loader');
        $.ajax({
            type: 'POST',
            url: ob_review.ajaxurl,
            data : {
                action  : 'add_review_process',
                market  : $from.find('select[name="review_market"]').val(),
                name    : $from.find('input[name="review_name"]').val(),
                email   : $from.find('input[name="review_email"]').val(),

                content : $from.find('textarea[name="review_content"]').val(),
                pros    : $from.find('textarea[name="review_pros"]').val(),
                cons    : $from.find('textarea[name="review_cons"]').val(),
                rating_property_1 : $from.find('input[name="rating_property_1"]').val(),
                rating_property_2 : $from.find('input[name="rating_property_2"]').val(),
                rating_property_3 : $from.find('input[name="rating_property_3"]').val(),
                rating_property_4 : $from.find('input[name="rating_property_4"]').val(),
                rating_property_5 : $from.find('input[name="rating_property_5"]').val(),
                post_id : $from.find('input[name="review_post"]').val(),
                nonce       : $from.find('#review_nonce').val(),
            },
            success:function(response){
                $('#blurb-rating-form .error-notice').remove();
                $('#blurb-rating-form input').removeClass('error-field');
                if ( ! response.success ) {
                    $.each(response.review_errors, function(index, value) {
                        if (index == 'review_market') {
                            $('#blurb-rating-form select[name="'+index+'"]').addClass('error-field');
                            $('#blurb-rating-form select[name="'+index+'"]').parent().find('label').append('<small class="error-notice">'+value+'</small>');
                        } else if (index == 'review_pros' || index == 'review_cons') {
                            $('#blurb-rating-form textarea[name="'+index+'"]').addClass('error-field');
                            $('#blurb-rating-form textarea[name="'+index+'"]').parent().find('label').append('<small class="error-notice">'+value+'</small>');
                        } else if (index == 'property_list') {
                            $('#blurb-rating-form .product-rating-list').addClass('error-field');
                            $('#blurb-rating-form .product-rating-list').append('<small class="error-notice">'+value+'</small>');                           
                        } else if (index == 'user-error-notice') {
                            $from.append('<div class="'+index+'">'+value+'</div>'); 
                            setTimeout(function() { 
                                $from.find('.'+index).remove();
                            }, 2000);                                                                               
                        } else {
                            $('#blurb-rating-form input[name="'+index+'"]').addClass('error-field');
                            $('#blurb-rating-form input[name="'+index+'"]').parent().find('label').append('<small class="error-notice">'+value+'</small>');
                        }
                    });

                } else if ( response.success ) {
                    loader.text(response.loading_text);
                    setTimeout(function() { 
                        loader.text(''); 
                    }, 1000);
                    window.location.href = response.redirect_link; //will redirect to your current page.
                }
                
            }
        });
        return false;
    });


    // Get product category in market search filter.
    $(document).on('change', '.market-search-filter-wrap select', function(e) {
        e.preventDefault();
        var cat = $(this),
            catID = cat.val(),
            security = cat.attr('data-nonce'),
            lvl = cat.attr('data-count'),
            catSection = $(".market-search-filter-wrap");

         if (catID != '') {
            $.ajax({
                type: 'POST',
                url: baide.ajaxurl,
                cache: false,
                data : {
                    action : 'market_search_filter_process',
                    cat_id : catID,
                    lvl : lvl,            
                    nonce : security,
                },
                success:function(response){
                    if (response.select_fields != 'none') {
                        cat.RemoveNextAllLvl();
                        catSection.append(response.select_fields);
                    } else if(response.select_fields === 'none') {
                        cat.RemoveNextAllLvl();
                        // active search btn.
                        $('.market_compare_search input[type=submit]').prop('disabled', false);
                    }
                },                
            });

        } else {
            cat.RemoveNextAllLvl();
        }
        return false;
    });


    // Post view count
    jQuery(document).on( 'click', '.blurb-post-views-btn', function() {
        var $this = $(this),
            postId = $this.attr('data-post-id'),
            security = $this.attr('data-nonce');

        if (postId != '') {
            $.ajax({
                url : baide.ajaxurl,
                type : 'POST',
                data : {
                    'action' : 'baide_add_post_view',
                    'post_id' : postId,
                    'nonce' : security,
                },
                success : function( response ) {
                    $('.coupon-views-count').html( response.views );
                }
            });
        }
        return false;
    });

    


})( jQuery );
