var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(!creep.memory.task){
            creep.say("harvest");
            creep.memory.task="harvesting";
        }
        else if (creep.memory.task !="harvesting" && creep.store.getUsedCapacity()==0){
            creep.say("harvest");
            creep.memory.task="harvesting";
        }
        else if (creep.store.getFreeCapacity()==0){
            posible_target = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});
            if (posible_target == null){
                creep.say("building");
                creep.memory.task="building";   
            }
            else{
                creep.say("saving");
                creep.memory.task="saving";
            }
        }
            
	    switch(creep.memory.task) {
            case 'harvesting':{
                require("subtask.harvest").run(creep);
                break;
            }
            case "saving":{
                require("subtask.save").run(creep);
                break;
            }
            case "building":{
                require("subtask.build").run(creep);
                break;
            }
        }
	}
};

module.exports = roleHarvester;