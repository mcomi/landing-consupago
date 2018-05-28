$.fn.exists = function() {
  return this.length > 0;
}

$('.single-slider').jRange({
    from: 5000,
    to: 50000,
    step: 1,
    scale: [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000],
    format: '%s $',
    showLabels: true,
    snap: true
});

$(document).scroll(function () {
  var $nav = $(".navbar-fixed-top");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});