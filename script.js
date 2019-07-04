'use strict';

const log = console.log


document.getElementById("fixGoldNum").addEventListener("oninput", getRation);
document.getElementById("ration_limit").addEventListener("oninput", getRation);
document.getElementById("exp").addEventListener("oninput", getRation);
document.getElementById("gold").addEventListener("oninput", getRation);
document.getElementById("cash").addEventListener("oninput", getRation);
document.getElementById("Rjade").addEventListener("oninput", getRation);
document.getElementById("Djade").addEventListener("oninput", getRation);


window.getRation = getRation
window.balance = balance

getRation()
balance()



function getRation() {
    const fixGoldNum = document.querySelector("body table #fixGoldNum").value
    const exp = document.querySelector("body table #exp").value
    const gold = document.querySelector("body table #gold").value
    const cash = document.querySelector("body table #cash").value
    const Rjade = document.querySelector("body table #Rjade").value
    const Djade = document.querySelector("body table #Djade").value
    const ration_limit = document.querySelector("body table #ration_limit").value

    /*
    if (fixGoldNum==""){
         document.querySelector("body table #fixGoldNum").value ='0'
    }else{
       document.querySelector("body table #fixGoldNum").value = parseInt(fixGoldNum).toString()
    }
    */

    const factor = 100
    const rock2ration = 4.59;
    const device2ration = 13.28;

    const exp2ration = (exp * factor) / 259.1;

    const gold2ration_min = Math.min(gold * factor + fixGoldNum * 500, cash * factor) / 250
    const gold2ration_ave = (gold * factor + cash * factor) / 500


    const R_num_piece = Rjade / 10
    const D_num_piece = Djade / 10

    const Rjade2ration = (ration_limit / 18) * R_num_piece
    const Djade2ration = (ration_limit / 18) * D_num_piece


    const min_raw = exp2ration + gold2ration_min + Rjade2ration + Djade2ration
    const ave_raw = exp2ration + gold2ration_ave + Rjade2ration + Djade2ration



    document.querySelector("body table #Rjade_rat").innerText = getR(2 * rock2ration * R_num_piece)
    document.querySelector("body table #Rjade_cash").innerText = getR(1600 * R_num_piece)


    document.querySelector("body table #Djade_rat").innerText = getR(device2ration * D_num_piece)
    document.querySelector("body table #Djade_cash").innerText = getR(1000 * D_num_piece)


    document.querySelector("body table #Rmin").innerText = getR(min_raw)

    document.querySelector("body table #Rave").innerText = getR(ave_raw)



}


function getR(value) {
    const res = Math.round(value * 10) / 10

    return res
}







function balance() {
    const ration = parseInt(document.querySelector("body table #ration_budget").value)
    const cash = parseInt(document.querySelector("body table #cash_budget").value)


    const instance_1_7_rock = 1.24;
    const instance_S3_4_device = 1.0;
    const instance_S3_4_rock = 0.22;

    const coef_max_x = instance_1_7_rock / 2;
    const coef_max_y = instance_S3_4_rock / 2 + instance_S3_4_device;


    const coef_cash_x = instance_1_7_rock * 800;
    const coef_cash_y = instance_S3_4_rock * 800 + instance_S3_4_device * 1000;



    var solver = require("./src/solver"),
        model = [
                  `max: ${coef_max_x} x ${coef_max_y} y`,
                  `6 x 15 y 30 z <= ${ration}`,
                  `${coef_cash_x} x ${coef_cash_y} y -7500 z <= ${cash}`,

        ];

    // Reformat to JSON model    
    for(let i=0;i<model.length;i++){
        log(model[i]);
    }
    model = solver.ReformatLP(model);
    

    /*
    var solver = require("./src/solver"),
        model = {
            "optimize": "profit",
            "opType": "max",
            "constraints": {
                "ration": {
                    "max": ration
                },
                "cash": {
                    "max": cash
                },
            },
            "variables": {
                "x": {
                    "cash": coef_cash_x,
                    "profit": coef_max_x,
                    "x": 1,
                    "ration": 6
                },
                "y": {
                    "cash": coef_cash_y,
                    "profit": coef_max_y,
                    "y": 1,
                    "ration": 15
                },
                "z": {
                    "cash": -7500,
                    "profit": 0,
                    "z": 1,
                    "ration": 30
                }

            },
            "floats": {
                "x": 0,
                "y": 0,
                "z": 0
            }
        }
    */

    const res = solver.Solve(model);
    
    let ray = ["x","y","z"]
    for (let i=0;i<3;i++){
        let v = ray[i];
        if (!(v in res)){
            res[v] = 0;
        }
    }
    
    log(res);
    
    const times_1_7 = res["x"];
    const times_S3_4 = res["y"];
    const times_CE_5 = res["z"];
    
    
    
    document.querySelector("body table #times_1_7").innerText = getR(times_1_7)
    document.querySelector("body table #times_S3_4").innerText = getR(times_S3_4)
    document.querySelector("body table #times_CE_5").innerText = getR(times_CE_5)
    
    const ration_1_7 = times_1_7*6;
    const ration_S3_4 = times_S3_4*15;
    const ration_CE_5 = times_CE_5*30;
    
    const ration_surplus = ration - ration_1_7 -ration_S3_4-ration_CE_5;
    
    document.querySelector("body table #ration_1_7").innerText = getR(ration_1_7)
    document.querySelector("body table #ration_S3_4").innerText = getR(ration_S3_4)
    document.querySelector("body table #ration_CE_5").innerText = getR(ration_CE_5)
    document.querySelector("body table #ration_surplus").innerText = getR(ration_surplus)
    
    const count_rock = times_1_7*instance_1_7_rock + times_S3_4*instance_S3_4_rock;
    const count_device = times_S3_4*instance_S3_4_device;
    
    document.querySelector("body table #count_rock").innerText = getR(count_rock)
    document.querySelector("body table #count_device").innerText = getR(count_device)
    

    const cash_rock = count_rock*800;
    const cash_device = count_device*1000;
    const cash_CE_5 = times_CE_5*7500;
    
    const cash_surplus = cash+cash_CE_5 - cash_rock -cash_device;
    
    document.querySelector("body table #cash_rock").innerText = getR(cash_rock)
    document.querySelector("body table #cash_device").innerText = getR(cash_device)
    document.querySelector("body table #cash_CE_5").innerText = getR(cash_CE_5)
    document.querySelector("body table #cash_surplus").innerText = getR(cash_surplus)
    
    const orock_piece_rock = count_rock/2;
    const orock_piece_device = count_device;
    
    const jade_rock = orock_piece_rock*10;
    const jade_device = orock_piece_device*10;
    const jade_total = jade_rock + jade_device;
    
    
    document.querySelector("body table #jade_rock").innerText = getR(jade_rock)
    document.querySelector("body table #jade_device").innerText = getR(jade_device)
    document.querySelector("body table #jade_total").innerText = getR(jade_total)
    }  

/*以下有待建设*/
/*
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

*/
