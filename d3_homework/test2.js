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

let type1 = document.querySelector("#selectButton");
let xValue;
let yValue;


type1.addEventListener('change',(event)=>{
    xValue = event.target.value;
    let newarray = [];
    data.forEach(function(d){
        switch (xValue){
            case 'rotten_rating':
                d.rotten_rating = parseFloat(d.rotten_rating);
                newarray.push(d.rotten_rating);
                break;
            case 'worldwide_gross':
                d.worldwide_gross = parseFloat(d.worldwide_gross);
                newarray.push(d.worldwide_gross);
                break;
        }

    })
    console.log(newarray);
})

