
'use strict';

const log = console.log


document.querySelector("body button").addEventListener("click", fun)


function fun(e) {
    e.preventDefault();
    
    const fixGoldNum = document.querySelector("body table #fixGoldNum").value
    const exp = document.querySelector("body table #exp").value
    const gold = document.querySelector("body table #gold").value
    const cash = document.querySelector("body table #cash").value
    
    //log(exp.value)
    //log(gold.value)
    //log(cash.value)
    const factor = 100
    const min_raw = (exp*factor)/259.1 + Math.min(gold*factor+fixGoldNum*500,cash*factor)/250
    
    const Rmin =Math.round(min_raw * 10) / 10
    log(Rmin)
    document.querySelector("body table #Rmin").innerText = Rmin
    
    
    const ave_raw = (exp*factor)/259.1 + (gold*factor,cash*factor)/2/250
    
    const Rave =Math.round(ave_raw * 10) / 10
    log(Rave)
    document.querySelector("body table #Rave").innerText = Rave
}

