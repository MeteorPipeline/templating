Package.describe({
  name: 'pipeline:templating',
  version: '0.1.0',
  summary: 'Templating in the pipeline',
  git: 'https://github.com/MeteorPipeline/templating',
  documentation: null
});

Package.registerBuildPlugin({
  name: 'pipeline:html',
  use: [
    'pipeline:html@0.0.1',
    'caching-html-compiler@1.0.1-rc.0',
    'ecmascript@0.1.3-rc.0',
    'templating-tools@1.0.0-rc.0'
  ],
  sources: [
    'plugin/html_scanner.js',
    'plugin/plugin.js'
  ]
});

// This onUse describes the *runtime* implications of using this package.
Package.onUse(function (api) {
  // XXX would like to do the following only when the first html file
  // is encountered

  api.addFiles('templating.js', 'client');
  api.export('Template', 'client');

  api.use('underscore@1.0.4-rc.0'); // only the subset in packages/blaze/microscore.js

  api.use('isobuild:compiler-plugin@1.0.0');

  // html_scanner.js emits client code that calls Meteor.startup and
  // Blaze, so anybody using templating (eg apps) need to implicitly use
  // 'meteor' and 'blaze'.
  api.use([
    'blaze@2.1.3-rc.0',
    'spacebars@1.0.7-rc.0'
  ]);
  api.imply(['meteor', 'blaze', 'spacebars'], 'client');

  api.addFiles(['dynamic.html', 'dynamic.js'], 'client');
});
