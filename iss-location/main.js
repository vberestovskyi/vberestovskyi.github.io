//Instantiates a map object given the DOM ID
const map = L.map('map').setView([0, 0], 2);

//ISS icon group
const ISSIcon = L.icon({
  iconUrl: './images/ISSIcon.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 25],
  /*//? in case if will want to display shadow for ISS icon
  shadowUrl: './images/ISSIcon_shadow.svg',
  shadowSize: [60, 50],
  shadowAnchor: [5, 10] */
});
const iss = L.marker([0, 0], { icon: ISSIcon }).addTo(map);
//circle around ISS icon
//const issCirc = L.circle([0, 0], 2200e3, { color: "#001476", opacity: 0.5, weight: 1, fillColor: "#001476", fillOpacity: 0.2 }).addTo(map);

//Fetching ISS coordinates data
let moveISS = function () {
  fetch('https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      let lat = data['iss_position']['latitude'];
      let lon = data['iss_position']['longitude'];

      iss.setLatLng([lat, lon]);
      //circle around ISS icon
      //issCirc.setLatLng([lat, lon]);
      map.panTo([lat, lon], animate = true);
    })
    .catch(err => console.log(err))
  setTimeout(moveISS, 5000);
}


//Load and display tile layers on the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 8, minZoom: 2, attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(map);

moveISS();