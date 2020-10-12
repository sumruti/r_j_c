export const menuItems = [
  //=========users option=========

  {
    title: 'Dashboard',
    routerLink: 'dashboard',
    icon: 'ion-android-home',
    selected: false,
    expanded: false,
    order: 10,
    visible: true
  },
  {
    title: 'Users',
    routerLink: 'registered-users',
    icon: 'ion-person-stalker',
    expanded: false,
    order: 0,
    visible: true,
    subMenu: [
      {
        title: 'Registered Users',
        routerLink: 'registered-users',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 0
      },
      {
        title: 'Guest Users',
        routerLink: 'guest-user',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 1
      },
      {
        title: 'Reported Users',
        routerLink: 'reported-user',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 2
      },
      {
        title: 'Rejected Users',
        routerLink: 'rejected-user',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 3
      },
      {
        title: 'Push Messsges',
        routerLink: 'push-messages',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 5
      },
      {
        title: 'User Rating',
        routerLink: 'user-rating',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 6
      },
    ]
  },
  {
    title: 'Categories',
    routerLink: 'categories',
    icon: 'ion-ios-keypad',
    selected: false,
    expanded: false,
    visible: true,
    order: 5
  },
  {
    title: 'Posts',
    routerLink: 'active-post',
    icon: 'ion-images',
    expanded: false,
    visible: true,
    order: 6,
    subMenu: [
      {
        title: 'Active Posts',
        routerLink: 'active-post',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 0,
      },
      {
        title: 'Admin Posts',
        routerLink: 'create-post',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 1,
      },
      {
        title: 'Reported Posts',
        routerLink: 'reported-post',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 2,
      },
      {
        title: 'Banned Posts',
        routerLink: 'banned-post',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 4,
      },

    ]
  },
  {
    title: 'Website Pages',
    routerLink: 'config',
    icon: 'ion-ios-world-outline',
    expanded: false,
    visible: true,
    order: 8,
    subMenu: [
      {
        title: 'Terms',
        routerLink: 'terms',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 0,
      },
      {
        title: 'Policy',
        routerLink: 'policy',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 1,
      },
      {
        title: 'Help',
        routerLink: 'help',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 2,
      },
      {
        title: 'News',
        routerLink: 'news',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 3,
      },
      {
        title: 'Our Story',
        routerLink: 'ourstory',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 5,
      },
    ]
  },
  {
    title: 'Report Reason',
    routerLink: 'report-reason',
    icon: 'ion-help',
    selected: false,
    expanded: false,
    visible: true,
    order: 9,
    subMenu: [
      {
        title: 'User Report Reason',
        routerLink: 'user-reason',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 0,
      },
      {
        title: 'Post Report Reason',
        routerLink: 'post-reason',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 1,
      },
    ]
  },
  {
    title: 'Manage Access',
    routerLink: 'manage-access',
    icon: 'ion-ios-people',
    selected: false,
    expanded: false,
    visible: true,
    order: 14
  },
  {
    title: 'Push Notification',
    routerLink: 'push-notification',
    icon: 'ion-android-notifications',
    selected: false,
    expanded: false,
    visible: true,
    order: 15
  },
  {
    title: 'SEO',
    routerLink: 'home',
    icon: 'ion-ios-flag',
    selected: false,
    expanded: false,
    visible: true,
    order: 16,
    subMenu: [
      {
        title: 'Home',
        routerLink: 'home',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 6,
      },
      {
        title: 'How It Works',
        routerLink: 'how-it-works',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 6,
      },
      {
        title: 'About',
        routerLink: 'about',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 7,
      },
      {
        title: 'Term',
        routerLink: 'term',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 8,
      },
      {
        title: 'Privacy',
        routerLink: 'privacy',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 9,
      },
      {
        title: 'Helps',
        routerLink: 'helps',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 10,
      },
      {
        title: 'Login',
        routerLink: 'login',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 11,
      },
      {
        title: 'Register',
        routerLink: 'register',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 12,
      },
      {
        title: 'Sitemap',
        routerLink: 'sitemap',
        icon: 'ion-android-home',
        selected: false,
        expanded: false,
        order: 12,
      },

    ]
  },

];
