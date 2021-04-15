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


function randomExtract(input_array){
    return d3.shuffle(input_array).slice(0,100).sort()
}

data.forEach(function(d){
    d.budget = parseFloat(d.budget);
    d.worldwide_gross = parseFloat(d.worldwide_gross);
    //append for another data 
    x1array.push(d.budget);
    y1array.push(d.worldwide_gross); 
    x2array.push(d.rating);
})

let dataX1 = randomExtract(x1array);
let dataX2 = randomExtract(x2array);
let dataY = randomExtract(y1array);
let finalResult = []
let finalResult2 = []
// create new Data object that similar data.js

for(var i = 0; i < dataX1.length; i++){
    finalResult.push({
        randX:dataX1[i],
        randY:dataY[i]
    });
}

// set data for second graph

let current = null;
let cnt = 0;

for(var i =0; i< dataX2.length;i++){
    if(dataX2[i+1] != current){
        if(cnt > 0){
            finalResult2.push({
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

let chart1 = d3.select('#plot')
            .append('svg')
                .attr('width',svgWidth)
                .attr('height',svgHeight)
                .append('g')
                    .attr('transform',`translate(${margin.left},${margin.top})`)

let chart2 = d3.select('#plot')
                .append('svg')
                    .attr('width',svgWidth)
                    .attr('height',svgHeight)
                    .append('g')
                        .attr('transform',`translate(${margin.left},${margin.top})`)
                        
                        
let circle = chart1.selectAll('circle')
                .data(finalResult)
                .join('circle')
                    .attr('r', 3.5)
                    .attr('cx',d=>x1(d.randX))
                    .attr('cy',d=>y1(d.randY));


let bars = chart2.selectAll('rect').data(finalResult2)

bars.enter()
    .append('rect')
    .attr('x',(d)=>x2(d.randX))
    .attr('y',(d)=>y2(d.randY))
    .attr('width',x2.bandwidth())
    .attr('height',(d)=>height- y2(d.randY));

// display axis, define X axis as a number and the y too

let x1Axis = d3.axisBottom(x1) // ticks 는 범위 얘기하는 거임(5 =500이니 1당 100)
let y1Axis = d3.axisLeft(y1);

let x2Axis = d3.axisBottom(x2);
let y2Axis = d3.axisLeft(y2);

    chart1.append('g')
        .attr('id','xaxis')
        .attr('transform',`translate(0,${height})`)
        .call(x1Axis)

    chart1.append('g')
        .attr('id','yaxis')
        .call(y1Axis);

    chart2.append('g')
        .attr('transform',`translate(0,${height})`)
        .call(x2Axis);
    
    chart2.append('g')
        .call(y2Axis);

function randomShuffle(Value,resultarray){
    let testcase = d3.shuffle(Value);
    for(var i = 0; i <100; i++){
        resultarray[i] = parseFloat(testcase[i])
    }
}

let firstX = [];
let firstY = [];
let shuffleX = [];
let shuffleY = [];


d3.select('#selectX').on('change',function(event){
            let xValue = event.target.value;
            let xDot = data.map((d)=>d[xValue]);
            randomShuffle(xDot,shuffleX);
            updateXchart(shuffleX);
})
    
d3.select('#selectY').on('change',function(event){
        let yValue = event.target.value;
        let yDot = data.map((d)=>d[yValue]);
        randomShuffle(yDot,shuffleY);
        // console.log(shuffleY);
        updateYchart(shuffleY);
})

function updateXchart(xData){

x1.domain(d3.extent(xData))

    
    chart1.selectAll('circle')
            .data(xData)
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
        .transition()
        .duration(780)
        .attr('cy',d=>y1(d))
    
    chart1.selectAll('#yaxis')
        .transition()
        .call(d3.axisLeft(y1));
} 
  
