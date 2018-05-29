var monto12Meses = $('#12-meses');
var monto24Meses = $('#24-meses');
var monto36Meses = $('#36-meses');
var monto48Meses = $('#48-meses');

$.fn.exists = function() {
  return this.length > 0;
}

$('.slider-nav').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  centerMode: true,
  centerPadding: '60px',
  infinite: false,
  arrows: false,
  focusOnSelect: true
});

$('.slider-nav').on('afterChange', function(event, slick, currentSlide, nextSlide){
  var monto = $(slick.$slides[currentSlide]).find('h3')[0].innerHTML;
  var montoNumerico = monto.match(/\d/g);
  montoNumerico = montoNumerico.join("");
  console.log(montoNumerico)
  calculaMensualidades(montoNumerico)
});

function calculaMensualidades(val){
    var monto = parseInt(val);
    monto12Meses.html(Math.round((monto / 12), 2));
    monto24Meses.html(Math.round((monto / 24), 2));
    monto36Meses.html(Math.round((monto / 36), 2));
    monto48Meses.html(Math.round((monto / 48), 2));
}

$(document).scroll(function () {
  var $nav = $(".navbar-fixed-top");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});