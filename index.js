/*Map Library*/

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
function setMapType(maptype) { 
  var roadmapControl = document.getElementById('btnRoadmap');
  var skyviewControl = document.getElementById('btnSkyview'); 
  if (maptype === 'roadmap') {
      map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
      roadmapControl.className = 'selected_btn';
      skyviewControl.className = 'btn';
  } else {
      map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
      skyviewControl.className = 'selected_btn';
      roadmapControl.className = 'btn';
  }
}

// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
  map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
  map.setLevel(map.getLevel() + 1);
}

/*Graph1*/
Highcharts.chart('container', {
    data: {
      table: 'datatable'
    },
    chart: {
      type: 'column'
    },
    title: {
      text: '2021년 2분기 글로벌 스마트폰 시장 점유율'
    },
    subtitle: {
        text: '[단위: 억원]'
    },
    yAxis: {
        max: 100,
        allowDecimals: false,
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          this.point.y + ' ' + this.point.name.toLowerCase();
      }
    }
});


/*Graph2*/
var root = am5.Root.new("chartdiv1");

root.setThemes([
  am5themes_Animated.new(root)
]);

var chart = root.container.children.push(am5percent.PieChart.new(root, {
  layout: root.verticalLayout,
  innerRadius: am5.percent(50)
}));

var series = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "value",
  categoryField: "category",
  alignLabels: false
}));

series.labels.template.setAll({
  textType: "circular",
  centerX: 0,
  centerY: 0
});

series.data.setAll([
  { value: 55, category: "탄수화물" },
  { value: 25, category: "지방" },
  { value: 20, category: "단백질" }
]);

var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  marginTop: 15,
  marginBottom: 15,
}));

legend.data.setAll(series.dataItems);