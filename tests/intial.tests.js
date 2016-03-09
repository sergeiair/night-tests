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
                .url('https://localhost/offer-pc')
                .waitForElementVisible(loginForm.elements.companyIdInput, 30000)
                .pause(1500)
                .setValue(loginForm.elements.companyIdInput, 'test\\22093')
                .setValue(loginForm.elements.userNameInput, '1')
                .setValue(loginForm.elements.passwordInput, '')
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
                .waitForElementVisible(calendarPanel.elements.calendarList, 30000)
                .pause(1000)
                .click(calendarPanel.elements.refreshBtn)
                .pause(200)
                .assert.cssClassNotPresent(shared.elements.loader2, "x-item-hidden");
        },

        'testing panel controls': function (browser) {
            browser
                .pause(1000)
                .click(calendarPanel.elements.newWCBtn)
                .waitForElementVisible(calendarPanel.elements.iconBriefcase, 5000)
                .click(calendarPanel.elements.iconBriefcase)
                .waitForElementVisible(calendarPanel.elements.createItemBtn, 5000)
        },

        'attempt to create new WC': function (browser) {
            browser
                .setValue(calendarPanel.elements.searchInput, browser.Keys.ENTER)
                .pause(10000)
                .execute(function() {
                    browser.assert(document.querySelectorAll(calendarPanel.elements.searchListItems).length > 2);
                });
        }
    };


module.exports = initialTests;