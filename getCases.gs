function getCases() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let cumulative_sheet = ss.getSheetByName('Cumulative Cases');
  
  //　get csv file
  let csv_url = 'https://santemontreal.qc.ca/fileadmin/fichiers/Campagnes/coronavirus/situation-montreal/courbe.csv'
  let options = {
    method : "get",
    followRedirects: true, //
  };
  
  response = UrlFetchApp.fetch(csv_url, options);
  let csvText = response.getContentText('cp1252');
  let csvData = Utilities.parseCsv(csvText, ';');
  csvData.shift();
  
  // paste
  cumulative_sheet.getRange(2,1,csvData.length, csvData[0].length).setValues(csvData); 
}

