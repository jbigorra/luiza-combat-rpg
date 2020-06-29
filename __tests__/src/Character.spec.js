import { Character } from '../../src/core/entities/Character';

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
    const character = new Character();

    // then/expectation
    expect(character.health).toBe(1000);
    expect(character.level).toBe(1);
    expect(character.isAlive()).toBe(true);
    expect(character.guilds().length).toBe(0);
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
});

// ## Iteration Four ##

// 1. Characters may belong to one or more guilds.
//     - Newly created Characters belong to no guild. done
//     - A Character may Join or Leave one or more guilds. half way

// 2. Players belonging to the same guild are considered Allies.
//    - Check characters are NOT allies
//    - Allies cannot Deal Damage to one another.
//    - Allies can Heal one another.
