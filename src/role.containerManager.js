var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.task){
            creep.say("collecting");
            creep.memory.task="collecting";
        }
        else if ((creep.memory.task === "collecting" || creep.memory.task === "harvesting") && creep.store.getFreeCapacity()==0){
                creep.say("building");
	            creep.memory.task = "building";
            }
        else if (creep.memory.task!="collecting" && creep.memory.task!="harvesting" && creep.store.getUsedCapacity()==0){
            creep.say("collecting");
            creep.memory.task="collecting";
        }
        if (creep.memory.task=="collecting"  && creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) &&structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}}) == null){
                creep.say("harvesting");
                creep.memory.task="harvesting";                        
        }
            
	    switch(creep.memory.task) {
            case 'collecting':{
                const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}});
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                break;
            }
            case 'building':{
                require("build").run(creep);
                break;
            }
            case 'harvesting':{
                require("harvestResourse").run(creep);
                break;
            }
        }
	}
};

module.exports = roleBuilder;