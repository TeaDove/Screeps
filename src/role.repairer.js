var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.task){
            creep.say("harvest");
            creep.memory.task="harvesting";
        }
        else if (creep.memory.task === "harvesting" && creep.store.getFreeCapacity()==0){
                creep.say("repairing");
	            creep.memory.task = "repairing";
            }
        else if (creep.memory.task!="harvesting" && creep.store.getUsedCapacity()==0){
            creep.say("harvest");
            creep.memory.task="harvesting";
        }
        else if (creep.memory.task === "repairing" && creep.room.find(FIND_CONSTRUCTION_SITES)==""){
            creep.say("saving");
            creep.memory.task="saving";
        }
            
	    switch(creep.memory.task) {
            case 'harvesting':{
                require("subtask.harvest").run(creep);
                break;
            }
            case 'repairing':{
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {(
                                    structure.structureType == STRUCTURE_TOWER) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                // var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                //     filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_ROAD});
                // if (target == null)
                //     target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                //         filter: object => object.hits < object.hitsMax});
                // if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(target,{visualizePathStyle: {stroke: '#df2d0a'}});
                // }
                break;
            }
            case "saving":{
                require("subtask.save").run(creep);
                break;
            }
        }
	}
};

module.exports = roleHarvester;