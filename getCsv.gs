function getCsv() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let original_sheet = ss.getSheetByName('Original');
  let english_sheet = ss.getSheetByName('English');
  let archive_sheet = ss.getSheetByName('Archive');
  
  //　get csv file
  let csv_url = 'https://santemontreal.qc.ca/fileadmin/fichiers/Campagnes/coronavirus/situation-montreal/municipal.csv'
  let options = {
    method : "get",
    followRedirects: true, //
  };
  
  response = UrlFetchApp.fetch(csv_url, options);
  let csvText = response.getContentText('cp1252');
  let csvData = Utilities.parseCsv(csvText, ';');
  
  // add a new column
  csvData[0][6] = 'Date';
  
  // comma to period
  for (let i=1; i < csvData.length; i++){
    for (let j=0; j < csvData[i].length; j++){
      if (j >= 2){
        csvData[i][j] = csvData[i][j].replace(',', '.');
      }
    }
    csvData[i][6] = new Date().toISOString().substr(0,10);
  }
  
  
  // paste at original
  original_sheet.getRange(1,1,csvData.length, csvData[0].length).setValues(csvData);
  
  // paste at english
  csvData.shift();
  english_sheet.getRange(2,1,csvData.length, csvData[0].length).setValues(csvData);
  
  // paste at archive
  archive_sheet.getRange(archive_sheet.getLastRow()+1,1,csvData.length, csvData[0].length).setValues(csvData);
  
}
