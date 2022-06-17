/*navBar 날짜 표시*/
// var today = new Date();
// var year = today.getFullYear();
// var month = ('0' + (today.getMonth() + 1)).slice(-2);
// var day = ('0' + today.getDate()).slice(-2);

// var dateString = year + '. ' + month + '. ' + day + '.';
// document.querySelector('.date').innerHTML = dateString;

/*Map API*/
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.640695, 127.147675), // 지도의 중심좌표
        level: 11 // 지도의 확대 레벨
    };

var OriginalLocation = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
var positions = [
  {
    title: '서울건설기계(주)',
    latLng: new kakao.maps.LatLng(37.673613, 126.865862)
  },
  {
    title: '우리건설기계',
    latLng: new kakao.maps.LatLng(37.568702, 126.993562)
  },
  {
    title: '봉래건설기계(주)',
    latLng: new kakao.maps.LatLng(37.375656, 126.944399)
  },
  {
    title: '태산건설기계',
    latLng: new kakao.maps.LatLng(37.597822, 126.650762)
  },
  {
    title: '(주)비젼시스템',
    latLng: new kakao.maps.LatLng(37.513896, 127.115957)
  },
  {
    title: '정우건설중기',
    latLng: new kakao.maps.LatLng(37.601084, 127.099927)
  },
  {
    title: '(주)에스지오',
    latLng: new kakao.maps.LatLng(37.402056, 126.686377)
  },
  {
    title: '대웅건설(주)',
    latLng: new kakao.maps.LatLng(37.035640, 127.604745)
  },
  {
    title: '영주대형건설기계',
    latLng: new kakao.maps.LatLng(36.816873, 128.638362)
  },
  {
    title: '영암건설장비(주)',
    latLng: new kakao.maps.LatLng(37.179881, 128.976808)
  },
  {
    title: '금성건설기계',
    latLng: new kakao.maps.LatLng(36.890148, 127.481973)
  },
  {
    title: '송광건설기계',
    latLng: new kakao.maps.LatLng(37.168421, 126.895548)
  },
  {
    title: '솔리메틱스',
    latLng: new kakao.maps.LatLng(37.868999, 127.738249)
  },
  {
    title: '한내건설(주)',
    latLng: new kakao.maps.LatLng(36.941485, 127.688740)
  }
];

/*각 기업 클릭 시 위치 마커 생성*/
for(let i = 0; i < 14; i++) {
    document.querySelector('.li' + i).addEventListener('click', function(e) {
        console.log(e.target.className)
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: positions[i].latLng, // 지도의 중심좌표
            level: 9 // 지도의 확대 레벨
        };
        var mapLoaction = new kakao.maps.Map(mapContainer, mapOption);
        
        var marker = new kakao.maps.Marker({ // 지도 마커 위치 표시
            map: mapLoaction,
            position: positions[i].latLng,
            title: positions[i].title
        });
        marker.setMap(mapLoaction);
    })
}

/*Graph1*/
var gaugeOptions = {
  chart: {
      type: 'solidgauge',
      backgroundColor: 'rgba(24, 38, 51, 0.4)'
  },

  title: null,

  pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
      }
  },

  exporting: {
      enabled: false
  },

  tooltip: {
      enabled: false
  },

  // the value axis
  yAxis: {
      stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
          y: -70
      },
      labels: {
          y: 16
      }
  },

  plotOptions: {
      solidgauge: {
          dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true
          }
      }
  }
};

// The speed gauge
var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
  yAxis: {
      min: 0,
      max: 200,
      title: {
          text: 'Speed'
      }
  },

  credits: {
      enabled: false
  },

  series: [{
      name: 'Speed',
      data: [80],
      dataLabels: {
          format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y}</span><br/>' +
              '<span style="font-size:12px;opacity:0.4">km/h</span>' +
              '</div>'
      },
      tooltip: {
          valueSuffix: ' km/h'
      }
  }]

}));

// The RPM gauge
var chartRpm = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
  yAxis: {
      min: 0,
      max: 5,
      title: {
          text: 'RPM'
      }
  },

  series: [{
      name: 'RPM',
      data: [1],
      dataLabels: {
          format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y:.1f}</span><br/>' +
              '<span style="font-size:12px;opacity:0.4">' +
              '* 1000 / min' +
              '</span>' +
              '</div>'
      },
      tooltip: {
          valueSuffix: ' revolutions/min'
      }
  }]

}));

// Bring life to the dials
setInterval(function () {
  // Speed
  var point,
      newVal,
      inc;

  if (chartSpeed) {
      point = chartSpeed.series[0].points[0];
      inc = Math.round((Math.random() - 0.5) * 100);
      newVal = point.y + inc;

      if (newVal < 0 || newVal > 200) {
          newVal = point.y - inc;
      }

      point.update(newVal);
  }

  // RPM
  if (chartRpm) {
      point = chartRpm.series[0].points[0];
      inc = Math.random() - 0.5;
      newVal = point.y + inc;

      if (newVal < 0 || newVal > 5) {
          newVal = point.y - inc;
      }

      point.update(newVal);
  }
}, 2000);


/*Graph2*/
Highcharts.chart('container2', {
  chart: {
      type: 'bar',
      backgroundColor: 'rgba(24, 38, 51, 0.4)'
  },
  title: {
      text: 'Historic World Population by Region'
  },
  subtitle: {
      text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
  },
  xAxis: {
      categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      title: {
          text: null
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Population (millions)',
          align: 'high'
      },
      labels: {
          overflow: 'justify'
      }
  },
  tooltip: {
      valueSuffix: ' millions'
  },
  plotOptions: {
      bar: {
          dataLabels: {
              enabled: true
          }
      }
  },
  legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
      shadow: true
  },
  credits: {
      enabled: false
  },
  series: [{
      name: 'Year 1800',
      data: [107, 31, 635, 203, 2]
  }, {
      name: 'Year 1900',
      data: [133, 156, 947, 408, 6]
  }, {
      name: 'Year 2000',
      data: [814, 841, 3714, 727, 31]
  }, {
      name: 'Year 2016',
      data: [1216, 1001, 4436, 738, 40]
  }]
});

/*Graph3*/
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  startAngle: 160,
  endAngle: 380
}));


// Create axis and its renderer
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Axes
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  innerRadius: -40
});

axisRenderer.grid.template.setAll({
  stroke: root.interfaceColors.get("background"),
  visible: true,
  strokeOpacity: 0.8
});

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0,
  min: -40,
  max: 100,
  strictMinMax: true,
  renderer: axisRenderer
}));


// Add clock hand
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
var axisDataItem = xAxis.makeDataItem({});

var clockHand = am5radar.ClockHand.new(root, {
  pinRadius: am5.percent(20),
  radius: am5.percent(100),
  bottomWidth: 40
})

var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: clockHand
}));

xAxis.createAxisRange(axisDataItem);

var label = chart.radarContainer.children.push(am5.Label.new(root, {
  fill: am5.color(0xffffff),
  centerX: am5.percent(50),
  textAlign: "center",
  centerY: am5.percent(50),
  fontSize: "3em"
}));

axisDataItem.set("value", 50);
bullet.get("sprite").on("rotation", function () {
  var value = axisDataItem.get("value");
  var text = Math.round(axisDataItem.get("value")).toString();
  var fill = am5.color(0x000000);
  xAxis.axisRanges.each(function (axisRange) {
    if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
      fill = axisRange.get("axisFill").get("fill");
    }
  })

  label.set("text", Math.round(value).toString());

  clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
  clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
});

setInterval(function () {
  axisDataItem.animate({
    key: "value",
    to: Math.round(Math.random() * 140 - 40),
    duration: 500,
    easing: am5.ease.out(am5.ease.cubic)
  });
}, 2000)

chart.bulletsContainer.set("mask", undefined);


// Create axis ranges bands
// https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Bands
var bandsData = [{
  title: "Unsustainable",
  color: "#ee1f25",
  lowScore: -40,
  highScore: -20
}, {
  title: "Volatile",
  color: "#f04922",
  lowScore: -20,
  highScore: 0
}, {
  title: "Foundational",
  color: "#fdae19",
  lowScore: 0,
  highScore: 20
}, {
  title: "Developing",
  color: "#f3eb0c",
  lowScore: 20,
  highScore: 40
}, {
  title: "Maturing",
  color: "#b0d136",
  lowScore: 40,
  highScore: 60
}, {
  title: "Sustainable",
  color: "#54b947",
  lowScore: 60,
  highScore: 80
}, {
  title: "High Performing",
  color: "#0f9747",
  lowScore: 80,
  highScore: 100
}];

am5.array.each(bandsData, function (data) {
  var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));

  axisRange.setAll({
    value: data.lowScore,
    endValue: data.highScore
  });

  axisRange.get("axisFill").setAll({
    visible: true,
    fill: am5.color(data.color),
    fillOpacity: 0.8
  });

  axisRange.get("label").setAll({
    text: data.title,
    inside: true,
    radius: 15,
    fontSize: "0.9em",
    fill: root.interfaceColors.get("background")
  });
});


// Make stuff animate on load
chart.appear(1000, 100);

/*Graph4*/
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

root.dateFormatter.setAll({
  dateFields: ["valueX"]
});

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
  pinchZoomX:true
  })
);

// Create line series and related axes
var xAxis1 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    tooltipDateFormat: "MMM d, hh:00",
    baseInterval: { timeUnit: "hour", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),
    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis1.get("renderer").labels.template.set("forceHidden", true);
xAxis1.get("renderer").grid.template.set("forceHidden", true);

var yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis1.get("renderer").labels.template.set("forceHidden", true);
yAxis1.get("renderer").grid.template.set("forceHidden", true);

var series1 = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis1,
    yAxis: yAxis1,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })
  })
);

series1.strokes.template.setAll({
  strokeWidth: 2
});

series1.data.setAll(generateHourlyData());

// Create column series and related axes
var xAxis2 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    })
  })
);

var yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var series2 = chart.series.unshift(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis2,
    yAxis: yAxis2,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })    
  })
);

series2.data.setAll(generateDailyData());

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis1
}));
cursor.lineY.set("visible", false);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series1.appear(1000, 100);
series2.appear(1000, 100);
chart.appear(1000, 100);

// Functions to generate random data
function generateDailyData() {
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 10);
  firstDate.setHours(0, 0, 0, 0);
  var data = [];
  for (var i = 0; i < 10; i++) {
    var newDate = new Date(firstDate);
    newDate.setDate(newDate.getDate() + i);
    data.push({
      date: newDate.getTime(),
      value: Math.round(Math.random() * 12) + 1
    });
  }
  return data;
}

function generateHourlyData() {
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 10);
  var data = [];
  for (var i = 0; i < 10 * 24; i++) {
    var newDate = new Date(firstDate);
    newDate.setHours(newDate.getHours() + i, 0, 0);
    if (i == 0) {
      var value = Math.round(Math.random() * 10) + 1;
    } else {
      var value = Math.round(data[data.length - 1].value / 100 * (90 + Math.round(Math.random() * 20)) * 100) / 100;
    }
    data.push({
      date: newDate.getTime(),
      value: value
    });
  }
  return data;
}