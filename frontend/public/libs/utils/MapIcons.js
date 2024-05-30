export const
    parkIcon = L.icon(
        {
            iconSize: [32, 32],
            iconAnchor: [16, 8],
            popupAnchor: [0, 0],
            iconUrl: './data/icons/park_icon.png'
        }
    );

// Создание своего экзепляра класса иконок на основе стандартного класса Icon
const busStopIcon = L.Icon.extend({
    options: {
        iconSize: [32, 32],
        iconAnchor: [16, 8],
        popupAnchor: [0, 0],
    }
});

// Создание массива иконок с использованием своего экземпляра класса busStopIcon
// noinspection JSCheckFunctionSignatures
export const
    busStopIconArray = [
        new busStopIcon({iconUrl: './data/icons/bus_stop_with_shop.png'}),
        new busStopIcon({iconUrl: './data/icons/bus_stop_privacy.png'}),
        new busStopIcon({iconUrl: './data/icons/bus_stop.png'}),
];