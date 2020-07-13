export function Thing (health) {
  this.health = health;

  this.isAlive = function () {
    return this.health > 0;
  };

  this.belongsToGuild = function (guild) {
    return false;
  };
}
