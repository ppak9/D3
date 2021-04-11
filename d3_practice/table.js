let myData = [{a:1, b:2, c:3}, {a:4, b:5, c:6}];
let keys = Object.keys(myData[0]);
// data 전체 select 들어가면 알 수 없고 가장 빠른 것만 먼저 선택해서 하면 됨

// data 는 원래 열로 처리되는 array 를 통해서 들어가기에

let table = d3.select('body').append('table').attr('id','table')
let thead = d3.select('table').append('thead').append('tr')
            .selectAll('td').data(keys).join('td')
            .text(k=>k);

let tbody = table.append('tbody')
let trs = tbody.selectAll('tr').data(myData).join('tr')

trs.selectAll('td')
    .data(k=>Object.entries(k))
    .join('td').text(d=>d[1]);


//테이블 만들어내는데 의미만 안다면.. 