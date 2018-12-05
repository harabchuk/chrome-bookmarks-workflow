/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'bookmarks-workflow',
  description: 'Bookmarks lists workflow',
  author: 'Aliaksei Harabchuk <aliaksei.harabchuk@gmail.com>',
  version: '0.1.1',
  icons: {
    '64': 'icons/64.png'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    'activeTab',
    'unlimitedStorage',
    'storage',
    'bookmarks'
  ],
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  browser_action: {
    default_title: 'Bookmarks Workflow',
    default_popup: 'pages/popup.html'
  },
  manifest_version: 2,
  content_security_policy: "script-src 'self'; object-src 'self'",
  web_accessible_resources: [
    'js/extractors/default.js',
    'js/extractors/blocket.js',
  ],
}
