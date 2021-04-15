let svgWidth = 550;
let svgHeight = 550;
let margin = { top: 20, right: 10, bottom: 30, left: 80 };
let w = svgWidth - margin.left - margin.right;
let h = svgHeight - margin.top - margin.bottom;


var dataCase =['rotten_rating','worldwide_gross','budget','us_gross','imdb_rating','imdb_votes'];


function randomShuffle(Value,resultarray){
    let testcase = d3.shuffle(Value);
    for(var i = 0; i <100; i++){
        resultarray[i] = parseFloat(testcase[i])
    }
}

function randomExtract(input_array){
    return d3.shuffle(input_array).slice(0,100).sort()
}


let firstX = []
let firstY = []
let shuffleX = []
let shuffleY = []


data.forEach(function(d){
    d.rotten_rating = parseFloat(d.rotten_rating);
    d.worldwide_gross = parseFloat(d.worldwide_gross);
    firstX.push(d.rotten_rating);
    firstY.push(d.worldwide_gross);
})

firstX = randomExtract(firstX);
firstY = randomExtract(firstY);

let finalResult = [];

for(var i = 0; i < firstX.length; i++){
    finalResult.push({
        randX:firstX[i],
        randY:firstY[i]
    });
}

function updateXchart(xData){
    chart1.selectAll('circle')
        .data(xData)
        .transition()
        .duration(780)
        .attr('cx',d=>x1(d))
}

function updateYchart(yData){
    chart1.selectAll('circle')
        .data(yData)
        .transition()
        .duration(780)
        .attr('cy',d=>y1(d))
}

d3.select('#selectX')
    .selectAll('myoptionX')
    .data(dataCase)
    .enter()
        .append('option')
        .text(function(d){
            return d
        })
        .attr('value',function(d){return d;})

d3.select('#selectY')
        .selectAll('myoptionY')
        .data(dataCase)
        .enter()
            .append('option')
            .text((d)=>d)
            .attr('value',(d)=>d);

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



let chart1 = d3.select('#plot')
        .append('svg')
            .attr('width',svgWidth)
            .attr('height',svgHeight)
            .append('g')
                .attr('transform',`translate(${margin.left},${margin.top})`)


let x1 = d3.scaleLinear()
        .domain([
            d3.min(finalResult,d=>d.randX),
            d3.max(finalResult,d=>d.randX)
        ])
        .range([0,w])

let y1 = d3.scaleLinear()
        .domain([
            d3.min(finalResult,d=>d.randY),
            d3.max(finalResult,d=>d.randY)
        ])
        .range([h,0])

let x1Axis = d3.axisBottom(x1);
let y1Axis = d3.axisLeft(y1);               

let circle = chart1.selectAll('circle')
                .data(data)
                .join('circle')
                    .attr('r',3.5)
                    .attr('cx',d=>x1(d.rotten_rating))
                    .attr('cx',d=>y1(d.worldwide_gross))

chart1.append('g')
    .attr('transform',`translate(0,${h})`)
    .call(x1Axis)

chart1.append('g')
    .call(y1Axis);                



//change X graph

