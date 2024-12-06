import Papa from "papaparse";

// This function takes a csv file and returns objects with the header names as keys
export const fetchCsvData = async (csvFile) => {

    // Use fetch API and then convert into a "Blob" file
    const response = await fetch(csvFile);
    const text = await response.text();

    // Parse file
    return new Promise((resolve, reject) => {
        // First row is treated as the header row and will use the top row as keys.
        Papa.parse(text, {
            header: true, 
            complete: (result) => {
                if(result.errors.length) {
                    reject(result.errors);
                } else resolve(result.data);
            }
        })
    })
}

