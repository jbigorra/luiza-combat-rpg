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

const selectedCharacter = null;
const rangedCharacter = null;
const meleeCharacter = null;

// /

// homework is:
/**
 * 1- Research about coding best practices as well as coding smells. (javascript)
 * 2- Most common steps to refactor or in other words refactoring best practices (javascript)
 */

class GamePad {
  constructor () {
    this.leftButton = document.getElementById('move-left-button');
    this.rightButton = document.getElementById('move-right-button');
    this.attackButton = document.getElementById('attack-button');
    this.healButton = document.getElementById('heal-button');
  }

  start () {
    this.leftButton.addEventListener('click', function () {
      console.log('moving left');
    });

    this.rightButton.addEventListener('click', function () {
      console.log('moving right');
    });

    this.attackButton.addEventListener('click', function () {
      rangedCharacter.attack(selectedCharacter, 100);
      console.log(`${rangedCharacter.type} is attacking`);
      console.log({ selectedCharacter });
    });

    this.healButton.addEventListener('click', function () {
      console.log('healing');
      meleeCharacter.heal(meleeCharacter);
      console.log(meleeCharacter);
    });
  }
}
class CreationController {
  constructor (database) {
    this.db = database;
    this.selectCharacter = this.selectCharacter.bind(this);
  }

  createInitialCharacters () {
    // First character
    const character1 = this.createCharacter('1', 'melee', 30);
    this.db.addCharacter(character1.characterEl.id, character1);

    // Second character
    const character2 = this.createCharacter('2', 'ranged', 50);
    this.db.addCharacter(character2.characterEl.id, character2);

    character1.characterEl.addEventListener('click', this.selectCharacter);
    character2.characterEl.addEventListener('click', this.selectCharacter);
  }

  createCharacter (id, type, position) {
    const character = new Character(type, position);
    database.addCharacter(id, character);
    console.log({ character: character.type });

    return {
      characterEntity: character,
      characterEl: this.spawnCharacter(id, character.type)
    };
  }

  spawnCharacter (id, characterType) {
    const canvas = document.getElementById('canvas');

    const characterContainer = this.createContainer(id, ['character', characterType]);
    const head = this.createContainer('character-head-' + id, ['head']);
    const body = this.createContainer('character-body-' + id, ['body']);

    characterContainer.appendChild(head);
    characterContainer.appendChild(body);

    canvas.appendChild(characterContainer);

    return characterContainer;
  }

  createContainer (id = '', classList = []) {
    const container = document.createElement('div');
    container.id = id;
    container.classList.add(...classList);

    return container;
  }

  selectCharacter (e) {
    const character = e.currentTarget;
    character.classList.add('selected-character');
    this.db.updateSelectedCharacterById(character.id);

    const target = this.db.characters[character.id === '1' ? '2' : '1'];
    target.characterEl.classList.add('selected-target');
    this.db.updateSelectedTargetById(target.characterEl.id);
  }
}

class Game {
  constructor (gamepad, creationController, database) {
    this.db = database;
    this.gamepad = gamepad;
    this.creationController = creationController;
  }

  run () {
    this.gamepad.start();
    this.creationController.createInitialCharacters();
  }
}

const database = {
  selectedCharacter: null,
  selectedTarget: null,
  characters: {},
  addCharacter: function (id, character) {
    this.characters[id] = character;
  },
  updateSelectedCharacterById: function (id) {
    this.selectedCharacter = this.characters[id];
    console.log({ selectedCharacter: this.selectedCharacter });
  },
  updateSelectedTargetById: function (id) {
    this.selectedTarget = this.characters[id];
    console.log({ selectedTarget: this.selectedTarget });
  }
};

const gamepad = new GamePad();
const creationController = new CreationController(database);
const game = new Game(gamepad, creationController, database);

game.run();

/**
 *
 *
 *
 *
 *
 */

  let display = document.getElementsById('display').getContext('2d');

 
  
 function drawHealthbar(canvas, x, y, width, height, health, max_health) {
   if(health >= max_health) {health = max_health;}
   if(health <= 0) {health = 0;}
   canvas.fillStyle = '#000000';
   canvas.fillRect(x, y, width, height);
   let colorNumber = Math.round(1-(health/max_health)*0xff)*0x10000 + Math.round((health/max_health)*0xff)*0x100;
   let colorString = colorNumber.toString(16);
   if (colorNumber >= 0x100000) {
     canvas.fillStyle = '#' + colorString;
   } else if (colorNumber << 0x100000 && colorNumber >= 0x10000) {
    canvas.fillStyle = '#0' + colorString;
   } else if (colorNumber << 0x10000) {
    canvas.fillStyle = '#00' + colorString;
   }
   canvas.fillRect(x+1, y+1, (health/max_health)*(width-2), height-2);
 }

 drawHealthbar(display, 10, 10, 300, 50, 100, 100);