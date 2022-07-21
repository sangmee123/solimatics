/*navBar 날짜 표시*/
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let json_data;
GET_value();

update_Graph1();
update_Graph2();
update_time();

let le;

function GET_value() {
    var js_timer1 = 0; 
    js_timer1 = setTimeout("GET_value()",1000);// 1초 단위로 갱신 처리
}

function update_time() {
    let js_timer3 = 0; 
    // let dateString = 'mac id = ' + json_data + ' 입니다.';
    // document.querySelector('.date').innerHTML = get_data;
    let dateString = year + '. ' + month + '. ' + day + '.';
    document.querySelector('.date').innerHTML = dateString;

    js_timer3 = setTimeout("update_time()",3000);// 3초 단위로 갱신 처리
}

/*Map API*/
let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.640695, 127.147675), // 지도의 중심좌표
        level: 11 // 지도의 확대 레벨
    };
let OriginalLocation = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
let positions = [
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
        //le = positions[i].title;
        marker.setMap(mapLoaction);

        update_Graph1(); 
        update_Graph2();
    })
}

/*Graph1*/
function update_Graph1() { 
    var js_timer2 = 0; 
    Highcharts.chart('container2', {
        chart: {
            type: 'bar',
            backgroundColor: 'rgba(24, 38, 51, 0.4)'
        },
        title: {
            text: '"작업 진도 현황"',
            style: {
                color: Highcharts.getOptions().colors[8]
            }
        },
        subtitle: {
            // text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
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
            data: [arr1[0],arr1[1],arr1[2],arr1[3],arr1[4]]
        }, {
            name: 'Year 1900',
            data: [arr2[0],arr2[1],arr2[2],arr2[3],arr2[4]]
        }, {
            name: 'Year 2000',
            data: [arr3[0],arr3[1],arr3[2],arr3[3],arr3[4]]
        }, {
            name: 'Year 2016',
            data: [arr4[0],arr4[1],arr4[2],arr4[3],arr4[4]]
        }]
    });
    //js_timer2 = setTimeout("update_Graph2()", 5000);// 5초 단위로 갱신 처리
}

/*Graph2*/
function update_Graph2() {
    Highcharts.chart('container3', {
        chart: {
            zoomType: 'xy',
            backgroundColor: 'rgba(24, 38, 51, 0.4)'
        },
        title: {
            text: '"천공 누적 작업시간"',
            style: {
                color: Highcharts.getOptions().colors[8]
            }
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} °C',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            },
            title: {
                text: 'Temperature',
                style: {
                    color: Highcharts.getOptions().colors[3]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Rainfall',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
    
        tooltip: {
            shared: true
        },
    
        series: [{
            name: 'Rainfall',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} mm</b> '
            }
        }, {
            name: 'Rainfall error',
            type: 'errorbar',
            yAxis: 1,
            data: [[48, 51], [68, 73], [92, 110], [128, 136], [140, 150], [171, 179], [135, 143], [142, 149], [204, 220], [189, 199], [95, 110], [52, 56]],
            tooltip: {
                pointFormat: '(error range: {point.low}-{point.high} mm)<br/>'
            }
        }, {
            name: 'Temperature',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            tooltip: {
                pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f}°C</b> '
            }
        }, {
            name: 'Temperature error',
            type: 'errorbar',
            data: [[6, 8], [5.9, 7.6], [9.4, 10.4], [14.1, 15.9], [18.0, 20.1], [21.0, 24.0], [23.2, 25.3], [26.1, 27.8], [23.2, 23.9], [18.0, 21.1], [12.9, 14.0], [7.6, 10.0]],
            tooltip: {
                pointFormat: '(error range: {point.low}-{point.high}°C)<br/>'
            }
        }]
    });
    
}

/*Graph3*/
Highcharts.chart('container4', {
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: 'rgba(24, 38, 51, 0.4)'
    },

    title: {
        text: 'Speedometer'
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 200,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'km/h'
        },
        plotBands: [{
            from: 0,
            to: 120,
            color: '#55BF3B' // green
        }, {
            from: 120,
            to: 160,
            color: '#DDDF0D' // yellow
        }, {
            from: 160,
            to: 200,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Speed',
        data: [80],
        tooltip: {
            valueSuffix: ' km/h'
        }
    }]

},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
                inc = Math.round((Math.random() - 0.5) * 20);

            newVal = point.y + inc;
            if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }

            point.update(newVal);

        }, 3000);
    }
});
