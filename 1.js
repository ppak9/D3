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
    let height = student.score/maxScore*maxHeight;
    // 전체 score 중에서 max 의 백분율로 나타낸다음 이에 맞춰 maxHeight 에서 나오는 전체 기준으로 설정
    rect.setAttribute("width",barWidth);
    rect.setAttribute("height",maxHeight);
    rect.setAttribute('x',(barWidth+margin)*i);
    rect.setAttribute('y',maxHeight-height);
    // 전체에서 빼주기! x,y 가 역으로 되어있으니까!

    rect.style.fill = 'steelblue';

    svg.appendChild(rect);
});

// 이렇게 되면 개고생이라는 얘기
