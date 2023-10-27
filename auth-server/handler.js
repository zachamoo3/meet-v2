'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");

/*
	SCOPES allows you to set access levels; this is set to readonly for now
	because you don't have access rights to update the calendar yourself.
	For more info, check out the SCOPES documentation at this link:
	https://developers.google.com/identity/protocols/oauth2/scopes
*/
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

/*
	If you see 'process.env', this means the value is in the 'config.json' file.
	This is best practice as it keeps your API secrets hidden.
	Please remember to add 'config.json' to your '.git_ignore' file.
*/
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
	"https://zachamoo3.github.io/meet-v2/"
];

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	redirect_uris[0]
);

/*
	The first step in the OAuth process is to generate a URL so users can log in
	with Google and be authorized to see your calendar.  After logging in,
	they'll receive a code as a URL parameter.
*/
module.exports.getAuthURL = async () => {

	/*
		Scopes array passed to the 'scope' option. Any scopes passed must be
		enabled in the 'OAuth consent screen' settings in your project on your
		Gogle Console. Also, any passed scopes are the ones users will see when
		the consent screen is displayed to them.
	*/
	const authURL = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
	});

	return {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		},
		body: JSON.stringify({
			authURL,
		}),
	};
};

module.exports.getAccessToken = async (event) => {

	// Decode authorization code extracted from the URL query
	const code = decodeURIComponent(`${event.pathParameters.code}`);

	return new Promise((resolve, reject) => {
		/* 
			Exchange authorization code for access token with a "callback" after
			the exchange. The callback in this case is an arrow function with the
			results as parameters: "error" and "response"
		*/
		oAuth2Client.getToken(code, (error, response) => {
			if (error) {
				return reject(error);
			}
			return resolve(response);
		});
	})
		.then((results) => {
			// Respond with OAuth token
			return {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
				},
				body: JSON.stringify(results),
			};
		})
		.catch((error) => {
			// Handle error
			console.log(error);
			return {
				statusCode: 500,
				body: JSON.stringify(error),
			};
		});
};

module.exports.getCalendarEvents = async (event) => {
	const access_token = decodeURIComponent(
		`${event.pathParameters.access_token}`
	);
	oAuth2Client.setCredentials({ access_token });

	return new Promise((resolve, reject) => {
		calendar.events.list(
			{
				calendarId: CALENDAR_ID,
				auth: oAuth2Client,
				timeMin: new Date().toISOString(),
				singleEvents: true,
				orderBy: "startTime",
			},
			(error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			}
		);
	})
		.then((results) => {
			// respond with list of events
			return {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
				},
				body: JSON.stringify({ events: results.data.items }),
			};
		})
		.catch((error) => {
			// handle error
			console.log(error)
			return {
				statusCode: 500,
				body: JSON.stringify(error),
			};
		});
};