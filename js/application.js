
$(document).ready(function(){
    init();
});

function init(){
    //load global navigation
    $('#main-nav').load('/includes/nav.html', function(){
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
    $('footer').load('/includes/footer.html', function(){
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
    $('#main-content').load('/includes/home-content.html', function(){
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
    $('#main-content').load('/includes/create-content.html', function(){

    });
}