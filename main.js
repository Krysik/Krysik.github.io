//password
const word = 'yo';

//each char of password
const chars = word.toLowerCase().split(''); 
// ['s', 'ł', 'o', 'w', 'o']

const password = document.getElementById('password');
const hiddenPassword = document.getElementById('hidePassword');


const hideArr = new Array(chars.length);

function hidePassword() {
  for(let i=0; i<chars.length; i++) {
    hideArr[i] = '_'
  }
  password.innerHTML = hideArr.join(' ');
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

passwordArr = new Array(word.length);

function checkPassword() {
  if(chars.includes(this.innerHTML)) {
    let indexs = indexOfChar(chars, this.innerHTML);
    indexs.forEach(index => {
      hideArr[index] = this.innerHTML;
      return password.innerHTML = hideArr.join(' ')
    })
  }
  else {
    return
  }
}

function changeStyles() {
  if(!hideArr.includes('_')) {hiddenPassword.innerHTML = "Wygrałes !"}
  if(chars.includes(this.innerHTML)) {
    this.removeEventListener('click', checkPassword);
    this.removeEventListener('click', changeStyles);
    this.style.backgroundColor = '#00ff00';
  }
  else {
    const hangmanPic = document.querySelector('.hangmanPic');
    const picContainer = document.querySelector('.picture');
    if(tries>=9) {
      password.textContent = 'PRZEGRAŁEŚ';
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






















