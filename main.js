//TODO:
// dodac żeby nie traktowal spacji jako znaku +
// dodac APi aby losował slowo do zgadniecia
// przechowywanie aktualnego stanu gry do localstorage
// reset button  
// dodac babela

//password
const word = 'słowo to telewizor';

//each char of password
const chars = word.toLowerCase().split(''); 
console.log(chars)
// ['s', 'ł', 'o', 'w', 'o']

const password = document.getElementById('password');
const score = document.getElementById('score');


const hideArr = new Array(chars.length);

function hidePassword() {
  for(let i=0; i<chars.length; i++) {
    hideArr[i] = '_';
    if(chars[i] == ' ') hideArr[i] = ' '
  }
  password.innerHTML = hideArr.join('');
}
hidePassword()


function indexOfChar(array, element) {
  let counts = []
  for(let i=0; i < chars.length; i++) {
    if(array[i] === element) {
      counts.push(i);
    }
  }
  return counts
}

let tries = 0;

function checkPassword() {
  if(chars.includes(this.innerHTML)) {
    let indexs = indexOfChar(chars, this.innerHTML);
    indexs.forEach(index => {
      hideArr[index] = this.innerHTML;
      return password.innerHTML = hideArr.join('')
    })
  }
  else {
    return
  }
}

function changeStyles() {
  if(!hideArr.includes('_')) score.innerHTML = "Wygrałes !"
  
  if(chars.includes(this.innerHTML)) {
    this.removeEventListener('click', checkPassword);
    this.removeEventListener('click', changeStyles);
    this.style.backgroundColor = '#00ff00';
  }
  else {
    const hangmanPic = document.querySelector('.hangmanPic');
    const picContainer = document.querySelector('.picture');
    if(tries>=9) {
      score.textContent = 'PRZEGRAŁEŚ';
      picContainer.innerHTML = '';
      buttons.forEach(btn => btn.removeEventListener('click', checkPassword)) 
    }
    this.style.backgroundColor = '#ff0000';
    tries++ 
    hangmanPic.src = `./img/s${tries}.jpg`;
    this.removeEventListener('click', checkPassword);
    this.removeEventListener('click', changeStyles);
  }
}

//buttons
const nodeButtons = document.querySelectorAll('button');
const buttons = [...nodeButtons];
const addClickEvent = buttons.forEach(btn => { 
  btn.addEventListener('click', checkPassword)
  btn.addEventListener('click', changeStyles)
});






















