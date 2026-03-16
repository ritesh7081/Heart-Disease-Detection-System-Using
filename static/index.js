document.addEventListener("DOMContentLoaded", function () {

    const resultSpan = document.getElementById("prediction-text");
    const heartImg = document.getElementById("heart-img");

    if (resultSpan && heartImg) {

        const result = resultSpan.innerText.trim().toLowerCase();

        if (result.includes("negative")) {

            resultSpan.style.color = "green";
            heartImg.style.filter = "hue-rotate(120deg)";
            heartImg.style.transition = "all 0.75s linear";

        } else if (result.includes("positive")) {

            resultSpan.style.color = "red";
            heartImg.style.filter = "none";
        }
    }


    // Form validation + loader
    const predictForm = document.getElementById("predict-form");
    const predictButton = document.querySelector(".btn");
    const predictionText = document.getElementById("prediction-text");

    if (predictForm) {

        predictForm.addEventListener("submit", function (e) {

            const sex = document.getElementById("sex");

            if (!sex || sex.value === "") {
                e.preventDefault();
                sex.classList.add("invalid");
                setTimeout(() => sex.classList.remove("invalid"), 900);
                return;
            }

            if (predictButton) {
                predictButton.classList.add("loading");
            }

            if (predictionText) {
                predictionText.innerText = "Predicting...";
                predictionText.style.color = "#555";
            }

        });

    }

});