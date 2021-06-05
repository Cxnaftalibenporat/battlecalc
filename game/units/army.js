class Army {
    constructor(units, combatPosition) {
        this.units = units;
        this.combatPosition = combatPosition;
    }

    toString() {
        let unitsList = `${this.combatPosition}`;
        if (this.units.length > 0) {
            unitsList += `er: \n`;
            var map = new Map();
            this.units.forEach(unit => {
                let ctrName = unit.constructor.name;
                if (map.get(ctrName) == undefined) {
                    map.set(ctrName, 0);
                }
                map.set(ctrName, map.get(ctrName) + 1);
            });

            for (let [k,v] of map){
                unitsList += `${k}: ${v}\n`
            }
            unitsList = unitsList.trim();
            return unitsList;
        }
        return `${this.combatPosition}er: dead`;
    }
}

module.exports = Army;