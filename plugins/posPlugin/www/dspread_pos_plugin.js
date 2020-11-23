
function posPlug() {
}

posPlug.prototype.scanQPos2Mode = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","scanQPos2Mode",[]);
};

posPlug.prototype.connectBluetoothDevice = function(success,fail,isConnect,bluetoothAddress) {
	cordova.exec(success,fail,"dspread_pos_plugin","connectBluetoothDevice",[isConnect,bluetoothAddress]);
};

posPlug.prototype.doTrade = function(success,faill,timeout) {
	cordova.exec(success,faill,"dspread_pos_plugin","doTrade",[timeout]);
};

posPlug.prototype.getDeviceList = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","getDeviceList",[]);
};

posPlug.prototype.stopScanQPos2Mode = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","stopScanQPos2Mode",[]);
};

posPlug.prototype.disconnectBT = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","disconnectBT",[]);
};

posPlug.prototype.getQposInfo = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","getQposInfo",[]);
};

posPlug.prototype.getQposId = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","getQposId",[]);
};

posPlug.prototype.updateIPEK = function(success,fail,ipekgroup, trackksn, trackipek, trackipekCheckvalue, emvksn, emvipek,emvipekCheckvalue,
										pinksn, pinipek, pinipekCheckvalue) {
	cordova.exec(success,fail,"dspread_pos_plugin","updateIPEK",[ipekgroup, trackksn, trackipek, trackipekCheckvalue, emvksn, emvipek, emvipekCheckvalue, pinksn, pinipek, pinipekCheckvalue]);
};

posPlug.prototype.updateIPEK = function(success,fail,ipekgroup, trackksn, trackipek, trackipekCheckvalue, emvksn, emvipek,emvipekCheckvalue,
										pinksn, pinipek, pinipekCheckvalue) {
	cordova.exec(success,fail,"dspread_pos_plugin","updateIPEK",[ipekgroup, trackksn, trackipek, trackipekCheckvalue, emvksn, emvipek, emvipekCheckvalue, pinksn, pinipek, pinipekCheckvalue]);
};

posPlug.prototype.updateEmvApp = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","updateEmvApp",[]);
};

posPlug.prototype.updateEmvCAPK = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","updateEmvCAPK",[]);
};

posPlug.prototype.setMasterKey = function(success,fail,key,checkValue) {
	cordova.exec(success,fail,"dspread_pos_plugin","setMasterKey",[key,checkValue]);
};

posPlug.prototype.updatePosFirmware = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","updatePosFirmware",[]);
};

posPlug.prototype.connectBTPrinter = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","connectBTPrinter",[]);
};

posPlug.prototype.disconnectBTPrinter = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","disconnectBTPrinter",[]);
};

posPlug.prototype.printText = function(success,fail,content) {
	cordova.exec(success,fail,"dspread_pos_plugin","printText",[content]);
};

posPlug.prototype.printImage = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","printImage",[]);
};

posPlug.prototype.printCustomImage = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","printCustomImage",[]);
};

posPlug.prototype.printTable = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","printTable",[]);
};

posPlug.prototype.getPrinterInfo = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","getPrinterInfo",[]);
};

posPlug.prototype.setCardTradeMode = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","setCardTradeMode",[]);
};

posPlug.prototype.updateEmvConfig = function(success,fail) {
	cordova.exec(success,fail,"dspread_pos_plugin","updateEmvConfig",[]);
};

/**
 * Plugin setup boilerplate.
 */
module.exports = new posPlug();