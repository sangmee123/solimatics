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
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.868975, 127.738287), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options);

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.868975, 127.738287), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.868975, 127.738287); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null); 


let li1 = document.querySelector('.li1');
li1.addEventListener('click', function() {
  makerPosition = new kakao.maps.LatLng(37.673594, 126.865950); 
})

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