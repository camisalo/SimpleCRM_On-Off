class ChooseRecordToSave extends SaveRecordsStrategy {
    constructor() {
        super();   
    }

    compare() {
        if(confirm("TAK - rekord z bazy centralnej\nNIE - rekord z bazy lokalnej")) {
            return "central";
        }
        return "local";
    }
}

