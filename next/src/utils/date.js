const getFormattedDate = (dateString) => {
	if (!dateString) return null;
	const date = new Date(dateString);
	const days = date.getDate();
	const weekday = date.toLocaleDateString('en-GB', {
		weekday: 'long',
	});
	const year = date.getFullYear();
	const daysString = days.toString();
	const daySuffix = daysString?.indexOf('1') === daysString?.length - 1 ? 'st' : daysString?.indexOf('2') === daysString?.length - 1 ? 'nd' : daysString?.indexOf('3') === daysString?.length - 1 ? 'rd' : 'th';
	const month = date.toLocaleDateString('en-GB', {
		month: 'long',
	});
	
	return {
		day: `${days}${daySuffix}`,
		weekday,
		month,
		year,
		formatted: `${weekday}, ${days}${daySuffix} ${month} ${year}`,
	}
}

const getFormattedDateRange = (startDate, endDate) => {
	const start = getFormattedDate(startDate);
	const end = getFormattedDate(endDate);

	if (!start || !end) {
		if (!start && end) {
			return end?.formatted;
		} else if (!end && start) {
			return start?.formatted;
		}
		return '';
	}
	
	if (start?.year === end?.year && start?.month === end?.month && start?.day === end?.day) {
		return start?.formatted;
	} else if (start?.year === end?.year && start?.month === end?.month) {
		return `${start.day}–${end.day} ${start.month} ${start.year}`;
	} else if (start?.year === end?.year) {
		return `${start.day} ${start.month}–${end.day} ${end.month} ${start.year}`;
	} else {
		return `${start.formatted}–${end.formatted}`;
	}
}

const getFormattedDateTime = (dateTime) => {
	if (!dateTime) return null;
	const date = new Date(dateTime);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'pm' : 'am';
	const hours12 = hours % 12 || 12;

	return {
		time: `${hours12}:${minutes.toString().padStart(2, '0')}${ampm}`,
		date: getFormattedDate(dateTime)?.formatted,
		formatted: `${hours12}:${minutes.toString().padStart(2, '0')}${ampm}, ${getFormattedDate(dateTime)?.formatted}`,
	}

}

const getFormattedTimeDateRange = (startDateTime, endDateTime) => {
	const start = new Date(startDateTime);
	const end = new Date(endDateTime);

	if (!start || !end) {
		if (!start && end) {
			return getFormattedDate(endDateTime);
		} else if (!end && start) {
			return getFormattedDate(startDateTime);
		}
		return '';
	}

	if (getFormattedDateTime(startDateTime).date === getFormattedDateTime(endDateTime).date && getFormattedDateTime(startDateTime).time === getFormattedDateTime(endDateTime).time) {
		return getFormattedDateTime(startDateTime).formatted;
	}

	if (start?.year === end?.year && start?.month === end?.month && start?.day === end?.day) {
		return `${getFormattedDateTime(startDateTime).time}–${getFormattedDateTime(endDateTime).time}, ${getFormattedDate(startDateTime)?.formatted}`;
	} else {
		return `${getFormattedDateTime(startDateTime).formatted}–${getFormattedDateTime(endDateTime).formatted}`;
	}
}

export { getFormattedDate, getFormattedDateRange, getFormattedTimeDateRange, getFormattedDateTime, };