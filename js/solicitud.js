
$(function() {

  $.fn.editable.defaults.mode = 'inline';
  $('#username').editable();
});
var $steps = $('.step');
var $menuSteps = $('.menu-step');
  var currentStep = 0,
      nextStep;
  $menuSteps.eq(0).addClass('active'); // active first menu
  $steps.slice(1).hide(); //hide all but first
  $('#enviar').hide()

  $('#next').on('click', function(e) {
    e.preventDefault();

    nextStep = currentStep + 1;
    $($steps.get(currentStep)).hide();
    $($steps.get(nextStep)).show();
    $($menuSteps.get(currentStep)).removeClass('active');
    $($menuSteps.get(nextStep)).addClass('active');
    if (nextStep == 4) {
      $('#next').hide()
      $('#enviar').show()
      return;
    }else{
      $('#next').show()
    }
    currentStep = nextStep;
    window.scrollTo(0, 0);
  });

  $('#prev').on('click', function(e) {
    e.preventDefault();
    if(currentStep==0){
      $('#prev').attr('disabled',true)
      return
    }
    nextStep = currentStep - 1;

    $($steps.get(currentStep)).hide();
    $($steps.get(nextStep)).show();
    $($menuSteps.get(currentStep)).removeClass('active');
    $($menuSteps.get(nextStep)).addClass('active');
    if (nextStep == 0) {
      $('#prev').attr('disabled',true)
      return;
    }
    $('#prev').attr('disabled',false)
    currentStep = nextStep;
  });

$('#fecha_nac').combodate();
$('#fecha_nac_ca').combodate();

$('#ingreso_mensual').on('change',formatCurrency)

function formatCurrency() {
  //number-format the user input
  this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

$.fn.exists = function() {
  return this.length > 0;
}

var valid = true;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 $('#icon-webcam').addClass('hidden');
 $('#icon-pc').addClass('hidden');
 $('#title-upload-celular').removeClass('hidden')
}else{
  $('#title-upload-pc').removeClass('hidden')
  $('#icon-smarthphone').addClass('hidden');
}

const linksOptions = document.querySelectorAll('.scrollmenu a');
linksOptions.forEach(option => option.addEventListener('click', toggleActive));

function toggleActive() {
  linksOptions.forEach(option => {
    if(option.classList.contains('active')) option.classList.remove('active')
  });
  this.classList.add('active')
}

// valida
function checkInputs() {
  var isValid = true;
  $('input').each(function() {
    if ($(this).val() === '') {
      $('#confirm').prop('disabled', true)
      isValid = false;
      return false;
    }
  });
  if(isValid) {$('#confirm').prop('disabled', false)}
  return isValid;
}

const validateInputs = function (inputs) {
  var validForm = true;

  inputs.each(function(index) {
    let input = $(this);

    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
      console.log('No se han llenado todos los campos');
      validForm = false;
    }
  });
  return validForm;
}

/** Formulario Solicitud **/
// agrego evento para manejar la clase valid de cada input y poner su valor debajo
const inputsSolicitud = $('input')
inputsSolicitud.each(function() {
  let input = $(this)
  input.change(function() {
    if (input.val() !== '') {
      if (input.attr('id') === 'celular') { // pregunto cuando sea el campo del celular
        let regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (regex.test(input.val())) { // valido el telefono
          $('#loader-phone-message').removeClass('hidden') // si pasa se muestra loader

          // aqui se enviaria el mensaje, solo se simula un periodo de tiempo
          setTimeout(function() {
            $('#loader-phone-message').addClass('hidden')
            $('#phone-message-alert').removeClass('hidden')
          }, 4000);

        } else {
          input.siblings('.input-error').html('No es un número de teléfono válido');
          input.addClass('invalid')
        }
      } else {

        input.addClass('valid')
        input.siblings('.input-success').html(input.val());
      }
    }
  })
})
// agrego evento a los select para poner su valor debajo
const selectsSolicitud = $('#formDatosPersonales select')
selectsSolicitud.each(function() {
  let select = $(this)
  select.change(function() {
    if (select.val() !== '') {
      select.addClass('valid')
      let optionSelected = select.find("option:selected");
      select.siblings('.input-success').html(optionSelected.text());
    }
  })
})

// manejo de iconos en panel collapsible
function toggleChevron(e) {
  $(e.target).prev('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
}
var valid = true;
var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}
var step = 'datos-personales';
$('.nav-btn').on('click', function(e) {
  e.preventDefault()

    $(this).closest('.collapse').collapse('hide')
    console.log($(this))
    $(this).closest('.panel').next().find('.collapse').collapse('show')


})

$('a[data-toggle]').on('click', function(e) {
  console.log($(this))
  // Panel that is currently open
  var panel = $('div.in');
  if (!valid) {
    alert('Sorry panel ' + panel[0].id + ' not validated');
    e.stopPropagation();
  }
});

$('.panel-default').on('show.bs.collapse', function() {
  $(this).addClass('active');
  $(this).find('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
});

$('.panel-default').on('hide.bs.collapse', function() {
  $(this).removeClass('active');
  $(this).find('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
});
// evento cuando elige co-acreditado

$("input[name='inc_acreditado']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#co-acreditado-form').removeClass('hidden');
  } else {
    if (!$('#co-acreditado-form').hasClass('hidden')) {
      $('#co-acreditado-form').addClass('hidden');
    }
  }
});

// si vive en el mismo domicilio el co-acreditado copia los campos
$("input[name='domicilio_acreditado']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#calle_ca').val($('#calle').val())
    $('#num_ext_ca').val($('#num_ext').val())
    $('#num_int_ca').val($('#num_int').val())
    $('#cp_ca').val($('#cp').val())
    $('#colonia_ca').val($('#colonia').val())
    $('#delegacion_ca').val($('#delegacion').val())
    $('#ciudad_ca').val($('#ciudad').val())
  }
});

function pasarTabDatosComplementarios() {
  $('#link-datos-complementarios').click()
}

function pasarTabCargaDocs(){
  $('#link-carga-docs').click()
}
// al ingresar el codigo SMS recibido, si se escribe un numero paso enseguida al siguiente input para una facil captura del codigo
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

// formatea el campo de telefono

if ($('#celular').exists()) {

  let cleave = new Cleave('#celular', {
    phone: true,
    phoneRegionCode: 'MX'
  });
}


/* Webcam */

const panelActiveWebcam = $('#panel-webcam')
const panelesAnexaId = $('.anexa-identificacion')

const panelCargaSmartphone = $('.carga-smartphone')
panelCargaSmartphone.click(function(){
  $('#loader-smartphone').removeClass('hidden')
  setTimeout(function(){
    $('#loader-smartphone').addClass('hidden')
    $('#sms-sent').removeClass('hidden')
  },3000)
})

capturaFrenteWebcam = $('#captura-frente-webcam');
capturaTraseWebcam = $('#captura-tras-webcam');
// Elements for taking the snapshot
const canvasFrente = document.getElementById('canvasFrente');
const canvasTras = document.getElementById('canvasTras');
const contextFrente = canvasFrente.getContext('2d');
const contextTras = canvasTras.getContext('2d');
var imgFrente, imgTras; // para guardar las fotos que se va a subir
$('#btn-volver-webcam-frente').click(function(){
  $('#webcamFrente').removeClass('hidden')
  $('#panels-webcam').addClass('hidden')
})
$('#btn-volver-webcam-tras').click(function(){
  $('#webcamTras').removeClass('hidden')
  $('#panels-webcam').addClass('hidden')
})
capturaFrenteWebcam.click(function(){
  $('#webcamFrente').removeClass('hidden')
  $('#panels-webcam').addClass('hidden')

  // Grab elements, create settings, etc.
  const videoFrente = document.getElementById('videoFrente');

  if(!videoFrente.src){
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want image now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        videoFrente.src = window.URL.createObjectURL(stream);
        videoFrente.play();
      });
    }
  }
  // Trigger photo take
  document.getElementById("snapFrente").addEventListener("click", function() {
    $('#webcamFrente').addClass('hidden')
    $('#panels-webcam').removeClass('hidden')
    contextFrente.drawImage(videoFrente, 0, 0, 480, 320);
    var imgFrenteId = new Image();
    imgFrenteId.src = canvasFrente.toDataURL();  // para mostrar la foto en el panel antes de subirla
    imgFrenteId.style.width = "63%";
    imgFrenteId.style.margin = "-60px";
    $('#captura-frente-webcam').html('')
    $('#captura-frente-webcam').append(imgFrenteId)
    imgFrente = canvasFrente.toDataURL(); // colocar la foto para guardarse
    $('#webcamFrente').addClass('hidden')
    $('#verifica-frente-webcam').removeClass('hidden');
  });
})

capturaTraseWebcam.click(function(){
  $('#webcamTras').removeClass('hidden')
  $('#panels-webcam').addClass('hidden')

  // Grab elements, create settings, etc.
  const videoTras = document.getElementById('videoTras');

  if(!videoTras.src){
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want image now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        videoTras.src = window.URL.createObjectURL(stream);
        videoTras.play();
      });
    }
  }

  // Trigger photo take
  document.getElementById("snapTras").addEventListener("click", function() {
    $('#webcamTras').addClass('hidden')
    $('#panels-webcam').removeClass('hidden')
    contextTras.drawImage(videoTras, 0, 0, 480, 320);
    var imgTrasId = new Image();
    imgTrasId.src = canvasTras.toDataURL();  // para mostrar la foto en el panel antes de subirla
    imgTrasId.style.width = "63%";
    imgTrasId.style.margin = "-60px";
    $('#captura-tras-webcam').html('')
    $('#captura-tras-webcam').append(imgTrasId)
    imgTras = canvasTras.toDataURL(); // colocar la foto para guardarse
    $('#webcamTras').addClass('hidden')
    $('#verifica-tras-webcam').removeClass('hidden');
  });
})

$('input[type=file]').change(function() {

  $('#loader-id').removeClass('hidden') // si pasa se muestra loader

  setTimeout(function() {
    $('#loader-id').addClass('hidden')
  }, 3000)
})

$('#btn-submit-webcam-img').click(function(){
  $('#loader-webcam-img').removeClass('hidden')
  setTimeout(function(){
    $('#loader-webcam-img').addClass('hidden')
    $('#modalWebCam').modal('hide');
  },3000)
})

$('#btn-submit-pc-img').click(function(){
  $('#loader-pc-img').removeClass('hidden')
  setTimeout(function(){
    $('#loader-pc-img').addClass('hidden')
    $('#modalComputadora').modal('hide');
  },3000)
})

/* COPY to Clipboard */


$('#copy-clipboard').click(function(){
  var folio = $('#folio-value').html();
  var hiddenClipboard = $('#_hiddenClipboard_');
  $('body').append('<textarea style="position:absolute;top: -9999px;" id="_hiddenClipboard_"></textarea>');
  hiddenClipboard = $('#_hiddenClipboard_');
  hiddenClipboard.html(folio);
  hiddenClipboard.select();
  var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Folio copiado: " + folio;
  document.execCommand('copy');
})

/* upload pc or smartphone */
$(function() {

  $('#captura-frente-pc').on('dragover', function() {
    $(this).addClass('hover');
  });

  $('#captura-frente-pc').on('dragleave', function() {
    $(this).removeClass('hover');
  });

  $('#captura-frente-pc input').on('change', function(e) {
    var file = this.files[0];

    $('#captura-frente-pc').removeClass('hover');

    if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
      return alert('File type not allowed.');
    }

    $('#captura-frente-pc').addClass('dropped');
    $('#captura-frente-pc img').remove();

    if ((/^image\/(gif|png|jpg|jpeg)$/i).test(file.type)) {
      var reader = new FileReader(file);

      reader.readAsDataURL(file);

      reader.onload = function(e) {
        var data = e.target.result,
            $img = $('<img />').attr('src', data).fadeIn();
        $('#captura-frente-pc').css({'padding':'0'})
        $('#captura-frente-pc div').html($img);
      };
    } else {
      var ext = file.name.split('.').pop();

      $('#captura-frente-pc div').html(ext);
    }
  });

  $('#captura-tras-pc').on('dragover', function() {
    $(this).addClass('hover');
  });

  $('#captura-tras-pc').on('dragleave', function() {
    $(this).removeClass('hover');
  });

  $('#captura-tras-pc input').on('change', function(e) {
    var file = this.files[0];

    $('#captura-tras-pc').removeClass('hover');

    if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
      return alert('File type not allowed.');
    }

    $('#captura-tras-pc').addClass('dropped');
    $('#captura-tras-pc img').remove();

    if ((/^image\/(gif|png|jpg|jpeg)$/i).test(file.type)) {
      var reader = new FileReader(file);

      reader.readAsDataURL(file);

      reader.onload = function(e) {
        var data = e.target.result,
            $img = $('<img />').attr('src', data).fadeIn();
        $('#captura-tras-pc').css({'padding':'0'})
        $('#captura-tras-pc div').html($img);
      };
    } else {
      var ext = file.name.split('.').pop();

      $('#captura-tras-pc div').html(ext);
    }
  });
});


/* progress bar */
$('.panel-comprobante input').on('change', function(e) {
  $('#loader-comprobante-domicilio').removeClass('hidden');
  $('#carga-comprobante-domicilio').addClass('hidden')
  setTimeout(function(){
    animateComprobanteDomProgressBar()
  },500)
})

var closeIdUploaded = document.getElementById("close-id-uploaded");
var closeComprobanteUploaded = document.getElementById("close-comprobante-uploaded");
var closeComprobanteIngresosUploaded = document.getElementById("close-ingresos-uploaded");

closeIdUploaded.addEventListener('click',function(){
  $('#loader-identificacion').addClass('hidden');
})

closeComprobanteUploaded.addEventListener('click',function(){
  $('#loader-comprobante-domicilio').addClass('hidden');
})
closeComprobanteIngresosUploaded.addEventListener('click',function(){
  $('#loader-comprobante-ingresos').addClass('hidden');
})

function animateIdProgressBar() {
  var elem = document.getElementById("idProgBar");
  var width = 10;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      elem.classList.add('done');
      elem.innerHTML = 'Identificación cargada';
      closeIdUploaded.classList.remove('hidden');
    } else {
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 1  + '%';
    }
  }
}

function animateComprobanteDomProgressBar() {
  var elem = document.getElementById("CompDomBar");
  var width = 10;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      elem.classList.add('done');
      elem.innerHTML = 'Comprobante de domicilio cargado';
      closeComprobanteUploaded.classList.remove('hidden');
    } else {
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 1  + '%';
    }
  }
}

function animateComprobanteIngProgressBar() {
  var elem = document.getElementById("CompIngBar");
  var width = 10;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      elem.classList.add('done');
      elem.innerHTML = 'Comprobante de ingresos cargado';
      closeComprobanteIngresosUploaded.classList.remove('hidden');
    } else {
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 1  + '%';
    }
  }
}
