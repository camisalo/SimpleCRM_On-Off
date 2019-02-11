class TakeLastDate extends SaveRecordsStrategy {
    constructor() { 
        super();
    }

    compare(localRecord, centralRecord) {
        if (centralRecord == undefined || localRecord.lastmodified > centralRecord.lastmodified)
            return "local";
        else if(localRecord.lastmodified < centralRecord.lastmodified)
            return "central";
        return "equal";
    }
}