const actionNetworkStyles = `

:root {
	--color-pale-yellow: #FFF2D8;
	--color-yellow: #FFB727;
	--color-light-grey: #EEEEEE;
	--color-navy: #0D1449;
}

*::-webkit-scrollbar {
	display: none;
}

* {
	box-sizing: border-box;
}

body * {
	font-family: 'Geist', sans-serif;
	color: var(--color-navy);
	font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
	font-weight: 900;
}

body input, body textarea {
	font-family: 'Geist', sans-serif;
}

.ajax-loading {
	display: none;
}

html, body {
	margin: 0;
	padding: 0;
	overflow: hidden;
	font-family: 'Geist', sans-serif;
}

#can_embed_form {
	border: none;
	background-color: transparent;
	padding: 0;
	font-weight: 900;
	letter-spacing: 0;
	width: 100%;
	text-transform: none;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-family: 'Geist', sans-serif;
}

.affirmative_note em {
	font-weight: normal;
}

input[type="text"], input[type="email"], input[type="number"], input[type="tel"], input[type="url"], input[type="search"], input[type="password"], input[type="date"], input[type="datetime-local"], input[type="month"], input[type="time"], input[type="week"], input[type="color"], input[type="file"], input[type="range"], input[type="checkbox"], input[type="radio"], input[type="hidden"], input[type="image"], input[type="submit"], input[type="button"], input[type="reset"], input[type="menu"], textarea {
	font-family: 'Geist', sans-serif;
	-webkit-appearance: none;
	appearance: none;
	max-width: 36rem;
	border: none;
	background-color: white;
	padding: 0.5em 1em;
	margin: 0;
	width: 100%;
}

#logo_wrap {
	background-color: transparent;
	justify-content: flex-start;
}

input[type="submit"],
.can_button,
button {
	background-color: #FFB727;
	color: #0D1449;
	border: none;
	padding: 0.5em 1em;
	border-radius: 0.25em;
	cursor: pointer;
	font-weight: 900;
	text-transform: none;
	letter-spacing: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	border-radius: 4px;
}

input[type="submit"]:hover,
.can_button:hover,
.button:hover {
	color: #FFB727;
	background-color: #0D1449;
}

a {
	color: var(--color-navy);
	text-decoration: underline;
	font-weight: bold;
	text-transform: none;
	letter-spacing: 0;
}

p, h1, h2, h3, h4, h5, h6, small {
	max-width: 36rem;
}

.donation_welcome_avatar {
	display: none;
}

.single_recipient {
	border-radius: 9999px;
	overflow: hidden;
	width: 4rem;
	height: 4rem;
	object-fit: cover;
	object-position: center;
	margin-bottom: 1rem;
}

#donation_welcome {
	background-color: white;
	border-radius: 12px;
	padding: 20px;
	width: fit-content;
	margin: 0 auto;
	margin-bottom: 1rem;
	margin-top: 1rem;
}

.single_recipient img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

#action_welcome_message_inner small {
	display: block;
	margin-top: 10px;
}

label,
.control-label {
	color: var(--color-navy);
	font-weight: bold;
	text-transform: none;
	letter-spacing: 0;
	font-size: 1rem;
}

.action_owner {
	display: none;
}

input[type="radio"] {
	width: 20px;
	height: 20px;
	min-width: 20px;
	min-height: 20px;
	max-width: 20px;
	max-height: 20px;
	display: inline-block;
	padding: 0;
	-webkit-appearance: none;
	appearance: none;
	border: 1px solid var(--color-navy);
	border-radius: 50%;
	background-color: transparent;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out;
}

input[type="checkbox"] {
	width: 20px;
	height: 20px;
	min-width: 20px;
	min-height: 20px;
	max-width: 20px;
	max-height: 20px;
	padding: 0;
	display: inline-block;
	box-sizing: border-box;
	-webkit-appearance: none;
	appearance: none;
	border: 1px solid var(--color-navy);
	background-color: transparent;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out;
}

input[type="radio"]:checked,
input[type="checkbox"]:checked {
	background-color: var(--color-navy);
}

input[type="radio"]::after,
input[type="checkbox"]::after {
	content: '✓';
	width: 100%;
	text-align: center;
	padding-left: 2px;
	line-height: 20px;
	display: block;
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
	color: var(--color-yellow);
}

input[type="radio"]:checked::after,
input[type="checkbox"]:checked::after {
	opacity: 1;
}

ul.clearfix {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.full_list {
	display: flex;
	flex-direction: column;

	gap: 10px;
	padding: 0;
	margin: 0;
	list-style: none;
}

.donate_amount_wrap {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 10px;
}

body #can_embed_form .donate_amount_wrap .other_label {
	padding: 0 !important;
	border: none !important;
}

body #can_embed_form .donate_amount_wrap .other_label input {
	height: 100% !important;
	display: block !important;
}

label {
	display: block;
	margin-bottom: 10px;
}

.donate_amount {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 10px;
	border: none !important;
	background-color: var(--color-yellow) !important;
	color: var(--color-navy) !important;
	border-radius: 4px !important;
	font-weight: 900 !important;
	text-transform: none !important;
	letter-spacing: normal !important;
	-webkit-font-smoothing: antialiased !important;
	-moz-osx-font-smoothing: grayscale !important;
}

.donate_amount:hover,
.donate_amount.donate_amount-selected {
	background-color: var(--color-navy) !important;
	color: var(--color-yellow) !important;
}

ul {
	padding-left: 0;
}

li {
	list-style: none;
}

#action_welcome_message {
	border-radius: 12px;
	padding: 20px;
	background-color: white;
	margin-bottom: 1rem;
	margin-top: 1rem;
	width: fit-content;
}

#form_col1,
#form_col2 {
	width: 100%;
	max-width: 36rem;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

form * {
	order: 3;
}

form #form_col1 {
	order: 1;
}

form #form_col2 {
	order: 2;
}

#can_embed_form_inner h2 {
	font-size: 2rem;
	line-height: 1.2em;
	font-weight: 900;
}

@media (min-width: 768px) {
	#can_embed_form_inner h2 {
		font-size: 3vw;
	}
}

#can_embed_form_inner form {
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	gap: 36px;
}

#can_embed_form_inner .country_drop_wrap {
	width: 100%;
}

body #can_embed_form .donation_avatar {
	box-shadow: none;
	border: none !important;
}

body #can_embed_form ul.clearfix,
body #can_embed_form ul.nofloat {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	flex-direction: row;
	gap: 1em;
}

body #can_embed_form ul.clearfix li,
body #can_embed_form ul.nofloat li {
	margin: 0 !important;
	flex-shrink: 0;
	flex-grow: 1;
}

body #can_embed_form ul.clearfix li input:not([type="radio"]):not([type="checkbox"]),
body #can_embed_form ul.nofloat li input:not([type="radio"]):not([type="checkbox"]) {
	width: 100% !important;
	max-width: none !important;
}

#can_embed_form textarea,
#can_embed_form input:not([type="radio"]):not([type="checkbox"]),
body #can_embed_form select,
body #can_embed_form .can_select {
	border: none !important;
	border-radius: 4px !important;
}

body #can_embed_form .donate_amount_recurring {
	margin-bottom: 0 !important;
}

body #can_embed_form #donation_recipient_wrap {
	border: none !important;
}

body #can_embed_form #donation_welcome {
	border: none !important;
	background-color: white !important;
}

body #can_embed_form #can_sidebar {
	border: none !important;
	background-color: white !important;
}

body #can_embed_form #donate_form_button,
body #can_embed_form .button_red {
	background-color: var(--color-yellow) !important;
	color: var(--color-navy) !important;
	border: none !important;
	padding: 0.5em 1em !important;
	border-radius: 4px !important;
	cursor: pointer !important;
	font-weight: 900 !important;
	text-transform: none !important;
	letter-spacing: normal !important;
	-webkit-font-smoothing: antialiased !important;
	-moz-osx-font-smoothing: grayscale !important;
}

body #can_embed_form #donate_form_button:hover,
body #can_embed_form .button_red:hover {
	background-color: var(--color-navy) !important;
	color: var(--color-yellow) !important;
}

body #can_embed_form .single_recipient {
	border-radius: 0 !important;
}

body #can_embed_form #can_sidebar #action_info {
	border: none !important;
}

body #can_embed_form #donation_recipient_wrap h5, #can_embed_form #donation_recipient_wrap h4 {
	text-transform: none !important;
	letter-spacing: normal !important;
	font-weight: 900 !important;
	font-size: 1rem !important;
	margin-bottom: 0.5rem !important;
	margin-top: 0 !important;
}

body #can_embed_form #donation_recipient_wrap h5 {
	font-size: 0.875rem !important;
}

body #can_embed_form #donation_welcome {
	margin: 0 !important;
}

body #can_embed_form.can_768 #donation_recipient_wrap .donation_recipients,
body #can_embed_form.can_768 #donation_recipient_wrap .action_owner_wrap {
	border: none !important;
}

body #can_embed_form.can_768 #donation_recipient_wrap .donation_recipients {
	flex: 1 !important;
}

.clearfix::before {
	content: none !important;
}

#donation_welcome {
	order: 0 !important;
}

body #can_embed_form .donate_recurring {
	background-color: white !important;
	border-radius: 4px !important;
	padding: 1rem !important;
}

body #can_embed_form input[type="submit"] {
	font-weight: 900 !important;
	font-size: 2rem !important;
}


body .select2-drop-active,
body .select2-drop,
body .select2-choice {
	border: none !important;
	box-shadow: none !important;
}

body .select2-results .select2-highlighted {
	background-color: var(--color-yellow) !important;
	color: var(--color-navy) !important;
}

@media (max-width: 768px) {
	body #can_embed_form.can_768 #can_main_col {
		width: 100% !important;
	}
}

body #can_embed_form form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

@media (min-width: 768px) {

	body #can_embed_form form {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	body #can_embed_form #form_col1, #form_col2 {
		width: 66% !important;
	}
}
`;

export default actionNetworkStyles;