import { HIDDevice } from './device'
import { DeviceModelId } from './id'
import {
	StreamDeckMini,
	StreamDeckMiniV2,
	StreamDeckOriginal,
	StreamDeckOriginalV2,
	StreamDeckOriginalMK2,
	StreamDeckXL,
	StreamDeckXLV2,
	StreamDeckPedal,
	OpenStreamDeckOptions,
} from './models'
import { StreamDeckPlus } from './models/plus'
import { StreamDeck } from './types'

export * from './types'
export * from './id'
export { HIDDevice } from './device'
export { OpenStreamDeckOptions } from './models'
export { StreamDeckProxy } from './proxy'

/** Elgato vendor id */
export const VENDOR_ID = 0x0fd9

export enum DeviceModelType {
	STREAMDECK = 'streamdeck',
	PEDAL = 'pedal',
}

export interface DeviceModelSpec {
	id: DeviceModelId
	type: DeviceModelType
	productId: number
	class: new (device: HIDDevice, options: Required<OpenStreamDeckOptions>) => StreamDeck
}

/** List of all the known models, and the classes to use them */
export const DEVICE_MODELS: DeviceModelSpec[] = [
	{
		id: DeviceModelId.ORIGINAL,
		type: DeviceModelType.STREAMDECK,
		productId: 0x0060,
		class: StreamDeckOriginal,
	},
	{
		id: DeviceModelId.MINI,
		type: DeviceModelType.STREAMDECK,
		productId: 0x0063,
		class: StreamDeckMini,
	},
	{
		id: DeviceModelId.XL,
		type: DeviceModelType.STREAMDECK,
		productId: 0x006c,
		class: StreamDeckXL,
	},
	{
		id: DeviceModelId.ORIGINALV2,
		type: DeviceModelType.STREAMDECK,
		productId: 0x006d,
		class: StreamDeckOriginalV2,
	},
	{
		id: DeviceModelId.ORIGINALMK2,
		type: DeviceModelType.STREAMDECK,
		productId: 0x0080,
		class: StreamDeckOriginalMK2,
	},
	{
		id: DeviceModelId.PLUS,
		type: DeviceModelType.STREAMDECK,
		productId: 0x0084,
		class: StreamDeckPlus,
	},
	{
		id: DeviceModelId.PEDAL,
		type: DeviceModelType.PEDAL,
		productId: 0x0086,
		class: StreamDeckPedal,
	},
	{
		id: DeviceModelId.XLV2,
		type: DeviceModelType.STREAMDECK,
		productId: 0x008f,
		class: StreamDeckXLV2,
	},
	{
		id: DeviceModelId.MINIV2,
		type: DeviceModelType.STREAMDECK,
		productId: 0x0090,
		class: StreamDeckMiniV2,
	},
]
