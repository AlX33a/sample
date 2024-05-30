// Реализация механизма коррекции стилей панелей управления Яндекс
import * as MapIcons from "./MapIcons.js";
import {busStopIconArray} from "./MapIcons.js";
import {BusStopGeoJson} from "../../data/shape/geojson/BusStop.js";
import {BuildingGeoJson} from "../../data/shape/geojson/Building.js";

L.Yandex.addInitHook("on", "load", function() {
    this._setStyle(this._yandex.controls.getContainer(),{
            top: "5px",
            right: "50px",
            width: "auto",
        }
    );
})

// Функция загрузки яндекс пробок
function yandex_traffic() {
    let trafficProvider = new ymaps.traffic.provider.Actual(
        {}, {infoLayerShown:true}
    );
    trafficProvider.setMap(this._yandex);
}

// Функция загрузки яндекс пробок с панелью управления
// https://yandex.ru/dev/maps/archive/doc/jsapi/2.0/dg/concepts/controls.html
function trafficCtrl() {
    this._yandex.controls.add(
        'trafficControl',
        {size: 'auto'},
    ).get('trafficControl').state.set('trafficShown', true);
}

export const
    ThunderForestLayer = L.tileLayer(
        'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
        // attribution - текст, который отображается в правой нижней части экрана
        {attribution: "<i>© ThunderForest, © OpenStreetMap contributors</i>"}
    ),
    DarkOsmCartodbLayer  = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
        {attribution: "<i>© CartoDB, © OpenStreetMap contributors</i>"}
    ),
    GoogleSatelliteLayer = L.tileLayer(
        'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],  // без саб. доменов слой не отобразится
            maxZoom: 26,
            attribution: '<i>© Google, Satellite imagery</i>'
        }
    ),
    RomanGisGkhPermLayer = L.tileLayer.wms(
        'https://romangis.nextgis.com/api/resource/660/wms',
        {
            // Если несколько layers, то записывалось бы ngw_id_656,ngw_id_657,ngw_id_658
            layers: "ngw_id_656",
            format: "image/png",
            transparent: true, // Флаг для запроса прозрачного фона
            attribution: "<i>Data on housing and communal services reform in Perm region</i>"
        }
    ),
    YandexLayer = L.yandex('map'),
    YandexTrafficLayer = L.yandex('overlay').on('load', yandex_traffic),
    YandexTrafficControlLayer = L.yandex('overlay').on('load', trafficCtrl),
    // Создание слоя точечных объектов
    ParksLayerGroup = L.layerGroup(
    [
        L.marker(
            [45.024393, 38.971413],
            {
                title: 'Сквер имени Жукова',
                icon: MapIcons.parkIcon,
            }
        ).bindPopup('<b>Название: </b> <i>Сквер имени Жукова</i>'),

        L.marker(
            [45.021490, 38.981936],
            {
                title: 'Сквер им. Кочубея',
                icon: MapIcons.parkIcon,
            }
        ).bindPopup('<b>Название: </b> <i>Сквер им. Кочубея</i>'),

        L.marker(
            [45.025419, 38.995961],
            {
                title: 'Парк «Кубань»',
                icon: MapIcons.parkIcon,
            }
        ).bindPopup('<b>Название: </b> <i>Парк «Кубань»</i>')
    ]
),
    // Загрузка слоя с авт. остановками из geoJSON
    BusStopLayer = L.geoJson(BusStopGeoJson, {
    pointToLayer: function(feature, latLng) {
        let name = feature.properties.name;
        let busStopIcon;

        name === 'Лента' || name === 'Магазин' ? busStopIcon = busStopIconArray[0]:
            name === 'Инсити' ? busStopIcon = busStopIconArray[1]:
            busStopIcon = busStopIconArray[2];

        return L.marker(latLng, {
            icon: busStopIcon,
            title: feature.properties.code + ' ' + feature.properties.name
        })
    }
})
    .bindPopup(function(busStopGeoJson) {
        let busStopPhoto = '';
        if (busStopGeoJson.feature.properties.photo_id !== '') {
            busStopPhoto = '<br><img src = "./data/photos/bus_stop/' + busStopGeoJson.feature.properties.photo_id + '/photo.JPG" width = "280" heigh="160">'
        }
        return busStopGeoJson.feature.properties.code + '\n' + busStopGeoJson.feature.properties.name + busStopPhoto
    }),
    BuildingLayer = L.geoJson(BuildingGeoJson, {
        style: function (feature) {
            return {
                color: '#ff7800',
                weight: 1, // Толщина линии
                fillOpacity: 0.8 // Прозрачность заливки
            };
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.улица && feature.properties.номер) {
                layer.bindPopup('Адрес: ' + feature.properties.улица + ', ' + feature.properties.номер);
            }
        }
    })
;



