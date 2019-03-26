
/**
* Navigation menu data
*
* @type {Array of Objects}
* @param {string} color Left icon color for different menu
* @param {string} action Left icon of the list
* @param {string} title Title of the list
* @param {string} linkTo Router path
* @param {array} items.items Child list items
*
*/

const items = [
  {
    color: 'teal lighten-3',
    action: 'ondemand_video',
    title: 'Latest',
    linkTo: '/'
  },
  {
    color: 'red',
    action: 'whatshot',
    title: 'Trending',
    linkTo: '/quorum',
    class: 'step9'
  },
  {
    color: 'green lighten-2',
    action: 'video_library',
    title: 'My Library',
    items: [
      { title: 'Owned', linkTo: '/events/owned' },
      { title: 'Favorites', linkTo: '/events/favorites' }
    ]
  },
  {
    color: 'purple lighten-3',
    action: 'recent_actors',
    title: 'Channels',
    linkTo: '/favourite-contacts'
  },
  {
    color: 'brown lighten-2',
    action: 'account_balance_wallet',
    title: 'Wallet',
    items: [
      { title: 'Summary', linkTo: '/wallet/summary' },
      { title: 'Send', linkTo: '/wallet/send' },
      { title: 'Receive', linkTo: '/wallet/receive' },
      { title: 'History', linkTo: '/wallet/history' }
    ]
  }
]

export default items
