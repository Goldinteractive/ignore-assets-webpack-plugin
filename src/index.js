/* eslint no-param-reassign: ["error", { "props": false }] */

/**
 * @author Mehdi Lahlou <mehdi.lahlou@free.fr>
 * @author Gold Interactive
 */

import _ from 'lodash';

function IgnoreAssetsPlugin(options) {
	this.ignoredAssets = [];
	if (typeof options === 'object') {
		this.ignoredAssets = _.isArray(options.ignore) ? options.ignore : [options.ignore];
	}
}

IgnoreAssetsPlugin.prototype.apply = function apply(compiler) {
	compiler.hooks.emit.tap('IgnoreAssetsPlugin', (compilation) => {
		const compiledAssets = _.keys(compilation.assets);
		this.ignoredAssets.forEach((element) => {
			if (_.indexOf(compiledAssets, element) !== -1) {
				delete compilation.assets[element];
			}
		});
	});
};

export default IgnoreAssetsPlugin;
