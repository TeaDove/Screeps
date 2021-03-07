module.exports = {
    run(creep){
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_ROAD});
        if (target == null)
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax});
        if (target == null){
            creep.memory.task='idle';
            creep.memory.subtask='idle';
        }
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target,{visualizePathStyle: {stroke: '#df2d0a'}});
        }
    }
};