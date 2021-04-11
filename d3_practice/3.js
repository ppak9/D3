let myData = [{a:1, b:2, c:3}, {a:4, b:5, c:6}];

let keys = Object.keys(myData[0]);
console.log(keys);
// myData[0] 하나만 넘어오더라도 알아서 다 붙어옴
// index 와 함께 a,b,c 가 같이 붙어서 옴

let table = d3.select('body').append('table').attr('id','table');

// console.log(table);

let thead = table.append('thead').append('tr')
            .selectAll('td').data(keys).join('td')
            .text(k=>k)

// head 는 가장 위에 항목이 되는 요소
// console.log(thead)

let tbody = table.append('tbody');
let trs = tbody.selectAll('tr').data(myData).join('tr');

// 

trs.selectAll('td')
    .data(k=>Object.entries(k))
    // object entries 로 쪼개서 나타내줄 수 있다는 것
    .join('td').text(d=>d[1]);