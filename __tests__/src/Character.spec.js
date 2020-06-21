/* eslint-env jest */

/**
## Iteration Three ##

1. Characters have an attack Max Range.

1. *Melee* fighters have a range of 2 meters.

1. *Ranged* fighters have a range of 20 meters.

1. Characters must be in range to deal damage to a target.
 */

/**
 * By creating internal annonymous functions inside the Character object we can effectively
 * create some sort of "private" method by means of closures. And avoid exposing internal behaviours
 * from the Character object.
 */

// const CharacterType = {
//   melee: 'melee',
//   ranged: 'ranged'
// };

function Character (type, position) {
  this.health = 1000;
  this.level = 1;
  this.type = type;
  this.position = position;

  // privates

  const isEqualTo = (character) => this === character;

  const targetIs5orMoreLevelsAbove = (target) => (target.level - this.level) >= 5;

  const targetIs5orMoreLevelsBelow = (target) => (this.level - target.level) >= 5;
  // const distanceWithCharacter = (target) => Math.abs(this.position - target.position);

  // Publics

  this.MAX_RANGE = function () {
    if (type === 'melee') {
      return 2;
    };
    if (type === 'ranged') {
      return 20;
    };
  };



  this.isAlive = function () {
    return this.health > 0;
  };

  this.attack = function (character, damage) {
    if (isEqualTo(character)) return;
    //if (distanceWithCharacter(character) < 20) return;
    // const distanceWithCharacter = distanceWithCharacter(character);

    if (targetIs5orMoreLevelsAbove(character)) damage = damage / 2;
    if (targetIs5orMoreLevelsBelow(character)) damage = damage * 1.5;
    
  //   if (isMelee(this) && isRangee(target)) {
  //     if (this.position > 2) damage
  // } else if (isRangee(this) && isMelee(target)){
  //     if (this.position > 20);
  // };
  
    character.health -= damage;

    if (character.health <= 0) {
      character.health = 0;
    }
  };

  this.heal = function (character) {
    if (!character.isAlive()) return;
    if (!isEqualTo(character)) return;

    character.health += 50;

    if (character.health > 1000) {
      character.health = 1000;
    }
  };
}

describe('Character should', () => {
  it('be created with expected properties', () => {
    // when
    const character = new Character();

    // then/expectation
    expect(character.health).toBe(1000);
    expect(character.level).toBe(1);
    expect(character.isAlive()).toBe(true);
  });

  it('damage another character', () => {
    // given
    const character1 = new Character();
    const character2 = new Character();
    // when

    character1.attack(character2, 10);

    // if the damage didn't exceed the character.health
    // then/expectation
    expect(character2.health).toBe(990);
    expect(character2.isAlive()).toBe(true);
  });

  it('die when the damage received exceeds the maximum health value', () => {
    // given
    const character1 = new Character();
    const character2 = new Character();
    // when
    character1.attack(character2, 1000);
    // damage>health
    // then/expectation
    expect(character2.health).toBe(0);
    expect(character2.isAlive()).toBe(false);
  });

  /**
   * A Character can Heal a Character.
    - Dead characters cannot be healed
    - Healing cannot raise health above 1000
   */

  it('not heal another character', () => {
    const character1 = new Character();
    const character2 = new Character();
    character1.attack(character2, 100);

    character1.heal(character2);

    expect(character2.isAlive()).toBe(true);
    expect(character2.health).toBe(900);
  });

  it('not be healed above maximum health value', () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.heal(character2);

    expect(character2.health).toBe(1000);
    expect(character2.isAlive()).toBe(true);
  });

  it('not be healed if it is not alive', () => {
    const character1 = new Character();
    const character2 = new Character();
    character1.attack(character2, 1500);

    character1.heal(character2);

    expect(character2.health).toBe(0);
    expect(character2.isAlive()).toBe(false);
  });

  //   A Character cannot Deal Damage to itself.

  it('not deal damage to itself', () => {
    const character1 = new Character();
    character1.name = 'Tito';
    const initialHealth = character1.health;

    character1.attack(character1, 1500);

    expect(character1.health).toBe(initialHealth);
    expect(character1.isAlive()).toBe(true);
  });

  it('heals itself', () => {
    // given
    const character1 = new Character();
    const character2 = new Character();
    const initialHealth = character1.health;

    character2.attack(character1, 50);

    character1.heal(character1);

    expect(character1.health).toBe(initialHealth);
    expect(character1.isAlive()).toBe(true);
  });

  // 1. When dealing damage:
  // - If the target is 5 or more Levels above the attacker, Damage is reduced by 50%
  // - If the target is 5 or more levels below the attacker, Damage is increased by 50%
  it('receive damage decresed by 50% if is more than 5 levels above the attacker', () => {
    // given
    const character1 = new Character();
    const character2 = new Character();

    character1.level = 7;

    // when the character is 5 or more levels above the attacker
    character2.attack(character1, 50);

    expect(character1.health).toBe(975);
  });

  it('receive damage decresed by 50% if is 5 levels above the attacker', () => {
    // given
    const character1 = new Character();
    const character2 = new Character();

    character1.level = 6;

    // when the character is 5 or more levels above the attacker
    character2.attack(character1, 50);

    expect(character1.health).toBe(975);
  });

  it('receive damage increased by 50% if is more than 5 levels below the attacker', () => {
    const character1 = new Character();
    const character2 = new Character();

    character2.level = 7;

    // when the character is 5 or more levels above the attacker
    character2.attack(character1, 50);

    expect(character1.health).toBe(925);
  });

  it('receive damage increased by 50% if is 5 levels below the attacker', () => {
    const character1 = new Character();
    const character2 = new Character();

    character2.level = 6;

    // when the character is 5 or more levels above the attacker
    character2.attack(character1, 50);

    expect(character1.health).toBe(925);
  });

  /**
## Iteration Three ##

1. Characters have an attack Max Range.
  - probably we need to create a property called MAX_RANGE, is of type number.

2. *Melee* fighters have a range of 2 meters.
    - The character object can be created as a Melee, hence it has MAX_RANGE=2
  *Ranged* fighters have a range of 20 meters.
    - The character object can be created as a Ranged, hence it has MAX_RANGE=20

3. Characters must be in range to deal damage to a target.
 */

  it('have a Max Range set to 2 if character is melee', () => {
    // given/when
    const Melee = new Character('melee');

    expect(Melee.MAX_RANGE()).toBe(2);
  });

  it('have a Max Range set to 20 if character is Ranged', () => {
    // given/when
    const Ranged = new Character('ranged');

    expect(Ranged.MAX_RANGE()).toBe(20);
  });

  /**
   * one test to check if melee character can attack
   * one test to check if ranged character can attack
  
   *
   * - Before attacking characters should have a position.
   * - calculate position difference between two characters
   * - before atackking check who is attacking to check the correct rule
   *    - ranged: 0 - 20
   *    - melee: 0 - 2
   */

  it('be in range to deal damage to the target', () => {
    // given/when
    const Melee = new Character('melee', 1);
    const Ranged = new Character('ranged', 3);
    const positionDifference = Math.abs(Melee.position - Ranged.position);
    // melee attack, range within 0<2

    // melee range 0 <=2
    expect(Melee.position).toBe(1);
    expect(Ranged.position).toBe(3);
    expect(positionDifference).toBe(2);
    //expect(Melee.health).toBe(initialHealth);
    // ranged range 0 <=20
  });
});
