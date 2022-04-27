/*장소 더보기 버튼 누를 시*/
let btn = document.querySelector('#loaction_btn');
let hide = document.querySelector('.hide');
//숨겨진 기업 리스트 보이기
let i = 0;
btn.addEventListener('click', function() {
  i++;
  document.querySelector('.hide').classList.remove('hide');
  if(i < 7) 
    btn.innerHTML = '장소 더보기';
  else if(i == 7) 
    btn.innerHTML = '접기';  
})

if (btn.innerHTML === '접기') {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.li2').classList.add('hide');
  })
}

/*Map API*/
var map;
var mapBounds = new OpenLayers.Bounds(123 , 32, 134 , 43);
var mapMinZoom = 7;
var mapMaxZoom = 19;

// avoid pink tiles
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
OpenLayers.Util.onImageLoadErrorColor = "transparent";
 
function init(){
var options = {
    controls: [],
    projection: new OpenLayers.Projection("EPSG:900913"),
    displayProjection: new OpenLayers.Projection("EPSG:4326"),
    units: "m",
    controls : [],
    numZoomLevels:21,
    maxResolution: 156543.0339,
    maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34)
};
map = new OpenLayers.Map('map', options);
 
var options = {
    serviceVersion : "",
    layername: "",
    isBaseLayer: false,
    opacity : 1,
    type: 'png',
    transitionEffect: 'resize',
    tileSize: new OpenLayers.Size(256,256),
    min_level : 7,
    max_level : 18,
    buffer:0
};
//======================================
//1. 배경지도 추가하기
vBase = new vworld.Layers.Base('VBASE');
if (vBase != null){map.addLayer(vBase);}
//2. 영상지도 추가하기
vSAT = new vworld.Layers.Satellite('VSAT');
if (vSAT != null) {map.addLayer(vSAT);};
//3. 하이브리드지도 추가하기
vHybrid = new vworld.Layers.Hybrid('VHYBRID');
if (vHybrid != null) {map.addLayer(vHybrid);} 
//4. Gray지도 추가하기
vGray = new vworld.Layers.Gray('VGRAY');
if (vGray != null){map.addLayer(vGray);}
//5. Midnight지도 추가하기
vMidnight = new vworld.Layers.Midnight('VMIDNIGHT');
if (vMidnight != null){map.addLayer(vMidnight);}
//===========================================

var switcherControl = new OpenLayers.Control.LayerSwitcher();
map.addControl(switcherControl);
switcherControl.maximizeControl();

map.zoomToExtent( mapBounds.transform(map.displayProjection, map.projection ) );
map.zoomTo(11);
     
map.addControl(new OpenLayers.Control.PanZoomBar());
//map.addControl(new OpenLayers.Control.MousePosition());
map.addControl(new OpenLayers.Control.Navigation());
//map.addControl(new OpenLayers.Control.MouseDefaults()); //2.12 No Support
map.addControl(new OpenLayers.Control.Attribution({separator:" "}))
}
  function deleteLayerByName(name){
  for (var i=0, len=map.layers.length; i<len; i++) {
      var layer = map.layers[i];
      if (layer.name == name) {
          map.removeLayer(layer);
          //return layer;
          break;
      }
  }
}

var apiMap;//2D map
var SOPPlugin;//3D map
vworld.showMode = false;//브이월드 배경지도 설정 컨트롤 유무(true:배경지도를 컨트롤 할수 있는 버튼 생성/false:버튼 해제)
var mControl;//마커이벤트변수
var tempMarker = null;//임시마커
 
/**
 * - rootDiv, mapType, mapFunc, 3D initCall, 3D failCall
 * - 브이월드 5가지 파라미터를 셋팅하여 지도 호출
 */
vworld.init("vMap", "map-first", 
    function() {        
        apiMap = this.vmap;//브이월드맵 apiMap에 셋팅 
        apiMap.setBaseLayer(apiMap.vworldBaseMap);//기본맵 설정 
        apiMap.setControlsType({"simpleMap":true}); //간단한 화면
        apiMap.addVWORLDControl("zoomBar");//panzoombar등록
        apiMap.setCenterAndZoom(14243425.793355, 4342305.8698004, 7);//화면중심점과 레벨로 이동 (초기 화면중심점과 레벨)     
    },
    function (obj){//3D initCall(성공)
        SOPPlugin = obj;
    },
    function (msg){//3D failCall(실패)
        alert(msg);
    }
);
 
/**
 * 마커 찍기
 */
function addMarkingEvent(){ 
    var pointOptions = {persist:true};//포인트옵션
    if (mControl == null) {//마커컨트롤이 정의 되어 있지 않으면
        mControl = 
            new OpenLayers.Control.Measure(
                    OpenLayers.Handler.Point,
                    {handlerOptions:pointOptions});//포인트 객체 생성
        mControl.events.on({"measure":mClick});//객체를 클릭이벤트 등록
        apiMap.addControl(mControl);//나의 map에 객체 추가
    }        
    apiMap.init();//나의 맵 초기화
    mControl.activate();//마커컨트롤 활성화
}
 
/**
 * 말풍선이벤트
 */
function mClick(event){
    apiMap.init();//나의 맵 초기화    
    var temp = event.geometry;//마커 클릭이벤트시 나오는 좌표    
    var pos = new OpenLayers.LonLat(temp.x, temp.y);//좌표값 셋팅
     
    addMarker(pos.lon, pos.lat,"마커클릭시나오는말풀선.", null);//말풍선  
}
 
/**
 * 말풍선결과
 */
function addMarker(lon, lat, message, imgurl){
    var marker = new vworld.Marker(lon, lat,message,"");
     
    // 마커 아이콘 이미지 파일명 설정합니다.
    if (typeof imgurl == 'string') {marker.setIconImage(imgurl);}
     
    // 마커의 z-Index 설정
    marker.setZindex(3);
     
    apiMap.addMarker(marker);
    tempMarker = marker; 
}

/*Graph1*/
Highcharts.chart('container1', {
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

/*Graph3*/
Highcharts.chart('container2', {
  chart: {
      type: 'spline'
  },
  title: {
      text: 'Monthly Average Temperature'
  },
 
  xAxis: {
      categories: ['1월', '3월', '6월', '9월', '12월', '']
  },
  yAxis: {
      title: {
          text: 'Temperature'
      },
      labels: {
          formatter: function () {
              return this.value + '°';
          }
      }
  },
  tooltip: {
      crosshairs: true,
      shared: true
  },
  plotOptions: {
      spline: {
          marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
          }
      }
  },
  series: [{
      name: '자연광',
      marker: {
          enabled: false
      },
      data: [7.0, 25.0, 50.0, {
          y: 89,
          marker: { 
              enabled: false
          }
      }, 56.3, 11.0]

  }, {
      name: '인공지능',
      color: 'red',
      marker: {
          enabled: false
      },
      data: [60.0, 61.7, 65.9,{
          y: 80.5,
      }, 65.2, 60.5]
  }]
});