const { Thing } = require('../../src/core/entities/Thing');
const { Character } = require('../../src/core/entities/Character');

describe('A thing should', () => {
  it('have health', () => {
    const TreeThing = new Thing(2000);
    expect(TreeThing.health).toBe(2000);
  });

  it('can damage be damaged', () => {
    const rangedCharacter = new Character('ranged');
    const TreeThing = new Thing(2000);

    rangedCharacter.attack(TreeThing, 500);

    expect(TreeThing.health).toBe(1500);
  });

  it('cannot be Healed', () => {
    const enemy = new Character('ranged');
    const TreeThing = new Thing(2000);
    enemy.joinGuild('leaf');
    enemy.attack(TreeThing, 500);

    enemy.heal(TreeThing, 100);

    expect(TreeThing.health).toBe(1500);
  });
});
