// ==========================================
// APK FIX V5 - ręczny mikrofon + TTS
// Plik: apk-fix.js
// ==========================================
(function () {
    function isNativeApp() {
        return !!(
            window.Capacitor &&
            window.Capacitor.isNativePlatform &&
            window.Capacitor.isNativePlatform()
        );
    }

    if (!isNativeApp()) {
        console.log("WWW/PWA: apk-fix.js pominięty, używam mikrofonu przeglądarki.");
        return;
    }

    function getPlugin(name) {
        if (!window.Capacitor || !window.Capacitor.Plugins) return null;
        return window.Capacitor.Plugins[name] || null;
    }

    const SpeechPlugin = getPlugin("SpeechRecognition");
    const NativeTextToSpeech = getPlugin("TextToSpeech");

    async function nativeSpeak(text) {
        const cleanText = String(text || "").trim();
        if (!cleanText) return;

        if (NativeTextToSpeech) {
            try {
                if (typeof NativeTextToSpeech.stop === "function") await NativeTextToSpeech.stop();
                await NativeTextToSpeech.speak({ text: cleanText, lang: "en-US", rate: 0.85, pitch: 1.0, volume: 1.0 });
                return;
            } catch (error) {
                console.log("Błąd TTS:", error);
            }
        }

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = "en-US";
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);
        }
    }

    async function requestSpeechPermission() {
        if (!SpeechPlugin) return false;
        try {
            if (typeof SpeechPlugin.checkPermissions === "function") {
                const checked = await SpeechPlugin.checkPermissions();
                if (checked && (checked.microphone === "granted" || checked.speechRecognition === "granted")) return true;
            }
            if (typeof SpeechPlugin.requestPermissions === "function") {
                const requested = await SpeechPlugin.requestPermissions();
                if (requested && (requested.microphone === "granted" || requested.speechRecognition === "granted")) return true;
            }
            return true;
        } catch (error) {
            console.log("Błąd zgody mikrofonu:", error);
            return false;
        }
    }

    window.speak = function (text) { nativeSpeak(text); };

    window.speakCurrentWord = function () {
        if (typeof currentWord !== "undefined" && currentWord && currentWord[currentLanguage]) {
            nativeSpeak(currentWord[currentLanguage]);
        }
    };

    window.startListening = async function (btn) {
        const preview = document.getElementById("speech-preview");
        if (!preview) return;
        if (!SpeechPlugin) {
            preview.innerText = "Brak wtyczki mikrofonu w APK.";
            return;
        }

        speechMicButton = btn;
        btn.disabled = true;
        btn.classList.add("mic-listening");
        btn.innerText = "Sprawdzam mikrofon...";
        preview.innerText = "Przygotowuję słuchanie...";

        const hasPermission = await requestSpeechPermission();
        if (!hasPermission) {
            btn.disabled = false;
            btn.classList.remove("mic-listening");
            btn.innerText = "Brak zgody mikrofonu 🎤";
            preview.innerText = "Brak zgody na mikrofon.";
            return;
        }

        let finalText = "";
        try {
            if (typeof SpeechPlugin.removeAllListeners === "function") await SpeechPlugin.removeAllListeners();

            if (typeof SpeechPlugin.addListener === "function") {
                await SpeechPlugin.addListener("partialResults", function (event) {
                    if (event && Array.isArray(event.matches) && event.matches.length > 0) {
                        finalText = String(event.matches[0] || "").trim();
                        if (finalText) preview.innerText = 'Słyszę: "' + finalText + '"';
                    }
                    if (event && typeof event.partialResult === "string") {
                        finalText = event.partialResult.trim();
                        if (finalText) preview.innerText = 'Słyszę: "' + finalText + '"';
                    }
                });
            }

            if (typeof SpeechPlugin.forceStop === "function") {
                try { await SpeechPlugin.forceStop(); } catch (error) {}
            } else if (typeof SpeechPlugin.stop === "function") {
                try { await SpeechPlugin.stop(); } catch (error) {}
            }

            preview.innerText = "Słucham przez 4 sekundy...";
            btn.innerText = "Słucham... mów teraz 📣";
            btn.disabled = false;

            await SpeechPlugin.start({ language: "en-US", maxResults: 5, prompt: "Powiedz po angielsku", partialResults: true, popup: false });

            setTimeout(async function () {
                try {
                    if (typeof SpeechPlugin.getLastPartialResult === "function") {
                        const last = await SpeechPlugin.getLastPartialResult();
                        if (last && typeof last.partialResult === "string" && last.partialResult.trim()) finalText = last.partialResult.trim();
                        if (last && Array.isArray(last.matches) && last.matches.length > 0) finalText = String(last.matches[0] || "").trim();
                    }
                } catch (error) {}

                try {
                    if (typeof SpeechPlugin.forceStop === "function") await SpeechPlugin.forceStop();
                    else if (typeof SpeechPlugin.stop === "function") await SpeechPlugin.stop();
                } catch (error) {}

                btn.classList.remove("mic-listening");
                btn.disabled = false;
                finalText = String(finalText || "").trim();

                if (!finalText) {
                    btn.innerText = "Nie usłyszałem. Spróbuj ponownie 🎤";
                    preview.innerText = "Nie dostałem tekstu. Powiedz krótko, np. Hello albo Thank you.";
                    return;
                }

                lastSpeechText = finalText;
                speechProcessing = true;
                preview.innerText = 'Powiedziałeś: "' + finalText + '"';

                if (typeof verifySpeech === "function") verifySpeech(finalText, btn);
                else btn.innerText = "Mikrofon 🎤";
            }, 4000);
        } catch (error) {
            console.log("Błąd słuchania:", error);
            btn.disabled = false;
            btn.classList.remove("mic-listening");
            btn.innerText = "Błąd mikrofonu 🎤";
            const message = error && error.message ? error.message : String(error);
            preview.innerText = "Błąd mikrofonu: " + message;
        }
    };

    window.stopSpeechEngine = async function () {
        if (typeof clearSpeechHints === "function") clearSpeechHints();
        speechEngineStarted = false;
        speechProcessing = false;
        pendingSpeechText = "";
        if (speechFinishTimer) {
            clearTimeout(speechFinishTimer);
            speechFinishTimer = null;
        }
        if (SpeechPlugin) {
            try {
                if (typeof SpeechPlugin.forceStop === "function") await SpeechPlugin.forceStop();
                else if (typeof SpeechPlugin.stop === "function") await SpeechPlugin.stop();
            } catch (error) {}
        }
        if (speechMicButton) {
            speechMicButton.classList.remove("mic-listening");
            speechMicButton.disabled = false;
        }
    };

    if (isNativeApp() && SpeechPlugin) {
        try { recognition = { nativeCapacitor: true }; } catch (error) {}
    }
})();
