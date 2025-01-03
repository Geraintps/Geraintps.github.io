invisible-mute.js text/javascript
// non-jquery version
(function() {

	console.log("Invisible Mute Extension Active");

	// if the hostname is not twitch.tv, return
	if ( /(^|\.)twitch\.tv$/.test(document.location.hostname) === false ) { return; }

	// if the document is already loaded, call onLoad
	if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
        onLoad();
    } else {
        window.addEventListener("DOMContentLoaded", function() {
            onLoad();
        });
	}

	function onLoad() {

		console.log("Invisible Mute Extension Loaded");

		// get the mute button (button element with data-a-target="player-mute-unmute-button")
		var muteButton = document.querySelector('button[data-a-target="player-mute-unmute-button"]');

		// if the mute button exists
		if (muteButton) {

			console.log("Mute Button Found");

			// when the tab is unfocused, mute the player
			document.addEventListener('visibilitychange', function() {

				console.log("Visibility Change");

				if (document.hidden) {

					// if the aria-label is "Mute (m)", click the button
					if (muteButton.getAttribute('aria-label') === 'Mute (m)') {
						muteButton.click();
					}
				} else {

					// if the aria-label is "Unmute (m)", click the button
					if (muteButton.getAttribute('aria-label') === 'Unmute (m)') {
						muteButton.click();
					}
				}
			});
		}
	}
})();