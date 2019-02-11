class ChooseRecordToSave extends SaveRecordsStrategy {
    constructor() {
        super();   
    }

    compare(localRecord, centralRecord) {
        if(centralRecord != undefined && confirm(`TAK - rekord z bazy centralnej\nNIE - rekord z bazy lokalnej\nRekord z bazy centralnej: ${centralRecord}\nRekord z bazy lokalnej: ${localRecord}`)) {
            return "central";
        }
        return "local";
    }
}
