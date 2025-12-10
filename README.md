# Leaflet Offline Land Record System

An offline web-based mapping system built with Leaflet.js, designed to display land plots using GeoJSON data converted from KML/KMZ files.
The project supports searching plots, zooming to specific areas, and visualizing boundaries without requiring an internet connection.

# Features

- Fully offline map rendering

- Load GeoJSON plot data (converted from KML/KMZ)

- Interactive plot highlighting

- Search by plot number, owner name, or coordinates

- Zoom to selected plot

- Lightweight, fast, no backend required

# Project Structure
project/
 ├── index.html
 ├── script.js
 ├── style.css
 ├── Data/
 │    └── gujarkhanMap.geojson
 ├── Images/
 │    └── (optional base map image)
 └── README.md

# How to Run (Using VS Code Live Server)

- Install the Live Server extension in VS Code

- Open your project folder

- Right-click index.html

- Click “Open with Live Server”

- The map will open in your default browser

# How GeoJSON Is Loaded

- Your plot data is stored in /data/plots.geojson.

Example logic (in script.js):

fetch("data/plots.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  });

# Offline Map Options

- This project is designed for offline use.
- You can choose any of the following methods:

1.Use a georeferenced image overlay (PNG/JPG)

2.Use offline tiles (optional, more advanced)

# Contributions

Pull requests and suggestions are welcome as the project grows.

# License

This project is open-source and free to use.