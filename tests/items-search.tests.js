var loginForm = require('../elements/login.form.js'),
    calendarPanel = require('../elements/calendar.panel.js'),
    shared = require('../elements/shared.js'),

// TESTS

    initialTests = {
        'Clearing local storage' : function(browser) {
            browser.execute(function () {
                document.window.localStorage.clear();
            });
        },

        'putting creds' : function (browser) {
            browser
                .url('https://localhost/main-client')
                .waitForElementVisible(loginForm.elements.companyIdInput, 60000)
                .pause(1500)
                .setValue(loginForm.elements.companyIdInput, 'test\\9017')
                .setValue(loginForm.elements.userNameInput, 'sergey')
                .setValue(loginForm.elements.passwordInput, 'abc123')
        },

        'login attempt' : function (browser) {
            browser
                .pause(1000)
                .click(loginForm.elements.loginBtn)
                .pause(1000)
                .assert.visible(shared.elements.loader)
        },

        'opening calendar list' : function (browser) {
            browser
                .waitForElementVisible(calendarPanel.elements.calendarList, 60000)
        },

        'testing panel controls': function (browser) {
            browser
                .pause(1000)
                .click(calendarPanel.elements.newWCBtn)
                .waitForElementVisible(calendarPanel.elements.iconBriefcase, 5000)
                .click(calendarPanel.elements.iconBriefcase)
                .pause(1000)
                .waitForElementVisible(calendarPanel.elements.createItemBtn, 5000)
        },

        'count search items': function (browser) {
            browser
                .setValue(calendarPanel.elements.searchInput, browser.Keys.ENTER)
                .waitForElementVisible(calendarPanel.elements.searchListItems, 10000)
                .elements('css selector', calendarPanel.elements.searchListItems, function (listItems) {
                    var items = [];
                    listItems.value.map(function (v, k) {
                        items.push([v, k]);
                    });
                    browser.assert.ok(items.length > 1);
                });
        },

        'next search': function (browser) {
            browser
                .pause(5000)
                .setValue(calendarPanel.elements.searchInput, 700)
                .pause(1000)
                .setValue(calendarPanel.elements.searchInput, browser.Keys.ENTER)
                .waitForElementVisible(calendarPanel.elements.searchListItems, 10000)
                .elements('css selector', calendarPanel.elements.searchListItems, function (listItems) {
                    var items = [];
                    console.log(listItems);
                    listItems.value.map(function (v, k) {
                        items.push([v, k]);
                    });
                    //browser.assert.ok(items.length > 1);
                });
        }

    };



module.exports = initialTests;