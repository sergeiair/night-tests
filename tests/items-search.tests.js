var loginForm = require('../elements/login.form.js'),
    calendarPanel = require('../elements/calendar.panel.js'),
    shared = require('../elements/shared.js'),
    config = require('../config/app-config.js'),

// TESTS

    itemsSearchTests = {
        'Clearing local storage': function(browser) {
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
                .waitForElementVisible(calendarPanel.elements.searchListItemsAddr, 10000)
                .elements('css selector', calendarPanel.elements.searchListItemsAddr, function (listItems) {
                    var items = [];
                    listItems.value.map(function (v, k) {
                        items.push([v, k]);
                    });
                    browser.assert.ok(items.length > 1);
                });
        },

        'next search': function (browser) {
            browser
                .pause(3000)
                .setValue(calendarPanel.elements.searchInput, 7000)
                .pause(1000)
                .setValue(calendarPanel.elements.searchInput, browser.Keys.ENTER)
                .pause(3000)
                .waitForElementVisible(calendarPanel.elements.searchList5thEl, 10000)
                .assert.containsText(calendarPanel.elements.searchList5thEl, '7000')
        },

        'search val that not exists': function (browser) {
            var d = new Date();
            browser
                .pause(3000)
                .setValue(calendarPanel.elements.searchInput, d.toUTCString() + d.toUTCString() + d.toUTCString())
                .pause(1000)
                .setValue(calendarPanel.elements.searchInput, browser.Keys.ENTER)
                .pause(3000)
                .waitForElementNotPresent(calendarPanel.elements.searchListItemsAddr, 10000)
                .end()
        }

    };



//module.exports = itemsSearchTests;