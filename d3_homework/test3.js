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


let xTarget = document.querySelector('#selectX');
let yTarget = document.querySelector('#selectY');

let xData = [];
let yData = [];
let slicedX = [];
let slicedY = [];

data.forEach(function(d){
    d.rotten_rating = parseFloat(d.rotten_rating);
})


xTarget.addEventListener('change',function(event){
    let xValue= event.target.value;
    let xDot = data.map((d)=>d[xValue])
    d3.shuffle(xDot);
    for(var i = 0; i < 100 ; i++){
        xData[i] = xDot[i]
    }
    // console.log(xData);
    // myXChart(xData);
}
)

yTarget.addEventListener('change',function(event){
    let yValue= event.target.value;
    let yDot = data.map((d)=>d[yValue])
    d3.shuffle(yDot);
    for(var i = 0; i < 100 ; i++){
        yData[i] = yDot[i]
    }
    console.log(yData);
    console.log(typeof yData);
    console.log(yData.forEach(function(d,i){
        console.log(d);
    })
    )

})

//get test about the pre axis

let preX = d3.scaleLinear()
                .domain()
                .range([0,width])

let preY = d3.scaleLinear()
                .domain()
                .range([height,0])

let chart1 = d3.select('#plot')
                .append('svg')
                .attr('width',svgWidth)
                .attr('height',svgHeight)
                .append('g')
                    .attr('transform',`translate(${margin.left},${margin.top})`)

let xAxis = d3.axisBottom(preX);
let yAxis = d3.axisLeft(preY);

chart1.append('g')
        .call(xAxis);

chart1.append('g')
        .call(yAxis);

// put the function

function myXChart(data){
    let xScale = d3.scaleLinear()
                    .domain([
                        d3.min([data,d=>d]),
                        d3.max([data,d=>d])
                    ])
                    .range([0,width])
    let xRealAxis = d3.axisBottom(xScale);
    chart1.append('g')
            .call(xRealAxis);
}