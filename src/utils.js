function harvest_any(creep, target){
    if(target instanceof Source){
        if (creep.harvest(target)==ERR_NOT_IN_RANGE)
            creep.moveTo(target, {visualizePathStyle: {stroke: '#FFAA00'}});
    } else if(target instanceof Ruin){
        if (creep.withdraw(target, RESOURCE_ENERGY)==ERR_NOT_IN_RANGE)
            creep.moveTo(target, {visualizePathStyle: {stroke: '#FFAA00'}});
    } else if(target instanceof Resource){
        if (creep.pickup(target)==ERR_NOT_IN_RANGE)
            creep.moveTo(target, {visualizePathStyle: {stroke: '#FFAA00'}});
    }
}
module.exports.harvest_any = harvest_any