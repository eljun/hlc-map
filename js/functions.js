
/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addMarkerToGroup(group, coordinate, html) {
  var marker = new H.map.Marker(coordinate);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

/**
 * Add two markers showing the position of Liverpool and Manchester City football clubs.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addInfoBubble(map) {
  var group = new H.map.Group();
  map.addObject(group);
 

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);
  }, false);

  var listings = [
    {
      "model": "Natalia Residence",
      "banner": "images/natalia-residence.jpg",
      "location": "Lotlot, Consolacion",
      "price": "2.2m",
      "status": "Preselling",
      "type": "Townhouse",
      "link": "https://www.facebook.com/pages/category/Real-Estate/Natalia-Residences-Consolacion-302102396960940/",
      "geo": "10.3888162,123.943566"
    },    
    {
      "model": "Grand Terrace Subdivision",
      "banner": "images/grand-terrace.jpg",
      "location": "Casili Rd, Consolacion",
      "price": "2m",
      "status": "Preselling",
      "type": "Townhouse",
      "link": "https://www.facebook.com/pages/category/Real-Estate/Natalia-Residences-Consolacion-302102396960940/",
      "geo": "10.3723085,123.942427"
    },
    {
      "model": "Richwood Homes",
      "banner": "images/richwood-homes.jpg",
      "location": "Poblacion, Compostela",
      "price": "1.4m",
      "status": "Preselling",
      "type": "Townhouse",
      "link": "http://primaryhomes.com/house-and-lot/richwood-homes/",
      "geo": "10.4469569,124.0049691"
    },    
    {
      "model": "Antonioville",
      "banner": "images/antonioville.jpg",
      "location": "Cotcot, Mandaue",
      "price": "2.1m",
      "status": "Preselling",
      "type": "Townhouse",
      "link": "http://primaryhomes.com/house-and-lot/richwood-homes/",
      "geo": "10.3762299,123.9372527"
    },
    {
      "model": "Villa Josefina",
      "banner": "images/villa-josefina.jpg",
      "location": "Gub-ob, Lapu-Lapu",
      "price": "2.1m",
      "status": "Preselling",
      "type": "Townhouse",
      "link": "http://www.mcfc.co.uk",
      "geo": "10.29968,123.9530675"
    },
    {
      "model": "Casa Mira Naga",
      "banner": "images/casa-mira-naga.jpg",
      "location": "Langtad, Naga",
      "price": "1.6m",
      "status": "Preselling",
      "type": "Townhouse",
      "link": "http://www.mcfc.co.uk",
      "geo": "10.1807787,123.7260928"
    },
    {
      "model": "Almond Drive",
      "banner": "images/almond-drive.jpg",
      "location": "Tanke, Talisay",
      "price": "3.3m",
      "status": "Preselling",
      "type": "Townhouse",
      "link": "https://m.me/hlc.junsan?ref=Almond%20Drive",
      "geo": "10.2519996,123.8609078"
    }
  ]

  $.each(listings, function(key,val){
    
    var geoLoc = val.geo.split(',')    

  addMarkerToGroup(group, {lat:geoLoc[0], lng:geoLoc[1]}, 
    '<div class="banner"><img src='+ val.banner +'></div><div class="unit-info">' +
    '<div class="model">'+ val.model +'</div>' +
    '<div class="city">Address: <b>'+ val.location +'</b></div>' +
    '<div class="price">Price:<b>'+ val.price +'</b></div>' +
    '<div class="type">Type:<b>'+ val.type +'</b></div>' +
    '<div class="type">Status:<b>'+ val.status +'</b></div>' +
    '<div class="view"><a href='+ val.link +'>View More</a></div></div>'
    );
  })

  map.setViewBounds(group.getBounds());



}

/**
 * Boilerplate map initialization code starts below:
 */

// initialize communication with the platform
var platform = new H.service.Platform({
  app_id: 'Pcf9LE1Qp6qTeZA52PVK',
  app_code: '9v2BkviRwi9Ot26kp2IysQ',
  useHTTPS: true
});
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

// initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map,{
  center: {lat: 10.3311397, lng: 123.6497188},
  zoom: 11,
  pixelRatio: pixelRatio
});

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// create default UI with layers provided by the platform
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
addInfoBubble(map);


$('head').append('<link rel="stylesheet" href="https://js.api.here.com/v3/3.0/mapsjs-ui.css" type="text/css" />');
