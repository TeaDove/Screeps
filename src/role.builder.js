var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.task){
            creep.say("harvest");
            creep.memory.task="harvesting";
        }
        else if (creep.memory.task === "harvesting" && creep.store.getFreeCapacity()==0){
                creep.say("building");
	            creep.memory.task = "building";
            }
        else if (creep.memory.task!="harvesting" && creep.store.getUsedCapacity()==0){
            creep.say("harvest");
            creep.memory.task="harvesting";
        }
        else if (creep.memory.task === "building" && creep.room.find(FIND_CONSTRUCTION_SITES)==''){
            creep.say("saving");
            creep.memory.task="saving";
        }
            
	    switch(creep.memory.task) {
            case 'harvesting':{
                require("subtask.harvest").run(creep);
                break;
            }
            case 'building':{
                require("subtask.build").run(creep);
                break;
            }
            case "saving":{
                require("subtask.save").run(creep);
                break;
            }
        }
	}
};

module.exports = roleBuilder;