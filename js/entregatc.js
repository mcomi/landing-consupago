$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})
var btnsConfirmarCita = $('.btn-cita')
var panelsCita = $('.panel-fecha-cita')
btnsConfirmarCita.each(function(){
  $(this).click(function(){
    var panelSeleccionado = $(this).closest('.panel-fecha-cita');

    panelsCita.each(function(){
      var panel = $(this)
      if(panel.is(panelSeleccionado)){
        var cita = panel.find('select option:selected').text();
        var clone = panel.clone();
        clone.children('button').html('Cambiar')
        clone.children('button').click(function(){
          $('#cita-seleccionada').html('');
          panelsCita.each(function(){
            $(this).show('slow');
          })
        })


        clone.children('.input-select-cita').html(cita)
        clone.appendTo('#cita-seleccionada').animate2('bounceInLeft');
        panel.hide('slow')
      }else{
        panel.hide('slow')
      }
    })
  })
})

var btnsOpcionActivar = $('.btn-activar')
var panelsActivacion = $('.panel-opcion-activacion')
btnsOpcionActivar.each(function(){
  $(this).click(function(){
    var panelSeleccionado = $(this).siblings('.panel-opcion-activacion');
    var clone = panelSeleccionado.parent().clone();
    clone.appendTo('#opcion-activacion-seleccionada').animate2('bounceInLeft');
    clone.children('button').html('Cambiar').click(function(){
      $('#opcion-activacion-seleccionada').html('')
      panelsActivacion.each(function(){
        var panel = $(this)
        panel.show('slow')
        panel.siblings('.btn-activar').show('slow')

      })
    })
    panelsActivacion.each(function(){
      var panel = $(this)
      panel.hide('slow')
      panel.siblings('.btn-activar').hide('slow')
    })
  })
})
