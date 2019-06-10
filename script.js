
'use strict';

const log = console.log


document.querySelector("body button").addEventListener("click", fun)


function fun(e) {
    e.preventDefault();
    
    const exp = document.querySelector("body table #exp").value
    const gold = document.querySelector("body table #gold").value
    const cash = document.querySelector("body table #cash").value
    
    //log(exp.value)
    //log(gold.value)
    //log(cash.value)
    const factor = 100
    const raw = (exp*factor)/259.1 + Math.min(gold*factor+1000,cash*factor)/250
    
    const res =Math.round(raw * 10) / 10
    log(res)
    document.querySelector("body table #res").innerText = res
}

