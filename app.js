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
        map.addSource('mouver-traffic', {
            type: 'vector'
        });
        map.addLayer(
            {
                'id': 'traffic-data',
                'type': 'line',
                'source': 'mouver-traffic',
                'source-layer': 'traffic-counts-a6074l',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'count'],
                        0, 'yellow',

                        500, 'orange',
                        10000, 'red'
                    ],
                    'line-width': 1
                }
            },
            'road-label-simple'
        );
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