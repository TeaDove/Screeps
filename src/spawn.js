/*
 * ECA - Energy capacity available
 * EA - Energy available
  */
function spawn_creep(body, role){
        var newName = role+" ";
        part_dict = {}
        for (var item of body){
            if (item[0] in part_dict){
                part_dict[item[0]]+=1
            }
            else{
            part_dict[item[0]]=1
            }
        }
        for (var key in part_dict){
        newName+=key+part_dict[key]+"_"
        }
        newName+=Memory['creepN'];
        if (Game.spawns['Spawn1'].spawnCreep(body, newName, {memory: {role: role}}) == 0)
            Memory['creepN']+=1;
            console.log("Creep queued:\t", newName)
}
function getBodyByEnergy(Energy){
    let part_count = Math.max(Math.floor(Energy/200), 1);
    to_return = [];
    for (i = 0; i < part_count; i++) {
        to_return.push(WORK);
        to_return.push(CARRY);
        to_return.push(MOVE);
    }
    let balance = Energy-part_count*200;
    switch (true) {
        case balance<100 && balance>50:
            to_return.push(MOVE);
            break;
        case balance<150:
            to_return.push(CARRY);
            to_return.push(MOVE);
            break;
        case balance<200:
            to_return.push(WORK);
            to_return.push(MOVE);
            break;
    }
    to_return.sort()
    return to_return
}


module.exports = {
    run (){
        console.log("\n")
        var status_str = "";
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                status_str += 'Clearing non-existing creep memory:';
                status_str += name + "\n";
            }
        }
        var ECA = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        status_str += "ECA: " + ECA+ ",\tEA: "+ Game.spawns['Spawn1'].room.energyAvailable+",\t";
        
        const available_spots_to_harvest = 5
        // const maxCreepByRole = Game.spawns['Spawn1'].room.find(FIND_SOURCES).length+1;
        const maxCreepByRole = available_spots_to_harvest - 2;
            
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var containerManager = _.filter(Game.creeps, (creep) => creep.memory.role == 'containerManager');

        var creeps_amount = builders.length + repairer.length + upgrader.length + harvesters.length;
        var all_workers_cap = maxCreepByRole*3+2;

        Energy_to_use = Math.max(((creeps_amount+1)/all_workers_cap) * ECA, 200);
        if (Energy_to_use > ECA){
            Energy_to_use = ECA;
        }
        status_str += "Energy to spend on next creeps: " + Math.round(Energy_to_use*100)/100 + ",\tcreeps amount: " + creeps_amount + ",\tmax creeps by role: " + maxCreepByRole + "\n";
        status_str += ('Builders: ' + builders.length + ",\t");
        status_str += ('Repairers: ' + repairer.length + ",\t");
        status_str += ('ContainerManagers: ' + containerManager.length + ",\t");
        status_str += ('Upgraders: ' + upgrader.length + ",\t");
        status_str += ('Harvesters: ' + harvesters.length);

        // spawn_creep(getBodyByEnergy(Energy_to_use), "harvester");
        if(harvesters.length == 0) 
            spawn_creep(getBodyByEnergy(200), "harvester");
        else if(harvesters.length == 1) 
            spawn_creep(getBodyByEnergy(Energy_to_use-100), "harvester");
        else if (harvesters.length < maxCreepByRole)
            spawn_creep(getBodyByEnergy(Energy_to_use), "harvester");
        else if(upgrader.length < maxCreepByRole) 
            spawn_creep(getBodyByEnergy(Energy_to_use), "upgrader");
        else if(builders.length < maxCreepByRole)
            spawn_creep(getBodyByEnergy(Energy_to_use), "builder");
        else if(repairer.length < 2) 
            spawn_creep(getBodyByEnergy(Energy_to_use), "repairer");
        else if(containerManager.length < maxCreepByRole-1 && ECA>=500 && Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) &&structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}})!='') {
            spawn_creep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], "containerManager");
        }
        
        console.log(status_str);
    }
};