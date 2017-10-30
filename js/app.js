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
        name: 'みニャすとろーね<br>〜ねこサークル模擬店〜',
         lat: 34.744324, //136.523965 34.744324, 136.526032
        lng: 136.526032,
        description: "ミネストローネ、コンソメスープを販売するよ！",
    },
    {
        name: 'ねこサークルフリマ', //34.745144, 136.525782 
        lat: 34.745144,
        lng: 136.525782,
        description: "様々なものを格安で打ってるよ！<br>ラジオとかもあるかもよ！",
    },
    {
        name: 'Tales of the world <br>〜三重大学放送局〜', //34.745144, 136.525782 
        lat: 34.745049,
        lng: 136.524716,
        description: "メイプル（環境情報科学館）の3階で<br>子どもたちに読み聞かせをするよ！",
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
            map.setCenter((pos + place[0]) / 2);
            //console.log(call_calc_distance(place[0], pos));
            append_html_back('map_data', '現在地から三重大学まで約' + get_distance(place[0], pos) + 'km');
            set_zoom(map, get_distance(place[0], pos));
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
    //map.setCenter(place[0]);
}
var infoWindowOpenFlag = 0;
var i;
function set_zoom(map, distance) {
    i = distance;
    console.log('4');
    if (500 >= distance) {
        map.setZoom(5);
    }
    if (200 >= distance) {
        map.setZoom(6);
    }
    if (100 >= distance) {
     map.setZoom(7);
    }
    if (50 >= distance) {
        map.setZoom(8);
    }
    if (20 >= distance) {
        console.log('4');
        map.setZoom(9);
    }
    if (10 >= distance) {
        map.setZoom(10);
    }
    if (5 >= distance) {
        map.setZoom(11);
    }
    if (2 >= distance) {
        map.setZoom(12);
    }
    if (1 >= distance) {
        map.setZoom(13);
    }
    if (0.5 >= distance) {
        map.setZoom(14);
    }
    if (0.2 >= distance) {
        map.setZoom(16);
    }
    if (0.1 >= distance) {
        map.setZoom(17);
    }
}


function append_html_back(id, message) {
    var tag = document.getElementById(id);
    var text = document.createTextNode(message);
    tag.appendChild(text);
}

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

function get_distance(a,b) {
    var message = calc_distance(a['lng'], a['lat'], b['lng'], b['lat']);
    message = parseInt(message);
    message /= 1000;
    return message;
}

function calc_distance(x1, y1, x2,y2) {
    x1 = x1 * Math.PI / 180;
    y1 = y1 * Math.PI / 180;
    x2 = x2 * Math.PI / 180;
    y2 = y2 * Math.PI / 180;
    console.log('x1 : ' + x1);
    //ヒュベニの公式　測地系 WGS84
    var Rx = 6378137.000, Ry = 6356752.314245//
    var diff_x = x1 - x2;
    console.log('diff_x ' + diff_x + '\n');//
    var diff_y = y1 - y2;
    console.log('diff_y ' + diff_y + '\n');//
    var ave_y = (y1 + y2) / 2;
    //ave_y = ave_y * (180 / Math.PI);
    
    var E = (Rx * Rx) - (Ry * Ry) //
    E /= (Rx * Rx);//
    E = Math.sqrt(E);//
    console.log('E^2 ' + E*E + '\n');//

    var W = 1 - Math.pow(E * Math.sin(ave_y), 2);
    W = Math.sqrt(W);
    console.log('W : ' + W);

    var N = Rx / W;
    console.log('N : ' + N);
    var M = Rx * (1 - (E * E));
    M /= Math.pow(W, 3);
    console.log('M : ' + M);
    var distance = Math.pow(diff_y * M , 2) + Math.pow(diff_x * N * Math.cos(ave_y), 2);
    distance = Math.sqrt(distance);
    console.log('distance : ' + distance);

    return distance;
}
