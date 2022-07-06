let inputField = document.getElementById("input")// inputField este var care tine obiectul coresp acestui input HTML si document tine elem html si apelam functia getElementById si ii pasam ca par un string care reprez un id care este definit in codul HTML
let messagesContainer = document.getElementById("messages");
inputField.addEventListener("keypress", getInputValue) //functionalitatea este: cand se da enter textul se duce din input in containerul alb(id-ul messages):

let scanner;
let hobbyNumber = 0
let hobbies = []
document.cookie=""

//talkAboutHobbies()
addBotEntry(getMenuString()) //similara cu liniile 22-23



function getInputValue(event) {  //aceasta functie se declanseaza cand se da ENTER
  if (event.key === "Enter") {

    let inputValue = inputField.value;//inputField-ia valoarea din input 
    inputField.value = ""// "" -curatam input-ul
    //console.log(inputValue)

    addUserEntry(inputValue)//val var InputValue
    performSelectedAction(inputValue)
    let menu = getMenuString()
    addBotEntry(menu)
  }
}
function addUserEntry(input) {//parametrul este pentru 
  let userMessageDiv = document.createElement("div");//se creeaza un div in care se pune val din input(.value) pe care amluat-o de la linia < let inputValue = inputField.value;>
  userMessageDiv.className = "user-message"//ii dam un numede clasa la userMessage//user-messages l-am folosit in css pt stilizare,clasa user-messages
  // userMessageDiv.id="user-message"
  userMessageDiv.innerText = input;//input value??~!!
  messagesContainer.appendChild(userMessageDiv);//apoi usserMessage il pune ca copil la containerul de mesaje 
}

//!pt reutilizare punem intr-o functie

function addBotEntry(input) {
  let botMessageDiv = document.createElement("div")
  botMessageDiv.className = "bot-message";
  botMessageDiv.innerText = input;
  messagesContainer.appendChild(botMessageDiv)
}

function talkAboutHobbies() {
  let option
  do {
    printMenu()
    console.log('Alege o optiune')
    option = scanner.questionInt()
    performSelectedAction(option)
  } while (option != 5)
}

function getMenuString() {
  let menu = 'Salutare, eu sunt chatbot-ul tau. Cu ce te pot ajuta?' +
    '\n1. Adauga un hobby' + //  \n reprez caracterul de Enter
    '\n2. Cat ma costa un hobby' +
    '\n3. Care este cel mai ieftin hobby' +
    '\n4. Stergere hobby' +
    '\n5. Recomanda-mi un hobby pentru azi' +
    '\n6. Gata cu hobby-urile';
  return menu;
}

function handleOption1(input) {
  let hobbyDetails = input.split(",")// ["tenis", "44]"
  let hobbyName = hobbyDetails[0]
  let hobbyPrice = hobbyDetails[1]
  let hobby = {
    name: hobbyName,
    price: hobbyPrice
  }
  addHobby(hobby)
  addBotEntry("Hobby-urile tale sunt: " + JSON.stringify(hobbies))
}

function addHobby(hobby) {
  hobbies[hobbyNumber] = hobby
  hobbyNumber++
}

function handleOption2(hobbyName) {
  // console.log('Introdu numele hobby-ului:')
  // let hobbyName = scanner.question();
  let price = getHobbyPrice(hobbyName);
  addBotEntry('Produsul este: ' + price);
}

function getHobbyPrice(hobbyName) {
  for (let i = 0; i < hobbies.length; i++) {
    if (hobbies[i].name == hobbyName) {
      return hobbies[i].price;
    }
  }
}

function handleOption3() {
  //let price = getHobbyPrice(hobbyName);
  let min = hobbies[0].price;
  let index=0;
 
  for (let i = 1; i < hobbies.length; i++) {
    if (min > hobbies[i].price) {
      min = hobbies[i].price;
      index = i;
    }
  }
  console.log("index", index)
  console.log("hobbies[index]:" + hobbies[index])
  
  addBotEntry("Cel mai ieftin hobby este: " + hobbies[index].name)
}

function handleOption4(hobbyName) {
  //addBotEntry("Introdu numele: ")
  //let hobbyName = scanner.question();
 
  let index;
  for (let i = 0; i < hobbies.length; i++) {
    if (hobbyName == hobbies[i].name) {
      index = i;
    }
  }
  for (let i = index; i < hobbies.length; i++) {
    hobbies[i] = hobbies[i + 1];
  }
  //hobbyNumber--;
  hobby.length--
  addBotEntry("Hobby-ul a fost sters:" + JSON.stringify(hobbies));
  
}

function handleOption5() {
  let index = Math.floor(Math.random() * hobbies.length);
  addBotEntry("Poti sa exersezi hobby-ul: " + hobbies[index].name);
}



function performSelectedAction(input) {
  //option = "1:tenis,44"
  let optionDetails = input.split(":")
  let option = optionDetails[0] //1
  //optionDetails[1] = "tenis,44"
  console.log(option)
  let hobbyDetails = optionDetails[1]
  console.log(hobbyDetails)
  switch (Number(option)) {
    case 1:
      handleOption1(hobbyDetails)
      //addBotEntry("Hobby-urile tale sunt: " + JSON.stringfy(hobbies))
      break
    case 2:
      handleOption2(hobbyDetails)
      break

    case 3:
      handleOption3()
      break
    case 4:
      handleOption4(hobbyDetails)
      break
    case 5:
      handleOption5()
      break

    case 6:
      addBotEntry('Ma bucur ca te-am putut ajuta.')
      document.cookie="hobbies= " + JSON.stringify(hobbies)
      break
    default:
      addBotEntry('Introdu o optiune intre 1 si 5.')
  }
}