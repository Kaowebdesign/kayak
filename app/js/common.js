$(document).ready(function() {
    var mainSlider =  $("#mainSlider"),
    aboutSlider = $('#aboutSlider');
    mainSlider.owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        // autoplay:true,
        // autoplayTimeout:5000,
        animateOut: 'fadeOut'
    });
    aboutSlider.owlCarousel({
        items: 4,
        dots: false,
        nav: true,
        loop: true,
        autoplay:true,
        autoplayTimeout:5000
    });
    $('.arrowBtn_prev').on('click',function(e){
        e.preventDefault();
        mainSlider.trigger('prev.owl.carousel', [300]);
    });
    $('.arrowBtn_next').on('click',function(e){
        e.preventDefault();
        mainSlider.trigger('next.owl.carousel', [300]);
    });
    $('.about-left').on('click',function(e){
        e.preventDefault();
        aboutSlider.trigger('prev.owl.carousel', [300]);
    });
    $('.about-right').on('click',function(e){
        e.preventDefault();
        aboutSlider.trigger('next.owl.carousel', [300]);
    });
});