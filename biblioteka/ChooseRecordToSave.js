class ChooseRecordToSave extends SaveRecordsStrategy {
    constructor() {
        super();   
    }

    compare(localRecord, centralRecord) {
        if (centralRecord == undefined && confirm(`OK - wstaw\nanuluj - nie wstawiaj\nChcesz wstawić rekord do bazy centralnej: ${JSON.stringify(localRecord)}`)){
            return "local";
        }
        if (localRecord.lastmodified > centralRecord.lastmodified && confirm(`OK - synchronizuj rekord\nanuluj - porzuć zmiany\nRekord z bazy centralnej:
         ${JSON.stringify(centralRecord)}\nRekord z bazy lokalnej:
          ${JSON.stringify(localRecord)}`)){
            return "local";
        } else if (localRecord.lastmodified < centralRecord.lastmodified)
            return "central";
        else
            return "equal";

    }
}
