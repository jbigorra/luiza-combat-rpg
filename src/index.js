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

const database = {
  characters: {},
  addCharacter: function (id, character) {
    this.characters[id] = character;
  }
};

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
  constructor () {
    this.startGame = document.getElementById('start-game');
  }

  start () {
    this.startGame.addEventListener('click', () => {
      this.createCharacter('1', 'melee', 30);
      this.createCharacter('2', 'ranged', 50);
    });
  }

  createCharacter (id, type, position) {
    const character = new Character(type, position);
    database.addCharacter(id, character);
    this.spawnCharacter(id, character.type);
    console.log({ character: character.type });
  }

  spawnCharacter (id, characterType) {
    const canvas = document.getElementById('canvas');

    const characterContainer = this.createContainer(id, ['character', characterType]);
    const head = this.createContainer('character-head-' + id, ['head']);
    const body = this.createContainer('character-body-' + id, ['body']);

    characterContainer.appendChild(head);
    characterContainer.appendChild(body);

    canvas.appendChild(characterContainer);
  }

  createContainer (id = '', classList = []) {
    const container = document.createElement('div');
    container.id = id;
    container.classList.add(...classList);

    return container;
  }
}

class Game {
  constructor (gamepad, creationController) {
    this.gamepad = gamepad;
    this.creationController = creationController;
  }

  run () {
    this.gamepad.start();
    this.creationController.start();
  }
}

const gamepad = new GamePad();
const creationController = new CreationController();
const game = new Game(gamepad, creationController);

game.run();

/**
 *
 *
 *
 *
 *
 */
