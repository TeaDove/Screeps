module.exports = {
    run(body, role){
        
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
            console.log("Trying to spawn", newName)
    }
};