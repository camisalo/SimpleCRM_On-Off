class TakeLastDate extends SaveRecordsStrategy {
    constructor() { 
        super();
    }

    compare(localRecord, centralRecord) {
        if(localRecord.lastmodified < centralRecord.lastmodified)
            return "central";
        else
            return "local";
    }
}