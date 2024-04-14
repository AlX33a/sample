global.port = process.env.BACK_PORT;
global.ip = process.env.IP;
const port = process.env.BACK_PORT;
const ip = process.env.IP;

function send(event){
    event.preventDefault();
    const name = document.getElementById('username').value;
    const mail = document.getElementById('useremail').value;

    fetch(`http://${ip}:${port}/api/contact?email=${encodeURIComponent(mail)}&username=${encodeURIComponent(name)}`, {method: 'POST'}
);
    console.log(JSON.stringify({
        email: mail,
        username: name
        }
    ));
    return false;
}

window.onload = function(){
    let burger = document.getElementById("burger");
    document.getElementById('openb').addEventListener('click', open_burger);
    var arr = document.getElementsByClassName("close");
    Array.prototype.forEach.call(arr, function(el) {
        el.addEventListener('click', close_burger);
    });
    document.getElementById('button_cli').addEventListener('click', hello);
}

 document.addEventListener("click", (event) => {
    if (event.target.id === 'decrementBathrooms') {
       let bathrooms = document.getElementById('bathrooms');
        let num = parseInt(bathrooms.innerHTML.charAt(0));
        if ((num-1)===0) { 
                bathrooms.innerHTML = `1 санузел`;
            }
            else {
                bathrooms.innerHTML = `${num - 1} санузел`;
            }
        
    }
  });
  
  document.addEventListener("click", (event) => {
    if (event.target.id === 'decrementRooms') {
      let rooms = document.getElementById('rooms');
            let num = parseInt(rooms.innerHTML.charAt(0));
            if ((num-1) === 0) { 
                rooms.innerHTML = `1-комнатная`;
            }
            else {
                rooms.innerHTML = `${num - 1}-комнатная`;
            }
    }
  });

  

function close_burger(){
    burger.style.visibility = "hidden";
}

function open_burger(){
    burger.style.visibility = "visible";
}

function hello(){
    
let bathrooms = document.getElementById('bathrooms');
        let num1 = parseInt(bathrooms.innerHTML.charAt(0));
        let rooms = document.getElementById('rooms');
        let num2 = parseInt(rooms.innerHTML.charAt(0));
        let serv = document.getElementById('serv').value; 
    
 switch (true) {
  case (serv==='1'): 
     alert(`Стоимость уборки составит ${num1*num2*100} рублей.`);
    break;
  case (serv==='2'): {
       alert(`Стоимость уборки составит ${num1*num2*200} рублей.`);
        break;}
  case (serv==='3'):{
        alert(`Стоимость уборки составит ${num1*num2*300} рублей.`);
  }
    case (serv==='4'):{
       alert(`Стоимость уборки составит ${num1*num2*400} рублей.`);
    break;}
}
    
     
   
}

function incrementBathrooms(){
    let bathrooms = document.getElementById('bathrooms');
            let num = parseInt(bathrooms.innerHTML.charAt(0));
            
                  bathrooms.innerHTML = `${num + 1} санузел`;
}

function incrementRooms(){
    let rooms = document.getElementById('rooms');
            let num = parseInt(rooms.innerHTML.charAt(0));
            
                rooms.innerHTML = `${num + 1}-комнатная`;
                
}