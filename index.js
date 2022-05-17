/*navBar 날짜 표시*/
var today = new Date();
var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);

var dateString = year + '. ' + month + '. ' + day + '.';
document.querySelector('.date').innerHTML = dateString;

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
    document.querySelector('#graph').classList.add('hide');
    
    document.querySelector('.li' + i).addEventListener('click', function() {
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
         
        document.querySelector('#graph').classList.remove('hide');
        document.querySelector('#graph' + i).classList.remove('hide');
    })
}

/* First Graph1 */
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

/* First Graph2 */
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

/* First Graph3 */
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

/* Second Graph1 */
Highcharts.chart('container4', {
  chart: {
      type: 'column'
  },
  title: {
      align: 'left',
      text: 'Browser market shares. January, 2018'
  },
  subtitle: {
      align: 'left',
      text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
  },
  accessibility: {
      announceNewData: {
          enabled: true
      }
  },
  xAxis: {
      type: 'category'
  },
  yAxis: {
      title: {
          text: 'Total percent market share'
      }

  },
  legend: {
      enabled: false
  },
  plotOptions: {
      series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
              format: '{point.y:.1f}%'
          }
      }
  },

  tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

  series: [
      {
          name: "Browsers",
          colorByPoint: true,
          data: [
              {
                  name: "Chrome",
                  y: 62.74,
                  drilldown: "Chrome"
              },
              {
                  name: "Firefox",
                  y: 10.57,
                  drilldown: "Firefox"
              },
              {
                  name: "Internet Explorer",
                  y: 7.23,
                  drilldown: "Internet Explorer"
              },
              {
                  name: "Safari",
                  y: 5.58,
                  drilldown: "Safari"
              },
              {
                  name: "Edge",
                  y: 4.02,
                  drilldown: "Edge"
              },
              {
                  name: "Opera",
                  y: 1.92,
                  drilldown: "Opera"
              },
              {
                  name: "Other",
                  y: 7.62,
                  drilldown: null
              }
          ]
      }
  ],
  drilldown: {
      breadcrumbs: {
          position: {
              align: 'right'
          }
      },
      series: [
          {
              name: "Chrome",
              id: "Chrome",
              data: [
                  [
                      "v65.0",
                      0.1
                  ],
                  [
                      "v64.0",
                      1.3
                  ],
                  [
                      "v63.0",
                      53.02
                  ],
                  [
                      "v62.0",
                      1.4
                  ],
                  [
                      "v61.0",
                      0.88
                  ],
                  [
                      "v60.0",
                      0.56
                  ],
                  [
                      "v59.0",
                      0.45
                  ],
                  [
                      "v58.0",
                      0.49
                  ],
                  [
                      "v57.0",
                      0.32
                  ],
                  [
                      "v56.0",
                      0.29
                  ],
                  [
                      "v55.0",
                      0.79
                  ],
                  [
                      "v54.0",
                      0.18
                  ],
                  [
                      "v51.0",
                      0.13
                  ],
                  [
                      "v49.0",
                      2.16
                  ],
                  [
                      "v48.0",
                      0.13
                  ],
                  [
                      "v47.0",
                      0.11
                  ],
                  [
                      "v43.0",
                      0.17
                  ],
                  [
                      "v29.0",
                      0.26
                  ]
              ]
          },
          {
              name: "Firefox",
              id: "Firefox",
              data: [
                  [
                      "v58.0",
                      1.02
                  ],
                  [
                      "v57.0",
                      7.36
                  ],
                  [
                      "v56.0",
                      0.35
                  ],
                  [
                      "v55.0",
                      0.11
                  ],
                  [
                      "v54.0",
                      0.1
                  ],
                  [
                      "v52.0",
                      0.95
                  ],
                  [
                      "v51.0",
                      0.15
                  ],
                  [
                      "v50.0",
                      0.1
                  ],
                  [
                      "v48.0",
                      0.31
                  ],
                  [
                      "v47.0",
                      0.12
                  ]
              ]
          },
          {
              name: "Internet Explorer",
              id: "Internet Explorer",
              data: [
                  [
                      "v11.0",
                      6.2
                  ],
                  [
                      "v10.0",
                      0.29
                  ],
                  [
                      "v9.0",
                      0.27
                  ],
                  [
                      "v8.0",
                      0.47
                  ]
              ]
          },
          {
              name: "Safari",
              id: "Safari",
              data: [
                  [
                      "v11.0",
                      3.39
                  ],
                  [
                      "v10.1",
                      0.96
                  ],
                  [
                      "v10.0",
                      0.36
                  ],
                  [
                      "v9.1",
                      0.54
                  ],
                  [
                      "v9.0",
                      0.13
                  ],
                  [
                      "v5.1",
                      0.2
                  ]
              ]
          },
          {
              name: "Edge",
              id: "Edge",
              data: [
                  [
                      "v16",
                      2.6
                  ],
                  [
                      "v15",
                      0.92
                  ],
                  [
                      "v14",
                      0.4
                  ],
                  [
                      "v13",
                      0.1
                  ]
              ]
          },
          {
              name: "Opera",
              id: "Opera",
              data: [
                  [
                      "v50.0",
                      0.96
                  ],
                  [
                      "v49.0",
                      0.82
                  ],
                  [
                      "v12.1",
                      0.14
                  ]
              ]
          }
      ]
  }
});

/* Second Graph2 */
Highcharts.chart('container5', {
  chart: {
      type: 'spline',
      inverted: true
  },
  title: {
      text: 'Atmosphere Temperature by Altitude'
  },
  subtitle: {
      text: 'According to the Standard Atmosphere Model'
  },
  xAxis: {
      reversed: false,
      title: {
          enabled: true,
          text: 'Altitude'
      },
      labels: {
          format: '{value} km'
      },
      accessibility: {
          rangeDescription: 'Range: 0 to 80 km.'
      },
      maxPadding: 0.05,
      showLastLabel: true
  },
  yAxis: {
      title: {
          text: 'Temperature'
      },
      labels: {
          format: '{value}°'
      },
      accessibility: {
          rangeDescription: 'Range: -90°C to 20°C.'
      },
      lineWidth: 2
  },
  legend: {
      enabled: false
  },
  tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x} km: {point.y}°C'
  },
  plotOptions: {
      spline: {
          marker: {
              enable: false
          }
      }
  },
  series: [{
      name: 'Temperature',
      data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
          [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
  }]
});

/* Second Graph3 */
Highcharts.chart('container6', {
  chart: {
      type: 'bar'
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