var loginForm = require('../elements/login.form.js'),
    calendarPanel = require('../elements/calendar.panel.js'),
    shared = require('../elements/shared.js'),
    config = require('../config/app-config.js'),

    // TESTS

    initialTests = {
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
                .pause(1000)
                .click(calendarPanel.elements.refreshBtn)
                .pause(200)
                .assert.cssClassNotPresent(shared.elements.loader2, "x-item-hidden");
        },

        'testing panel controls': function (browser) {
            browser
                .pause(2000)
                .click(calendarPanel.elements.newWCBtn)
                .waitForElementVisible(calendarPanel.elements.iconBriefcase, 5000)
                .click(calendarPanel.elements.iconBriefcase)
                .pause(2000)
                .waitForElementVisible(calendarPanel.elements.createItemBtn, 5000)
        },

        'search items': function (browser) {
            browser
                .setValue(calendarPanel.elements.searchInput, browser.Keys.ENTER)
                .waitForElementVisible(calendarPanel.elements.searchListItemsAddr, 10000)
        },

        'creating new wc': function (browser) {
            var dt = new Date();

            browser
                .click(calendarPanel.elements.searchListItemsAddr)
                .waitForElementPresent(calendarPanel.elements.createWCCarousel, 2000)
                .pause(2000)
                .setValue(calendarPanel.elements.createWCDescr, 'Created by Nightwatch test ' + dt.toLocaleString())
                .click(calendarPanel.elements.createWCBtn)
        },

        'testing new wc': function (browser) {
            browser
                .waitForElementPresent(calendarPanel.elements.workcard, 10000)
                .pause(2000)
                .click(calendarPanel.elements.workcard)
                .waitForElementPresent(calendarPanel.elements.wcCarousel, 10000)
                .assert.containsText(calendarPanel.elements.workcardDescr,
                    'Created by Nightwatch test');

        },

        'creating another one': function (browser) {
            browser
                .pause(1000)
                .click(shared.elements.btnBack)
                .waitForElementVisible(calendarPanel.elements.calendarList, 10000)
                .pause(2000)
                .click(calendarPanel.elements.newWCBtn)
                .waitForElementVisible(calendarPanel.elements.iconDocument, 10000)
                .click(calendarPanel.elements.iconDocument)
                .pause(2000)
                .waitForElementVisible(calendarPanel.elements.createItemBtn, 10000)
        },

        'search items once again': function (browser) {
            browser
                .setValue(calendarPanel.elements.searchInput, browser.Keys.ENTER)
                .waitForElementVisible(calendarPanel.elements.searchListItemsTitle, 10000)
        },

        'creating offer wc': function (browser) {
            var dt = new Date();

            browser
                .click(calendarPanel.elements.searchListItemsTitle)
                .waitForElementPresent(calendarPanel.elements.createWCCarousel, 10000)
                .pause(2000)
                .setValue(calendarPanel.elements.createWCDescr, 'Created offer WC by Nightwatch test ' + dt.toLocaleString())
                .click(calendarPanel.elements.createWCBtn)
        },

        'testing new offer wc': function (browser) {
            browser
                .waitForElementPresent(calendarPanel.elements.lastWorckard, 10000)
                .pause(2000)
                .click(calendarPanel.elements.lastWorckard)
                .pause(2000)
                .waitForElementPresent(calendarPanel.elements.wcCarousel, 10000)
                .assert.containsText(calendarPanel.elements.workcardDescr,
                'Created offer WC by Nightwatch test')
                .end();
        }
    };



module.exports = initialTests;