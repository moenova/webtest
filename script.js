
'use strict';

const log = console.log


getRation()
getBalanceRD()

function getRation() {
    const fixGoldNum = document.querySelector("body table #fixGoldNum").value
    const exp = document.querySelector("body table #exp").value
    const gold = document.querySelector("body table #gold").value
    const cash = document.querySelector("body table #cash").value
    
    const Rjade = document.querySelector("body table #Rjade").value
    const Djade = document.querySelector("body table #Djade").value
    
    const ration_limit = document.querySelector("body table #ration_limit").value
    

    const factor = 100
    const rock2ration =4.59;
    const device2ration = 13.28;
    
    const exp2ration = (exp*factor)/259.1;
    
    const gold2ration_min = Math.min(gold*factor+fixGoldNum*500,cash*factor)/250
    const gold2ration_ave = (gold*factor+cash*factor)/500
    
    
    const R_num_piece = Rjade/10
    const D_num_piece = Djade/10
    
    const Rjade2ration = (ration_limit/18)*R_num_piece
    const Djade2ration = (ration_limit/18)*D_num_piece
    
    
    const min_raw =   exp2ration  + gold2ration_min + Rjade2ration   + Djade2ration
    const ave_raw =   exp2ration  + gold2ration_ave + Rjade2ration + Djade2ration
    

    
    document.querySelector("body table #Rjade_rat").innerText = getR(2*rock2ration*R_num_piece)
    document.querySelector("body table #Rjade_cash").innerText = getR(1600*R_num_piece)
    

    document.querySelector("body table #Djade_rat").innerText = getR(device2ration*D_num_piece)
    document.querySelector("body table #Djade_cash").innerText = getR(1000*D_num_piece)
   
    
    document.querySelector("body table #Rmin").innerText = getR(min_raw)
    
    document.querySelector("body table #Rave").innerText = getR(ave_raw)
    
    
    
}


function getR(value){
    const res = Math.round(value * 10) / 10
   
    return res
}


function getBalanceRD(){
    const Brock = document.querySelector("body table #Brock").value
    const Bdevice = document.querySelector("body table #Bdevice").value

    document.querySelector("body table #BcashRock").value = Brock*800    
    document.querySelector("body table #BcashDevice").value = Bdevice*1000
    
    document.querySelector("body table #BcashTotal").innerText = Brock*800  + Bdevice*1000
    document.querySelector("#Bjade").innerText = Brock*5 +Bdevice*10
    
}


function getBalanceCash(){
    const BcashRock = parseInt(document.querySelector("body table #BcashRock").value)
    const BcashDevice = parseInt(document.querySelector("body table #BcashDevice").value)
    
    document.querySelector("body table #BcashTotal").innerText = BcashRock + BcashDevice
    
    document.querySelector("body table #Brock").value = BcashRock/800
    document.querySelector("body table #Bdevice").value =BcashDevice/1000
    
    document.querySelector("#Bjade").innerText = BcashRock/160 + BcashDevice/100
    

}