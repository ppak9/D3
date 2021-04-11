// 전체 logic 을 한 번 짜봅시다.
/* 일단 data 가지고 와서 가지고 온 데이터를 위에서 아래로,
그런식으로 가져가는 것이 일반적
*/

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

function shuffle(){
    return d3.shuffle('abcdefjhijklmnopqrstuvwxyz'.split(""))
                .slice(0,Math.floor(6 + Math.random()*20))
                .sort()
}

const svg = d3.select('body')
                .append('svg')
                .attr('width',100)
                .attr('height',100)
                .attr('viewBox',`0, -20 ,500, 33`)

async function showText(){
    while(true){
        const t = svg.transition()
                        .duration(750);

        svg.selectAll('text')
            .data(shuffle(),d=>d)
            .join(
                enter => enter.append('text')
                                .attr('fill','blue')
                                .attr('x',(d,i)=>i*15)
                                .attr('y',-30)
                                .text(d=>d) // text attribute 는 무엇인지 파악해 봐야함
                            .call(enter=>enter.transition(t)
                                .attr('y',0)),
                update => update
                                // append 한 번 되었으면 굳이 다시 할 이유는 없겠지??
                                .attr('fill','black')
                                .attr('y',0)
                            .call(update=>update.transition(t)
                                .attr('x',(d,i)=>i*15)
                                ),
                exit => exit
                            .attr('fill','red')
                        .call(exit=>exit.transition(t)
                            .attr('y',30)
                            .remove())
            );
        await sleep(2000);
    }
}

// 왜냐면 이 함수가 이번 과제에 주요 tema 가 될 듯 

showText();