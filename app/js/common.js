$(document).ready(function() {
    let mainSlider =  $("#mainSlider");
    mainSlider.owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        // autoplay:true,
        // autoplayTimeout:5000,
        animateOut: 'fadeOut'
    });
    $('.arrowBtn_prev').on('click',function(e){
        e.preventDefault();
        mainSlider.trigger('prev.owl.carousel', [300]);
    });
    $('.arrowBtn_next').on('click',function(e){
        e.preventDefault();
        mainSlider.trigger('next.owl.carousel', [300]);
    });
});