export function getGeminiApiKey() {
    if (typeof window === "undefined") {
        return "";
    }
    return normalizeGeminiApiKey(window.localStorage.getItem("gemini_api_key") ?? "");
}

export function normalizeGeminiApiKey(apiKey) {
    let normalized = `${apiKey ?? ""}`.trim();

    if (
        normalized.length >= 2 &&
        ((normalized.startsWith('"') && normalized.endsWith('"')) ||
            (normalized.startsWith("'") && normalized.endsWith("'")))
    ) {
        normalized = normalized.slice(1, -1).trim();
    }

    return normalized;
}

function maskApiKey(apiKey) {
    const trimmed = normalizeGeminiApiKey(apiKey);
    if (!trimmed) {
        return "none";
    }
    if (trimmed.length <= 8) {
        return trimmed;
    }
    return `${trimmed.slice(0, 4)}...${trimmed.slice(-4)}`;
}

export async function authenticatedFetch(url, options = {}) {
    const apiKey = getGeminiApiKey().trim();
    const headers = new Headers(options.headers ?? {});

    if (apiKey) {
        headers.set("x-api-key", apiKey);
    }

    console.log("[paper2card] request auth", { url, apiKey: maskApiKey(apiKey) });

    return fetch(url, {
        ...options,
        headers
    });
}

export async function authenticatedJsonFetch(url, options = {}) {
    const response = await authenticatedFetch(url, options);
    let payload = null;

    try {
        payload = await response.json();
    } catch {
        payload = null;
    }

    if (!response.ok) {
        const message = payload?.detail ?? payload?.message ?? `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return payload;
}

export async function getPDF(fileName) {
    let result = await fetch(`http://0.0.0.0:8000/pdf` + '?' + new URLSearchParams({
        filename: fileName
    }), {
        method: 'GET'
    });
    if (result.ok) {
        const blob = await result.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    } else {
        console.error('Error fetching PDF:', result.statusText);
    }
}

export function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncateText(text, length) {
    if (text === undefined) {
        return "Error";
    }
    if (text.length <= length) {
        return text;
    }
    return text.substr(0, length) + ' (...)'
}

export function jsonConcat(o1, o2) {
    let temp = JSON.parse(JSON.stringify(o1))
    for (var key in o2) {
        temp[key] = o2[key];
    }
    return temp;
}

export function cardDefaultHTML(front, back) {
    return `
    <!DOCTYPE html>
    <html>
    <body>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${front}
            ${back}
        </div>
    </body>
    </html>
    `
};

export function cardCustomHTML(third) {
    return `
    <!DOCTYPE html>
    <html>
    <body>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${third}
        </div>
    </body>
    </html>
    `
};

export function cardCSS(color) {
    return `
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

/* 0: card page setup + toolkit */
.card {
    font-family: "Inter", sans-serif;
    box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%),
        0 4px 8px rgb(0 0 0 / 7%), 0 8px 16px rgb(0 0 0 / 7%),
        0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
    width: 300px !important;
    height: 500px !important;
    margin-left: auto;
    margin-right: auto;
    line-height: 1 !important;
}

.card-back {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
}
.card-third {
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    position: relative;
}

.vertical-middle {
    display: table-cell;
    vertical-align: middle;
}
.margin-bottom-0 {
    margin-bottom: 0 !important;
}
.margin-top-0 {
    margin-top: 0 !important;
}
.padding-5 {
    padding: 5px !important;
}

/* 1: card front page */

.card-front-text {
    height: 200px !important;
    background-color: ${color};
    display: table;
}

.card-front-image {
    height: 300px !important;
}

.title {
    margin-top: 0;
    margin-bottom: 10px !important;
    color: #ffffff;
    font-size: 15px;
    padding: 0 15px;
    line-height: 19px !important;
    font-weight: 600 !important;
}

.description {
    color: #ffffff;
    padding: 0 15px;
    margin: 0;
    font-size: 11px;
    line-height: 17px !important;
    font-weight: 300 !important;
}

.image {
    width: 300px;
    height: 300px;
}

/* 2: card second page */

.summary {
    padding: 0 15px;
    margin-top: 10px !important;
    color: #333;
    font-size: 12px !important;
    font-weight: 300;
    line-height: 18px;
}

.summary-custom {
    padding: 0 15px;
    margin: 0 0 15px 0 !important;
    color: #333;
    font-size: 11px !important;
    font-weight: 300;
    line-height: 16px;
}

.summary-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.summary-header {
    padding: 0 15px;
    font-size: 12px !important;
    font-weight: 600;
    color: #000000;
}

.methods-container {
    padding: 0 15px !important;
}

.methods-header {
    margin: 13px 0 8px 0 !important;
    font-size: 10px !important;
    font-weight: 500;
    color: #000000;
}

.citation-container {
    display: table;
}

.citation {
    padding: 7px 15px !important;
    font-style: italic;
    font-weight: 300;
    font-size: 7px;
    line-height: 10px;
    color: #666;
}

.evidence {
    padding: 0 15px;
    margin-top: 9px;
    margin-bottom: 0;
    font-size: 9px !important;
    font-weight: 300;
    line-height: 12px;
    color: #333;
    font-style: italic;
}

.evidence-header {
    margin: 0 !important;
    padding: 0 15px !important;
    font-size: 9px !important;
    font-weight: 600 !important;
    color: #333 !important;
}

.evidence-container {
    display: table !important;
    color: #000000 !important;
    height: 160px !important;
    background-color: #EFEFEF !important;
}

/* 3: card third page */

.card-third-container {
    height: 500px !important;
    overflow-y: scroll;
    padding-bottom: 100px;
}

#overflow_container::-webkit-scrollbar {
    -webkit-appearance: none;
}

#overflow_container::-webkit-scrollbar:vertical {
    width: 10px;
}

#overflow_container::-webkit-scrollbar:horizontal {
    height: 10px;
}

#overflow_container::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid #efefef; /* should match background, can't be transparent */
    background-color: rgba(0, 0, 0, .3);
}

.customization-super-container {
    flex: 2 !important;
    overflow-y: auto !important;
}

.customization-container {
    background-color: #ffffff !important;
    margin: 10px 0 10px 10px !important;
    padding: 10px !important;
    border-radius: 10px !important;
}

.customization-figure-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 10px;
    border-radius: 10px !important;
}
.customization-figure-image {
    max-width: 100%;
    max-height: 150px;
    border-radius: 10px;
}
.customization-figure-caption {
    font-size: 9px !important;
    line-height: 11px !important;
    font-weight: 400 !important;
    text-align: center;
    margin: 7px 0 0 0 !important;
}

.customization-header {
    font-size: 11px !important;
    line-height: 14px !important;
    font-weight: 600 !important;
    margin: 0 0 7px 0 !important;
    color: #000000 !important;
}
.customization-sub-header {
    font-weight: 500 !important;
    font-size: 10px !important;
    line-height: 12px !important;
}
.customization-sub-sub-header {
    font-weight: 300 !important;
    font-size: 11px !important;
    line-height: 14px !important;
    margin: 0 0 8px 0;
}
.customization-description {
    color: #333;
    font-size: 11px !important;
    line-height: 14px !important;
    font-weight: 300 !important;
    margin: 0 0 10px 0 !important;
}
.customization-description:last-of-type {
    margin: 0 !important;
}
.customization-content {
    color: #333;
    font-weight: 300 !important;
    font-size: 10px !important;
    line-height: 12px !important;
    margin: 2px 0 0 0 !important;
}
.recommendation-container {
    background-color: #efefef !important;
    padding: 8px;
    border-radius: 5px;
    margin-top: 5px;
}
.recommendation-container:first-of-type {
    margin-top: 0 !important;
}
.tags {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 3px !important;
}
.tag {
    font-size: 9px !important;
    padding: 3px 5px;
    background-color: #efefef;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
}

.input-header {
    margin: 0 0 5px 0;
    padding: 7px 10px 0 10px;
    font-size: 9px !important;
    font-weight: 700;
    color: #666;
}
.input-entry {
    padding: 0 10px 7px 10px;
    list-style-type: disc;
    position: relative;
    left: 10px !important;
    margin: 0 !important;
}
.input {
    margin: 0 !important;
    font-size: 8px !important;
    font-weight: 300;
    line-height: 11px;
    color: #666;
}

.input-container {
    border-top: .01px solid #cfcfcf;
    background-color: #efefef;
    padding: 0 !important;
    width: 300px;
}
</style>`
}



export async function saveForStudy(study_id, card_front_data, card_back_data, citation, color, evidence, id, segment, summary) {
    return authenticatedJsonFetch(`http://0.0.0.0:8000/study_data`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            study_id,
            card_front_data,
            card_back_data,
            citation,
            color,
            evidence,
            id,
            segment,
            summary
        })
    });
}
