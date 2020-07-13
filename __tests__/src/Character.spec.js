import { Character, CharacterErrors } from '../../src/core/entities/Character';
import { Thing } from '../../src/core/entities/Thing';

/**
 * By creating internal annonymous functions inside the Character object we can effectively
 * create some sort of "private" method by means of closures. And avoid exposing internal behaviours
 * from the Character object.
 */

// const CharacterType = {
//   melee: 'melee',
//   ranged: 'ranged'
// };

describe('Character should', () => {
  it('be created with expected properties', () => {
    // when
    const meleeCharacter = new Character('melee');

    // then/expectation
    expect(meleeCharacter.health).toBe(1000);
    expect(meleeCharacter.level).toBe(1);
    expect(meleeCharacter.isAlive()).toBe(true);
    expect(meleeCharacter.guilds().length).toBe(0);
  });

  it('damage another character', () => {
    // given
    const attackingCharacter = new Character('melee');
    const targetCharacter = new Character('melee');
    // when

    attackingCharacter.attack(targetCharacter, 10);

    // if the damage didn't exceed the character.health
    // then/expectation
    expect(targetCharacter.health).toBe(990);
    expect(targetCharacter.isAlive()).toBe(true);
  });

  it('die when the damage received exceeds the maximum health value', () => {
    // given
    const attackingCharacter = new Character('melee');
    const dyingCharacter = new Character('melee');
    // when
    attackingCharacter.attack(dyingCharacter, 1000);
    // damage>health
    // then/expectation
    expect(dyingCharacter.health).toBe(0);
    expect(dyingCharacter.isAlive()).toBe(false);
  });

  it('not heal another character', () => {
    const attackingCharacter = new Character('melee');
    const targetCharacter = new Character('melee');
    attackingCharacter.attack(targetCharacter, 100);

    attackingCharacter.heal(targetCharacter);

    expect(targetCharacter.isAlive()).toBe(true);
    expect(targetCharacter.health).toBe(900);
  });

  it('not be healed above maximum health value', () => {
    const attackingCharacter = new Character('melee');
    const targetCharacter = new Character('melee');

    attackingCharacter.heal(targetCharacter);

    expect(targetCharacter.health).toBe(1000);
    expect(targetCharacter.isAlive()).toBe(true);
  });

  it('not be healed if it is not alive', () => {
    const attackingCharacter = new Character('melee');
    const targetCharacter = new Character('melee');
    attackingCharacter.attack(targetCharacter, 1500);

    attackingCharacter.heal(targetCharacter);

    expect(targetCharacter.health).toBe(0);
    expect(targetCharacter.isAlive()).toBe(false);
  });

  //   A Character cannot Deal Damage to itself.

  it('not deal damage to itself', () => {
    const meleeCharacter = new Character('melee');
    meleeCharacter.name = 'Tito';
    const initialHealth = meleeCharacter.health;

    meleeCharacter.attack(meleeCharacter, 1500);

    expect(meleeCharacter.health).toBe(initialHealth);
    expect(meleeCharacter.isAlive()).toBe(true);
  });

  it('heals itself', () => {
    // given
    const targetCharacter = new Character('melee');
    const attackingCharacter = new Character('melee');
    const initialHealth = targetCharacter.health;

    attackingCharacter.attack(targetCharacter, 50);

    targetCharacter.heal(targetCharacter);

    expect(targetCharacter.health).toBe(initialHealth);
    expect(targetCharacter.isAlive()).toBe(true);
  });

  // 1. When dealing damage:
  // - If the target is 5 or more Levels above the attacker, Damage is reduced by 50%
  // - If the target is 5 or more levels below the attacker, Damage is increased by 50%
  it('receive damage decresed by 50% if is more than 5 levels above the attacker', () => {
    // given
    const targetCharacter = new Character('melee');
    const attackingCharacter = new Character('melee');

    targetCharacter.level = 7;

    // when the character is 5 or more levels above the attacker
    attackingCharacter.attack(targetCharacter, 50);

    expect(targetCharacter.health).toBe(975);
  });

  it('receive damage decresed by 50% if is 5 levels above the attacker', () => {
    // given
    const targetCharacter = new Character('melee');
    const attackingCharacter = new Character('melee');

    targetCharacter.level = 6;

    // when the character is 5 or more levels above the attacker
    attackingCharacter.attack(targetCharacter, 50);

    expect(targetCharacter.health).toBe(975);
  });

  it('receive damage increased by 50% if is more than 5 levels below the attacker', () => {
    const targetCharacter = new Character('melee');
    const attackingCharacter = new Character('melee');

    attackingCharacter.level = 7;

    // when the character is 5 or more levels above the attacker
    attackingCharacter.attack(targetCharacter, 50);

    expect(targetCharacter.health).toBe(925);
  });

  it('receive damage increased by 50% if is 5 levels below the attacker', () => {
    const targetCharacter = new Character('melee');
    const attackingCharacter = new Character('melee');

    attackingCharacter.level = 6;

    // when the character is 5 or more levels above the attacker
    attackingCharacter.attack(targetCharacter, 50);

    expect(targetCharacter.health).toBe(925);
  });

  it('have a Max Range set to 2 if character is melee', () => {
    // given/when
    const meleeCharacter = new Character('melee');

    expect(meleeCharacter.MAX_RANGE()).toBe(2);
  });

  it('have a Max Range set to 20 if character is rangedCharacter', () => {
    // given/when
    const rangedCharacter = new Character('ranged');

    expect(rangedCharacter.MAX_RANGE()).toBe(20);
  });

  it('(melee) not attack if it is out of range from the target', () => {
    // given/when
    const meleeCharacter = new Character('melee', 26);
    const rangedCharacter = new Character('ranged', 3);
    const initialHealth = rangedCharacter.health;

    meleeCharacter.attack(rangedCharacter, 50);

    expect(rangedCharacter.health).toBe(initialHealth);
  });

  it('(melee) attack if it is in range from the target', () => {
    // given/when
    const meleeCharacter = new Character('melee', 1);
    const rangedCharacter = new Character('ranged', 3);

    meleeCharacter.attack(rangedCharacter, 50);

    expect(rangedCharacter.health).toBe(950);
  });

  it('(ranged) not attack if it is out of range from the target', () => {
    const rangedCharacter = new Character('ranged', 4);
    const meleeCharacter = new Character('melee', 30);
    const initialHealth = meleeCharacter.health;

    rangedCharacter.attack(meleeCharacter, 50);

    expect(meleeCharacter.health).toBe(initialHealth);
  });

  it('(ranged) attack if it is in range from the target', () => {
    const rangedCharacter = new Character('ranged', 4);
    const meleeCharacter = new Character('melee', 20);

    rangedCharacter.attack(meleeCharacter, 50);

    expect(meleeCharacter.health).toBe(950);
  });

  it('join one guild', () => {
    const rangedCharacter = new Character('ranged');
    // const faction = ['Leaf', 'rain', 'cloud'];
    // when character is joining
    rangedCharacter.joinGuild('Leaf');

    expect(rangedCharacter.belongsToGuild('Leaf')).toBe(true);
  });

  it('join two guilds', () => {
    const rangedCharacter = new Character('ranged');

    rangedCharacter.joinGuild('Leaf');
    rangedCharacter.joinGuild('Rain');

    expect(rangedCharacter.belongsToGuild('Leaf')).toBe(true);
    expect(rangedCharacter.belongsToGuild('Rain')).toBe(true);
  });

  it('leave one guild', () => {
    const rangedCharacter = new Character('ranged');
    rangedCharacter.joinGuild('Leaf');
    rangedCharacter.joinGuild('Rain');

    rangedCharacter.leaveGuild('Leaf');

    expect(rangedCharacter.belongsToGuild('Leaf')).toBe(false);
    expect(rangedCharacter.guilds().length).toBe(1);
  });

  it('characters belonging to the same guild are allies', () => {
    const rangedCharacter = new Character('ranged');
    const meleeCharacter = new Character('melee');
    rangedCharacter.joinGuild('Leaf');
    rangedCharacter.joinGuild('Rain');
    rangedCharacter.joinGuild('Fog');

    meleeCharacter.joinGuild('Leaf');

    const value = rangedCharacter.isAnAlly(meleeCharacter);

    expect(value).toBe(true);
  });

  it('characters dont belong to the same guild', () => {
    const rangedCharacter = new Character('ranged');
    const meleeCharacter = new Character('melee');
    rangedCharacter.joinGuild('Leaf');
    rangedCharacter.joinGuild('Mist');
    rangedCharacter.joinGuild('Sand');

    meleeCharacter.joinGuild('Rain');

    const value = rangedCharacter.isAnAlly(meleeCharacter);

    expect(value).toBe(false);
  });

  it('allies cannot deal damage to each other', () => {
    const rangedCharacter = new Character('ranged');
    const meleeCharacter = new Character('melee');
    rangedCharacter.joinGuild('Leaf');
    meleeCharacter.joinGuild('Leaf');
    meleeCharacter.joinGuild('Rain');

    const value = rangedCharacter.isAnAlly(meleeCharacter);
    rangedCharacter.attack(meleeCharacter, 50);

    expect(value).toBe(true);
    expect(meleeCharacter.health).toBe(1000);
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
});
