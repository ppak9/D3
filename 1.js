// let arr = [0,1,2];

// let even = arr.map((x)=>{return 2*x});
// let odd = arr.map((x)=>{return 2*x+1});

// let small = even.concat(odd).filter(x=>{
//     return x<3;
// })

// small = small.filter(function(x){return x === 0;});
// console.log(small);

let students =[
    {name:'john',scores:[10,20,30]},
    {name:'kim',scores:[30,40,50]},
    {
        name:'park',
        scores:[60,70,80]
    }
]

students.map(function(student){
    let sum = 0;
    student.scores.forEach(function(s){
        sum +=s
    })
    return {
        name:student.name,
        avg:sum / student.scores.length
    };
})
.sort(function(a,b){
    return b.avg-a.avg;
})
.forEach(function(student,rank){
    console.log(rank + ' ' + student.name);
})