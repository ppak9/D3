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

let XData = [];
let YData = [];
let slicedX = [];
let slicedY = [];


            

let x1 = d3.scaleLinear()
            .domain([
                d3.min(slicedX,(d,i)=>d[i]),
                d3.max(slicedX,(d,i)=>d[i])
            ])
            .range([0,width]);

let y1 = d3.scaleLinear()
            .domain([
                d3.min(slicedY,(d,i)=>d[i]),
                d3.max(slicedY,(d,i)=>d[i])
              ])
            .range([height,0]);
