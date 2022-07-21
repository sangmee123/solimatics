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
                color: 'white'
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
                color: 'white'
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
        text: 'Speedometer',
        style: {
            color: 'white'
        }
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

/*Graph5*/
Highcharts.chart('container5', {
    chart: {
        type: 'area',
        backgroundColor: 'rgba(24, 38, 51, 0.4)'
    },
    accessibility: {
        description: 'Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.'
    },
    title: {
        text: 'US and USSR nuclear stockpiles',
        style: {
            color: 'white'
        }
    },
    subtitle: {
        text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
            'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
            'armscontrol.org</a>'
    },
    xAxis: {
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        },
        accessibility: {
            rangeDescription: 'Range: 1940 to 2017.'
        }
    },
    yAxis: {
        title: {
            text: 'Nuclear weapon states'
        },
        labels: {
            formatter: function () {
                return this.value / 1000 + 'k';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
    },
    plotOptions: {
        area: {
            pointStart: 1940,
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'USA',
        data: [
            null, null, null, null, null, 6, 11, 32, 110, 235,
            369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
            20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
            26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
            24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
            21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
            10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
            5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
        ]
    }, {
        name: 'USSR/Russia',
        data: [null, null, null, null, null, null, null, null, null, null,
            5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
            1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
            11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
            30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
            37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
            21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
            12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
        ]
    }]
});