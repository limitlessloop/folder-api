"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// class Client {
// 	constructor() {
// 		this._config = {};
// 	}
// 	_process(data, callback) {
// 		data = JSON.parse(data);
// 		if (callback.process) {
// 			var clone = Object.assign({}, data);
// 			if (Array.isArray(data)) {
// 				data.map((item) => {
// 					if (item) {
// 						item = callback.process({ item: item });
// 					}
// 				});
// 			} else {
// 				if (data) {
// 					data = callback.process({ item: data });
// 				}
// 			}
// 			return data;
// 		} else {
// 			return data;
// 		}
// 	}
// 	config(value) {
// 		this._config = value;
// 	}
// 	fetch(path) {
// 		var config = this._config;
// 		const fetch = process.browser ? window.fetch : require('node-fetch').default;
// 		var base = config.local || 'http://localhost:3000/api/';
// 		if (process.env.NODE_ENV === 'development') {
// 			base = config.local;
// 		} else {
// 			base = config.remote;
// 		}
// 		return fetch(`${base}${path}`).then((r) => r.text()).then((json) => {
// 			try {
// 				var result = this._process(json, config);
// 				return result;
// 			} catch (err) {
// 				return json;
// 			}
// 		});
// 	}
// }
var client = 'test';
var _default = client;
exports["default"] = _default;
module.exports = exports.default;