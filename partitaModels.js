function localDatetimeFromDate(date){
    // takes a js Date instance
    let dateString = date.toDateString();
    let localeTimeString = date.toLocaleTimeString();
    let localeString = dateString + ", "  + localeTimeString;
    return localeString;
}


function localDatetimeFromUTC(utcString){
    // valid inputs are the result of: let d = new Date(); d.toUTCString();
    // db should store the UTCString
    let date = new Date(utcString);
    return localDatetimeFromDate(date);
}


class Datetime {
    constructor(utcString) {
        this.utcDatetime = utcString;
        this.localDatetime = localDatetimeFromUTC(this.utcDatetime);
    }

    update(date) {
        // takes a js Date instance
        this.utcDatetime = date.toUTCString();
        this.localDatetime = localDatetimeFromDate(date);
    }
}

class Scale {
    constructor(title, lastPlayed, tempos){
        // type title: string
        // type lastPlayed: Datetime or null (if not yet played)
        // type tempos: Array[number]
        this.title = title;
        this.lastPlayed = lastPlayed;
        this.tempos = tempos;
    }

    static createNew(title, tempos) {
        // type title: string
        // type tempos: Array[number]
        return new this.prototype.constructor(title, null, tempos);
    }

    static fromObj(scaleObj) {
        return new this.prototype.constructor(scaleObj["title"], scaleObj["last_played"], scaleObj["tempos"]);
    }

    updateLastPlayed() {
        let date = new Date();
        this.lastPlayed.update(date);
    }
}

class ScaleCollection extends Array {
    constructor(objScales){
        super();
        for (const objScale of objScales) {
            let newScale = Scale.fromObj(objScale);
            this.push(newScale);
        }
    }
}


class Models {
    constructor() {
        this.scalesModel = null;
    }

    populate() {
        let jsonData = this.getPopulateData();
        let objData = JSON.parse(jsonData);
        this.scalesModel = new ScaleCollection(objData.scales);
    }

    getPopulateData() {
        return '{"scales": [{"title": "A minor", "tempos": [50, 100, 150, 200, 250], "last_played": "21st July"}]}';
    }
}

export {Models};