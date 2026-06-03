(() => {
	const docEl = document.documentElement;
	const selector = "(prefers-color-scheme: dark)";
	const savedTheme = localStorage.getItem("preference-theme");

	if (savedTheme) {
		setTheme(savedTheme);
	} else {
		if (window.matchMedia?.(selector).matches) {
			docEl.dataset["theme"] = "dark";
		} else {
			docEl.dataset["theme"] = "light";
		}
	}

	function setTheme(shade) {
		docEl.dataset["theme"] = shade;
		localStorage.setItem("preference-theme", shade);
	}

	function togglePreferredTheme() {
		if (docEl.dataset["theme"] === "light") {
			setTheme("dark");
			return;
		}

		setTheme("light");
	}

	document.querySelector("#toggle-theme")?.addEventListener("click", togglePreferredTheme);

	window.matchMedia(selector).addEventListener("change", (event) => {
		setTheme(event.matches ? "dark" : "light");
	});
})();
