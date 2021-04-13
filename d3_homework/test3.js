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
let sliced = [];

xTarget.addEventListener('change',function(event){
    let value= event.target.value;
    let XData = data.map((d)=>d[value]);
    // console.log(result)
    let testcase = d3.shuffle(XData);
    for(var i = 0; i <100;i++){
        sliced [i] = testcase[i]
    }
    // console.log(Object.keys(XData));
})

console.log(sliced);