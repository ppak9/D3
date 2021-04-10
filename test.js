

function randomTest(){
    return d3.shuffle('abcdefghijklmnopqrstuvwxyz'.split(""))
            .slice(Math.floor(6 + Math.random()*20))
            .sort()
}

let result = randomTest();
console.log(result);

const reducer = (acc,cur)=>{acc+cur}

d3.csv('test.csv').then(function(data){
    let sum = data.map(k =>k['a'])
                    .reduce((acc,cur)=>acc+cur,0)
    console.log(sum);
})


const testarray = [1,2,3,4,5];

const testreducer = (acc,cur) => acc+cur;

let result = testarray.reduce(testreducer,0);
console.log(result);