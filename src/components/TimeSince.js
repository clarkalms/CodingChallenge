import './timeSince.css';

function TimeSince({ timeStamp }) {
	const calculateTime = (dateTime) => {
		const now = new Date().getTime() / 1000;
		var diffInSeconds = Math.floor(now - dateTime.seconds);
		const year = Math.floor(diffInSeconds / 31536000); // Did a search for how many seconds are in a year.
		const month = Math.floor(diffInSeconds / 2592000); // Did a search for how many seconds are in a month.
		const week = Math.floor(diffInSeconds / 604800); // Did a search for how many seconds are in a week.
		const day = Math.floor(diffInSeconds / 86400); // Did a search for how many seconds are in a day.
		const hour = Math.floor(diffInSeconds / 3600); // Did a search for how many seconds are in a hour.
		const min = Math.floor(diffInSeconds / 60);
		let typeOfInterval;

		//Conditional for a year
		let interval = year;
		if (interval >= 1) {
			typeOfInterval = 'yr';
		} else {
			interval = month;
			// Conditional for a month
			if (interval >= 1) {
				typeOfInterval = 'mth';
			} else {
				interval = week;
				// Conditional for a week
				if (interval >= 1) {
					typeOfInterval = 'wk';
				} else {
					interval = day;
					// Conditional for a day
					if (interval >= 1) {
						typeOfInterval = 'd';
					} else {
						interval = hour;
						// Conditional for an hour
						if (interval >= 1) {
							typeOfInterval = 'hr';
						} else {
							interval = min;
							// Conditional for a minute
							if (interval >= 1) {
								typeOfInterval = 'm';
							} else {
								// If none of the above, interval must be seconds
								interval = diffInSeconds;
								if (interval >= 30) {
									typeOfInterval = 's';
								}

								interval = '';
								typeOfInterval = 'just now';
							}
						}
					}
				}
			}
		}

		// Conditional to add plural if interval is greater than 1.

		if (interval > 1 || interval === 0) {
			if (
				typeOfInterval === 'yr' ||
				typeOfInterval === 'mth' ||
				typeOfInterval === 'wk' ||
				typeOfInterval === 'hr'
			) {
				typeOfInterval += 's';
			}
		}

		return `- ${interval}${typeOfInterval}`;
	};

	return <div className="time__stamp">{calculateTime(timeStamp)}</div>;
}

export default TimeSince;
