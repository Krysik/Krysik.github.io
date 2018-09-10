//TODO:
// dodac żeby nie traktowal spacji jako znaku +
// dodac APi aby losował slowo do zgadniecia :/ 
// przechowywanie aktualnego stanu gry do localstorage
// reset button  +
// dodac babela 

//password
const word = 'słowo to telewizor';

//each char of password
const chars = word.toLowerCase().split(''); 
// ['s', 'ł', 'o', 'w', 'o']

const password = document.getElementById('password');
const score = document.getElementById('score');
const hangmanPic = document.querySelector('.hangmanPic');
let tries = 0;
let hideArr = new Array(chars.length);

function hidePassword() {
  for(let i=0; i<chars.length; i++) {
    hideArr[i] = '_';
    if(chars[i] == ' ') hideArr[i] = ' '
  }
  password.innerHTML = hideArr.join('');
}
hidePassword()

function localstorageGetItems() {
  if(typeof(Storage) !== "undefined") {
    if (localStorage.getItem('tries') != null) {
      tries = parseInt(localStorage.getItem('tries'));
      hangmanPic.src = `./img/s${tries}.jpg`;
    }
    if(localStorage.getItem('currPass') != null) {
      let curPass =  localStorage.getItem('currPass').split(',')
      hideArr = curPass;
      password.innerHTML = hideArr.join('')
      
    }
  }
}
localstorageGetItems();

function indexOfChar(array, element) {
  let counts = []
  for(let i=0; i < chars.length; i++) {
    if(array[i] === element) {
      counts.push(i);
    }
  }
  return counts
}



function checkPassword() {
  if(chars.includes(this.innerHTML)) {
    let indexs = indexOfChar(chars, this.innerHTML);
    indexs.forEach(index => {
      hideArr[index] = this.innerHTML;
      localStorage.setItem('currPass', hideArr);
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
    const picContainer = document.querySelector('.picture');
    if(tries>=9) {
      score.textContent = 'PRZEGRAŁEŚ';
      picContainer.innerHTML = '';
      buttons.forEach(btn => btn.removeEventListener('click', checkPassword));
    }
    this.style.backgroundColor = '#ff0000';
    tries++ 
    hangmanPic.src = `./img/s${tries}.jpg`;
    this.removeEventListener('click', checkPassword);
    this.removeEventListener('click', changeStyles);
    // localstorage
    localStorage.setItem('tries', tries);
  }
}


//buttons
const nodeButtons = document.querySelectorAll('.letter');
const buttons = [...nodeButtons];
const addClickEvent = buttons.forEach(btn => { 
  btn.addEventListener('click', checkPassword)
  btn.addEventListener('click', changeStyles)
});

// reset button
const resetBtn = document.querySelector('.reset');

document.querySelector('.reset')
  .addEventListener('click', function() {
    localStorage.clear()
    location.reload();
  })
















