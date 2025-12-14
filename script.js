const map = L.map("map").setView([33.25, 73.3], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© MS Developer Contribution",
}).addTo(map);

fetch("Data/GujarKhan_Map.json") // path to your local file
  .then((res) => res.json())
  .then((data) => {
    // Add GeoJSON layer to map
    const geoLayer = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        // Customize marker (optional)
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: feature.properties.fill || "#ffffff",
          color: feature.properties.stroke || "#fbc02d",
          weight: feature.properties["stroke-width"] || 2,
          fillOpacity: feature.properties["fill-opacity"] || 0.5,
        });
      },
      onEachFeature: function (feature, layer) {
        // Bind popup with info
        layer.bindPopup(`
          <b>Feature ID:</b> ${feature.id}<br>
          <b>Stroke:</b> ${feature.properties.stroke}<br>
          <b>Fill:</b> ${feature.properties.fill}
        `);
      },
    }).addTo(map);

    // Store globally if you want to use search/zoom
    window.geoLayer = geoLayer;
  })
  .catch((err) => console.error("Error loading GeoJSON:", err));

map.on("click", function (e) {
  var lat=e.latlng.lat;
  var lng=e.latlng.lng;
  console.log("Cooordinates are lat:"+lat+"& lng:"+lng);

  L.marker([lat,lng]).addTo(map).bindPopup("Clicked Here").openPopup();
});

// Search Bar functionality

const GKLocationsData=
[
  {
    Name:['Government Degree Collegge for Women', 'Women Degree Collegr','Women College Gk'],
    latitude:33.259279580001746,
    longitude:73.30518007343926,
  },
];

const inputValue=document.querySelector('#srchBarInput');
let srchBtn=document.querySelector('#srchBtn');

srchBtn.addEventListener('click',function(e)
{
  e.preventDefault();

  const searchTerm = inputValue.value.trim().toLowerCase();

  if(searchTerm==="")
  {
    alert("Please Enter a place Name or Coordinates..!");
    return;
  }

  if(searchTerm.includes(','))
  {
    const parts=searchTerm.split(',').map(p=> parseFloat(p.trim()));
    if(parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]))
    {
      const lat= parts[0];
      const lng= parts[1];
      L.marker([lat,lng]).addTo(map).bindPopup(`Search Coords:${lat},${lng}`).openPopup();
      map.setView([lat,lng],16);
      console.log(`Marker placed at coordinates: ${lat}, ${lng}`);
      return;
    }
  }

  let matchFound = false;
  GKLocationsData.forEach(location=>
  {
    const names=Array.isArray(location.Name)?location.Name:[location.Name];

    const isMatch=names.some(name=>name.toLowerCase().includes(searchTerm));
    if(isMatch)
    {
      matchFound=true;

      const resultantlat=location.latitude;
      const resultantlng=location.longitude;

      L.marker([resultantlat,resultantlng]).addTo(map)
      .bindPopup(`Searched Place: ${names[0]}`)
      .openPopup();

      map.setView([resultantlat,resultantlng],16);
    }
  }
  );
  if(!matchFound)
    {
      alert(`Location "${searchTerm}" not found in list`);
    }
});


