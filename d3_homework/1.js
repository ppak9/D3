// build Data random extract
let x1array = [];
let y1array = [];
let x2array = [];
let y2array = [];
let svgWidth = 550;
let svgHeight = 550;
let margin = { top: 20, right: 10, bottom: 30, left: 80 };
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;
let firstX = [];
let firstY = [];
let shuffleX = [];
let shuffleY = [];
let shuffleX2
let finalX2 =[]


// random function 

function randomExtract(input_array){
    return d3.shuffle(input_array).slice(0,100).sort()
}

function randomShuffle(Value,resultarray){
    let testcase = d3.shuffle(Value);
    for(var i = 0; i <100; i++){
        resultarray[i] = parseFloat(testcase[i])
    }
}

// change function statement

function test(){
    d3.selectAll('.selection').remove();
}

d3.select('#selectX').on('change',function(event){
    let xValue = event.target.value;
    let xDot = data.map((d)=>d[xValue]);
    randomShuffle(xDot,shuffleX);
    updateXchart(shuffleX);
    test();
    brush();
})

d3.select('#selectY').on('change',function(event){
    let yValue = event.target.value;
    let yDot = data.map((d)=>d[yValue]);
    randomShuffle(yDot,shuffleY);
    // console.log(shuffleY);
    updateYchart(shuffleY);
    test();
    brush();
})

function updateXchart(xData){

    x1.domain(d3.extent(xData))
        chart1.selectAll('circle')
                .data(xData)
                .join('circle')
                .transition()
                .duration(780)
                .attr('cx',d=>x1(d))
        
        chart1.selectAll('#xaxis')
            .transition()
            .call(d3.axisBottom(x1));
}
    
function updateYchart(yData){
    
    y1.domain(d3.extent(yData))
    
        chart1.selectAll('circle')
            .data(yData)
            .join('circle')
            .transition()
            .duration(780)
            .attr('cy',d=>y1(d))
        
        chart1.selectAll('#yaxis')
            .transition()
            .call(d3.axisLeft(y1));
} 

data.forEach(function(d){
    d.budget = parseFloat(d.budget);
    d.worldwide_gross = parseFloat(d.worldwide_gross);
    //append for another data 
    x1array.push(d.budget);
    y1array.push(d.worldwide_gross); 
    x2array.push(d.genre);
})

let dataX1 = randomExtract(x1array);
let dataX2 = randomExtract(x2array);
let dataY = randomExtract(y1array);
let finalResult = []
let finalResult2 = []
let first2chartValue = []

// create new Data object that similar data.js

for(var i = 0; i < dataX1.length; i++){
    finalResult.push({
        randX:dataX1[i],
        randY:dataY[i]
    });
}

let x1 = d3.scaleLinear()
            .domain([
                d3.min(finalResult, d => d.randX),
                d3.max(finalResult, d => d.randX)
            ])
            .range([0,width]);

let y1 = d3.scaleLinear()
            .domain([
                d3.min(finalResult, d => d.randY),
                d3.max(finalResult, d => d.randY)
              ])
            .range([height,0]);

let x1Axis = d3.axisBottom(x1) // ticks 는 범위 얘기하는 거임(5 =500이니 1당 100)
let y1Axis = d3.axisLeft(y1);
            
let chart1 = d3.select('#plot')
            .append('svg')
                .attr('width',svgWidth)
                .attr('height',svgHeight)
                .append('g')
                    .attr('transform',`translate(${margin.left},${margin.top})`)

chart1.append('g')
    .attr('id','xaxis')
    .attr('transform',`translate(0,${height})`)
    .call(x1Axis)
            
chart1.append('g')
    .attr('id','yaxis')
    .call(y1Axis);

let circle = chart1.selectAll('circle')
    .data(finalResult)
    .join('circle')
        .attr('r', 3.5)
        .attr('cx',d=>x1(d.randX))
        .attr('cy',d=>y1(d.randY));

brush();

function brush(){
let brush = d3.brush()
              .extent([[0,0],[width,height]])
              .on('start brush end',brushed)


chart1.append('g')
        .call(brush)

function brushed({selection}){
    if(selection === null){
        circle.classed('selected',false);
    }
    else{
        let [[x0,y0],[x2,y2]]= selection;
        circle.classed('selected',d=>{
            let xCoord = x1(d.randX);
            let yCoord = y1(d.randY);
            return x0 <= xCoord && xCoord <= x2
                && y0 <= yCoord && yCoord <= y2; 
        });
    }
}
}
// draw graph2

let current = null;
let cnt = 0;

function datax2Count(data2C){
    for(var i =0; i < data2C.length;i++){
        if(data2C[i+1] != current){
            if(cnt > 0){
                finalX2.push({
                    randX:current,
                    randY:cnt
                })
            }
            current = data2C[i+1];
            cnt = 1;
        }
        else{
            cnt++;
        }
    }
}

// first value
    
for(var i =0; i < dataX2.length;i++){
    if(dataX2[i+1] != current){
        if(cnt > 0){
            first2chartValue.push({
                randX:current,
                randY:cnt
            })
        }
        current = dataX2[i+1];
        cnt = 1;
    }
    else{
        cnt++;
    }
}

first2chartValue.sort(function(a,b){
    return b.randY - a.randY;
}
)

// define chart 2 dummy

let x2 = d3.scaleBand()
        .domain(first2chartValue.map(function(d){
            return d.randX
        }))
        .range([0,width])
        .padding(0.3);

let y2 = d3.scaleLinear()
        .domain(
            [
                0,
                d3.max(first2chartValue,d=>d.randY)
            ]     
        )
        .range([height,0]);

let color = d3.scaleOrdinal()
                .domain(first2chartValue.map((d)=>d.randX))
                .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"])

let chart2 = d3.select('#plot')
                .append('svg')
                    .attr('width',svgWidth)
                    .attr('height',svgHeight)
                    .append('g')
                        .attr('transform',`translate(${margin.left},${margin.top})`)

// display axis, define X axis as a number and the y too

let x2Axis = d3.axisBottom(x2);
let y2Axis = d3.axisLeft(y2);

let bars = chart2.selectAll('rect')

bars.data(first2chartValue)
    .enter()
    .append('rect')
    .attr('x',(d)=>x2(d.randX))
    .attr('y',(d)=>y2(d.randY))
    .attr('width',x2.bandwidth())
    .attr('height',(d)=>height- y2(d.randY))
    .attr('id',(d)=>d.randX);

chart2.append('g')
        .attr('id','x2axis')
        .attr('transform',`translate(0,${height})`)
        .call(x2Axis);

chart2.append('g')
        .attr('id','y2axis')
        .call(y2Axis);

chart1.data(first2chartValue)
        .selectAll('circle')
        .style('fill',(d)=>color(d.randX))
        .attr('id',(d)=>d.randX);

chart2.data(first2chartValue)
    .selectAll('rect')
    .style('fill',(d)=>color(d.randX))

// 얘만 먹는 상태

// chart2.selectAll('rect')
//             .on('click',function(d){
//                 d3.selectAll('.'+ d.id).classed('hover',true);
//             })

// var hover = document.querySelector('.hover');

// console.log(hover)

// enter dummy

function updatebars(data){

    data.sort(function(a,b){
        return b.randY - a.randY;
    }
    );

    x2.domain(data.map(d=>d.randX));
    y2.domain([0,d3.max(data,d=>d.randY)]);

    chart2.selectAll('rect')
            .data(data)
            .join('rect')
            .transition()
            .duration(780)
            .attr('x',(d)=>x2(d.randX))
            .attr('y',(d)=>y2(d.randY))
            .attr('width',x2.bandwidth())
            .attr('height',(d) => height - y2(d.randY))
            .style('fill',(d)=>color(d.randX));

    chart2.selectAll('#x2axis')
        .transition()
        .call(d3.axisBottom(x2));

    chart2.selectAll('#y2axis')
        .transition()
        .call(d3.axisLeft(y2));
    
    chart1.selectAll('circle')
            .style('fill',(d)=>color(d.randX));
    
}

d3.select('#select2').on('change',function(event){
    let xValue = event.target.value;
    let xDot = data.map((d)=>d[xValue]);
    shuffleX2 = randomExtract(xDot);
    datax2Count(shuffleX2);
    console.log(finalX2);

    //delete undefined or find new algorithm
    updatebars(finalX2);
    finalX2 =[];
 
})
    