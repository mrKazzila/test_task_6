function calculate() {
    var latitude = parseFloat(document.getElementById("latitude").value);
    var longitude = parseFloat(document.getElementById("longitude").value);
    var zoom = parseInt(document.getElementById("zoom").value);

    if (isNaN(latitude) || isNaN(longitude) || isNaN(zoom) || zoom < 1 || zoom > 19) {
        document.getElementById("map").innerHTML = "Пожалуйста, введите корректные координаты и зум.";
        document.getElementById("coordinates").innerText = "";
        return;
    }

    var tileSize = 256;
    var worldSize = Math.pow(2, zoom) * tileSize;

    var pixelX = Math.floor((longitude + 180) / 360 * worldSize);
    var pixelY = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * worldSize);

    if (pixelX < 0 || pixelX >= worldSize || pixelY < 0 || pixelY >= worldSize) {
        document.getElementById("map").innerHTML = "Плитка не обнаружена для указанных координат и зума.";
        document.getElementById("coordinates").innerText = "";
        return;
    }

    var tileX = Math.floor(pixelX / tileSize);
    var tileY = Math.floor(pixelY / tileSize);

    console.log('tileX', tileX)
    console.log('tileY', tileY)

    var mapUrl = `https://core-carparks-renderer-lots.maps.yandex.net/maps-rdr-carparks/tiles?version=2&l=carparks&lang=ru_RU&x=${tileX}&y=${tileY}&z=${zoom}`;
    console.log('mapUrl', mapUrl);

    var img = new Image();
    img.src = mapUrl;
    img.onload = function() {
        document.getElementById("map").innerHTML = `<img src="${mapUrl}" alt="Плитка карты" width="256" height="256">`;
    };
    img.onerror = function() {
        document.getElementById("map").innerHTML = "";
        document.getElementById("coordinates").innerText = `Не удалось загрузить картинку. X: ${tileX}, Y: ${tileY}`;
    };
    document.getElementById("coordinates").innerText = `X: ${tileX}, Y: ${tileY}`;
}
