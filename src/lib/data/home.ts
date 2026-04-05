export type PaperPreview = {
	image: string;
	title: string;
};

export type ProcessStep = {
	title: string;
	description?: string;
	variant: 'default' | 'active' | 'success' | 'gradient';
};

export type Author = {
	name: string;
	affiliation: string[];
	image: string;
	link: string;
};

export type Publication = {
	title: string;
	authors: string;
	venue: string;
	pdfHref: string;
	projectHref: string;
};

export type FaqItem = {
	key: string;
	title: string;
	text: string;
};

export const paperPreviews: PaperPreview[] = [
	{
		image: 'papers/1.svg',
		title: "How Older Adults Use Online Videos for Learning (CHI '23)"
	},
	{
		image: 'papers/2.svg',
		title: "Mobile Interface Design for Low-literacy Populations (SIGINT '12)"
	},
	{
		image: 'papers/3.svg',
		title: "Older Adult’s Voice Assistant Use for Health Information Seeking (TiiS, '22)"
	},
	{
		image: 'papers/4.svg',
		title: "Physically Disabled Players in Movement-Based Games (CHI '22)"
	},
	{
		image: 'papers/5.svg',
		title: "Pay Attention, Please (CHI '19)"
	},
	{
		image: 'papers/6.svg',
		title: "Keep it Simple (CHI '20)"
	},
	{
		image: 'papers/7.svg',
		title: "User Expectations of Conversational Chatbots (DIS '21)"
	}
];

export const processSteps: ProcessStep[] = [
	{
		title: 'Upload a PDF paper',
		description: 'Upload an HCI paper to the system',
		variant: 'default'
	},
	{
		title: 'Select a paragraph of the paper',
		description:
			'Then, our system automatically segments each part of the paper with the heading. From the list of paragraphs, select the paragraph(s) that you want to generate design cards from. Then, the system automatically generates a double-sided design card, with eye-appealing visuals included',
		variant: 'default'
	},
	{
		title: 'Generate design cards',
		variant: 'active'
	},
	{
		title: 'Provide your own designing context',
		description:
			'If you want to position the design cards into your own design work, simply describe that in the text field, which will result in generating another customized design card side that is situated in your own design context',
		variant: 'success'
	},
	{
		title: 'Generate customized design cards',
		variant: 'gradient'
	}
];

export const authors: Author[] = [
	{
		name: 'Donghoon Shin',
		affiliation: ['UW HCDE'],
		image: 'authors/donghoon.jpg',
		link: 'https://donghoon.io'
	},
	{
		name: 'Lucy Lu Wang',
		affiliation: ['UW iSchool &', 'Allen Institute for AI'],
		image: 'authors/lucy.jpg',
		link: 'https://www.llwang.net/'
	},
	{
		name: 'Gary Hsieh',
		affiliation: ['UW HCDE'],
		image: 'authors/gary.jpg',
		link: 'https://faculty.washington.edu/garyhs/'
	}
];

export const publications: Publication[] = [
	{
		title: 'From Paper to Card: Transforming Design Implications with Generative AI',
		authors: 'Donghoon Shin, Lucy Lu Wang, Gary Hsieh',
		venue: 'CHI 2024',
		pdfHref: 'https://donghoon.io/assets/pdf/chi2024_paper2card_paper.pdf',
		projectHref: 'https://donghoon.io/publication/chi2024_paper2card_paper'
	},
	{
		title:
			'What About My Design Context?: Exploring the Use of Generative AI to Support Customization of Translational Research Artifacts',
		authors: 'Donghoon Shin, Alex Chen, Gary Hsieh, Lucy Lu Wang',
		venue: 'DIS 2025',
		pdfHref: 'https://donghoon.io/assets/pdf/dis2025_paper2customization_paper.pdf',
		projectHref: 'https://donghoon.io/publication/dis2025_paper2customization_paper'
	}
];

export const faqItems: FaqItem[] = [
	{
		key: 'a',
		title: 'What is the purpose of this system?',
		text: 'While design cards are accessible and provide more prescriptive insights to practitioners, one challenge with relying on using design cards to communicate academic findings is how these cards should be generated. It is unrealistic to expect researchers to do it, as HCI researchers describe the lack of time and competing responsibilities that prevent them from doing more outreach work. Thus, we built this interface to scale up the creation of design cards using generative AI.'
	},
	{
		key: 'b',
		title: 'What is a design card?',
		text: 'Design cards are tools that facilitate the design process, and can contain several types of design knowledge—from human insights to material & domain knowledge. There is a long tradition of creating design cards to communicate research insights.'
	},
	{
		key: 'c',
		title: 'What types of papers can be used for generating cards?',
		text: 'There is no specific requirement regarding the paper topic / discipline for generating cards; however, we have tested and demonstrated empirical efficacy of our system using HCI papers.'
	},
	{
		key: 'd',
		title: 'How will the collected data be used?',
		text: 'The generated cards and the provided feedback will be saved in our system, and they may be used for the future analysis.'
	},
	{
		key: 'e',
		title: 'Is this code open source?',
		text: 'Yes! The analysis of our system will be published in CHI 2024, and the codebase can be found <a href="https://github.com/donghoon-io">here</a>.'
	}
];
