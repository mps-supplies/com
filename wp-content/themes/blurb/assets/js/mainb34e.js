// IIFE with jQuery Wrapper
(function ($) {
    'use strict';
    
    $(window).on('load', function () {
        $('.preloader').delay(1000).fadeOut(600);
    });

    // Accordion mobile menu
    var initMobileMenu = function() {
        $( '#bmmenu li.has-sub' ).append( '<span class="holder"></span>' );
        $( 'body' ).on('click','.holder',function() {
            var el = $( this ).closest( 'li' );
            if ( el.hasClass( 'open' ) ) {
                el.removeClass( 'open' );
                el.find( 'li' ).removeClass( 'open' );
                el.find( 'ul' ).slideUp();
            } else {
                el.addClass( 'open' );
                el.children( 'ul' ).slideDown();
                el.siblings( 'li' ).children( 'ul' ).slideUp();
                el.siblings( 'li' ).removeClass( 'open' );
                el.siblings( 'li' ).find( 'li' ).removeClass( 'open' );
                el.siblings( 'li' ).find( 'ul' ).slideUp();
            }
        });
    }

    // currency formating
    function formatMoney(amount, decimalCount = 2, decimal = ".", separator = ",") {
 
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + separator : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + separator) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");

    };


    // tab function
    $.fn.BLURB_TAB = function(tabContents, parent_active = true ){
        var tabItem = this,
            active = 'active-tab',
            activeContent = 'active-content';

        $(tabContents).each(function(){
            if ( !($(this).hasClass(activeContent) )) {
                $(this).hide();
            }
        });

        // for parent
        if (parent_active == true) {
            tabItem.each(function(){
                if ( $(this).hasClass(active) ) {
                    $(this).parent().addClass('active-tab-parent');
                }
            });
        }

        tabItem.on('click',function(e){
            e.preventDefault();
            var $this = $(this),
            tabContentId = $this.attr('href');

            // for parent
            if (parent_active == true) {
                tabItem.each(function(){
                    $(this).parent().removeClass('active-tab-parent');
                });
            }

            if (!$this.hasClass(active)) {
                // tab
                tabItem.removeClass(active);
                $this.addClass(active);
                // for parent
                if (parent_active == true) {
                    $this.parent().addClass('active-tab-parent');
                }
                // tab content
                $(tabContents).removeClass(activeContent).hide();
                $(tabContentId).addClass(activeContent).fadeIn('show');
            }              
        });
        
    }

    

    
    /*
     *----------------------------------
     * Document Ready
     *----------------------------------
     */
    $(document).ready(function () {
      
      		// Convert Image to SVG
    		$('img.blurb-svg').each(function() {
    			var $img = $(this),
    			imgID = $img.attr('id'),
    			imgClass = $img.attr('class'),
    			imgURL = $img.attr('src');

    			$.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
          	$svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
          	$svg = $svg.attr('class', imgClass);
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          $img.replaceWith($svg);
      }, 'xml');
    		});
        
        // back privious hestory link in 404 page go-back button.
        $('.go-back').click(function() {           
            history.go(-1);       
            return false;
        });

        // Mobile menu init
        initMobileMenu();

        // bootstrap button dropdown list getting selected value.
        $(".main-slider-section #category-items").on('click', 'li', function(){
            var termId = $(this).attr('data-term-id');
            $(".search-cat-btn span").text($(this).text());
            $('#banner-custom-search-form input[name="term_id"]').val(termId);           
        });

        // Currency transformation.        
        var currencies = new Array();
        $('#blurb_curency_list .dropdown-item').each(function(index){
            currencies[$(this).text().replace(/\s/g, '')] = $(this).attr('data-unit');
        });
        var currencies = Object.assign({}, currencies);

        $("#blurb_curency_list").on('click', 'a', function(e){
            e.preventDefault();
            var oldCurrency = $('.blurb_curency_select').text().replace(/\s/g, ''),
                currency = $(this).text().replace(/\s/g, ''),
                unit = $(this).attr('data-unit'),
                symbol = $(this).attr('data-symbol');

            var cookie_currency = Cookies.get('blurb_currency');
            if ( cookie_currency == 'undefined' ) {
                Cookies.set('blurb_currency', { currency: currency, unit: unit, symbol: symbol }, { expires: 1 });
            } else {
                Cookies.remove('blurb_currency', { path: '' });
                Cookies.set('blurb_currency', { currency: currency, unit: unit, symbol: symbol }, { expires: 1 });                
            }

            $(".blurb_curency_select").text(currency);
            $('.blurb-currency-symbol').text(symbol);
            $('.blurb-currency-key').text(currency);
               
            // Min price convert
            $('.blurb-price-min').each( function() {
                var minPrice = parseFloat($(this).text().replace(/,/g, '')); // price processing
                minPrice = (minPrice/currencies[oldCurrency])*currencies[currency];
                // console.log('('+parseFloat($(this).text().replace(/,/g, ''))+'/'+currencies[oldCurrency]+')*'+currencies[currency]+')='+minPrice);
                minPrice = formatMoney(minPrice);
                $(this).text(minPrice); // converted price render
            });
            // Max price convert
            $('.blurb-price-max').each( function(){
                var maxPrice = parseFloat($(this).text().replace(/,/g, '')); // price processing
                maxPrice = (maxPrice/currencies[oldCurrency])*currencies[currency];
                maxPrice = formatMoney(maxPrice);
                $(this).text(maxPrice); // converted price render
            });

        });

      
        

        /*
		====================================
			Nav menu
		====================================
  	    */     
        $('.menu > ul').before('<a href=\'#\' class=\'menu-mobile\'> <i class=\'fa fa-bars\'></i></a>');

        $('.menu-mobile').on('click', function (e) {
            $('.menu > ul').toggleClass('show-on-mobile');
            e.preventDefault();
        });


        /*
		====================================
			Home Page Slider Section
		====================================
  	*/

        $('#main-slider').owlCarousel({
            loop: true,
            nav: true,
            items: 1,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false
        });
        $('.exp-le').owlCarousel({
            loop: true,
            nav: true,
            items: 4,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false
        })

        $('#main-slider').on('translate.owl.carousel', function () {
            $('.slider-text').removeClass('fadeInUp animated').hide();
        });
        $('#main-slider').on('translated.owl.carousel', function () {
            $('.slider-text').addClass('fadeInUp animated').show();
        });

        $('#main-slider').on('translate.owl.carousel', function () {
            $('.slider-img').removeClass('fadeInDown animated').hide();
        });
        $('#main-slider').on('translated.owl.carousel', function () {
            $('.slider-img').addClass('fadeInDown animated').show();
        });

        $('#main-slider').on('translate.owl.carousel', function () {
            $('.slider-img-two').removeClass('fadeInDown animated').hide();
        });
        $('#main-slider').on('translated.owl.carousel', function () {
            $('.slider-img-two').addClass('fadeInDown animated').show();
        });
        
        $('#main-slider').on('translate.owl.carousel', function () {
            $('.slider-countdown').removeClass('fadeInUp animated').hide();
        });
        $('#main-slider').on('translated.owl.carousel', function () {
            $('.slider-countdown').addClass('fadeInUp animated').show();
        });
        
        $('#main-slider').on('translate.owl.carousel', function () {
            $('.cou-slider-img').removeClass('fadeInDown animated').hide();
        });
        $('#main-slider').on('translated.owl.carousel', function () {
            $('.cou-slider-img').addClass('fadeInDown animated').show();
        });        
        
        
        $('#th-main-slider').owlCarousel({
            loop: true,
            margin: 0,
            items: 1
        });



        // ====================================== Product details page ==|
        // ==============================================================|
        $('#im-product-image-slider').lightSlider({
            gallery:true,
            item:1,
            loop:true,
            thumbItem:4,
            slideMargin:0,
			galleryMargin: 15,
            thumbMargin: 15,
            enableDrag: false,
            currentPagerPosition:'left',
            enableTouch:true,
            enableDrag:true,
        });

        // Product Details tab Area 
        $('.im-bd-tab-navbar li a').BLURB_TAB( '.im-bd-tab-content .im-bd-tab-item' );
        
        
        $('.holiday-carousel').owlCarousel({
            loop: true,
            autoplay:true,
            nav: false,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 2
                },
                1550: {
                    items: 4
                }
            }
        })
      
         $('.brand-logo').owlCarousel({
             items: 6,
            loop: true,
            autoplay:true,
            nav: false,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 3
                },
                500: {
                    items: 4
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                },
                1550: {
                    items: 6
                }
            }
        })
        
        $('.fullwidth-carousel').owlCarousel({
            loop: true,
            autoplay:true,
            nav: false,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            margin:30,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1500: {
                    items: 5
                }
            }
        })
        
        
         $('.pro-carousel-start').owlCarousel({
            loop: true,
            autoplay:true,
            nav: false,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 4
                },
                992: {
                    items: 5
                },
                1200: {
                    items: 8
                },
                1500: {
                    items: 11
                }
            }
        })
        
            /*---------------------
                countdown
            --------------------- */
        
        $('[data-countdown]').each(function() {
        var $this = $(this), finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
        $this.html(event.strftime('<span class="cdown day"><span class="time-count separator">%-D</span> <p class="cdown-tex">Days</p>  </span> <span class="cdown hour"><span class="time-count separator">%-H</span> <p class="cdown-tex">Hours</p>  </span> <span class="cdown minutes"><span class="time-count separator">%M</span> <p class="cdown-tex">Min</p>  </span> <span class="cdown"><span class="time-count">%S</span> <p class="cdown-tex">Sec</p> </span>'));
          });
        });	

        $('#product-slider').owlCarousel({
            loop: true,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
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

        $('#product-slider-exta').owlCarousel({
            loop: true,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
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

        $('#product-trending').owlCarousel({
            loop: true,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
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

        $('#product-review').owlCarousel({
            loop: true,
            items: 1,
            dots: false,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            animateOut: 'fadeOut'
        });


        $('.product-view').owlCarousel({
            loop: true,
            nav: false,
            dots: true,
            items: 1
        });
      
         $('.market-rating-wrap').owlCarousel({
            loop: false,
            dots: false,
            nav: false,
            animateOut: 'fadeOut',
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                },
            },
        });

        /*
		====================================
			Home 01 02 Page Slider Section
		====================================
  	*/
        $('#product-slider-two').owlCarousel({
            loop: true,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1200: {
                    items: 4
                }
                ,
                1550: {
                    items: 5
                }
            }
        });
        $('#product-trending-two').owlCarousel({
            loop: true,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1200: {
                    items: 4
                }
                ,
                1550: {
                    items: 5
                }
            }
        });

        /*
		====================================
			Home two Page Slider Section
		====================================
  	*/
        $('#department-list .list-group-item').on('mouseover', function () {
            $(this).addClass('wd-active');
        }).on("mouseout", function () {
            $(this).removeClass('wd-active');
        });

        /*
        	====================
        	Sidebar Drowp Down
        	====================
        */

        $('.sidebar-dropdown').on('mouseover', function () {
            $('.dropdown-sub-menu').addClass('sidebar-dropdown-active');
        }).on('mouseout', function () {
            $('.dropdown-sub-menu').removeClass('sidebar-dropdown-active');
        });


        /*
		====================================
			Shop Page Slider Section
		====================================
  	*/
        $('#shop-slider').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            items: 1,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            smartSpeed: 1000
        })

        $('.sidebar-slider').owlCarousel({
            loop: true,
            nav: true,
            navText: ['<i class=\'fa fa-angle-left\'></i>', '<i class=\'fa fa-angle-right\'></i>'],
            dots: false,
            items: 1
        })

        /*
		=============================================
			Product Details Page Slider Section
		=============================================
  	*/
        $('#lightSlider').lightSlider({
            gallery: true,
            item: 1,
            loop: true,
            slideMargin: 0,
            thumbItem: 5
        });
        

        $('#related-product').owlCarousel({
            loop: false,
            nav: true,
            navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
            dots: false,
            margin: 28,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        })

        /*
		====================================
			Coupon Page Slider Section
		====================================
        */
        
        $('.mark-logo-slider').owlCarousel({
            loop: true,
            nav: false,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            dots: false,
            margin:25,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 5
                }
            }
        })
      
      
 
      
      /* Overlay toggle */
      $(document).on('click', '.compare-cart', function(e) {

        e.preventDefault();
        var mask = '<div class="mask-overlay"></div>';
        $(mask).hide().appendTo('body').fadeIn('fast');
        $('#blurb-compare-bar').addClass('active');
    
           $(document).on('click', '.closeme', function(e) {
            $('#blurb-compare-bar').removeClass('active');
            $('.mask-overlay').remove();
        });
        
           $(document).on('click', '.mask-overlay', function(e) {
            $('#blurb-compare-bar').removeClass('active');
            $('.mask-overlay').remove();
        });
        
    });

        
        /*
        	====================
        	Tooltip
        	====================
        */
        $('[data-toggle=\'tooltip\']').tooltip();

    
        /*
            ====================================
                cat-department
            ====================================
        */
        $('#cat-department').on('click', function () {
          $("#department-list").toggleClass("selected");
        });

        //============= Search   ============ 

        $(".mobile-search-wrap a").on('click', function ( e ) {
            e.preventDefault();
            $(".mobile-search-form").toggleClass("active");
        });

        //============= Mobile Button  ============ 

        $(".accordion-wrapper .mobile-open").on('click', function () {
            $(".mobile-menu").toggleClass("active");
        });

        $(".mobile-menu .closeme").on('click', function () {
            $(this).parents().removeClass("active");
        });

        /*
            ====================================
                Counter
            ====================================
        */

        $('.test-slider-up').owlCarousel({
            loop: true,
            autoplay: true,
            items: 1,
            nav: false,
            dots: false,
            autoplayHoverPause: true,
            animateOut: 'slideOutUp',
            animateIn: 'slideInUp'
        })


        /*
		====================================
			Sticky Nav
		====================================
  	*/     
        
    if ($(window).width() >= 992) {
            $('.sticker-nav').sticky({
                topSpacing: 0
            });
        }
        
    if ($(window).width() < 992) {
            $('.mob-sticky').sticky({
                topSpacing: 0
            });
        }
    if ($(window).width() < 1200) {
        $('.combine_header .mob-sticky').sticky({
            topSpacing: 0
        });
    }


        /*
		====================================
			onePageNav
		====================================
  	*/
        $('#nav').onePageNav();
        
        $.scrollUp( {
            scrollText: '<i class=\'fa fa-angle-double-up\' aria-hidden=\'true\'></i>',
            scrollDistance: 1800,
            scrollSpeed: 500,
            animation: 'fade',
            animationInSpeed: 500, // Animation in speed (ms)
            animationOutSpeed: 500,
        });

       	function animateElements() {
			$('.progressbar').each(function () {
				var elementPos = $(this).offset().top;
				var topOfWindow = $(window).scrollTop();
				var percent = $(this).find('.circle').attr('data-percent');
				var percentage = parseInt(percent, 10) / parseInt(100, 10);
				var animate = $(this).data('animate');
				if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
					$(this).data('animate', true);
					$(this).find('.circle').circleProgress({
						startAngle: -Math.PI / 2,
						value: percent / 100,
						size: 300,
						thickness: 20,
						emptyFill: "rgba(0,0,0, .2)",
						fill: {
							color: '#ff9800'
						}
					}).on('circle-animation-progress', function (event, progress, stepValue) {
						$(this).find('div').text((stepValue*100).toFixed(1) + "%");
					}).stop();
				}
			});
		}

		// Show animated elements
		animateElements();
		$(window).scroll(animateElements);





    }); // DOM Ready

    
    

}(jQuery)); // IIFE