<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledYamlFile',
    'filename' => '/Users/keeteean/Sites/projects/brainsum/ladislavpapp/user/config/system.yaml',
    'modified' => 1561036343,
    'data' => [
        'absolute_urls' => false,
        'timezone' => 'Europe/Vienna',
        'default_locale' => 'de_AT',
        'languages' => [
            'supported' => [
                0 => 'de',
                1 => 'sk',
                2 => 'hu',
                3 => 'en'
            ]
        ],
        'home' => [
            'alias' => '/home'
        ],
        'pages' => [
            'theme' => 'ladislavpapp',
            'markdown' => [
                'extra' => false
            ],
            'process' => [
                'markdown' => true,
                'twig' => false
            ]
        ],
        'cache' => [
            'enabled' => true,
            'check' => [
                'method' => 'file'
            ],
            'driver' => 'auto',
            'prefix' => 'g'
        ],
        'twig' => [
            'cache' => true,
            'debug' => true,
            'auto_reload' => true,
            'autoescape' => false
        ],
        'assets' => [
            'css_pipeline' => false,
            'css_minify' => true,
            'css_rewrite' => true,
            'js_pipeline' => false,
            'js_minify' => true
        ],
        'errors' => [
            'display' => true,
            'log' => true
        ],
        'debugger' => [
            'enabled' => true,
            'twig' => true,
            'shutdown' => [
                'close_connection' => true
            ]
        ],
        'gpm' => [
            'releases' => 'stable',
            'verify_peer' => true
        ]
    ]
];
