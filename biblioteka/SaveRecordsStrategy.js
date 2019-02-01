class SaveRecordsStrategy {
    constructor() {
        if(new.target === SaveRecordsStrategy) {
            throw new TypeError("Cannot construct abstract instances directly");
        }
    }

    compare() {
        throw new Error("Method 'compare' must be implemented.");
    }
}