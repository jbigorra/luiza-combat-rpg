// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './styles.css';

import { Character } from './core/entities/Character';

// var mountNode = document.getElementById('app');
// ReactDOM.render(<App name="Jane" />, mountNode);

const leftButton = document.getElementById('move-left-button');
const rightButton = document.getElementById('move-right-button');
const attackButton = document.getElementById('attack-button');
const healButton = document.getElementById('heal-button');

// const myRangedCharacter = new Character('ranged', 30);

/**
 * Make myRangedCharacter to be the one attacking the
 * selectedCharacter.
 *
 */

// const rangedCharacter = new Character('ranged', 20);
// const meleeCharacter = new Character('melee', 25);

const createMeleeButton = document.getElementById('create-melee-character');
const createRangedButton = document.getElementById('create-ranged-character');
const meleeButton = document.getElementById('select-melee-character');
const rangedButton = document.getElementById('select-ranged-character');

let selectedCharacter = null;
let rangedCharacter = null;
let meleeCharacter = null;
const database = {
  characters: {},
  addCharacter: function (id, character) {
    this.characters[id] = character;
  }
};

createMeleeButton.addEventListener('click', function () {
  meleeCharacter = new Character('melee', 30);
  const id = '1';
  database.addCharacter(id, meleeCharacter);
  spawnCharacter(id, meleeCharacter.type);
  console.log({ meleeCharacter: meleeCharacter.type });
});

// homework is:
/**
 * 1- Research about coding best practices as well as coding smells. (javascript)
 * 2- Most common steps to refactor or in other words refactoring best practices (javascript)
 * 3- Try refactoring the spawnCharacter function.
 * 4- Try to create the ranged character with red color and must be positioned on the right side.
 *   - Try first to create it in the index.html and also add the proper styles to it.
 *   - Then try use the spawnCharacter function to create the ranged character.
 */
function createContainer (id = '', classList = []) {
  const container = document.createElement('div');
  container.id = id;
  container.classList.add(...classList);

  return container;
}
// Stay DRY (don't repeat yourself (more than 2 times) )
function spawnCharacter (id, characterType) {
  const canvas = document.getElementById('canvas');

  const characterContainer = createContainer(id, ['character', characterType]);
  const head = createContainer('character-head-' + id, ['head']);
  const body = createContainer('character-body-' + id, ['body']);

  characterContainer.appendChild(head);
  characterContainer.appendChild(body);

  canvas.appendChild(characterContainer);
}

createRangedButton.addEventListener('click', function () {
  rangedCharacter = new Character('ranged', 50);
  console.log({ rangedCharacter: rangedCharacter.type });
});

meleeButton.addEventListener('click', function () {
  selectedCharacter = meleeCharacter;
  console.log({ selectedCharacter: selectedCharacter.type });
});

rangedButton.addEventListener('click', function () {
  selectedCharacter = rangedCharacter;
  console.log({ selectedCharacter: selectedCharacter.type });
});

leftButton.addEventListener('click', function () {
  console.log('moving left');
});

rightButton.addEventListener('click', function () {
  console.log('moving right');
});

attackButton.addEventListener('click', function () {
  rangedCharacter.attack(selectedCharacter, 100);
  console.log(`${rangedCharacter.type} is attacking`);
  console.log({ selectedCharacter });
});

healButton.addEventListener('click', function () {
  console.log('healing');
  meleeCharacter.heal(meleeCharacter);
  console.log(meleeCharacter);
});
