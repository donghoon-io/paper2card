<html>
    <body>
        <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
            <div class="card-front">
                <div class="card-front-text">
                    <div class="vertical-middle">
                        <h3 class="title">
                            Designing effective treatment for amd prevention.
                        </h3>
                        <p class="description">
                            Designing AmslerTouch, a self-testing Amsler Grid
                            application, targets people with AMD to enable them
                            to easily detect and report symptoms quantitatively,
                            thereby providing a cost-effective approach for
                            early diagnosis and prevention of further
                            development of AMD symptoms.
                        </p>
                    </div>
                </div>
                <div class="card-front-image">
                    <img class="image" src="IMAGE_LINK" />
                </div>
            </div>

            <div class="card-back">
                <div class="summary-container">
                    <div class="vertical-middle">
                        <p class="summary-header">About this paper</p>
                        <p class="summary">
                            The author proposes AmslerTouch, a touch-based
                            Amsler-testing web app to provide a more precise
                            diagnosis of age-related macular degeneration
                            symptoms.
                            <br /><br />The author also discusses possible
                            enhancements of the system based on a heuristic
                            evaluation.
                        </p>
                    </div>
                </div>
                <div class="evidence-container">
                    <div class="vertical-middle">
                        <p class="evidence-header">
                            Which part of the paper did the design guideline
                            come from?
                        </p>
                        <p class="evidence">
                            “In this subsection, I describe the result of
                            heuristic evaluation. Specifically, I sorted the
                            identified issues by rank and discuss four top
                            (...)” (‘Result’ section)
                        </p>
                    </div>
                </div>
                <div class="citation-container">
                    <div class="vertical-middle">
                        <p class="citation">
                            Paper title: "AmslerTouch: Self-testing Amsler Grid
                            Application for Supporting a Quantitative Report of
                            AMD Symptoms"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

    .card-front {
        font-family: "Inter", sans-serif;
        box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%),
            0 4px 8px rgb(0 0 0 / 7%), 0 8px 16px rgb(0 0 0 / 7%),
            0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
        width: 400px !important;
        height: 650px !important;
        margin-left: auto;
        margin-right: auto;
        line-height: 1 !important;
    }
    .card-front-text {
        height: 250px !important;
        background-color: #999;
        display: table;
    }
    .card-front-image {
        height: 400px !important;
    }
    .summary-container {
        display: table;
        height: 375px !important;
    }
    .summary-header {
        padding: 0 25px 10px 25px;
        font-size: 18px !important;
        font-weight: 600;
        color: #000000;
    }
    .summary {
        padding: 0 25px;
        color: #000000;
        font-size: 18px !important;
        font-weight: 200;
        line-height: 25px;
    }
    .evidence-container {
        display: table;
        color: #000000;
        height: 200px !important;
        background-color: #efefef;
    }
    .evidence-header {
        margin: 0;
        padding: 0 25px;
        font-size: 11.5px !important;
        font-weight: 600;
        color: #333;
    }
    .evidence {
        padding: 0 25px;
        margin-top: 10px;
        margin-bottom: 0;
        font-size: 11px !important;
        font-weight: 200;
        line-height: 17px;
        color: #333;
        font-style: italic;
    }
    .image {
        width: 400px;
        height: 400px;
    }
    .citation-container {
        height: 75px !important;
        display: table;
    }
    .citation {
        padding: 0 25px;
        font-style: italic;
        font-weight: 200;
        font-size: 10px;
        line-height: 13px;
        color: #333;
    }

    .card-back {
        font-family: "Inter", sans-serif;
        box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%),
            0 4px 8px rgb(0 0 0 / 7%), 0 8px 16px rgb(0 0 0 / 7%),
            0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
        width: 400px !important;
        margin-left: auto;
        margin-right: auto;
        background-color: #ffffff;
        line-height: 1 !important;
    }
    .vertical-middle {
        display: table-cell;
        vertical-align: middle;
    }

    .title {
        margin-top: 0;
        margin-bottom: 15px !important;
        color: #ffffff;
        font-size: 22px;
        padding: 0 25px;
        line-height: 28px !important;
        font-weight: 600 !important;
    }

    .description {
        color: #ffffff;
        padding: 0 25px 0 25px;
        margin: 0;
        font-size: 14px;
        line-height: 20px !important;
        font-weight: 100 !important;
    }
</style>
