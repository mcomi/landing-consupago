var headerOptions = document.querySelectorAll('.header-calculate-options');
var cotizadorOptions = document.querySelectorAll('.option-calc');

headerOptions.forEach(option => option.addEventListener('click', function(){
  var id = option.dataset.option;
  // me muevo hacia el cotizador
  $('html, body').animate({ scrollTop: $('#cotizador').offset().top }, 'slow');
  // remuevo la clase active
  cotizadorOptions.forEach(opcion => {
    if(opcion.classList.contains('active')) {
      if(opcion.id != id)
        opcion.classList.remove('active');
    }
    if(opcion.id == id) opcion.classList.add('active');
  })
  // selecciono la opcion para el cotizador
  changeValuesForOption (id);
}));

var tituloPregunta = document.getElementById('question-option');

function changeValuesForOption (option) {
  switch (option) {
    case 'valor':
      tituloPregunta.innerHTML = '¿Cuál es el valor de la vivienda?';
      break;
    case 'monto':
      tituloPregunta.innerHTML = '¿Cuál es el monto que necesitas?';
      break;
    case 'ingreso':
      tituloPregunta.innerHTML = '¿Cuál es tu ingreso neto mensual?';
      break;
    case 'pago':
      tituloPregunta.innerHTML = '¿Cuanto pagarías mensualmente?';
      break;
    default:
      break;
  }
}

// modal infonavit/fovissste
const linksOptions = document.querySelectorAll('.scrollmenu a');
linksOptions.forEach(option => option.addEventListener('click', toggleActive));

function toggleActive() {
  linksOptions.forEach(option => {
    if(option.classList.contains('active')) option.classList.remove('active')
  });
  this.classList.add('active')
}

// modal folio
var olvideFolioLink = document.getElementById('olvide-folio-link');
var tituloModal = document.getElementById('modal-folio-titulo');
olvideFolioLink.addEventListener('click', function(){
  tituloModal.innerHTML = 'Olvide mi folio';
  document.getElementById('ingresa-folio').classList.add('hidden');
  document.getElementById('olvide-folio').classList.remove('hidden');
})
