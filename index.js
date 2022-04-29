/*장소 더보기 버튼 누를 시*/
let btnL = document.querySelector('#btnL');
let btnR = document.querySelector('#btnR');

let first_li = document.querySelector('.first');
let second_li = document.querySelector('.second');
let hide = document.querySelector('.hide');

//기업 리스트 페이지 넘기기
btnL.addEventListener('click', function() {
    second_li.classList.add('hide');
    first_li.classList.remove('hide');
    
})
btnR.addEventListener('click', function() {
    first_li.classList.add('hide');
    second_li.classList.remove('hide');
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

/* Graph1 */
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

/* Graph2 */
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

/* Graph3 */
let filename1 = 'data1.csv';
let filename2 = 'data2.csv';

d3.csv(filename2).then(function(d2) {
  d3.csv(filename1).then(function (d1) {
    let val1 = [];
    let val2 = [];

    for (let i = 0; i < d1.columns.length; i++) {
      val1.push(parseInt(d1.columns[i]));
    }
    console.log("ARR1", val1);
    
    for (let i = 0; i < d2.columns.length; i++) {
      val2.push(parseInt(d2.columns[i]));
    }
    console.log("ARR2", val2);
    
    Highcharts.chart('container3', {
      title: {
        text: 'PM2.5 집진 성능 시험'
      },
    
      yAxis: { 
        min: 0,
        max: 5200,
        title: {
          text: '분진농도(µg/m3)'
        },
      },
    
      xAxis:{
          min: 0,
          max: 30
      },    
    
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
    
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 0
        }
      },
    
      series: [{
        name: '30분만에 제거',
        data: val1
      }, {
        name: '자연감소',
        data: val2
      }],
    
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  });
});