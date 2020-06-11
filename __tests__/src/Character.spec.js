/* eslint-env jest */

/**
## Iteration One ##

  1. All Characters, when created, have:
    - Health, starting at 1000
    - Level, starting at 1 
    - May be Alive or Dead, starting Alive (Alive may be a true/false)

  2. Characters can Deal Damage to Characters.
    - Damage is subtracted from Health
    - When damage received exceeds current Health, Health becomes 0 and the character dies

  3. A Character can Heal a Character.
    - Dead characters cannot be healed
    - Healing cannot raise health above 1000
 */


function Character() {
  this.health = 1000;
  this.level = 1;
  this.isAlive = true;
  this.attack = function (character, damage) {
    character.health -= damage;
    if (character.health <= 0) {
      character.health = 0;
      character.isAlive = false;
    }
  }
  this.heal = function (character) {
    if (!character.isAlive) return;

    character.health += 50;

    if (character.health > 1000) {
      character.health = 1000;
    }
  }
}

describe('Character should', () => {
  it('be created with expected properties', () => {
    // when 
    const character = new Character();

    // then/expectation
    expect(character.health).toBe(1000);
    expect(character.level).toBe(1);
    expect(character.isAlive).toBe(true);
  });

  it('damage another character', () => {
    //given
    const character1 = new Character();
    const character2 = new Character();
    // when

    character1.attack(character2, 10);

    // if the damage didn't exceed the character.health
    //then/expectation
    expect(character2.health).toBe(990);
    expect(character2.isAlive).toBe(true);
  });

  it('die when the damage received exceeds the maximum health value', () => {
    // given
    const character1 = new Character();
    const character2 = new Character();
    // when
    character1.attack(character2, 1000);
    //damage>health
    // then/expectation
    expect(character2.health).toBe(0);
    expect(character2.isAlive).toBe(false);
  });

  /**
   * A Character can Heal a Character.
    - Dead characters cannot be healed
    - Healing cannot raise health above 1000
   */

  it('heal another character', () => {
    const character1 = new Character();
    const character2 = new Character();
    character1.attack(character2, 100);

    character1.heal(character2);

    expect(character2.isAlive).toBe(true);
    expect(character2.health).toBe(950);
  });

  it('not be healed above maximum health value', () => {
    const character1 = new Character();
    const character2 = new Character();

    character1.heal(character2);

    expect(character2.health).toBe(1000);
    expect(character2.isAlive).toBe(true);
  });

  it('not be healed if it is not alive', () => {
    const character1 = new Character();
    const character2 = new Character();
    character1.attack(character2, 1500);

    character1.heal(character2);

    expect(character2.health).toBe(0);
    expect(character2.isAlive).toBe(false);
  });
});

// trying the repo clone