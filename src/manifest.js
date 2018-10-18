/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'bookmarks-workflow',
  description: 'Bookmarks lists workflow',
  author: 'Aliaksei Harabchuk <aliaksei.harabchuk@gmail.com>',
  version: '0.1.0',
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
  browser_action: {
    default_title: 'Bookmarks Workflow',
    default_popup: 'pages/popup.html'
  },
  content_scripts: [
    {
      matches: ['*://*/*'],
      js: ['js/bm_content.js']
    }
  ],
  manifest_version: 2,
  content_security_policy: "script-src 'self'; object-src 'self'",
}
