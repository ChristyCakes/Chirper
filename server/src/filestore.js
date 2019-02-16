import fs from 'fs'
let chirps = { nextid: 0 };             

if(fs.existsSync('chirps.json')) {      
    chirps = JSON.parse(fs.readFileSync('chirps.json'));   
}

let getChirps = () => {                 
    return Object.assign({}, chirps);   
}

let getChirp = id => {                      
    return Object.assign({}, chirps[id]);  
}

let createChirp = (chirp) => {            
    chirps[chirps.nextid++] = chirp;      
    writeChirps();                       
};

let updateChirp = (id, chirp) => {         
    chirps[id] = chirp;
    writeChirps();
}

let deleteChirp = id => {                  
    writeChirps();
}

let writeChirps = () => {               // chirps written to json
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

let store = {                  
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}

export default store;