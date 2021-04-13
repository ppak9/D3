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

let type1 = document.querySelector(".selectXbutton");
let type2 = document.querySelector(".selectYbutton");
let xValue;
let yValue;

let xArray = [];
let yArray = [];

function randomExtract(input_array){
    return d3.shuffle(input_array).slice(0,100).sort()
}

type1.addEventListener('change',(event)=>{
    xValue = event.target.value;
    data.forEach(function(d){
        switch (xValue){
            case 'rotten_rating':
                d.rotten_rating = parseFloat(d.rotten_rating);
                xArray.push(d.rotten_rating);
                break;
            case 'worldwide_gross':
                d.worldwide_gross = parseFloat(d.worldwide_gross);
                xArray.push(d.worldwide_gross);
                break;
            case 'budget':
                d.budget = parseFloat(d.budget);
                xArray.push(d.budget);
                break;
            case 'us_gross':
                d.us_gross = parseFloat(d.us_gross);
                xArray.push(d.us_gross);
                break;
            case 'imdb_rating':
                d.imdb_rating = parseFloat(d.imdb_rating);
                xArray.push(d.imdb_rating);
                break;
            case 'imdb_votes':
                d.imdb_votes = parseFloat(d.imdb_votes);
                xArray.push(d.imdb_votes);
                break;
        }
   
    })
})

type2.addEventListener('change',(event)=>{
    yValue = event.target.value;
    data.forEach(function(d){
        switch (yValue){
            case 'rotten_rating':
                d.rotten_rating = parseFloat(d.rotten_rating);
                yArray.push(d.rotten_rating);
                break;
            case 'worldwide_gross':
                d.worldwide_gross = parseFloat(d.worldwide_gross);
                yArray.push(d.worldwide_gross);
                break;
            case 'budget':
                d.budget = parseFloat(d.budget);
                yArray.push(d.budget);
                break;
            case 'us_gross':
                d.us_gross = parseFloat(d.us_gross);
                yArray.push(d.us_gross);
                break;
            case 'imdb_rating':
                d.imdb_rating = parseFloat(d.imdb_rating);
                yArray.push(d.imdb_rating);
                break;
            case 'imdb_votes':
                d.imdb_votes = parseFloat(d.imdb_votes);
                yArray.push(d.imdb_votes);
                break;
        }
    
    })
    console.log(yArray);
    yArray =[];

})


