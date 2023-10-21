const input = document.querySelector("#input");
const lista = document.querySelector("#list-container");
const knapp = document.querySelector("#button");
const info = document.querySelector("#warning");
const färdig = document.querySelector("#completed");

let färdigaToDo = 0;
const todoArray = [];
const enkelToDoArray = [];

function ändraStatus(TodoText, färdig){
    let korrektIndexVärde = todoArray.map(t => t.name).indexOf(TodoText);
    todoArray[korrektIndexVärde].status = färdig;
}


knapp.addEventListener("click", function(){

    const text = input.value;

    if(text.length == 0){
        info.innerText = "Input must not be empty";
        info.classList.add("warning_blink");
        return;
    }
    else{
        info.innerText = "";
    }

    const TodoObjekt = {name: text, status: false};
    todoArray.push(TodoObjekt);

    enkelToDoArray.push(text);

    const item = document.createElement("li");

    lista.appendChild(item);

    const itemLabel = document.createElement("p");

    itemLabel.innerText = text;
    // item.appendChild(itemLabel);

    const papperskorg = document.createElement("span");

    papperskorg.innerHTML = "&#x1F5D1";
    papperskorg.setAttribute("class", "papperskorg");
    // item.appendChild(papperskorg);

    itemLabel.addEventListener("click", function(){
        if(item.getAttribute("class")=="färdig"){
            item.setAttribute("class", "");
            let markeradText = item.firstChild.firstChild.textContent;
            ändraStatus(markeradText, false);
            färdigaToDo--;
        }
        else{
            item.setAttribute("class", "färdig")
            let markeradText = item.firstChild.firstChild.textContent;
            ändraStatus(markeradText, true);
            färdigaToDo++;
        }
        färdig.innerText = `${färdigaToDo} completed`;

    })

    papperskorg.addEventListener("click", function(){
        if(item.getAttribute("class")=="färdig"){
            färdigaToDo--;
            färdig.innerText = `${färdigaToDo} completed`;
        }
        
        let TaBortText = item.firstChild.firstChild.textContent;
        let indexTaBort = enkelToDoArray.indexOf(TaBortText);
        enkelToDoArray.splice(indexTaBort, 1);
        todoArray.splice(indexTaBort, 1);

        item.remove();
    })

    item.appendChild(itemLabel);
    item.appendChild(papperskorg);

    input.value = "";

})