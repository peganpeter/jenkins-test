'use strict';

let list = document.querySelector('#names');

function nameList(name) {
  let liElem = document.createElement('li');
  liElem.innerText = name.name;
  list.appendChild(liElem);
}

const URL = 'http://35.181.9.255:3000/names';

window.onload = () => {
  fetch(URL)
  .then(response => response.json())
  .then(data => {
    data.forEach(name => nameList(name))
  })
}

/*function reDirect() {
  location.replace('http://localhost:3000/');
}*/

window.addEventListener('load', () => {
  const form = document.querySelector('#form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const URL = 'http://35.181.9.255:3000/add';

    let data = {
      name: event.target.nametxt.value
    };

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch((error) => {
      console.log(error);
    })
    form.reset();
  })
  
});