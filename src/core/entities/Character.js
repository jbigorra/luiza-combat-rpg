export const CharacterErrors = {
  INVALID_TYPE: 'it is an invalid type of character. Valid types are: ranged and melee'
};

export function Character (type, position) {
  if (type !== 'melee' && type !== 'ranged') {
    throw new Error(CharacterErrors.INVALID_TYPE);
  }

  this.health = 1000;
  this.level = 1;
  this.type = type;
  this.position = position;
  const _guilds = [];

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
    if (this.isAnAlly(targetCharacter) === true) return;
    if (this.type === 'melee' && IsNotInRange(targetCharacter)) return;
    if (this.type === 'ranged' && IsNotInRange(targetCharacter)) return;

    if (targetIs5orMoreLevelsAbove(targetCharacter)) damage = damage / 2;
    if (targetIs5orMoreLevelsBelow(targetCharacter)) damage = damage * 1.5;

    targetCharacter.health -= damage;

    if (targetCharacter.health <= 0) {
      targetCharacter.health = 0;
    }
  };

  this.heal = function (target) {
    if (!target.isAlive()) return;
    if (!this.isAnAlly(target) && !isEqualTo(target)) return;

    target.health += 50;

    if (target.health > 1000) {
      target.health = 1000;
    }
  };

  this.joinGuild = function (guild) {
    _guilds.push(guild);
  };

  this.belongsToGuild = function (guild) {
    return _guilds.indexOf(guild) >= 0;
    // return 0 >= 0;
    // return -1 >= 0;

    // Long way of doing it.
    // if (guilds.indexOf(guild) >= 0) {
    //   return true;
    // }

    // return false;
  };

  this.guilds = function () {
    return _guilds;
  };

  this.leaveGuild = function (guild) {
    const guildIndex = _guilds.indexOf(guild);
    return _guilds.splice(guildIndex, 1);
  };

  this.isAnAlly = function (target) {
    for (let i = 0; i < _guilds.length; i++) {
      const guild = _guilds[i];
      if (target.belongsToGuild(guild)) {
        return true;
      };
      return false;
    }
  };
}
// ['leaf', 'rain', 'fog'] ----- ['rain']

// const thing = Object.create(Character);
// console.log(thing.health);
