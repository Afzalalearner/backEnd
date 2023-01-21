const bcrypt=require('bcrypt')

const getHash=(plaintext)=>{
    return bcrypt.hash(plaintext,1)
}

const verify=(plaintext,hash)=>{
    return bcrypt.compare(plaintext,hash)
}

module.exports={
    getHash,
    verify,
}
