var min = -5;
var max = 5;
var marker = [];
var a = Math.floor( Math.random() * (max + 1 - min) ) + min ;
var b = Math.floor( Math.random() * (max + 1 - min) ) + min ;
var infoWindow = [];
var pos;

var len;
var latdiff;
var lngdiff; 
var place = [
    {
        // name: '三重大学中心',
        lat: 34.745217, // 34.745217, 136.522584 
        lng: 136.522584,
        // description: "",
    },
    {
        name: 'みニャすとろーね 〜ねこサークル模擬店〜',
         lat: 34.744324, //136.523965 34.744324, 136.526032
        lng: 136.526032,
        description: "ミネストローネ、コンソメスープを販売するよ！",
    },
    {
        name: 'ねこサークルフリマ', //34.745144, 136.525782 
        lat: 34.745144,
        lng: 136.525782,
        description: "様々なものを格安で打ってるよ！ラジオとかもあるかもよ！",
    },
    {
        name: 'Tales of the world 〜三重大学放送局〜', //34.745144, 136.525782 
        lat: 34.745049,
        lng: 136.524716,
        description: "メイプル（環境情報科学館）の3階で子どもたちに読み聞かせをするよ！",
    },
    
];

function initMap() {
    //var uluru = {lat: -25.363, lng: 131.044};
    //var nagoya = {lat: 35.1650616, lng: 136.8998335};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: place[0]
    });
    for (var i = 1; i < place.length; i++) { //マーカーどーーーーーーん
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
    var GeolocationWindow;
 
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            GeolocationWindow = new google.maps.InfoWindow({map: map});

            GeolocationWindow.setPosition(pos);
            GeolocationWindow.setContent('Location found.');
            map.setCenter(pos);
            
        }, function() {
            handleLocationError(true, GeolocationWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, GeolocationWindow, map.getCenter());
    }
    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        // infoWindow.setPosition(pos);
        // infoWindow.setContent(browserHasGeolocation ?
        //                      'Error: The Geolocation service failed.' :
        //                      'Error: Your browser doesn\'t support geolocation.');
    }
    map.setCenter(place[0]);
    
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
