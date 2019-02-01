//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;
               
//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

/* Facade */
class DatabaseSynchronizer {

    constructor(localDbName) {
        this.localDbName = localDbName;
        this.localDb = window.indexedDB.open(localDbName);
        this.localDbTables = {};
        this.tableCollection = new TableCollection();
        this.setStrategy();
    }
    
    setStrategy(strategy) {
        switch(strategy) {
            case 1:
                this.strategy = new ChooseRecordToSave();
                break;
            case 2:
                this.strategy = new TakeLastDate();
                break;
            default:
                this.strategy = new TakeLastDate();
        }
    }

    addTable(localName, serverEndpoint) {
        this.localDbTables[localName] = serverEndpoint;
    }

    removeTable(localName) {
        delete this.localDbTables[localName];
    }

    synchronize() {
        this.tableCollection.synchronize(this.strategy);
    }

    synchronize(tableName) {
        if (tableName == undefined){
            this.tableCollection.synchronize(this.strategy);
        } else {
            this.tableCollection.getByTableName(tableName);
        }
    }
}
