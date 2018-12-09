/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'Bookmarks Workflow',
  description: 'Work with bookmarks in a workflow like way.',
  author: 'Aliaksei Harabchuk <aliaksei.harabchuk@gmail.com>',
  version: '0.2.5',
  icons: {
    '128': 'icons/128.png'
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
