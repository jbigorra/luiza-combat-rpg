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

    ## Iteration Two ##

    1. A Character cannot Deal Damage to itself.

    1. A Character can only Heal itself.

    1. When dealing damage:
        - If the target is 5 or more Levels above the attacker, Damage is reduced by 50%
        - If the target is 5 or more levels below the attacker, Damage is increased by 50%
 */

function Character () {
  this.health = 1000;
  this.level = 1;

  this.isEqualTo = function (character) {
    return this === character
  }

  this.isAlive = function() {
    return this.health > 0;
  }

  this.targetIs5orMoreLevelsAbove = function (target) {
    return (target.level - this.level)  >= 5;
  }

  this.targetIs5orMoreLevelsBelow = function (target) {
    return (this.level - target.level)  >= 5;
  }

  this.attack = function (character, damage) {
    
    if(character.isEqualTo(this)) return;
    
    if(this.targetIs5orMoreLevelsAbove(character)) damage = damage / 2;
    if(this.targetIs5orMoreLevelsBelow(character)) damage = damage * 1.5;
    character.health -= damage;
    
    if (character.health <= 0) {
      character.health = 0;
    }
  };
  this.heal = function (character) {
    if (!character.isAlive()) return;
    if(!character.isEqualTo(this)) return;


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
      character1.name= "Tito";
      const initialHealth = character1.health;
      

      character1.attack(character1, 1500);

      expect(character1.health).toBe(initialHealth);
      expect(character1.isAlive()).toBe(true);
 
    });

    it('heals itself', () => {
      //given
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
});
