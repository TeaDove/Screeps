var handlerTower = {

    /** @param {Creep} creep **/
    run: function(tower) {
        var targetToAttack = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (targetToAttack != null)
            tower.attack(targetToAttack);
        else if (tower.store.getUsedCapacity(RESOURCE_ENERGY)>=500){ //Heal only if have more then 500 of energy
            var targetToHeal = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_ROAD && object.structureType != STRUCTURE_WALL});
            if (targetToHeal == null)
                targetToHeal = tower.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax});
            tower.repair(targetToHeal);
        }
	}
};

module.exports = handlerTower;