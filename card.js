
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carouselTrack");
    const slides = [...document.querySelectorAll("#carouselTrack article")];
    const counter = document.getElementById("slideCounter");
    const indicators = [...document.querySelectorAll("[data-go-to]")];
    const prevButtons = document.querySelectorAll('[data-slide="prev"]');
    const nextButtons = document.querySelectorAll('[data-slide="next"]');

    if (!track || slides.length === 0) {
        console.error("Carousel not found. Check carouselTrack and article elements.");
        return;
    }

    let current = 0;
    const total = slides.length;

    function showSlide(index) {
        current = (index + total) % total;

        // Move the track by one slide.
        track.style.transform =
            `translateX(-${current * (100 / total)}%)`;

        // Update the counter.
        if (counter) {
            counter.textContent =
                `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
        }

        // Update the bottom indicators.
        indicators.forEach((button, i) => {
            const active = i === current;

            button.classList.toggle("w-8", active);
            button.classList.toggle("w-5", !active);
            button.classList.toggle("bg-amber-300", active);
            button.classList.toggle("bg-gray-600", !active);
            button.setAttribute("aria-current", String(active));
        });
    }

    prevButtons.forEach(button => {
        button.addEventListener("click", () => {
            showSlide(current - 1);
        });
    });

    nextButtons.forEach(button => {
        button.addEventListener("click", () => {
            showSlide(current + 1);
        });
    });

    indicators.forEach(button => {
        button.addEventListener("click", () => {
            showSlide(Number(button.dataset.goTo));
        });
    });

    // Initial slide.
    showSlide(0);
});
