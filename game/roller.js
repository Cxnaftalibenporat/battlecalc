
module.exports = {
    roll(max){
        return Math.floor((Math.random() * max) + 1);
    },
    rollClassicDie() {
        return this.roll(6)
    },
    rollTenSidedDie(){
        return this.roll(10);
    }
};
