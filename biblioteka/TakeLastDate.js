class TakeLastDate extends SaveRecordsStrategy {
    constructor() { 
        super();
    }

    compare(localRecord, centralRecord) {
        if(localRecord.lastmodified < centralRecord.lastmodified)
            return "central";
        else if(localRecord.lastmodified > centralRecord.lastmodified)
            return "local";
        return "equal";
    }
}