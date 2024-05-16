const monthlyBtn = document.querySelector(".main__btns-item:nth-child(1)");
const yearlyBtn = document.querySelector(".main__btns-item:nth-child(2)");
const monthlyPrices = document.querySelectorAll(".pricing-card__price.monthly");
const yearlyPrices = document.querySelectorAll(".pricing-card__price.yearly");

monthlyBtn.addEventListener("click", () => {
	monthlyBtn.classList.add("active");
	yearlyBtn.classList.remove("active");
	monthlyPrices.forEach((item) => {
		item.classList.remove("hidden");
	});
	yearlyPrices.forEach((item) => {
		item.classList.add("hidden");
	});
});

yearlyBtn.addEventListener("click", () => {
	yearlyBtn.classList.add("active");
	monthlyBtn.classList.remove("active");
	yearlyPrices.forEach((item) => {
		item.classList.remove("hidden");
	});
	monthlyPrices.forEach((item) => {
		item.classList.add("hidden");
	});
});
