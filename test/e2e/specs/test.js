// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  // 'default e2e tests': function (browser) {
  //   // automatically uses dev Server port from /config.index.js
  //   // default: http://localhost:8080
  //   // see nightwatch.conf.js
  //   const devServer = browser.globals.devServerURL

  //   browser
  //     .url(devServer)
  //     .waitForElementVisible('#app', 5000)
  //     .assert.elementPresent('.hello')
  //     .assert.containsText('h1', 'Welcome to Your Vue.js App')
  //     .end()
  // }

  'vconsole test': browser => {
    const url = browser.globals.devServerURL + '?debug=vconsole'
    browser
      .url(url)
      .waitForElementVisible('#app', 5000)
      .pause(1000)
      .waitForElementVisible('#__vconsole', 5000)
      .click('div.vc-switch')
      .pause(1000)
      .assert.containsText('#__vc_tab_default', 'Log')
      .end()
  },
  'eruda test': browser => {
    const url = browser.globals.devServerURL + '?debug=eruda'
    browser
      .url(url)
      .waitForElementVisible('#app', 5000)
      .pause(1000)
      .assert.elementPresent('#huVuePluginEruda')
      .end()
  }
}
