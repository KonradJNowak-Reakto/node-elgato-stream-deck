const { usb } = require('usb')
const { listStreamDecks, openStreamDeck } = require('../dist/index')
const streamDecks = {}

async function addDevice(info) {
	const path = info.path
	streamDecks[path] = openStreamDeck(path)

	console.log(info)
	console.log('Serial:', await streamDecks[path].getSerialNumber())
	console.log('Firmware:', await streamDecks[path].getFirmwareVersion())

	// Clear all keys
	await streamDecks[path].clearPanel()
	// Fill one key in red
	await streamDecks[path].fillKeyColor(0, 255, 0, 0)

	await streamDecks[path].resetToLogo()

	streamDecks[path].on('error', (e) => {
		console.log(e)
		// assuming any error means we lost connection
		streamDecks[path].removeAllListeners()
		delete streamDecks[path]
	})
	//  add any other event listeners
}

function refresh() {
	const streamdecks = listStreamDecks()
	streamdecks.forEach((device) => {
		if (!streamDecks[device.path]) {
			addDevice(device).catch((e) => console.error('Add failed:', e))
		}
	})
}
refresh()

usb.on('attach', function (e) {
	if (e.deviceDescriptor.idVendor === 0x0fd9) {
		refresh()
	}
})
usb.on('detach', function (e) {
	if (e.deviceDescriptor.idVendor === 0x0fd9) {
		console.log(`${JSON.stringify(e.deviceDescriptor)} was removed`)
		refresh()
	}
})
