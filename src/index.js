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

const myRangedCharacter = new Character('ranged', 30);

/**
 * Make myRangedCharacter to be the one attacking the
 * selectedCharacter.
 *
 */

const rangedCharacter = new Character('ranged', 20);
const meleeCharacter = new Character('melee', 25);

const meleeButton = document.getElementById('select-melee-character');
const rangedButton = document.getElementById('select-ranged-character');

let selectedCharacter = null;

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

// attackButton.addEventListener('click', function () {
//   rangedCharacter.attack(meleeCharacter, 50);
//   console.log('attacking');
//   console.log(meleeCharacter);
// });

//why it is attacking itself xd
attackButton.addEventListener('click', function () {
  myRangedCharacter.attack(selectedCharacter, 100);
  if (myRangedCharacter === selectedCharacter) return;
  console.log(`${myRangedCharacter}is attacking`);
  console.log(selectedCharacter);
});


healButton.addEventListener('click', function () {
  console.log('healing');
  meleeCharacter.heal(meleeCharacter);
  console.log(meleeCharacter);
});
