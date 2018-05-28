var monto12Meses = $('#12-meses');
var monto24Meses = $('#24-meses');
var monto36Meses = $('#36-meses');
var monto48Meses = $('#48-meses');

$.fn.exists = function() {
  return this.length > 0;
}

$('.single-slider').jRange({
    from: 5000,
    to: 50000,
    step: 1,
    scale: ['$5,000', '$10,000', '$15,000', '$20,000', '$25,000', '$30,000', '$35,000', '$40,000', '$45,000', '$50,000'],
    format: '$ %s',
    width: 460,
    showLabels: true,
    snap: true,
    onstatechange: function(monto){
      calculaMensualidades(monto);
    }
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