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
  else if(i == 8)
    document.querySelector('.li2').style.display = "none";
})

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