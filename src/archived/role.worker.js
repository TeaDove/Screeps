var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        function execSubtask(creep, subtaskFirst, subtaskSecond){
            if(creep.memory.subtask!=subtaskSecond && creep.store.getFreeCapacity()>0){
                creep.say(subtaskFirst);
                creep.memory.subtask=subtaskFirst;
            }
            else if (creep.store.getFreeCapacity()==0){
                creep.say(subtaskSecond);
                creep.memory.task=subtaskSecond;
            }
            else if (creep.memory.subtask === subtaskSecond && creep.store.getUsedCapacity() == 0){
                creep.say("idle");
                creep.memory.subtask == 'idle';
                creep.memory.task == 'idle';
            }   
            switch(creep.memory.subtask) {
                case subtaskFirst:{
                    require(subtaskFirst).run(creep);
                    break;
                }
                case subtaskSecond:{
                    require(subtaskSecond).run(creep);
                    break;
                }
            }
        }

	    switch(creep.memory.task) {
            case 'har_sav':{
                execSubtask(creep, 'subtask.harvest', 'subtask.save');
                break;
            }
            case 'har_bui':{
                execSubtask(creep, 'subtask.harvest', 'subtask.build');
                break;
            }
            case "har_upg":{
                execSubtask(creep, 'subtask.harvest', 'subtask.upgrade');
                break;
            }
            case "har_rep":{
                execSubtask(creep, 'subtask.harvest', 'subtask.repair');
                break;
            }
        }
	}
};

module.exports = roleBuilder;