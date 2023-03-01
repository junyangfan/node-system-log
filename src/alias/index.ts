import 'module-alias/register'
import path from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
    '@/config': path.resolve(__dirname, '..', 'config'),
    '@/controller': path.resolve(__dirname, '..', 'controller'),
    '@/router': path.resolve(__dirname, '..', 'router'),
    '@/middleware': path.resolve(__dirname, '..', 'middleware'),
    '@/service': path.resolve(__dirname, '..', 'service'),
    '@/utils': path.resolve(__dirname, '..', 'utils'),
    '@/enum': path.resolve(__dirname, '..', 'enum'),
})

moduleAlias()
