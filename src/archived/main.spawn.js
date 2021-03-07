/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('main_spawn');
 * mod.thing == 'a thing'; // true
  */
// function spawnNewCreeps(){
    
// }

module.exports = {
    run (){
        function getBodyByEA(EC){
            switch (EC){
                case 200:
                    return [WORK, CARRY, MOVE];
                case 250:
                    return [WORK, CARRY, CARRY, MOVE];
                case 300:
                    return [WORK, WORK, CARRY, MOVE];
                case 350:
                    return [WORK, WORK, CARRY, MOVE, MOVE];
                case 400:
                    return [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
                case 450:
                    return [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
                case 500:
                    return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
                case 550:
                    return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
                case 600:
                    return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                case 650:
                    return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
                case 700:
                    return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
                case 750:
                    return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
                case 800:
                    return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
                case 850:
                    return [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
                default:
                    return [WORK, CARRY, MOVE];
            }
        }
        
        var strToSend = "Current status: ";
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                strToSend += 'Clearing non-existing creep memory:';
                strToSend += name + " ";
            }
        }
        var ECA = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        strToSend += "ECA " + ECA+ " "+ "EA "+ Game.spawns['Spawn1'].room.energyAvailable+" ";
        
        const maxCreepByRole = Game.spawns['Spawn1'].room.find(FIND_SOURCES).length+1;
            
        var builders = _.filter(Game.creeps, (creep) => creep.memory.task== 'har_bui');
        var repairer = _.filter(Game.creeps, (creep) => creep.memory.task == 'har_rep');
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.task == 'har_upg');
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.task == 'har_sav');
        var idles = _.filter(Game.creeps, (creep) => creep.memory.task == 'idle');
        availIdles = idles.length;
        cur_room = Game.spawns['Spawn1'].room; 
        //
        while (availIdles>0){
            if (harvesters.length<=maxCreepByRole && availIdles!=0)
                idles[availIdles-1].memory.task = 'har_sav';
            availIdles--;
            if (upgrader.length==maxCreepByRole && availIdles!=0)
                idles[availIdles-1].memory.task = 'har_upg';
            availIdles--;
            if (cur_room.find(FIND_CONSTRUCTION_SITES)!='' && builders.length<=maxCreepByRole && availIdles!=0)
                idles[availIdles-1].memory.task = 'har_bui';
            availIdles--;
            if (cur_room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax && object.structureType != STRUCTURE_ROAD})!='' && repairers.length<=maxCreepByRole && availIdles!=0)
                idles[availIdles-1].memory.task = 'har_rep';
            availIdles--;
        }
        if 
        // if (Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax)
        // //
        // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        // strToSend += ('Builders: ' + builders.length + " ");
        // if(builders.length < maxCreepByRole)
        //     require("spawnCreep").run(getBodyByEA(ECA), "builder");
        
        // var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        // strToSend += ('repairer: ' + repairer.length + " ");
        // if(repairer.length < 2 && ECA>=450) 
        //     require("spawnCreep").run(getBodyByEA(450), "repairer");
            
        // var containerManager = _.filter(Game.creeps, (creep) => creep.memory.role == 'containerManager');
        // strToSend += ('containerManager: ' + containerManager.length + " ");
        // if(containerManager.length < maxCreepByRole-1 && ECA>=500 && Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) &&structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}})!='') {
        //     require("spawnCreep").run([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], "containerManager");
        // }
                
        // var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        // strToSend += ('Upgrader: ' + upgrader.length + " ");
        // if(upgrader.length < maxCreepByRole) 
        //     require("spawnCreep").run(getBodyByEA(ECA-100), "upgrader");
        
        // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        // strToSend += ('harvesters: ' + harvesters.length + " ");
        // if(harvesters.length == 0) 
        //     require("spawnCreep").run(getBodyByEA(200), "harvester");
        // if(harvesters.length == 1) 
        //     require("spawnCreep").run(getBodyByEA(ECA-100), "harvester");
        // else if (harvesters.length < maxCreepByRole)
        //     require("spawnCreep").run(getBodyByEA(ECA), "harvester");
        
        console.log(strToSend);
    }
};