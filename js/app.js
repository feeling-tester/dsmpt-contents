var min = -5;
var max = 5;
var marker = [];
var a = Math.floor( Math.random() * (max + 1 - min) ) + min ;
var b = Math.floor( Math.random() * (max + 1 - min) ) + min ;
var infoWindow = [];
var place = [
    {
        name: '三重大学',
        lat: 34.7464554,
        lng: 136.5213918,
        description: "ばなな",
    },
    {
        name: '三重大学1',
        lat: 34.7464554 + (a/1000),
        lng: 136.5213918,
        description: "Gitは油でギットギト",
    },
    {
        name: '三重大学2',
        lat: 34.7464554,
        lng: 136.5213918 + (b / 1000),
        description: "人生ワンワンかたつむり！！",
    }
];

function initMap() {
    //var uluru = {lat: -25.363, lng: 131.044};
    //var nagoya = {lat: 35.1650616, lng: 136.8998335};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: place[0]
    });
    for (var i = 0; i < place.length; i++) { //マーカーどーーーーーーん
        markerLatLng = new google.maps.LatLng({lat: place[i]['lat'], lng: place[i]['lng']});
        marker[i] = new google.maps.Marker({
            position: markerLatLng,
            map: map
        });
        infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
            content: '<div class="sample">' + place[i]['name'] + '<br><br>' + place[i]['description']  + '</div>' // 吹き出しに表示する内容
        });
        
        markerEvent(i); // マーカーにクリックイベントを追加
        
    }


    var GeolocationWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            GeolocationWindow.setPosition(pos);
            GeolocationWindow.setContent('Location found.');
            map.setCenter(pos);
            var latdiff = place[0]['lat'] - pos[0]['lat'];
            var lngdiff = place[0]['lng'] - pos[0]['lng'];
            var len = sqrt((latdiff * latdiff) + (lngdiff * lngdiff));

            setZoom(len / 10);
            
        }, function() {
            handleLocationError(true, GeolocationWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, GeolocationWindow, map.getCenter());
    }
    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }
    

    
}
var infoWindowOpenFlag = 0;

function markerEvent(i) {
    
    //もしスマホとかタッチパネル型の機器だったら
    if (navigator.userAgent.indexOf('iPhone') > 0 ||
        navigator.userAgent.indexOf('iPad') > 0 ||
        navigator.userAgent.indexOf('iPod') > 0 ||
        navigator.userAgent.indexOf('Android') > 0) {

        marker[i].addListener('mousedown', function() { // タップ
            switch (infoWindowOpenFlag) {
            case 1:
                infoWindow[i].close(map, marker[i]); // 吹き出しの削除
                infoWindowOpenFlag = 0;
                infoWindowOpenCounter = 0;
                break;
            case 0:
                infoWindow[i].open(map, marker[i]); // 吹き出しの表示
                infoWindowOpenFlag = 1;
                infoWindowOpenCounter = 0;
                break;
            }
        });        
    }
    else {
        marker[i].addListener('mousemove', function() { // マウス乗る
            infoWindow[i].open(map, marker[i]); // 吹き出しの表示
        });
        marker[i].addListener('mouseout', function() { // マウスのらない
            infoWindow[i].close(map, marker[i]); // 吹き出しの消し
        });
    }
}
