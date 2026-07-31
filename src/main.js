(() => {
	const images = document.querySelectorAll(".gallery img");
	const viewer = document.querySelector("#viewbox");
	const themer = document.querySelector("#themeSwitcher");
	const themeButtons = themer.querySelectorAll("button")

	document.body.dataset.theme = localStorage.getItem("theme") ?? "blue";

	themeButtons.forEach(button => {
		button.addEventListener("click", (ev) => {
			ev.preventDefault();

			document.body.dataset.theme = button.dataset.theme;
			localStorage.setItem("theme", button.dataset.theme);
		});
	})

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