var loginForm = require('../elements/login.form.js'),
     calendarPanel = require('../elements/calendar.panel.js'),
     shared = require('../elements/shared.js'),
     config = require('../config/app-config.js'),

 // TESTS

 LLTests = {
     'Clearing local storage': function (browser) {
         browser.execute(function () {
             document.window.localStorage.clear();
         });
     },

     'putting creds': function (browser) {
         browser
             .url(config.host)
             .waitForElementVisible(loginForm.elements.companyIdInput, 60000)
             .pause(1500)
             .setValue(loginForm.elements.companyIdInput, config.creds.companyIdInput)
             .setValue(loginForm.elements.userNameInput, config.creds.userNameInput)
             .setValue(loginForm.elements.passwordInput, config.creds.passwordInput)
     },

     'login attempt': function (browser) {
         browser
             .pause(1000)
             .click(loginForm.elements.loginBtn)
             .pause(1000)
             .assert.visible(shared.elements.loader)
     },

     'opening calendar list': function (browser) {
         browser
             .waitForElementVisible(calendarPanel.elements.calendarList, 90000)
     },

     'logging out' : function (browser) {
         browser
             .pause(1000)
             .click(shared.elements.btnMore)
             .pause(1000)
             .click(shared.elements.btnExit)
     },

     'try invalid login': function (browser) {
         browser
             .waitForElementVisible(loginForm.elements.companyIdInput, 5000)
             .pause(1000)
             .click(loginForm.elements.loginBtn)
             .waitForElementVisible(shared.elements.msgBox, 60000)
             .pause(1000)
             .click(shared.elements.msgBoxBtn1)
             .end()

     }
 };



//module.exports = LLTests;