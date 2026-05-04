(function( $ ) {
	'use strict';

	function isURL(url) {
		var urlPattern = new RegExp('^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$');
  		// var urlPattern  = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  		return urlPattern.test(url);
	
	}

	$(document).on('click', '.sl-button', function() {
		var button 	   = $(this),
			post_id    = button.attr('data-post-id'),
			type       = button.attr('data-type'),
			allbuttons;

		if (type === 'comment') {
			allbuttons = $('.sl-comment-button-'+post_id);
		}else if(type == 'wish') {
			allbuttons = $('.sl-wish-'+post_id);
		}else if(type == 'compare') {
			allbuttons = $('.sl-compare-'+post_id);
		}else if(type == 'coupon') {
			allbuttons = $('.sl-coupon-'+post_id);
		}else{
			allbuttons = $('.sl-button-'+post_id);
		}

		var wishList = $('.header-wishlist .count'),
			compare  = $('.compare-cart .count'),
			coupon   = $('.coupon-save .count'),
			loader	   = allbuttons.next('.sl-loader');

		if (post_id !== '') {
			$.ajax({
				type: 'POST',
				url: simpleLikes.ajaxurl,
				data : {
					action : 'process_simple_like',
					post_id : post_id,
					type : type,
					icon : button.attr('data-icon'),
					counter : button.attr('data-counter'),
					nonce : button.attr('data-nonce'),
				},
				beforeSend:function(response){
					if (type == 'compare') {
						loader.html('<div class="loader"><img src="'+ simpleLikes.url +'/assets/images/sl/loading.gif" ></div>');
					}
				},	
				success: function(response){
					var icon = response.icon,
						count = response.count,	
						total_count = response.total_count;					
					if (type == 'wish' || type == 'coupon') {
						allbuttons.html(icon);						
					}else {
						allbuttons.html(icon+count);						
					}
					if(response.status === 'unliked') {
						if ( type == 'wish') {
							allbuttons.prop('title', 'Add wish');
						}else if ( type == 'compare') {
							allbuttons.prop('title', 'Add compare');
						}else if ( type == 'coupon') {
							allbuttons.prop('title', 'Add coupon');
						}else {
							var like_text = simpleLikes.like;
							allbuttons.prop('title', like_text);
						}
						allbuttons.removeClass('liked');
					} else {
						if ( type == 'wish') {
							allbuttons.prop('title', 'Remove wish');
						}else if ( type == 'compare') {
							allbuttons.prop('title', 'Remove compare');
						}else if ( type == 'coupon') {
							allbuttons.prop('title', 'Remove coupon');
						}else {
							var unlike_text = simpleLikes.unlike;
							allbuttons.prop('title', unlike_text);
						}						
						allbuttons.addClass('liked');
					}
					
					if( typeof(total_count) != "undefined" && total_count !== null && type == 'wish') {
						wishList.text(total_count);
					}					
					if( typeof(total_count) != "undefined" && total_count !== null && type == 'compare') {
						compare.text(total_count);
					}
					if( typeof(total_count) != "undefined" && total_count !== null && type == 'coupon') {
						coupon.text(total_count);
					}
					if (type == 'compare') {
						$('#blurb-compare-bar').html(response.comparing);
					}					
					loader.empty();					
				}
				
			});
			
		}
		return false;
	});

	
})( jQuery );