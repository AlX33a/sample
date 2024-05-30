import * as MapLayers from './utils/MapLayers.js';
import {initDrawControl} from "./utils/MapDrawControl.js";

// Создание объекта карты
let mapObject = L.map(
    'map',
    {
        center: [55.75200,37.62000],
        zoom: 12,
        layers: [MapLayers.ThunderForestLayer]
    }
);
// Отключение флага и ссылки на leaflet в правом нижнем углу.
mapObject.attributionControl.setPrefix(false);

// Словарь слоев
let layersDict = {
    'OSM map': MapLayers.ThunderForestLayer,
    'OSM dark map': MapLayers.DarkOsmCartodbLayer,
    'Google satellite map': MapLayers.GoogleSatelliteLayer,
    'Yandex map': MapLayers.YandexLayer,
};

// Словарь накладываемых слоев
let overlaysDict = {
    'Housing and communal services Perm': MapLayers.RomanGisGkhPermLayer,
    'Yandex traffic': MapLayers.YandexTrafficLayer,
    'Yandex traffic with control': MapLayers.YandexTrafficControlLayer,
    'Parks': MapLayers.ParksLayerGroup,
    'Bus stop': MapLayers.BusStopLayer,
    'Building': MapLayers.BuildingLayer,
};

// Добавленин переключателя слоев
L.control.layers(layersDict, overlaysDict).addTo(mapObject);

// Добавление масштабной линейки в левый нижний угол
L.control.scale({
    imperial: false,
    maxWidth: 200
}).addTo(mapObject);

// Создание измерительных инструментов
var MeasureControl = L.control.measure({
    localization: 'ru',
    primaryLengthUnit: 'kilometers',
    secondaryLengthUnit: 'meters',
    primaryAreaUnit: 'hectares',
    secondaryAreaUnit: 'sqmeters',
    thousandsSep: ' ',
    decPoint: ',',
    activeColor: '#000080',
    completedColor: '#6A0DAD'
});

// Добавление панели измерительных инструментов
MeasureControl.addTo(mapObject);

// Инициализация инструментов рисования и добавление слоев
initDrawControl(mapObject);

var lgnd = L.control({
    position: 'bottomright'
});

// Формирование наполнения элемента интерфейса Легенда при добавлении на карту
lgnd.onAdd = function (map) {
    let lgndDiv = L.DomUtil.create('div', 'lgndPanel');
    let labels = [];
    labels.push('<center><b>Легенда</b></center>');
    labels.push('<img src="./data/icons/bus_stop_with_shop.png" height="12" width="12">' + '- Остановка с магазином');
    labels.push('<img src="./data/icons/bus_stop_privacy.png" height="12" width="12">' + '- Остановка c Инсити');
    labels.push('<img src="./data/icons/bus_stop.png" height="12" width="12">' + '- Остальные остановки');

    lgndDiv.innerHTML = labels.join('<br>');
    return lgndDiv;
};

// Реализация добавления легенды при отображении слоя BusStopLayer
function lgndAdd(event) {
    lgnd.addTo(mapObject);
}
function lgndRemove(event) {
    lgnd.remove(mapObject);
}
MapLayers.BusStopLayer.on('add', lgndAdd);
MapLayers.BusStopLayer.on('remove', lgndRemove);