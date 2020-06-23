export function Character (type, position) {
  this.health = 1000;
  this.level = 1;
  this.type = type;
  this.position = position;

  // privates

  const isEqualTo = (character) => this === character;

  const targetIs5orMoreLevelsAbove = (target) => (target.level - this.level) >= 5;

  const targetIs5orMoreLevelsBelow = (target) => (this.level - target.level) >= 5;

  const IsNotInRange = (targetCharacter) => Math.abs(this.position - targetCharacter.position) > this.MAX_RANGE();

  // Publics

  this.MAX_RANGE = () => {
    if (this.type === 'melee') {
      return 2;
    };
    if (this.type === 'ranged') {
      return 20;
    };
  };

  this.isAlive = function () {
    return this.health > 0;
  };

  this.attack = function (targetCharacter, damage) {
    if (isEqualTo(targetCharacter)) return;
    if (this.type === 'melee' && IsNotInRange(targetCharacter)) return;
    if (this.type === 'ranged' && IsNotInRange(targetCharacter)) return;

    if (targetIs5orMoreLevelsAbove(targetCharacter)) damage = damage / 2;
    if (targetIs5orMoreLevelsBelow(targetCharacter)) damage = damage * 1.5;

    targetCharacter.health -= damage;

    if (targetCharacter.health <= 0) {
      targetCharacter.health = 0;
    }
  };

  this.heal = function (targetCharacter) {
    if (!targetCharacter.isAlive()) return;
    if (!isEqualTo(targetCharacter)) return;

    targetCharacter.health += 50;

    if (targetCharacter.health > 1000) {
      targetCharacter.health = 1000;
    }
  };
}
