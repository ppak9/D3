data.forEach(function(d){
    d.us_gross = parseFloat(d.us_gross);
    d.rotten_rating = parseFloat(d.rotten_rating);
});

let svgWidth = 550;
let svgHeight = 550;
let margin ={top:20, right:10, bottom:30, left: 40};
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;
let svg = d3.select('#plot')
            .append('svg')
                .attr('width',svgWidth)
                .attr('height',svgHeight)
                .append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);


let x = d3.scaleLinear()
            .domain([
                d3.min(data,d=>d.rotten_rating),
                d3.max(data,d=>d.rotten_rating)
            ]
            )
            .range([0, width]);

let y = d3.scaleLinear()
            .domain([
                d3.min(data,d=>d.us_gross),
                d3.max(data,d=>d.us_gross)
            ])
            .range([height,0]);

let color = d3.scaleOrdinal()
    .domain(['전체관람가', '7세이상', '15세이상', '19세이상'])
    .range(['#3366cc', '#109618', '#ff9900', '#dc3912']);


let circle = svg.selectAll('circle')
                .data(data)
                .join('circle')
                    .attr('r',3.5)
                    .attr('cx',d => x(d.rotten_rating))
                    .attr('cy',d => y(d.us_gross))
                    .attr('fill',d => color(d.rating))


let xAxis = d3.axisBottom(x);
let yAxis = d3.axisLeft(y);

svg
    .append('g')
    .attr('transform',`translate(0,${height})`)
    .call(xAxis)

svg
    .append('g')
    .call(yAxis)
    // .attr('transform',`translate(${width},0)`);

// 계속 g 항목마다 g를 추가해주어야 함 

let brush = d3.brush()
                .extent([[0,0],[width,height]])
                .on("start brush end",brushed);

svg
    .append('g')
    .call(brush);


function brushed({selection}){
    if(selection === null){
        circle.classed("selected",false);
    }
    else{
        let [[x0,y0],[x1,y1]] = selection;
        // 한 변수 안에 다른 변수들을 담게 하는 것이 selection 담는 것
        circle.classed("selected",d => {
            let xCoord = x(d.rotten_rating);
            let yCoord = y(d.us_gross);
            return x0 <= xCoord && xCoord<= x1
                && y0 <= yCoord && yCoord <= y1;
        });
    }
}

// circle.on('mouseover',function(_event,d){
//     d3.selectAll('.'+d.id).classed('hovered',true);
// });