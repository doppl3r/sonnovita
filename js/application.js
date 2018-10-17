
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
    else { updateHomePage(); }
}

function updateHomePage(){
    //load home page content
    $('#main-content').load('./includes/page-home.html', function(){
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
        $.getJSON('./texture-data.json', function(data){
            window.textureData = data;
            window.parsedURL = parseURL();
            updateScheme();
        });
    });
}

function updateSchemesPage(){
    //load schemes page content
    $('#main-content').load('./includes/page-schemes.html', function(){
        //Import texture data from JSON file
        $.getJSON('./texture-data.json', function(data){
            window.textureData = data;
            addSchemes()
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
    var scheme_title = window.textureData["schemes"][scheme]["displayName"] || "undefined";
    var description = window.textureData["schemes"][scheme]["description"] || panel_a_text["description"];

    //update page content
    $('#scheme-title').text(scheme_title);
    $('#description').text(description);
    
    //apply classes with to unique texture ids
    $('.create .panel-a').attr('class', 'panel-a texture '+panel_a+'-panel');
    $('.create .panel-b').attr('class', 'panel-b texture '+panel_b+'-panel');
    $('.create .couch').attr('class', 'couch texture '+couch+'-couch');
    $('.create .cabinet').attr('class', 'cabinet texture '+cabinet+'-cabinet');
    $('.create .headboard').attr('class', 'headboard texture '+headboard+'-headboard');

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
                        '<div class="grid">'+
                            '<div class="panel-a texture '+panel_a+'-panel"></div>'+
                            '<div class="panel-b texture '+panel_b+'-panel"></div>'+
                            '<div class="couch texture '+couch+'-couch"></div>'+
                            '<div class="cabinet texture '+cabinet+'-cabinet"></div>'+
                            '<div class="headboard texture '+headboard+'-headboard"></div>'+
                        '</div>'+
                        '<div class="cta">'+
                            '<a class="view" href="'+href+'"> view colors</a>'+
                            '<a class="customize" href="'+href+'"> customize</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'
            );
        }
    }
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