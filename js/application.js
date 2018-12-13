
$(document).ready(function(){
	init();
});

function init(){
	//load global navigation
	$('#main-nav').load('./includes/nav.html', function(){
		//toggle mobile menu
		$('#toggle-menu').on('click', function(e){
			e.preventDefault();
			var attr = 'aria-expanded';
			var toggle = $(this).attr(attr) == "true" ? true : false;
			$(this).attr(attr, !toggle);
			$(this).next('ul').attr(attr, !toggle)
		});
		//animate logo on load
		$('nav .logo').addClass('animate');
	});
	//load global footer
	$('footer').load('./includes/footer.html', function(){
		$('.currentYear').text((new Date()).getFullYear());
	});
	//update page
	updatePage();
}

function updatePage(){
	var href = window.location.href;
	if (href.indexOf('?create') > 0){ updateCreatePage(); }
	else if (href.indexOf('schemes.html') > 0){ updateSchemesPage(); }
	else if (href.indexOf('solution.html') > 0){ updateSolutionPage(); }
	else if (href.indexOf('contact.html') > 0){ updateContactPage(); }
	else { updateHomePage(); }
}

function updateHomePage(){
	//load home page content
	$('#main-content').load('./includes/page-home.html', function(){
		/* header carousel */
		$('.owl-carousel.home').owlCarousel({
			animateOut: 'fadeOut',
			autoplay: true,
			autoplayTimeout: 1500,
			items: 1,
			loop: true,
			mouseDrag: false,
			touchDrag: false,
			dots: false
		});
		/* palette carousel */
		$('.owl-carousel.color-palette').owlCarousel({
			items: 1,
			loop: true,
			dots: false,
			nav: true
		});
	});
}

function updateCreatePage(){
	//load create page content
	$('#main-content').load('./includes/page-create.html', function(){
		//Import texture data from JSON file
		$.getJSON('./textures.json', function(data){
			window.textureData = data;
			window.parsedURL = parseURL();
			updateEmailLink();
			updateScheme();
			initControls();
		});
	});
}

function updateSchemesPage(){
	//load schemes page content
	$('#main-content').load('./includes/page-schemes.html', function(){
		//Import texture data from JSON file
		$.getJSON('./textures.json', function(data){
			window.textureData = data;
			addSchemes()
		});
	});
}

function updateSolutionPage(){
	//load schemes page content
	$('#main-content').load('./includes/page-solution.html', function(){
		//Import texture data from JSON file
		$('.solution .owl-carousel.animation').owlCarousel({
			animateOut: 'fadeOut',
			autoplay: true,
			autoplayTimeout: 2500,
			items: 1,
			loop: true,
			mouseDrag: false,
			touchDrag: false,
			dots: false,
			nav: true
		});
		$('.solution.storage .owl-carousel').owlCarousel({ autoplayTimeout: 1000, animateOut: 'fadeOut', autoplay: true, items: 1, loop: true, mouseDrag: false, touchDrag: false, dots: false });
		$('.solution .owl-carousel.tile-1').owlCarousel({ autoplayTimeout: 4500, animateOut: 'fadeOut', autoplay: true, items: 1, loop: true, mouseDrag: false, touchDrag: false, dots: false });
		$('.solution .owl-carousel.tile-2').owlCarousel({ autoplayTimeout: 7500, animateOut: 'fadeOut', autoplay: true, items: 1, loop: true, mouseDrag: false, touchDrag: false, dots: false });
		$('.solution .owl-carousel.tile-3').owlCarousel({ autoplayTimeout: 6000, animateOut: 'fadeOut', autoplay: true, items: 1, loop: true, mouseDrag: false, touchDrag: false, dots: false });
		$('.solution .owl-carousel.tile-4').owlCarousel({ autoplayTimeout: 5000, animateOut: 'fadeOut', autoplay: true, items: 1, loop: true, mouseDrag: false, touchDrag: false, dots: false });
		$('.solution .owl-carousel.tile-5').owlCarousel({ autoplayTimeout: 6500, animateOut: 'fadeOut', autoplay: true, items: 1, loop: true, mouseDrag: false, touchDrag: false, dots: false });
		$('.solution .owl-carousel.tile-6').owlCarousel({ autoplayTimeout: 7000, animateOut: 'fadeOut', autoplay: true, items: 1, loop: true, mouseDrag: false, touchDrag: false, dots: false });
	});
}

function updateContactPage(){
	$('#main-content').load('./includes/page-contact.html', function(){
		
	});
}

function parseURL(){
	//convert url into keys
	var href = window.location.href;
	var parameters = href.substring(href.indexOf('?')+1).split('&');
	paramList = [];
	for (var i=0; i < parameters.length; i++){
		var result = parameters[i].split("=");
		if (result.length > 1){
			var key = result[0];
			var val = result[1];
			paramList[key] = val;
		}
	}
	return paramList;
}

function updateScheme(){
	//use list or default value from global parsed URL
	var list = window.parsedURL;
	var panel_a =   list["panel-a"]     || "undefined";
	var panel_b =   list["panel-b"]     || "undefined";
	var couch =     list["couch"]       || "undefined";
	var cabinet =   list["cabinet"]     || "undefined";
	var headboard = list["headboard"]   || "undefined";
	var scheme =    list["scheme"]      || "undefined";
	var error =  "error: ";
	var panel_a_text = window.textureData["textures"]["panels"][panel_a];
	var panel_b_text = window.textureData["textures"]["panels"][panel_b];
	var couch_text = window.textureData["textures"]["couches"][couch];
	var cabinet_text = window.textureData["textures"]["cabinets"][cabinet];
	var headboard_text = window.textureData["textures"]["headboards"][headboard];
	var scheme_title = "Custom Color Scheme";
	var description = "";

	//update tile if scheme exists
	if (window.textureData["schemes"][scheme] != null){
		scheme_title = window.textureData["schemes"][scheme]["displayName"] || "undefined";
		description = window.textureData["schemes"][scheme]["description"] || panel_a_text["description"];
	}

	//update page content
	$('#scheme-title').text(scheme_title);
	$('#description').text(description);
	
	//apply classes with to unique texture ids
	$('.create .panel-a').attr('class', 'panel-a texture panels '+panel_a);
	$('.create .panel-b').attr('class', 'panel-b texture panels '+panel_b);
	$('.create .couch').attr('class', 'couch texture couches '+couch);
	$('.create .cabinet').attr('class', 'cabinet texture cabinets '+cabinet);
	$('.create .headboard').attr('class', 'headboard texture headboards '+headboard);

	//update captions
	$('.create .panel-a .title').text(panel_a_text != null ? panel_a_text["displayName"] : error + panel_a);
	$('.create .panel-b .title').text(panel_b_text != null ? panel_b_text["displayName"] : error + panel_b);
	$('.create .couch .title').text(couch_text != null ? couch_text["displayName"] : error + couch);
	$('.create .cabinet .title').text(cabinet_text != null ? cabinet_text["displayName"] : error + cabinet);
	$('.create .headboard .title').text(headboard_text != null ? headboard_text["displayName"] : error + headboard);
}

function addSchemes(){
	//add all schemes from global texture JSON
	var s = window.textureData['schemes'];
	var row = $('.schemes .row.container');
	
	for (var key in s) {
		if (s.hasOwnProperty(key)) {
			var scheme = key;
			var title = s[key]["displayName"];
			var panel_a = s[key]["panel-a"];
			var panel_b = s[key]["panel-b"];
			var couch = s[key]["couch"];
			var cabinet = s[key]["cabinet"];
			var headboard = s[key]["headboard"];
			var href = createURL(panel_a, panel_b, couch, cabinet, headboard, scheme)
			
			//append column html
			row.append(
				'<div class="col-4">'+
					'<div class="palette small">'+
						'<h2 class="title">'+title+'</h2>'+
						'<a href="'+href+'" class="grid">'+
							'<div class="panel-a texture panels '+panel_a+'"></div>'+
							'<div class="panel-b texture panels '+panel_b+'"></div>'+
							'<div class="couch texture couches '+couch+'"></div>'+
							'<div class="cabinet texture cabinets '+cabinet+'"></div>'+
							'<div class="headboard texture headboards '+headboard+'"></div>'+
						'</a>'+
						'<div class="cta">'+
							'<a class="view" href="'+href+'"> view colors</a>'+
							'<a class="customize" href="'+href+'"> customize</a>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
		}
	}
	row.append(
		'<div class="col-4 last-item">'+
			'<div>'+
				'<a class="btn" href="index.html?create&panel-a=serengeti&panel-b=sunset-brown&couch=saddle&cabinet=mahogany&headboard=mica&scheme=serengeti">'+
					'Create Your Own Scheme'+
				'</a>'+
			'</div>'+
		'</div>'
	);
}

function createURL(panel_a, panel_b, couch, cabinet, headboard, scheme){
	return "index.html?create"+
		"&panel-a="+panel_a+
		"&panel-b="+panel_b+
		"&couch="+couch+
		"&cabinet="+cabinet+
		"&headboard="+headboard+
		"&scheme="+scheme;
}

function initControls(){
	//add listener for 'customize scheme' button
	$('#customize-scheme').on('click', function(e){
		e.preventDefault();
		$('.palette').addClass('editing');
		$('.palette').parent().append($('#email-scheme'));
		//TODO: Update title and description to custom text
		
		$(this).parent().load('./includes/page-create-controls.html', function(){
			//initiate options carousel
			$('.controls').fadeIn();
			var t = window.textureData['textures'];
			var carousels = '';

			//loop through all categories and create 4-image items per carousel
			for (var category in t){
				var i = 0; //used to place 4 thumbs per item
				var length = Object.size(t[category]);
				carousels += '<div class="owl-carousel" id="'+category+'-options">'; //start carousel
				//loop through all textures within category
				for (var texture in t[category]){
					if (i % 4 == 0) carousels += '<div class="item">'; //start item
					//carousels += '<div class="thumb texture '+category+' '+texture+'"></div>';
					carousels += '<a class="thumb" href="#" name="'+texture+'">';
					carousels +=    '<div class="image texture '+category+' '+texture+'"></div>';
					carousels +=    '<div class="text">'+t[category][texture]["displayName"]+'</div>';
					carousels += '</a>';
					i++; //increment quad counter
					if (i % 4 == 0 || i == length) carousels += '</div>'; //close item
				}
				i = 0; //reset item group index
				carousels += '</div>'; //close carousel
			}

			//initialize carousels
			$('.controls .carousels').html(carousels).ready(function(){
				//init each carousel
				$('.controls .carousels .owl-carousel').owlCarousel({ items: 1, loop: false, dots: false, nav: true, rewind: true });
				//append empty popup
				$('body').append(
					'<div id="popup" aria-hidden="true">'+
						'<div class="popup-content">'+
							'<div class="image"></div>'+
							'<div class="text"></div>'+
							'<a class="btn cancel" href="#">cancel</a>'+
							'<a class="btn select" href="#">select</a>'+
						'</div>'+
					'</div>'
				);

				//add listeners for thumb items
				$('.owl-carousel .thumb').on('click', function(e){
					e.preventDefault();
					var category = $('.carousels [data-selected]').closest('.owl-carousel').attr('id').replace('-options','');
					var name = $(this).attr('name');
					var description = t[category][name]['description'];

					//update popup content
					$('#popup .image').attr('class', 'image texture '+category+' '+name);
					$('#popup .image').attr('for', name);
					$('#popup .text').text(description);
					$('#popup').attr('aria-hidden', false);
				});

				//add listeners for popup cancel actions
				$('#popup .cancel').on('click', function(e){
					e.preventDefault();
					$(this).closest('#popup').attr('aria-hidden', true);
				});
				
				//add listeners for popup select actions
				$('#popup .select').on('click', function(e){
					e.preventDefault();
					
					//update selected textures
					var name = $('#popup .image').attr('for');
					var group = $('.categories a:visible').attr('id').replace('-option','');
					var carousel = $('.categories a:visible').attr('for');
					var category = carousel.replace('-options','');
					$('[data-selected]').removeAttr('data-selected'); //clear selected
					$('.palette [data-group="' + group + '"]').attr('class', group + ' texture ' + category + ' '+name);
					$('.palette [data-group="' + group + '"]').attr('data-selected', true);
					$('.palette [data-group="' + group + '"] .title').text(t[category][name]['displayName']);
					$('#' + carousel + ' [name="' + name + '"]').attr('data-selected', true);
					$(this).closest('#popup').attr('aria-hidden', true);
				});
			});

			//add listener for 'categories'
			$('.categories a').on('click', function(e){
				e.preventDefault();
				//update page content
				$('.categories').children().fadeOut();
				$('.carousels').children().fadeOut();
				$('.categories #'+$(this).attr('id')).fadeIn();
				$('.carousels #'+$(this).attr('for')).fadeIn();
				$('.options').children().fadeOut();
				$('.options').children().fadeIn();
				$('[data-selected]').removeAttr('data-selected');

				//set active thumb
				var list = window.parsedURL;
				var carousel = $(this).attr('for');
				var thumb = $(this).attr('id').replace('-option','');
				$('#'+carousel+' [name="'+list[thumb]+'"]').attr('data-selected', true);
				$('#'+carousel).trigger('to.owl.carousel', $('[data-selected]').closest('.owl-item').index());

				//set active category
				$('.palette .'+thumb).attr('data-selected', true);
			});

			//add additional listeners for 'categories' buttons
			$('.palette [data-group]').on('click', function(e){
				$('.options #cancel-option').click();
				$('#'+$(this).attr('data-group') + '-option').click();
			});

			//add listener for cancel button
			$('.options #cancel-option').on('click', function(e){
				e.preventDefault();
				var group = $('.categories a:visible').attr('id').replace('-option','');
				var name = window.parsedURL[group];
				var category = $('.categories a:visible').attr('for').replace('-options','');

				//revert details
				$('.palette [data-group="' + group + '"]').attr('class', group + ' texture ' + category + ' '+name);
				$('.palette [data-group="' + group + '"] .title').text(t[category][name]['displayName']);

				//update page content
				$('.options').children().fadeOut();
				$('.options').children().fadeOut();
				$('.categories').children().fadeIn();
				$('.carousels').children().fadeOut();
				$('[data-selected]').removeAttr('data-selected');
			});

			//add listener for accept button
			$('.options #accept-option').on('click', function(e){
				e.preventDefault();
				var group = $('.categories a:visible').attr('id').replace('-option','');
				var name = $('#popup .image').attr('for');
				window.parsedURL[group] = name;
				window.parsedURL['scheme'] = "custom";

				//update page content
				$('.options').children().fadeOut();
				$('.options').children().fadeOut();
				$('.categories').children().fadeIn();
				$('.carousels').children().fadeOut();
				$('[data-selected]').removeAttr('data-selected');

				//update create page
				$('#scheme-title').text('Custom Color Scheme');
				$('#description').text('');
				updateEmailLink();
			});
		});
	});
}

function updateEmailLink(){
	var scheme = window.parsedURL['scheme'];
	var panel_a = window.parsedURL['panel-a'];
	var panel_b = window.parsedURL['panel-b'];
	var couch = window.parsedURL['couch'];
	var cabinet = window.parsedURL['cabinet'];
	var headboard = window.parsedURL['headboard'];
	var url = window.location.href;
	var href = createURL(panel_a, panel_b, couch, cabinet, headboard, scheme);
	var root = window.location.href.substring(0, url.indexOf('index.html'));
	window.history.pushState({}, null, href);
	href = root + href;
	$('#email-scheme').attr('href', 'mailto:?subject=Sonnovita Color Scheme&body=Sonnovita Color Scheme:%0D%0A%0D%0A'+href.replaceAll('&','%26'));
}

/* tools */
Object.size = function(obj) { var size = 0, key; for (key in obj) { if (obj.hasOwnProperty(key)) size++; } return size; };
String.prototype.replaceAll = function(search, replacement) { var target = this; return target.split(search).join(replacement); };