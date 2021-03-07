//TODO:
/*
Разбить на папки для модульного подключения
Разработать подролевую систему
Разработать захватчиков
Разработать автоматических создателей
*/
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require("role.repairer");
var roleContainerManager = require("role.containerManager");

var handlerTower = require("handler.tower");

Memory["harvesting"]={};
for (var sourse of Game.spawns['Spawn1'].room.find(FIND_SOURCES)){
    Memory["harvesting"][sourse.id]=[0,3];
}

// Memory["creepN"]=0;

module.exports.loop = function () {
    
    require('spawn').run();
    for(var name in Game.structures){
        var cur_structure = Game.structures[name];
        if (cur_structure.structureType==STRUCTURE_TOWER)
            handlerTower.run(cur_structure);
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
	    switch(creep.memory.role) {
            case 'harvester':{
                roleHarvester.run(creep);
                break;
            }
            case 'upgrader':{
                roleUpgrader.run(creep);
                break;
            }
            case 'builder':{
                roleBuilder.run(creep);
                break;
            }
            case  'repairer':{
                roleRepairer.run(creep);
                break;
            }
            case 'containerManager':{
                roleContainerManager.run(creep);
                break;
            }
        }
    }
}