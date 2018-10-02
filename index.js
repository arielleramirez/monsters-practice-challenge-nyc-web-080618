document.addEventListener('DOMContentLoaded', () => {
  fetch(`http://localhost:3000/monsters/?_limit=20&_page50`)
    .then(response => response.json())
    .then(monsterData => {
      monsterData.map(function(monsterObj) {
        const getMonsContainer = document.getElementById('monster-container')
        getMonsContainer.innerHTML += `<div>
      <h2>${monsterObj.name}</h2>
      <p>${monsterObj.age}</p>
      <p>${monsterObj.description}</p>
      </div>`
      })
    })

  const getCreateMonster = document.getElementById('create-monster')
  getCreateMonster.innerHTML = `<form>
  <input id="name" type="text" name="name" placeholder="name">
  <input id="age" type="text" name="age" placeholder="age">
  <input id="description" type="text" name="description" placeholder="description">
  <input type="submit" value="Submit">
  </form>`

  const getMonsContainer = document.getElementById('monster-container')
  document.addEventListener('submit', function(event) {
    event.preventDefault()
    const getName = document.getElementById('name').value
    const getAge = document.getElementById('age').value
    const getDescription = document.getElementById('description').value

    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: getName,
        age: getAge,
        description: getDescription
      })
    })
  })

  counter = 1
  const getBackBtn = document.getElementById('back')
  const getForwardBtn = document.getElementById('forward')
  document.addEventListener('click', function(event) {
    if (event.target.id == 'forward') {
      counter++
    } else {
      if (event.target.id == 'back' && counter > 1)
        counter--
    }

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${counter}`)
      .then(response => response.json())
      .then(monsterData => {
        monsterData.map(function(monstObj) {
          const getMonsContainer = document.getElementById('monster-container')
          getMonsContainer.innerHTML += `<div>
      <h2>${monstObj.name}</h2>
      <p>${monstObj.age}</p>
      <p>${monstObj.description}</p>
      </div>`
        })
      })


  })

})
