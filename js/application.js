
$(document).ready(function(){
    init();
});

function init(){
    //load global navigation
    $('#main-nav').load('../includes/nav.html', function(){
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
    $('footer').load('../includes/footer.html', function(){
        $('.currentYear').text((new Date()).getFullYear());
    });
    //update page
    updatePage();
}

function updatePage(){
    var href = window.location.href;
    if (href.indexOf('?create') > 0){ updateCreatePage(); }
    else { updateHomePage(); }
}

function updateHomePage(){
    //load home page content
    $('#main-content').load('../includes/home-content.html', function(){
        /* header carousel */
        $('.owl-carousel.home').owlCarousel({
            animateOut: 'fadeOut',
            autoplay: true,
            autoplayTimeout: 750,
            items: 1,
            loop: true,
            mouseDrag: false,
            touchDrag: false,
            dots: false
        });
        /* palette carousel */
        $('.owl-carousel.palette').owlCarousel({
            items: 1,
            loop: true,
            dots: false,
            nav: true
        });
    });
}

function updateCreatePage(){
    //load create page content
    $('#main-content').load('../includes/create-content.html', function(){
        //Import texture data from JSON file
        $.getJSON('/texture-data.json', function(data){
            window.textureData = data;
            window.parsedURL = parseURL();
            updateScheme();
        });
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
    var panel_a =   list["panel-a"]     || "serengeti";
    var panel_b =   list["panel-b"]     || "sunset-brown";
    var couch =     list["couch"]       || "saddle";
    var cabinet =   list["cabinet"]     || "mahogany";
    var headboard = list["headboard"]   || "camel";
    var scheme =    list["scheme"]      || "none";
    var scheme_title = "Custom Color Scheme";
    var description = "The color panel you chose does not exist."

    //update title & description if it matches an existing panel
    if (window.textureData["textures"]["panels"][panel_a] != null){
        scheme_title = window.textureData["textures"]["panels"][panel_a]["displayName"] || "undefined";
        description = window.textureData["textures"]["panels"][panel_a]["description"] || "undefined";
    }

    //update page content
    $('#scheme-title').text(scheme_title);
    $('#description').text(description);
    
    //apply classes with to unique texture ids
    $('.create #panel-a').attr('class', 'texture '+panel_a+'-panel');
    $('.create #panel-b').attr('class', 'texture '+panel_b+'-panel');
    $('.create #couch').attr('class', 'texture '+couch+'-couch');
    $('.create #cabinet').attr('class', 'texture '+cabinet+'-cabinet');
    $('.create #headboard').attr('class', 'texture '+headboard+'-headboard');
}