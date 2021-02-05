import * as esriLoader from 'esri-loader'

const options = {
	baseURL: 'http://192.168.11.238:8080/',
	// baseURL: 'http://172.18.30.1:9090/',
	url: 'arcgis_js_api/library/3.14/'
}
export const mapLayerPath = {
	baseMapLayers: [{url: 'http://21.15.18.252:6080/arcgis/rest/services/map2016/yellow20160426/MapServer'}],
	// baseMapLayers: [{url: 'http://21.15.18.252:6080/arcgis/rest/services/map2016/black20160429/MapServer'}],
	// baseMapLayers: [{url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'}],
	title: 'mapLayerPath'
};

export function esriLoaders(modules) {
	let {baseURL, url: tUTL} = options;
	let url = baseURL + tUTL;
	esriLoader.loadCss(`${url}esri/css/esri.css`);
	return esriLoader.loadModules([...modules, 'dojo/domReady!'], {url: url + 'init.js'});
}