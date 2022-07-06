let hobbyDetails = document.cookie.split("=")
console.log(hobbyDetails)
let hobbiesString = hobbyDetails[1]
console.log(hobbiesString)
let hobbies = JSON.parse(hobbiesString)
console.log(hobbies)

let recommendButton=document.getElementById("button");
recommendButton.addEventListener("click", recommendHobby)
 


function printHobbies() {
  let ul = document.createElement("ul");
  //let li;
  let hobbyListDiv=document.getElementById("hobby-list")
hobbyListDiv.appendChild(ul)  
  for (let i = 0; i < hobbies.length; i++) {
   // console.log(hobbies[i])
    let li = document.createElement("li")
    li.innerHTML = "Hobby:" + hobbies[i].name, ", with price: " + hobbies[i].price
    ul.appendChild(li);
  }
  
}


function recommendHobby(){
  let index = Math.floor(Math.random() * hobbies.length)
  let p= document.getElementById("p")
  let span= document.createElement("span")
  p.appendChild(span)
  
  span.innerHTML=hobbies[index].name
}

printHobbies()
