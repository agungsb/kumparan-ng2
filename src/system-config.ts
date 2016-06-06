/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
  'ng2-material': 'vendor/ng2-material'
};

/** User packages configuration. */
const packages: any = {
  'ng2-material': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'index.js'
  },
  '@angular2-material/core': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'core.js'
  },
  '@angular2-material/checkbox': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'checkbox.js'
  },
  '@angular2-material/button': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'button.js'
  },
  '@angular2-material/sidenav': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'sidenav.js'
  },
  '@angular2-material/grid-list': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'grid-list.js'
  },
  '@angular2-material/toolbar': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'toolbar.js'
  },
  '@angular2-material/input': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'input.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
