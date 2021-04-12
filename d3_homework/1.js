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
    x2array.push(d.genre)
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

// console.log(dataX2);

let current = null;
let cnt = 0;

for(var i =0; i< dataX2.length;i++){
    if(dataX2[i] != current){
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

console.log(finalResult2);


// for(var i = 0; )

// console.log(Object.keys(dataX2).length);

// console.log(finalResult2)
// // // remove duplicate things in the finalResult2 of X funciton

// let x1 = d3.scaleLinear()
//             .domain([
//                 d3.min(finalResult, d => d.randX),
//                 d3.max(finalResult, d => d.randX)
//             ])
//             .range([0,width]);

// let y1 = d3.scaleLinear()
//             .domain([
//                 d3.min(finalResult, d => d.randY),
//                 d3.max(finalResult, d => d.randY)
//               ])
//             .range([height,0]);

// let testarray = []

// let x2 = d3.scaleBand()
//             .domain([
                
//             ])
//             .range([0,width]);

// let y2 = d3.scaleLinear()
//             .domain([
//                 d3.min(finalResult, d => d.randY),
//                 d3.max(finalResult, d => d.randY)
//               ])
//             .range([height,0]);

// let chart1 = d3.select('#plot')
//             .append('svg')
//                 .attr('width',svgWidth)
//                 .attr('height',svgHeight)
//                 .append('g')
//                     .attr('transform',`translate(${margin.left},${margin.top})`)

// let chart2 = d3.select('#plot')
//                 .append('svg')
//                     .attr('width',svgWidth)
//                     .attr('height',svgHeight)
//                     .append('g')
//                         .attr('transform',`translate(${margin.left},${margin.top})`)
                        
                        
// let circle = chart1.selectAll('circle')
//                 .data(finalResult)
//                 .join('circle')
//                     .attr('r', 3.5)
//                     .attr('cx',d=>x1(d.randX))
//                     .attr('cy',d=>y1(d.randY));

// let bars = chart2.selectAll('rect')
//                 .data(finalResult2)
//                 .join('rect')
//                     .attr('width',30)
//                     .attr('height',d=>y2(d.randY))
//                     .attr('trasnform',(d,i) =>`translate(${i*40},0)`);

// // display axis, define X axis as a number and the y too

// let x1Axis = d3.axisBottom(x1).ticks(5) // ticks 는 범위 얘기하는 거임(5 =500이니 1당 100)
// let y1Axis = d3.axisLeft(y1);

// let x2Axis = d3.axisBottom(x2).ticks(10)
// let y2Axis = d3.axisLeft(y2);

//     chart1.append('g')
//         .attr('transform',`translate(0,${height})`)
//         .call(x1Axis)

//     chart1.append('g')
//         .attr('transform',`translate(0,0)`)
//         .call(y1Axis);

//     chart2.append('g')
//         .attr('transform',`translate(0,${height})`)
//         .call(x2Axis);
    
//     chart2.append('g')
//         .attr('transform',`translate(0,0)`)
//         .call(y2Axis);
