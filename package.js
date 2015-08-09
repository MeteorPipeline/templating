Package.describe({
  name: 'pipeline:templating',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'pipeline:html',
  use: [
    'pipeline:html',
    'caching-html-compiler',
    'ecmascript',
    'templating-tools'
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

  api.use('underscore'); // only the subset in packages/blaze/microscore.js

  api.use('isobuild:compiler-plugin@1.0.0');

  // html_scanner.js emits client code that calls Meteor.startup and
  // Blaze, so anybody using templating (eg apps) need to implicitly use
  // 'meteor' and 'blaze'.
  api.use(['blaze', 'spacebars']);
  api.imply(['meteor', 'blaze', 'spacebars'], 'client');

  api.addFiles(['dynamic.html', 'dynamic.js'], 'client');
  api.export('TemplatePipelineCompiler');
});
