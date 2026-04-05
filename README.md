# paper2card

`paper2card` is a SvelteKit app for turning research paper content into design cards with help from a backend service and a user-provided Gemini API key.

The current flow is:

1. Upload a PDF paper.
2. Select a paragraph or design implication to explore.
3. Generate a card with a title, description, summary, evidence, citation, and image.
4. Optionally generate customized follow-up cards for a specific audience or design context.

## Stack

- SvelteKit
- Svelte 5
- TypeScript
- Tailwind CSS 4
- SMUI

## Requirements

- Node.js 18+ recommended
- npm
- Access to the backend API used by the app
- A Gemini API key for generation requests

## Local Development

Install dependencies:

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

## How the App Works

The frontend sends requests to an external backend currently referenced in the generate page. That backend is responsible for:

- storing uploaded PDFs
- extracting paper segments
- generating cards
- generating customized card variations
- saving cards and feedback

The main UI routes are:

- `/` for the landing page
- `/tutorial` for the guided walkthrough
- `/generate` for upload, generation, and customization

## API Key Handling

This repo does not contain a hardcoded API key.

Instead, the app asks the user to enter a Gemini API key in the header modal. The key is then stored in the browser's `localStorage` under `gemini_api_key` and attached to outgoing API requests as the `x-api-key` header.

Important notes:

- The key is stored only in the local browser profile, not in the repository.
- Anyone with access to that browser profile can potentially read the stored key.
- If you are sharing a machine or demo environment, clear the key from the header modal when you are done.

## Project Structure

```text
src/
  lib/
    components/      Reusable UI pieces
    js/              Stores and request helpers
  routes/
    +page.svelte     Home page
    tutorial/        Tutorial flow
    generate/        Main generation experience
static/
  tutorial/          Tutorial images
  pdf/               Sample PDFs
  preloaded_images/  Sample assets
```

## References

### 1. From Paper to Card: Transforming Design Implications with Generative AI

DOI: [10.1145/3613904.3642266](https://doi.org/10.1145/3613904.3642266)

- **MLA**<br>
```text
Shin, Donghoon, Lucy Lu Wang, and Gary Hsieh. "From Paper to Card: Transforming Design Implications with Generative AI." Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI '24), ACM, 2024, pp. 1-15.
```

- **APA**<br>
```text
Shin, D., Wang, L. L., & Hsieh, G. (2024, May). From Paper to Card: Transforming Design Implications with Generative AI. In Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI '24) (pp. 1-15). ACM. https://doi.org/10.1145/3613904.3642266
```

- **BibTeX**<br>
```bibtex
@inproceedings{shin2024from,
  title        = {From Paper to Card: Transforming Design Implications with Generative AI},
  author       = {Shin, Donghoon and Wang, Lucy Lu and Hsieh, Gary},
  year         = {2024},
  booktitle    = {Proceedings of the CHI Conference on Human Factors in Computing Systems},
  series       = {CHI '24},
  publisher    = {Association for Computing Machinery},
  address      = {New York, NY, USA},
  location     = {Honolulu, HI, USA},
  pages        = {1--15},
  doi          = {10.1145/3613904.3642266},
  url          = {https://doi.org/10.1145/3613904.3642266}
}
```

### 2. What About My Design Context?: Exploring the Use of Generative AI to Support Customization of Translational Research Artifacts

DOI: [10.1145/3715336.3735686](https://doi.org/10.1145/3715336.3735686)

- **MLA**<br>
```text
Shin, Donghoon, Tze-Yu Chen, Gary Hsieh, and Lucy Lu Wang. "What About My Design Context?: Exploring the Use of Generative AI to Support Customization of Translational Research Artifacts." Proceedings of the 2025 ACM Designing Interactive Systems Conference (DIS '25), ACM, 2025, pp. 1210-1227.
```

- **APA**<br>
```text
Shin, D., Chen, T.-Y., Hsieh, G., & Wang, L. L. (2025, July). What About My Design Context?: Exploring the Use of Generative AI to Support Customization of Translational Research Artifacts. In Proceedings of the 2025 ACM Designing Interactive Systems Conference (DIS '25) (pp. 1210-1227). ACM. https://doi.org/10.1145/3715336.3735686
```

- **BibTeX**<br>
```bibtex
@inproceedings{shin2025what,
  title        = {What About My Design Context?: Exploring the Use of Generative AI to Support Customization of Translational Research Artifacts},
  author       = {Shin, Donghoon and Chen, Tze-Yu and Hsieh, Gary and Wang, Lucy Lu},
  year         = {2025},
  booktitle    = {Proceedings of the 2025 ACM Designing Interactive Systems Conference},
  series       = {DIS '25},
  publisher    = {Association for Computing Machinery},
  address      = {New York, NY, USA},
  pages        = {1210--1227},
  doi          = {10.1145/3715336.3735686},
  url          = {https://doi.org/10.1145/3715336.3735686}
}
```