
// password
let word;


// Fetch password from node server
function fetching(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send(null);

  if(request.status == 200) {
    const jsonResp = JSON.parse(request.response);
    word = jsonResp.word;
  }
}

fetching('https://backend-hangman.herokuapp.com/generate');

//each char of password
const chars = word.toLowerCase().split('');
chars.pop();

const password = document.getElementById('password');
const score = document.getElementById('score');
const hangmanPic = document.querySelector('.hangmanPic');
let tries = 0;
let hideArr = new Array(chars.length);


function hidePassword() {
  for(let i=0; i<chars.length; i++) {
    hideArr[i] = '_';
    if(chars[i] == ' ') hideArr[i] = ' '
    if(chars[i] == ',') hideArr.splice(i, 1);
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
    return null
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
    tries++
    if(tries==9) {
      score.textContent = `PRZEGRAŁEŚ \n słowo to: ${word}`;
      picContainer.innerHTML = '';
      buttons.forEach(btn => {
        btn.removeEventListener('click', checkPassword);
        btn.removeEventListener('click', changeStyles)
      });
    }  
    this.style.backgroundColor = '#ff0000';
     
    hangmanPic.src = `./img/s${tries}.jpg`;

    this.removeEventListener('click', checkPassword);
    this.removeEventListener('click', changeStyles);
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
    location.reload();
  });


















