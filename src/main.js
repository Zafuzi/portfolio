(() => {
	const images = document.querySelectorAll("img");
	const viewer = document.querySelector("#viewbox");

	/** @type {HTMLSelectElement} */
	const themer = document.querySelector("#themeSwitcher");

	document.body.dataset.theme = localStorage.getItem("theme") ?? "blue";

	themer.options.namedItem("theme-" + document.body.dataset.theme).selected = true;

	themer.addEventListener("change", (ev) => {
		ev.preventDefault();

		const theme = themer.selectedOptions.item(0).value;

		document.body.dataset.theme = theme;
		localStorage.setItem("theme", theme);
	});

	document.addEventListener("keydown", (ev) => {
		switch (ev.key) {
			case "Escape":
			case " ":
			case "Enter":
				viewer.dataset.open = false;
				break;
		}
	});

	images.forEach(img => {
		img.addEventListener("click", () => {
			viewer.innerHTML = img.outerHTML;
			viewer.dataset.open = true;
		})
	});

	viewer.addEventListener("click", () => {
		viewer.dataset.open = false;
	})
})();