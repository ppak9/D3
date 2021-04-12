
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

let dataX2 = randomExtract(x2array);
let finalResult = []
let finalResult2 = []

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


let x = d3.scaleBand()
            .domain(finalResult2.map(function(d){
                return d.randX
            }))
            .range([0,width]);

let y = d3.scaleLinear()
            .domain(
                [
                    0,
                    d3.max(finalResult2,d=>d.randY)
                ]       
            )
            .range([height,0]);

let chart = d3.select('#plot')
                .append('svg')
                    .attr('width',svgWidth)
                    .attr('height',svgHeight)
                    .append('g')
                        .attr('transform',`translate(${margin.left},${margin.top})`);
        
let xAxis = d3.axisBottom(x);
let yAxis = d3.axisLeft(y);

console.log(finalResult2);

chart.append('g')
    .attr('transform',`translate(0,${height})`)
    .call(xAxis);

chart.append('g')
    .call(yAxis);


let bars = chart.selectAll('rect').data(finalResult2)

bars.enter()
    .append('rect')
    .attr('x',(d)=>x(d.randX))
    .attr('y',(d)=>y(d.randY))
    .attr('width',x.bandwidth())
    .attr('height',(d)=>height- y(d.randY));

                    
