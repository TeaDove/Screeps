module.exports = {
    run(creep){
        var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: (resourse) => {
                return (resourse.energy>0);}});
        if (target == undefined)
            var target = creep.pos.findClosestByPath(FIND_RUINS, {
                filter: (ruin) => {
                    return (ruin.store.energy>0);}});        
        if (target == undefined)
            var target = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: (source) => {
                    return (source.energy>0);}});
        
        require('utils').harvest_any(creep, target);
    }
};