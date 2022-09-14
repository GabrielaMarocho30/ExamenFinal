var enlace = jQuery('.ubicar');
var distancia = jQuery('.distancia');
var mensaje = jQuery('.mensaje');

if (navigator.geolocation) {
    enlace.click(function(e) {
      e.preventDefault();
      mensaje.html("Cargando...");
      navigator.geolocation.getCurrentPosition(insertarUbicacion, errorUbicacion);
    });
  } else {
    alert('Lo sentimos, tu navegador no soporta geolocation');
  }

  function haversineDistance(coords1, coords2) {
    function toRad(x) {
        return x * Math.PI / 180;
      }
    var lon1 = coords1[0];
    var lat1 = coords1[1];
  
    var lon2 = coords2[0];
    var lat2 = coords2[1];
    
  
    var R = 6371; // km
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
  
    return d;
  }

  function insertarUbicacion(posicion) {
    // Obtenemos las propiedades de geolocation y las guardamos en las variables
    var glatitud = posicion.coords.latitude;
    var glongitud  = posicion.coords.longitude;
    
    // Insertar el mapa de google en un iframe
    jQuery('#mapa').html('<iframe width="400" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.co.uk/?ie=UTF8&amp;ll='+glatitud+','+glongitud+'&amp;spn=0.332359,0.617294&amp;t=m&amp;z=11&amp;output=embed"></iframe>');
    let actual = [glatitud,glongitud];
    let Cusco = [-13.516785, -71.978451];
    d=haversineDistance(actual,Cusco)
    distancia.html("Usted esta a "+d+" km de la ciudad del Cusco");
   
    //Hacemos una llamada ajax a la API de Google Maps para obtener el mapa de la ubicación
    jQuery.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+glatitud+','+glongitud+'&sensor=true',
        type: 'POST',
        dataType: 'json',
        error: function(xhr, textStatus, errorThrown) {
            errorUbicacion();
         }
     });
           
  }
   
  function errorUbicacion() {
     alert('No pudimos encontrar tu ubicación exacta');
  }
  $(document).ready(function(){
    $("a.external").click(function() {
       url = $(this).attr("href");
       window.open(url, '_blank');
       return false;
    });
  });