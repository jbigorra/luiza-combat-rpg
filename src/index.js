// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './styles.css';

import { Character } from './core/entities/Character';

// var mountNode = document.getElementById('app');
// ReactDOM.render(<App name="Jane" />, mountNode);

/**
 * - Introduce the ability to click on a character to select it.
 *   - If the player clicks the left button then the player selects the character that wants to use.
 *     - Highlight the character with a green shadow.
 *   - If the player clicks the middle button of the mouse it will select the target that it wants to interact with.
 *     - Highlight the character with a red shadow.
 *
 * - Have one class that will be incharge of bootstraping and starting the game. (Should be tested)
 *   - This class should be a mediator.
 *     - (Very common pattern used in a lot of apps and servers => MVP = Model View Presenter)
 *       - View in charge of rendering and updating the UI.
 *       - Presenter (mediator)
 *       - Core/Domain
 *
 *   - The game starts with 2 characters by default
 *     - One Melee
 *     - One Ranged
 *
 *  New features:
 * - Lets introduce a health bar on top of each character.  (Consider using a react component)
 *   - They start with initial health of the character
 *   - They reflect always the current health of the character.
 *     - when character gets attacked the health bar should lower the HP.
 *     - when character gets healed the health bar should increase the HP.
 */

const leftButton = document.getElementById('move-left-button');
const rightButton = document.getElementById('move-right-button');
const attackButton = document.getElementById('attack-button');
const healButton = document.getElementById('heal-button');
const createMeleeButton = document.getElementById('create-melee-character');
const createRangedButton = document.getElementById('create-ranged-character');

const selectedCharacter = null;
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

createRangedButton.addEventListener('click', function () {
  rangedCharacter = new Character('ranged', 10);
  const id = '2';
  database.addCharacter(id, rangedCharacter);
  spawnCharacter(id, rangedCharacter.type);
  console.log({ rangedCharacter: rangedCharacter.type });
});

// homework is:
/**
 * 1- Research about coding best practices as well as coding smells. (javascript)
 * 2- Most common steps to refactor or in other words refactoring best practices (javascript)
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
