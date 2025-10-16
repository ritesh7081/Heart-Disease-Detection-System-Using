const predictBtn = document.querySelector("button")
const form = document.querySelector("form")

// result coloring and image effect
const resultSpanEl = document.querySelector("span")
const heartImg = document.querySelector("img")
if (resultSpanEl && resultSpanEl.innerText == "Negative") {
    resultSpanEl.style.color = "Green"
    heartImg.style.filter = "hue-rotate(120deg)"
    heartImg.style.transition = "all 0.75s linear"
} else if (resultSpanEl) {
    resultSpanEl.style.color = "Red"
}

// Sync Sex select to a readonly text field (id="sex-text")
function initSexSync() {
    const sexSelect = document.getElementById('sex')
    const sexText = document.getElementById('sex-text')
    if (!sexSelect || !sexText) return

    const updateText = () => {
        const val = sexSelect.value
        if (val === '1') sexText.value = 'Male'
        else if (val === '0') sexText.value = 'Female'
        else sexText.value = ''
    }

    sexSelect.addEventListener('change', updateText)
    // initialize on load
    updateText()
}

document.addEventListener('DOMContentLoaded', initSexSync)

// Show loader on submit, do light client-side validation
const predictForm = document.getElementById('predict-form') || form
const predictButton = document.getElementById('predict-btn') || predictBtn
const predictionText = document.getElementById('prediction-text') || document.querySelector('span')

if (predictForm) {
    predictForm.addEventListener('submit', (e) => {
        // simple validation: ensure sex selected
        const sex = document.getElementById('sex')
        if (!sex || sex.value === '') {
            e.preventDefault()
            // shake the select and show small message
            sex && sex.classList.add('invalid')
            setTimeout(()=> sex && sex.classList.remove('invalid'), 900)
            return
        }

        // start loader
        predictButton && predictButton.classList.add('loading')
        predictionText && (predictionText.innerText = 'Predicting...')
        // allow form to submit normally to server; loader will show until page navigates
    })
}
