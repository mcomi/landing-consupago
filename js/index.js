var monto12Meses = $('#12-meses');
var monto24Meses = $('#24-meses');
var monto36Meses = $('#36-meses');
var monto48Meses = $('#48-meses');

// Detect Mobile Devices
var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

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
  arrows: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '110px'
      }
    }
  ]
});

$('.slider-nav-pagos').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  centerPadding: '60px',
  infinite: false,
  arrows: true,
  focusOnSelect: false,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '110px'
      }
    }
  ]
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
  $('#celular').prop( "disabled", true );
  setTimeout(function(){
    $('#loader-phone-message').addClass('hidden');
    // $('#celular')
    $('#phone-message-alert').removeClass('hidden');
    $('.code-submit').removeClass('hidden');
    $('#btnContinuar').removeClass('hidden');
    if( isMobile.any() ) $('.wrapper').css('min-height','248vh')
    if(!isMobile.any()) $('.wrapper').css('min-height','190vh')
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


const menuLinks = $('#desktop-menu a');

menuLinks.each(function(index) {
  let menuItem = $(this);
  menuItem.click(function(e){
    e.preventDefault()
    let section = this.getAttribute("href");
    $('html, body').animate({ scrollTop: $(section).offset().top }, 'slow');
  })

});

$( "input[name='dependencia']" ).click(function(){
      var clone = $(this).parent().clone();
      clone.appendTo('#eleccion-dependencia');
      clone.removeClass('col-xs-6, col-md-2')
      $('#eleccion-dependencia').removeClass('hidden')
      $('#dependencias-container').addClass('hidden')
})

$('#btn-cambiar-dependencia').click(function(){
  $('#eleccion-dependencia').find('div').remove()
  $('#eleccion-dependencia').addClass('hidden')
  $('#dependencias-container').removeClass('hidden')
})

$('#btn-cambiar-telefono').click(function(){
  var timeleft = 15;
  var downloadTimer = setInterval(function(){
  document.getElementById("counter").innerHTML = 'En ' + (--timeleft) + ' segundos podrás cambiar el teléfono';
  if(timeleft <= 0){
    document.getElementById("counter").innerHTML = '';
    clearInterval(downloadTimer);
    $('#phone-message-alert').addClass('hidden');
    $('.code-submit').addClass('hidden');
    $('#btnContinuar').addClass('hidden');
    $('#btnSolicitarOfertas').show()
    $('#celular').prop( "disabled", false );
  }
    
},1000);

})
