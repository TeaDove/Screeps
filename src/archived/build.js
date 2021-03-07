module.exports = {
    run(creep){
        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#00AAFF'}});
        }      
    }
};