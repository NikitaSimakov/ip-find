import 'babel-polyfill'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { validateIp, addTileLayer, getAddress, addOffset } from "./helpers";
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, { center: [51.505, -0.09], zoom: 13 });
addTileLayer(map);
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
  const { value: ipAddress } = ipInput
  if (validateIp(ipAddress)) getAddress(ipAddress)
    .then(setInfo);
}

function handleKey({ key }) {
  if (key === 'Enter') getData();
}

function setInfo({ ip, isp, location: { lat, lng, country, region, timezone } }) {
  ipInfo.innerText = ip;
  locationInfo.innerText = `${country} ${region}`
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = isp;

  map.setView({ lat, lng });
  L.marker([lat, lng], { icon: markerIcon }).addTo(map)

  if (window.matchMedia('(max-width: 1024px)').matches) {
    addOffset(map)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAddress('102.22.22.1').then(setInfo);
})
