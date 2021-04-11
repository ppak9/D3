

// array 에 주어진 것들을 반복적으로 수식 처리를 하는 것을 말하는 것 같음

const svg = d3.select('body')
                .append('svg')
                .attr('width',100)
                .attr('height',100)
                .attr('viewBox',`0 -20 500 33`);


function randomLetters(){
    return d3.shuffle('abcdefghijklmnopqrstuvwxyz'.split(""))
        .slice(0,Math.floor(6+Math.random()*20))
        // 얘는 대체 무슨 소리지? 왜 저렇게 짠거지?
        // floor 의 경우, 소수점을 제외한 숫자를 취하는 것이고,
        .sort();

        /*
            주어진 모든 문자열을 구간마다 나누어 섞어준다
        */
}

let testresult = randomLetters();

console.log(typeof testresult); // object

function sleep(ms){
    return new Promise(resolve =>{
        setTimeout(resolve,ms)
    })
}

// async 안에 왜 await 이 없지? 반환해야 할텐데

// async , await 는 fetch 함수 안에서 콜백으로 받을 때
// 관련한 결과값을 (get..) 이런 애들 받기 전에 실행 안 하는 것을 말한다.

async function showText(){
    while(true){
        const t = svg.transition()
                        .duration(750);
    
        svg.selectAll('text')
            .data(randomLetters(),d=>d)
            // data, 즉 join 된  data들만을 반환하기 위해 data 관련한 함수를 사용
            
            .join(
                enter => enter.append('text')
                                .attr('fill','green')
                                .attr('x',(d,i)=>i*16)
                                .attr('y',-30)
                                .text(d=>d)
                            .call(enter=>enter.transition(t)
                                .attr('y',0)),
                update => update
                            .attr('fill','black')
                            .attr('y',0)
                        .call(update => update.transition(t)
                            .attr('x',(d,i)=>i*16)),
                exit => exit
                            .attr('fill','brown')
                        .call(exit=>exit.transition(t)
                            .attr('y',30)
                            .remove())
                );
            await sleep(2000);
    }
}

showText();