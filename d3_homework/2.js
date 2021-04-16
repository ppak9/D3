

let x2 = d3.scaleBand()
.domain(finalResult2.map(function(d){
    return d.randX
}))
.range([0,width]);

let y2 = d3.scaleLinear()
.domain(
    [
        0,
        d3.max(finalResult2,d=>d.randY)
    ]       
)
.range([height,0]);

let chart2 = d3.select('#plot')
        .append('svg')
            .attr('width',svgWidth)
            .attr('height',svgHeight)
            .append('g')
                .attr('transform',`translate(${margin.left},${margin.top})`)

// display axis, define X axis as a number and the y too

let x2Axis = d3.axisBottom(x2);
let y2Axis = d3.axisLeft(y2);

let bars = chart2.selectAll('rect').data(finalResult2)


// change updatebars
bars.enter()
.append('rect')
.attr('x',(d)=>x2(d.randX))
.attr('y',(d)=>y2(d.randY))
.attr('width',x2.bandwidth())
.attr('height',(d)=>height- y2(d.randY));

chart2.append('g')
.attr('transform',`translate(0,${height})`)
.call(x2Axis);

chart2.append('g')
.call(y2Axis);

