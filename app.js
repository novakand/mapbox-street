import { mapOptions } from "./js/constants/map-options.js";


async function onInit() {
    document.querySelector('#map').setAttribute('data-load', true);
    onInitMapsAPI();
}

function getQueryParams() {
    const url = new URL(window.location.href);
    return url.searchParams;
}

function updateQueryParam(key, value) {
    const queryParams = getQueryParams();
    queryParams.set(key, value);
    const newUrl = new URL(window.location.href);
    newUrl.search = queryParams.toString();
    window.history.replaceState({}, '', newUrl.toString());
}

function onInitMapsAPI() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW91dmVyIiwiYSI6ImNsdXQ0YWdsaDA0ejgya2xiMmJzNWY5NnEifQ.6kW6KD9OxVJARo1yAkp4-w';
    onPreloader(false);
    const map = new mapboxgl.Map(mapOptions);

    map.on('load', () => {
        map.addSource('radar', {
            'type': 'raster',
             'tiles': [
            'https://test.bstrv.ru/api/layer.php/{z}/{x}/{y}.png?type=36048'
             ],
           
            'tileSize': 1024
        });
        map.addLayer({
            id: 'radar-layer',
            'type': 'raster',
            'source': 'radar',
            'paint': {
                'raster-fade-duration': 0
            },
            projection: {
                name: 'mercator'
              }

        });
    });
}

function onPreloader(isShow) {
    const preloader = document.querySelector('.mdc-linear-progress');
    delay(1000).then(() => isShow ? preloader.style.width = '100%' : preloader.style.width = '0');
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', onInit);