<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledYamlFile',
    'filename' => '/Users/keeteean/Sites/projects/brainsum/ladislavpapp/user/plugins/devtools/blueprints.yaml',
    'modified' => 1561028145,
    'data' => [
        'name' => 'DevTools',
        'version' => '1.2.2',
        'description' => 'Plugin and Theme scaffolding utilities',
        'icon' => 'cogs',
        'author' => [
            'name' => 'Team Grav',
            'email' => 'devs@getgrav.org',
            'url' => 'http://getgrav.org'
        ],
        'homepage' => 'https://github.com/getgrav/grav-plugin-devtools',
        'keywords' => 'devtools, plugin, theme',
        'bugs' => 'https://github.com/getgrav/grav-plugin-devtools/issues',
        'license' => 'MIT',
        'form' => [
            'validation' => 'strict',
            'fields' => [
                'enabled' => [
                    'type' => 'toggle',
                    'label' => 'PLUGIN_ADMIN.PLUGIN_STATUS',
                    'highlight' => 1,
                    'default' => 0,
                    'options' => [
                        1 => 'PLUGIN_ADMIN.ENABLED',
                        0 => 'PLUGIN_ADMIN.DISABLED'
                    ],
                    'validate' => [
                        'type' => 'bool'
                    ]
                ]
            ]
        ]
    ]
];
