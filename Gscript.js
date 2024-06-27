function generateAndShortenLinks() {
  var fileId = 'YOUR_FILE_ID'; // Replace with your actual file ID from Google Drive
  var recipients = [
    { name: 'Recipient 1', email: 'test@example.com' },
    
    // Add more recipients as needed
  ];

 var baseUrl = 'https://drive.google.com/uc?id=' + fileId;
  var shortIoApiKey = 'API_KEY'; // Replace with your Short.io API key
  var shortIoDomain = 'DOMAIN'; // Replace with your Short.io domain, or customer domain

 for (var i = 0; i < recipients.length; i++) {
    var recipient = recipients[i];
    var uniqueLink = baseUrl + '&recipient=' + encodeURIComponent(recipient.email);
    var shortLink = shortenUrl(uniqueLink, shortIoApiKey, shortIoDomain);
    if (shortLink) {
      Logger.log('Shortened Link for ' + recipient.email + ': ' + shortLink);
    } else {
      Logger.log('Failed to shorten URL for ' + recipient.email);
    }
  }
}

function shortenUrl(baseUrl, shortIoApiKey, shortIoDomain) {
  
   var url = 'https://api.short.io/links';
  var payload = {
    originalURL: baseUrl,
    domain: shortIoDomain
  };
  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': shortIoApiKey,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true 
  };

  var response = UrlFetchApp.fetch(url, options);
  var responseCode = response.getResponseCode();

  if (responseCode === 200 || responseCode === 201) {
    var json = JSON.parse(response.getContentText());
    return json.secureShortURL;
  } else {
    Logger.log('Failed with response code: ' + responseCode);
    Logger.log('Response: ' + response.getContentText());
    return null;
  }
}
