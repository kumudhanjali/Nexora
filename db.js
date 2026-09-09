/* =========================================
   NEXORA — DAY 48
   IndexedDB Local Storage
   ========================================= */

const DB_NAME = "NexoraDB";
const DB_VERSION = 1;
const STORE_NAME = "appData";


function openDatabase() {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );

        request.onupgradeneeded = event => {

            const database = event.target.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {
                database.createObjectStore(
                    STORE_NAME,
                    { keyPath: "id" }
                );
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}


/* =========================================
   Save Data
   ========================================= */

export async function saveData(id, data) {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = database.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaction.objectStore(
            STORE_NAME
        );

        store.put({
            id,
            data,
            updatedAt: new Date().toISOString()
        });

        transaction.oncomplete = () => {
            database.close();
            resolve(true);
        };

        transaction.onerror = () => {
            database.close();
            reject(transaction.error);
        };
    });
}


/* =========================================
   Get Data
   ========================================= */

export async function getData(id) {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = database.transaction(
            STORE_NAME,
            "readonly"
        );

        const store = transaction.objectStore(
            STORE_NAME
        );

        const request = store.get(id);

        request.onsuccess = () => {
            database.close();

            resolve(
                request.result
                    ? request.result.data
                    : null
            );
        };

        request.onerror = () => {
            database.close();
            reject(request.error);
        };
    });
}


/* =========================================
   Delete Data
   ========================================= */

export async function deleteData(id) {

    const database = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction = database.transaction(
            STORE_NAME,
            "readwrite"
        );

        const store = transaction.objectStore(
            STORE_NAME
        );

        store.delete(id);

        transaction.oncomplete = () => {
            database.close();
            resolve(true);
        };

        transaction.onerror = () => {
            database.close();
            reject(transaction.error);
        };
    });
}