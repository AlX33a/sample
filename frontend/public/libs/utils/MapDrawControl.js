export function initDrawControl(mapObject) {
    const drawnItems = new L.FeatureGroup();
    mapObject.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: {
            polyline: true,
            polygon: true,
            rectangle: true,
            marker: true,
            circle: false,
            circlemarker: false,
        }
    });
    mapObject.addControl(drawControl);

    // Обработчик события created
    mapObject.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        drawnItems.addLayer(layer);
    });

    // Функция для добавления кнопки сохранения GeoJSON
    const saveButton = createSaveButton(drawnItems);
    createLoadButton(mapObject, drawnItems);

    drawnItems.on('layeradd layerremove', () => updateButtonState(saveButton, drawnItems));

    return drawnItems;
}

function createSaveButton(drawnItems) {
    const removeButtons = document.querySelector('.leaflet-draw-edit-remove');
    let saveButton = document.querySelector('.save-geojson-btn');

    if (!saveButton && removeButtons) {
        saveButton = L.DomUtil.create(
            'a',
            'leaflet-draw-edit-remove save-geojson-btn',
            removeButtons.parentNode
        );
        saveButton.title = "Save as GeoJSON";
        saveButton.style.backgroundImage = 'none'; // Удаление фоновой картинки
        saveButton.innerHTML = '<i class="fa fa-save"></i>'; // Использование иконки FontAwesome

        L.DomEvent.on(saveButton, 'click', function (e) {
            L.DomEvent.stop(e);
            if (drawnItems.getLayers().length > 0) {
                saveGeoJSON(drawnItems);
            }
        });
    }
    updateButtonState(saveButton, drawnItems);
    return saveButton;
}

function createLoadButton(mapObject, drawnItems) {
    const saveButtons = document.querySelector('.save-geojson-btn');
    let loadButton = document.querySelector('.load-geojson-btn');

    if (!loadButton && saveButtons) {
        loadButton = L.DomUtil.create(
            'a',
            'leaflet-draw-edit-remove load-geojson-btn',
            saveButtons.parentNode
        );
        loadButton.title = "Load GeoJSON";
        loadButton.style.backgroundImage = 'none'; // Удаление фоновой картинки
        loadButton.innerHTML = '<i class="fa fa-upload"></i>'; // Использование иконки FontAwesome для загрузки

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.geojson';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        loadButton.onclick = function (e) {
            L.DomEvent.stop(e);
            fileInput.click();
        };

        fileInput.onchange = function () {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.readAsText(file);

                reader.onload = function (event) {
                    try {
                        const geoJson = JSON.parse(event.target.result);

                        L.geoJson(geoJson, {
                            onEachFeature: function(feature, layer) {
                                drawnItems.addLayer(layer);
                            }
                        })
                        mapObject.fitBounds(drawnItems.getBounds());
                    } catch (err) {
                        alert("Error loading GeoJSON: " + err.message);
                    }
                };
            }
        };
    }
}

function updateButtonState(saveButton, drawnItems) {
    if (drawnItems.getLayers().length > 0) {
        saveButton.classList.remove('leaflet-disabled');
    } else {
        saveButton.classList.add('leaflet-disabled');
    }
}

function saveGeoJSON(drawnItems) {
    // Конвертация элементов в GeoJSON
    const geoJson = drawnItems.toGeoJSON();

    // Создание объектов для каждого типа геометрии
    const lineStrings = { type: "FeatureCollection", features: [] };
    const polygons = { type: "FeatureCollection", features: [] };
    const points = { type: "FeatureCollection", features: [] };

    // Распределение фич по соответствующим объектам
    geoJson.features.forEach(feature => {
        switch (feature.geometry.type) {
            case "LineString":
                lineStrings.features.push(feature);
                break;
            case "Polygon":
                polygons.features.push(feature);
                break;
            case "Point":
                points.features.push(feature);
                break;
        }
    });

    // Функция для сохранения данных в файл
    function downloadJSON(data, filename) {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.href = dataStr;
        downloadAnchorNode.download = filename;
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    // Сохранение файлов, если в коллекции есть фичи
    if (lineStrings.features.length > 0) {
        downloadJSON(lineStrings, 'line_features.geojson');
    }
    if (polygons.features.length > 0) {
        downloadJSON(polygons, 'polygon_features.geojson');
    }
    if (points.features.length > 0) {
        downloadJSON(points, 'point_features.geojson');
    }
}
