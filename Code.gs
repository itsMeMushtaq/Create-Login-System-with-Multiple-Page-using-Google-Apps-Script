// https://www.youtube.com/watch?v=DHYOk4aAgJE
const favicon = "https://cdn-icons-png.flaticon.com/512/3426/3426748.png";
const backgroundImage = "https://source.unsplash.com/random/?dark,education";

let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserData");
function getURL() { return ScriptApp.getService().getUrl(); }

function translateText(text, sourceLanguage, targetLanguage) {
  // Get the Language service.
  var languageService = LanguageApp;

  // Translate the text.
  var translatedText = languageService.translate(text, sourceLanguage, targetLanguage);

  // Return the translated text.
  return translatedText;
}

function doGet(e) {
  let template = HtmlService.createTemplateFromFile("login");
  template.message = "";
  template.userName = "";
  return template.evaluate().
    setTitle("Google Apps Script : Bootstrap : Login Page").setFaviconUrl(favicon);
} // end of doGet()

function doPost(e) {
  let userData = ss.getDataRange().getValues();
  for (var i = 0; i < userData.length; i++) {
    if (userData[i][0] == e.parameter.emailAdress && userData[i][1] == e.parameter.password) {
      let template = HtmlService.createTemplateFromFile("home");
      template.userName = userData[i][0];
      template.fullName = userData[i][2];
      template.userRole = userData[i][3];
      template.isActive = userData[i][4];
      template.backgroundImage = backgroundImage;
      return template.evaluate().
        setTitle("Google Apps Script : Bootstrap : Home Page").setFaviconUrl(favicon);
    } // end of if
    else if (e.parameter.logoutButton == "logout") {
      let template = HtmlService.createTemplateFromFile("login");
      template.message = "Successfully Logged Out";
      template.backgroundImage = backgroundImage;
      return template.evaluate().        
        setTitle("Google Apps Script : Bootstrap : Login Page").
        setFaviconUrl(favicon);
    } // end of else if
  } // end of for loop

  // if password does not match, then not login
  let template = HtmlService.createTemplateFromFile("login");
    template.message = "Username / Password does not Match";
    template.backgroundImage = backgroundImage;
    template.userName = "";
    return template.evaluate().
      setTitle("Google Apps Script : Bootstrap : Login Page").setFaviconUrl(favicon);
} // end of doPost
