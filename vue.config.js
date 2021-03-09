module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'static': '@/static',
				'utils': '@/utils',
				'components': '@/components',
				'network': '@/network',
				'pages': '@/pages',
				'config': '@/config'
			}
		}
	}
}