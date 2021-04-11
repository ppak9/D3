// build Data random extract
let testarray = [];
let testarray2 = [];
let svgWidth = 550;
let svgHeight = 550;
let margin = { top: 20, right: 10, bottom: 30, left: 40 };
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;



function randomExtract(input_array){
    return d3.shuffle(input_array).slice(0,100).sort()
}

data.forEach(function(d){
    d.budget = parseFloat(d.budget);
    d.worldwide_gross = parseFloat(d.worldwide_gross);
    //append for another data 
    testarray.push(d.budget);
    testarray2.push(d.worldwide_gross); 
})

let dataX = randomExtract(testarray);
let dataY = randomExtract(testarray2);
let finalResult = []

// create new Data object that similar data.js

for(var i = 0; i < dataX.length; i++){
    finalResult.push({
        randX:dataX[i],
        randY:dataY[i]
    });
}

console.log(finalResult);

let x = d3.scaleLinear()
            .domain([
                d3.min(finalResult, d => d.randX),
                d3.max(finalResult, d => d.randX)
            ])
            .range([0,width]);

let y = d3.scaleLinear()
            .domain([
                d3.min(finalResult, d => d.randY),
                d3.max(finalResult, d => d.randY)
              ])
            .range([height,0]);


let svg = d3.select('#plot')
            .append('svg')
                .attr('width',svgWidth)
                .attr('height',svgHeight)
                .append('g')
                    .attr('transform',`translate(${margin.left},${margin.top})`)

                    
let circle = svg.selectAll('circle')
                .data(finalResult)
                .join('circle')
                    .attr('r', 3.5)
                    .attr('cx',d=>x(d.randX))
                    .attr('cy',d=>y(d.randY));



// display axis, define X axis as a number and the y too

let xAxis = d3.axisBottom(x); 
let yAxis = d3.axisLeft(y);


    svg.append('g')
        .attr('transform',`translate(0,${height})`)
        .call(xAxis)

    
    svg.append('g')
        .attr('transform',`translate(0,0)`)
        .call(yAxis);