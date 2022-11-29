import {IntlifyModuleOptions} from '@intlify/nuxt3'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

declare module '@nuxt/schema' {
    interface NuxtConfig {
        intlify?: IntlifyModuleOptions
    }
}

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    // server side rendering mode
    ssr: true,

    head: {
        title:
            'FreeCV - Créez, visualisez et enregistrez votre CV au format PDF en quelques minutes et gratuitement.!',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {
                hid: 'author',
                name: 'author',
                content: 'alexis yehadji',
            },
            {
                hid: 'google-site-verification',
                name: 'google-site-verification',
                content: '',
            },
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                hid: 'twitter:url',
                name: 'twitter:url',
                content: 'https://freecv.alexisyehadji.com/',
            },
            {
                hid: 'twitter:image',
                name: 'twitter:image',
                content: 'icon.png',
            },
        ],
        htmlAttrs: {
            lang: 'fr',
        },
    },

    // typescripts
    typescript: {
        strict: true,
        typeCheck: true,
    },

    // css
    css: [
        'virtual:windi-base.css',
        'virtual:windi-components.css',
        'virtual:windi-utilities.css',
        '~/assets/sass/vendor.scss',
        '~/assets/sass/app.scss',
    ],

    // plugins
    plugins: [
        '~/plugins/navbar.ts',
        {src: '~/plugins/apexchart.ts', mode: 'client'},
        // '~/plugins/google-map.ts',
    ],

    // build
    build: {
        transpile: ['@headlessui/vue'],
    },

    // modules
    modules: [
        'unplugin-icons/nuxt',
        '@intlify/nuxt3',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-windicss',
        '@kevinmarrec/nuxt-pwa',
    ],
    buildModules: ['@pinia/nuxt', '@kevinmarrec/nuxt-pwa'],
    pwa: {
        workbox: {
            enabled: true
        }
    },
    axios: {
        // proxy: true
    },
    // experimental features
    experimental: {
        reactivityTransform: false,
    },

    // auto import components
    components: true,

    // vite plugins
    vite: {
        plugins: [
            UnpluginComponentsVite({
                dts: true,
                resolvers: [
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
        ],
    },

    // localization - i18n config
    intlify: {
        localeDir: 'locales',
        vueI18n: {
            locale: 'en',
            fallbackLocale: 'en',
            availableLocales: ['en', 'fr'],
        },
    },

    // vueuse
    vueuse: {
        ssrHandlers: true,
    },

    // windicss
    windicss: {
        analyze: {
            analysis: {
                interpretUtilities: false,
            },
            server: {
                port: 4000,
                open: false,
            },
        },
        scan: true,
    },
})
