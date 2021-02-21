export const getAddress = ({street, zip, city}) => {
		return `${street} in ${city} (${zip})`
	}

export const getGPS = (location) => {
		let gps = []
		location.forEach((x) => gps.push(x.split('°')[0]))
		return gps
	}