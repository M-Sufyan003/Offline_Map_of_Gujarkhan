const map = L.map("map").setView([33.25, 73.3], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© MS Developer Contribution",
}).addTo(map);

fetch("Data/GujarKhan_Map.json") // path to your local file
  .then((res) => res.json())
  .then((data) => {
    // Add GeoJSON layer to map
    const geoLayer = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) 
      {
        // Customize marker (optional)
        return L.circleMarker(latlng, 
        {
          radius: 8,
          fillColor: feature.properties.fill || "#ffffff",
          color: feature.properties.stroke || "#fbc02d",
          weight: feature.properties["stroke-width"] || 2,
          fillOpacity: feature.properties["fill-opacity"] || 0.5,
        });
      },
      onEachFeature: function (feature, layer) 
      {
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
