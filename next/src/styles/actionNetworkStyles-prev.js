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

body * {
	font-family: 'Geist',
	sans-serif !important;
	color: var(--color-navy) !important;
}

body input, body textarea {
	font-family: 'Geist' !important;
}

html, body {
	margin: 0 !important;
	padding: 0 !important;
	overflow: hidden !important;
	font-family: 'Geist', sans-serif !important;
}

body div#can_embed_form {
	border: none !important;
	background-color: transparent !important;
	padding: 20px !important;
	font-family: 'Geist' !important;
}

body div#can_embed_form input {
	font-family: 'Geist' !important;
}

body div#can_embed_form #logo_wrap {
	background-color: transparent !important;
	justify-content: flex-start !important;
}

body div#can_embed_form #logo_wrap svg {
	margin: 0 !important;
}

body #can_embed_form input[type="submit"],
.can_button,
#donate_auto_modal input[type=submit],
#donate_auto_modal .button,
#donate_make_recurring_modal input[type=submit],
#donate_make_recurring_modal .button,
#can_embed_form input[type=submit],
#can_embed_form .button {
	background-color: #FFB727 !important;
	color: #0D1449 !important;
	border: none !important;
	padding: 0.5em 1em !important;
	border-radius: 0.25em !important;
	cursor: pointer !important;
	font-weight: 900 !important;
	text-transform: none !important;
	letter-spacing: normal !important;
	-webkit-font-smoothing: antialiased !important;
	-moz-osx-font-smoothing: grayscale !important;
	border-radius: 4px !important;
}

body #can_embed_form input[type="submit"]:hover,
.can_button:hover,
#donate_auto_modal input[type=submit]:hover,
#donate_auto_modal .button:hover,
#donate_make_recurring_modal input[type=submit]:hover,
#donate_make_recurring_modal .button:hover,
#can_embed_form input[type=submit]:hover,
#can_embed_form .button:hover {
	color: #FFB727 !important;
	background-color: #0D1449 !important;
}

body #can_embed_form #action_welcome_message #action_welcome_message_inner {
	font-size: 1.25rem !important;
	background-color: white !important;
	border-radius: 12px !important;
	padding: 20px !important;
	width: fit-content !important;
}

body #can_embed_form a:not(.select2-choice), #donate_auto_modal a:not(.select2-choice), #donate_make_recurring_modal a:not(.select2-choice) {
	color: var(--color-navy) !important;
	text-decoration: underline !important;
	font-weight: bold !important;
	text-transform: none !important;
	letter-spacing: 0 !important;
}

body #can_embed_form .select2-container .select2-choice,
body .can_embed_select2 .select2-container .select2-choice {
	border: none !important;
}

body #can_embed_form #action_welcome_message #action_welcome_message_inner small {
	display: block !important;
	margin-top: 10px !important;
}

body #can_embed_form label,
body #can_embed_form .control-label {
	color: var(--color-navy) !important;
	font-weight: bold !important;
	text-transform: none !important;
	letter-spacing: 0 !important;
	font-size: 1rem !important;
}

body #can_embed_form .select2-drop-active, body #can_embed_form.select2-drop-active, body .can_embed_select2 .select2-drop-active, body .can_embed_select2.select2-drop-active {
	border: none !important;
	box-shadow: none !important;
}

body #can_embed_form .select2-search input,
body .can_embed_select2 .select2-search input {
	border: none !important;
	box-shadow: none !important;
	background-color: var(--color-light-grey) !important;
}

/* horrible css to override */
body .lined_after_title,
body #can_embed_form_inner > h2 + h4,
body #can_embed_form_inner > .last_line + h4,
body #can_embed_form .action_sidebar > h4:not(.sidebartitle),
body #can_embed_form #select_tickets > h4,
body #can_embed_form #letter-form > div > h4,
body #can_embed_form #letter-form #form_col1 > h4,
body #can_embed_form #letter-form #form_col2 > h4,
body #can_embed_form h3 + h4,
body .event_campaign #can_embed_form > h2 + h4,
body .letter #can_embed_form h2.line + h4 {
	padding-bottom: 0 !important;
}

body .lined_after_title::after,
body #can_embed_form_inner > h2 + h4::after,
body #can_embed_form_inner > .last_line + h4::after,
body #can_embed_form .action_sidebar > h4:not(.sidebartitle)::after,
body #can_embed_form #select_tickets > h4::after,
body #can_embed_form #letter-form > div > h4::after,
body #can_embed_form #letter-form #form_col1 > h4::after,
body #can_embed_form #letter-form #form_col2 > h4::after,
body #can_embed_form h3 + h4::after,
body .event_campaign #can_embed_form > h2 + h4::after,
body .letter #can_embed_form h2.line + h4::after {
	content: none !important;
}

body .can_embed.form #can_embed_form_inner > h2 {
	border-bottom: none !important;
}

/* h4 subtitle */
body .lined_after_title,
body #can_embed_form_inner > h2 + h4,
body #can_embed_form_inner > .last_line + h4,
body #can_embed_form .action_sidebar > h4:not(.sidebartitle),
body #can_embed_form #select_tickets > h4,
body #can_embed_form #letter-form > div > h4,
body #can_embed_form #letter-form #form_col1 > h4,
body #can_embed_form #letter-form #form_col2 > h4,
body #can_embed_form h3 + h4,
body #can_embed_form > h2 + h4,
body #letter #can_embed_form h2.line + h4 {
	text-align: left !important;
	letter-spacing: 0 !important;
	text-transform: none !important;
	font-weight: 900 !important;
}

body .action_owner {
	display: none !important;
}

body #can_embed_form #d_sharing {
	border: none !important;
}

body #can_embed_form input[type="radio"],
body #can_embed_form #d_sharing input[type="radio"] {
	width: 20px !important;
	height: 20px !important;
	-webkit-appearance: none !important;
	appearance: none !important;
	border: 1px solid var(--color-navy) !important;
	border-radius: 50% !important;
	background-color: transparent !important;
	cursor: pointer !important;
	transition: background-color 0.3s ease-in-out !important;
}

body #can_embed_form input[type="radio"]:checked,
body #can_embed_form #d_sharing input[type="radio"]:checked {
	background-color: var(--color-navy) !important;
}

body #can_embed_form input[type="radio"]::after,
body #can_embed_form #d_sharing input[type="radio"]::after {
	content: '✓' !important;
	width: 100% !important;
	text-align: center !important;
	padding-left: 2px !important;
	display: block !important;
	opacity: 0 !important;
	transition: opacity 0.3s ease-in-out !important;
	color: var(--color-yellow) !important;
}

body #can_embed_form input[type="radio"]:checked::after,
body #can_embed_form #d_sharing input[type="radio"]:checked::after {
	opacity: 1 !important;
}

body #can_embed_form h1, body #can_embed_form h2, body #can_embed_form h3, body #can_embed_form h4, body #can_embed_form h5, body #can_embed_form h6 {
	letter-spacing: 0 !important;
}

body #can_embed_form #can_sidebar {
	border: none !important;
}

#can_embed_form .donate_amount, #can_embed_form .tip_label {
	font-family: 'Geist' !important;
	border: none !important;
}


body #can_embed_form #action_welcome_message #action_welcome_message_inner {
	border: none !important;
}
`;

export default actionNetworkStyles;