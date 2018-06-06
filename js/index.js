var monto12Meses = $('#12-meses');
var monto24Meses = $('#24-meses');
var monto36Meses = $('#36-meses');
var monto48Meses = $('#48-meses');

$.fn.exists = function() {
  return this.length > 0;
}

if ($('#celular').exists()) {

  let cleave = new Cleave('#celular', {
    phone: true,
    phoneRegionCode: 'MX'
  });

  let celCheck = new Cleave('#celular-check', {
    phone: true,
    phoneRegionCode: 'MX'
  })
}

var formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
});

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
    monto12Meses.html(formatter.format((monto / 12).toFixed(2)));
    monto24Meses.html(formatter.format((monto / 24).toFixed(2)));
    monto36Meses.html(formatter.format((monto / 36).toFixed(2)));
    monto48Meses.html(formatter.format((monto / 48).toFixed(2)));
}

$(document).scroll(function () {
  var $nav = $(".navbar-fixed-top");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});



const boxesPagoPorMes = $('.pago-por-mes')
boxesPagoPorMes.each(function() {
    let box = $(this);
    box.click(function(){
      boxesPagoPorMes.each(function(){
        $(this).removeClass('active');
      })
      $(this).addClass('active');
      var valorMeses = $(this).find('span').attr('id');  // obtengo el valor de meses elegidos
    })
  });

  $(".step-img").hover(function(){
    $(this).addClass('animated pulse');
});
$(".step-img").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){
    $(this).removeClass('animated pulse');
});

$(".icon-item").hover(function(){
  $(this).addClass('animated pulse');
});
$(".icon-item").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){
  $(this).removeClass('animated pulse');
});

$('#btnSolicitarOfertas').click(function (e){
  e.preventDefault();
  $('#loader-phone-message').removeClass('hidden');
  $(this).hide();
  setTimeout(function(){
    $('#loader-phone-message').addClass('hidden');
    $('#phone-message-alert').removeClass('hidden');
    $('.code-submit').removeClass('hidden');
    $('#btnContinuar').removeClass('hidden');
  }, 3000)
});

$(".code-input").bind('keyup', function() {
  var indexInput = 0;
  var value = $(this).val()
  var regex = /^\d+$/
  if (regex.test(value)) {
    if (indexInput < 5)
      $(this).next().focus()
    indexInput++
  }
});
