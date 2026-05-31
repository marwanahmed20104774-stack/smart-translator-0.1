const translateBtn = document.getElementById('translateBtn');
const textInput = document.getElementById('textInput');
const fromLangSelect = document.getElementById('fromLang');
const toLangSelect = document.getElementById('toLang');
const outputResult = document.getElementById('outputResult');

translateBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    const fromLang = fromLangSelect.value;
    const toLang = toLangSelect.value;

    if (text === "") {
        outputResult.innerText = "برجاء كتابة نص أو كلمة أولاً لترجمتها! ⚠️";
        outputResult.style.color = "#dc3545";
        return;
    }

    outputResult.innerText = "جاري الترجمة الآن... ⏳";
    outputResult.style.color = "#888";

    try {
        // سيرفر جوجل المباشر والمفتوح للأمان وبدون حظر لقراءة البيانات
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(url);
        const data = await response.json();

        // فك تفكيك مصفوفة البيانات المستلمة بنجاح
        if (data && data[0] && data[0][0] && data[0][0][0]) {
            outputResult.innerText = data[0][0][0];
            outputResult.style.color = "#28a745"; 
            outputResult.style.borderRightColor = "#28a745";
        } else {
            outputResult.innerText = "حدث خطأ في معالجة النص، جرب مرة أخرى.";
            outputResult.style.color = "#dc3545";
        }

    } catch (error) {
        console.error("Error:", error);
        outputResult.innerText = "فشلت الترجمة أونلاين! تأكد من اتصال السيرفر.";
        outputResult.style.color = "#dc3545";
    }
});