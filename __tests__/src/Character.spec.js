import { Character, CharacterErrors } from '../../src/core/entities/Character';

/**
 * By creating internal annonymous functions inside the Character object we can effectively
 * create some sort of "private" method by means of closures. And avoid exposing internal behaviours
 * from the Character object.
 */

// const CharacterType = {
//   melee: 'melee',
//   ranged: 'ranged'
// };

function Thing (health) {
  this.health = health;

}

describe('Character should', () => {
  it('be created with expected properties', () => {
    // when
    const character = new Character('melee');

    // then/expectation
    expect(character.health).toBe(1000);
    expect(character.level).toBe(1);
    expect(character.isAlive()).toBe(true);
    expect(character.guilds().length).toBe(0);
  });

  it('damage another character', () => {
    // given
    const character1 = new Character('melee');
    const character2 = new Character('melee');
    // when

    character1.attack(character2, 10);

    // if the damage didn't exceed the character.health
    // then/expectation
    expect(character2.health).toBe(990);
    expect(character2.isAlive()).toBe(true);
  });

  it('die when the damage received exceeds the maximum health value', () => {
    // given
    const character1 = new Character('melee');
    const character2 = new Character('melee');
    // when
    character1.attack(character2, 1000);
    // damage>health
    // then/expectation
    expect(character2.health).toBe(0);
    expect(character2.isAlive()).toBe(false);
  });

  it('not heal another character', () => {
    const character1 = new Character('melee');
    const character2 = new Character('melee');
    character1.attack(character2, 100);

    character1.heal(character2);

    expect(character2.isAlive()).toBe(true);
    expect(character2.health).toBe(900);
  });

  it('not be healed above maximum health value', () => {
    const character1 = new Character('melee');
    const character2 = new Character('melee');

    character1.heal(character2);

    expect(character2.health).toBe(1000);
    expect(character2.isAlive()).toBe(true);
  });

  it('not be healed if it is not alive', () => {
    const character1 = new Character('melee');
    const character2 = new Character('melee');
    character1.attack(character2, 1500);

    character1.heal(character2);

    expect(character2.health).toBe(0);
    expect(character2.isAlive()).toBe(false);
  });

  //   A Character cannot Deal Damage to itself.

  it('not deal damage to itself', () => {
    const character1 = new Character('melee');
    character1.name = 'Tito';
    const initialHealth = character1.health;

    character1.attack(character1, 1500);

    expect(character1.health).toBe(initialHealth);
    expect(character1.isAlive()).toBe(true);
  });

  it('heals itself', () => {
    // given
    const character1 = new Character('melee');
    const character2 = new Character('melee');
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
    const character1 = new Character('melee');
    const character2 = new Character('melee');

    character1.level = 7;

    // when the character is 5 or more levels above the attacker
    character2.attack(character1, 50);

    expect(character1.health).toBe(975);
  });

  it('receive damage decresed by 50% if is 5 levels above the attacker', () => {
    // given
    const character1 = new Character('melee');
    const character2 = new Character('melee');

    character1.level = 6;

    // when the character is 5 or more levels above the attacker
    character2.attack(character1, 50);

    expect(character1.health).toBe(975);
  });

  it('receive damage increased by 50% if is more than 5 levels below the attacker', () => {
    const character1 = new Character('melee');
    const character2 = new Character('melee');

    character2.level = 7;

    // when the character is 5 or more levels above the attacker
    character2.attack(character1, 50);

    expect(character1.health).toBe(925);
  });

  it('receive damage increased by 50% if is 5 levels below the attacker', () => {
    const character1 = new Character('melee');
    const character2 = new Character('melee');

    character2.level = 6;

    // when the character is 5 or more levels above the attacker
    character2.attack(character1, 50);

    expect(character1.health).toBe(925);
  });

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

  it('(melee) not attack if it is out of range from the target', () => {
    // given/when
    const Melee = new Character('melee', 26);
    const Ranged = new Character('ranged', 3);
    const initialHealth = Ranged.health;

    Melee.attack(Ranged, 50);

    expect(Ranged.health).toBe(initialHealth);
  });

  it('(melee) attack if it is in range from the target', () => {
    // given/when
    const Melee = new Character('melee', 1);
    const Ranged = new Character('ranged', 3);

    Melee.attack(Ranged, 50);

    expect(Ranged.health).toBe(950);
  });

  it('(ranged) not attack if it is out of range from the target', () => {
    const Ranged = new Character('ranged', 4);
    const Melee = new Character('melee', 30);
    const initialHealth = Melee.health;

    Ranged.attack(Melee, 50);

    expect(Melee.health).toBe(initialHealth);
  });

  it('(ranged) attack if it is in range from the target', () => {
    const Ranged = new Character('ranged', 4);
    const Melee = new Character('melee', 20);

    Ranged.attack(Melee, 50);

    expect(Melee.health).toBe(950);
  });

  it('join one guild', () => {
    const Ranged = new Character('ranged');
    // const faction = ['Leaf', 'rain', 'cloud'];
    // when character is joining
    Ranged.joinGuild('Leaf');

    expect(Ranged.belongsToGuild('Leaf')).toBe(true);
  });

  it('join two guilds', () => {
    const Ranged = new Character('ranged');

    Ranged.joinGuild('Leaf');
    Ranged.joinGuild('Rain');

    expect(Ranged.belongsToGuild('Leaf')).toBe(true);
    expect(Ranged.belongsToGuild('Rain')).toBe(true);
  });

  it('leave one guild', () => {
    const Ranged = new Character('ranged');
    Ranged.joinGuild('Leaf');
    Ranged.joinGuild('Rain');

    Ranged.leaveGuild('Leaf');

    expect(Ranged.belongsToGuild('Leaf')).toBe(false);
    expect(Ranged.guilds().length).toBe(1);
  });

  it('characters belonging to the same guild are allies', () => {
    const Ranged = new Character('ranged');
    const Melee = new Character('melee');
    Ranged.joinGuild('Leaf');
    Ranged.joinGuild('Rain');
    Ranged.joinGuild('Fog');

    Melee.joinGuild('Leaf');

    const value = Ranged.isAnAlly(Melee);

    expect(value).toBe(true);
  });

  it('characters dont belong to the same guild', () => {
    const Ranged = new Character('ranged');
    const Melee = new Character('melee');
    Ranged.joinGuild('Leaf');
    Ranged.joinGuild('Mist');
    Ranged.joinGuild('Sand');

    Melee.joinGuild('Rain');

    const value = Ranged.isAnAlly(Melee);

    expect(value).toBe(false);
  });

  it('allies cannot deal damage to each other', () => {
    const Ranged = new Character('ranged');
    const Melee = new Character('melee');
    Ranged.joinGuild('Leaf');
    Melee.joinGuild('Leaf');
    Melee.joinGuild('Rain');

    const value = Ranged.isAnAlly(Melee);
    Ranged.attack(Melee, 50);

    expect(value).toBe(true);
    expect(Melee.health).toBe(1000);
  });

  it('allies can heal one another', () => {
    const ally1 = new Character('ranged');
    const ally2 = new Character('melee');
    const enemy = new Character('ranged');
    ally1.joinGuild('Leaf');
    ally2.joinGuild('Leaf');
    enemy.attack(ally2, 100);

    ally1.heal(ally2, 50);

    const areAllies = ally1.isAnAlly(ally2);
    expect(areAllies).toBe(true);
    expect(ally2.health).toBe(950);
  });

  it('is a valid type of character', () => {
    const rangedCharacter = new Character('ranged');
    const meleeCharacter = new Character('melee');

    expect(rangedCharacter.type).toBe('ranged');
    expect(meleeCharacter.type).toBe('melee');
  });

  it('throw an error if is an invalid type of character', () => {
    expect(() => {
      const character = new Character('invalid_type');
    }).toThrow(CharacterErrors.INVALID_TYPE);
  });

  it('things have health', () => {
    const TreeThing = new Thing(2000)


    expect(TreeThing.health).toBe(2000);
  });
// ## Iteration Five ##

// 1. Characters can damage non-character *things* (props).
//     - Anything that has Health may be a target
//     - These things cannot be Healed and they do not Deal Damage
//     - These things do not belong to Factions; they are neutral
//     - When reduced to 0 Health, things are *Destroyed*
//     - As an example, you may create a Tree with 2000 Health

});
