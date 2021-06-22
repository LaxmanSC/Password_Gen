const upperchar = document.getElementById('uppercase');
const lowerchar = document.getElementById('lowercase');
const num = document.getElementById('numbers');
const sym = document.getElementById('symbols');
const length = document.getElementById('length');
const generation = document.getElementById('generate');
const result = document.getElementById('password');
const resSave = document.getElementById('pass');

generation.addEventListener('click', () => {
  const lengthi = +length.value;
  const hasLower = lowerchar.checked;
  const hasUpper = upperchar.checked;
  const hasNumber = num.checked;
  const hasSymbol = sym.checked;
  let Res =  generatePass(lengthi, hasLower, hasUpper, hasNumber, hasSymbol);  

    result.innerText = Res;
    if(Res == "Error: Length too large or small" || Res =="Error: No checkbox selected") {
	resSave.value = "";
    }
    else {
	resSave.value = Res;
    }
});

function generatePass(len,Low, Up, Num, Sym) {
  var pass = ""
  var i
  var temp
  var ch
  if(!(Low || Up || Num || Sym)) {
    return "Error: No checkbox selected"
  }
  if(len<4 || len>20) {
    return "Error: Length too large or small"
  }
  for(i=0; i<len;i++) {
    ch = Math.floor(Math.random() * 4)
    switch(ch) {
      case 0:
        if(Low) {
          temp = getRandomLower()
          pass = pass.concat(temp)
          break;
        }
        else {
          i--;
          break;
        }

      case 1:
        if(Up) {
          temp = getRandomUpper()
          pass = pass.concat(temp)
          break;
        }
        else {
          i--;
          break;
        }

      case 2:
        if(Num) {
        temp = getRandomNumber()
        pass = pass.concat(temp)
        break;
        }
        else {
        i--;
        break;
        }

      case 3:
        if(Sym) {
        temp = getRandomSymbol()
        pass = pass.concat(temp)
        break;        
        }
        else {
          i--;
          break;
        }
    }
  }
  return pass;
}


function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)];
}
