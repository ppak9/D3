let students = [
    {"name": "Jane", "score": 80}, 
    {"name": "John", "score": 90}, 
    {"name": "Bob", "score": 60}
];


let minScore = 0; 
let maxScore = 100; 
let barWidth = 50; 
let maxHeight = 200; 
let margin = 10;

let svg = document.getElementById('chart');
let spec = "http://www.w3.org/2000/svg";

students.forEach(function(student,i){
    let rect = document.createElementNS(spec,'rect');
    // document 안에 있는 node에 추가를 해서 , spec이라는 링크에서 받아서 rect라는 노드를 만드는거임
    rect.setAttribute("width",50);
    rect.setAttribute("height",60);
    rect.setAttribute('x',30);
    rect.setAttribute('y',50);

    rect.style.fill = 'steelblue';

    svg.appendChild(rect);
});