// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'http://localhost:9090/',
  apiUrl: 'https://cart-cacu.herokuapp.com/',
  firebase: {
    apiKey: "AIzaSyAkmf7hfLuZW_rBXlUlVX_IGGlNMR91twI",
    authDomain: "cart-cacu.firebaseapp.com",
    databaseURL: "https://cart-cacu.firebaseio.com",
    projectId: "cart-cacu",
    storageBucket: "cart-cacu.appspot.com",
    messagingSenderId: "992371702217",
    appId: "1:992371702217:web:f364171cadd038a2d05018"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
