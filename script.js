function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  

function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
  
    return [hours, minutes, seconds]
  }
  
  //btn.addEventListener('click', addValue)
  const stringDate = '2023-06-08T23:59:59'
  const date = new Date(stringDate);
  const atual = new Date();
  const miliseconds = date - atual
  
  
  let conversao = convertMsToTime(miliseconds); // 👉️ 15:00:00 (15 hours)


let btn = document.getElementById('btn')
let days_input = Math.trunc(miliseconds / (1000 * 60 * 60 * 24))
let hours_input = conversao[0]
let mins_input = conversao[1]
let secs_input = conversao[2]
let days = 0
let hours= 0
let mins = 0
let secs = 0
let all_secs = 0
let interval

function add0 (value) {
    //value <10? '0'+value:value == value;
    if (value < 10){
        return '0'+value;
    }
    else {
        return value;
    }
}
//catchValue vai pegar o valor digitado no formulário ao clicar
function catchValue () {
    all_secs=0
    days_input != "" && isNaN(Number(days_input)) == false? days = Number(days_input):days = 0;
    hours_input != "" && isNaN(Number(hours_input)) == false? hours = Number(hours_input):hours = 0;
    mins_input != "" && isNaN(Number(mins_input)) == false? mins = Number(mins_input):mins = 0;
    secs_input != "" && isNaN(Number(secs_input)) == false? secs = Number(secs_input):secs = 0;
    
    clearInterval(interval)   
}

//somaSecs irá converter os valores de dias horas e minutos em segundos e somar o total de segundo que irá servir como condição para a contagem
//quando o total de segundo chegar a zero, a contagem irá acabar
function somaSecs () {
    days > 0? all_secs += days*(24*60*60): all_secs += 0;
    hours > 0? all_secs += hours*(60*60): all_secs += 0;
    mins > 0? all_secs += mins*(60): all_secs += 0;
    secs > 0? all_secs += secs: all_secs += 0;
}

function decrementTime () {
    all_secs--
    if (all_secs >= 0) {
        secs--
        if (secs < 0) {
            secs= 59
            mins--
            if (mins < 0) {
                mins = 59
                hours--
                if(hours <0){
                    hours=23
                    days--
                }
            }

        }
    }
    if (all_secs < 0){
        clearInterval(interval)
        all_secs = 0
    }
    document.getElementById('secs').innerText = `${add0(secs)}`
    document.getElementById('mins').innerText = `${add0(mins)}`
    document.getElementById('hours').innerText = `${add0(hours)}`
    document.getElementById('days').innerText = `${add0(days)}`
}

function callFuncs () {
    somaSecs();
    document.getElementById('secs').innerText = `${add0(secs)}`
    document.getElementById('mins').innerText = `${add0(mins)}`
    document.getElementById('hours').innerText = `${add0(hours)}`
    document.getElementById('days').innerText = `${add0(days)}`
    
    interval = setInterval(decrementTime,1000)
}

catchValue ()
callFuncs()