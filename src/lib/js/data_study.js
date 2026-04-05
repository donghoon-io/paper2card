import { localStorageStore } from 'fractils'

export function ordering(id) {
    const bc = id%4;
    if (bc == 0) {
        return [ //sb sc db dc
            `/study/b/1`,
            `/study/c/2`,
            `/study/b/3`,
            `/study/c/4`
        ]
    }
    else if (bc == 1) {
        return [
            `/study/c/1`,
            `/study/b/2`,
            `/study/c/3`,
            `/study/b/4`
        ]
    }

    else if (bc == 2) {
        return [
            `/study/b/3`,
            `/study/c/4`,
            `/study/b/1`,
            `/study/c/2`
        ]
    }

    else {
        return [
            `/study/c/3`,
            `/study/b/4`,
            `/study/c/1`,
            `/study/b/2`
        ]
    }
}

export let questions_baseline = [
    "Do you think the design insights communicated by these cards are relevant/applicable to the design project you shared earlier with the interviewer?",
    "Do you think the design insights communicated by these cards are actionable?",
    "Do you think the design insights communicated by these cards are valid?",
    "Do you think the design insights communicated by these cards can be extended beyond the context?",
    "Do you think the design insights communicated by these cards are original?",
    "Do you think the design insights communicated by these cards lead you to create and open up new design spaces?",
    "Do you think the design insights communicated by these cards motivate you to explore it further?"
]

export let questions_custom = [
    "Do you think the design insights communicated by these customized cards are relevant/applicable to the design project you described to customize cards?",
    "Do you think the design insights communicated by these customized cards are actionable?",
    "Do you think the design insights communicated by these customized cards are valid?",
    "Do you think the design insights communicated by these customized cards can be extended beyond the context?",
    "Do you think the design insights communicated by these customized cards are original?",
    "Do you think the design insights communicated by these customized cards lead you to create and open up new design spaces?",
    "Do you think the design insights communicated by these customized cards motivate you to explore it further?"
]

//study

export const id = localStorageStore('data_id', [
    'study_1',
    'study_2',
    'study_3',
    'study_4'
])

export const color_data = localStorageStore('data_color', [
    "#802626",
    "#264980",
    "#805326",
    "#265380"
])

export const segment = localStorageStore('data_segment', [
    `4.2.6 Guideline 6: Facilitate Social Fun. "Facilitate social fun by making movement a social experience. " [41, p. 2197] Our results suggests that the notion of social fun needs to be carefully addressed. While the authors suggest to turn the game into "a spectacle others enjoy watching" [41, p. 2197], physically disabled participants reported that being physically active in the presence of others was uncomfortable exactly because of being viewed as said spectacle (e.g., by strangers in the gym), an aspect that is well-researched in the context of traditional physical activity (e.g., see [46]). However, participants did point out that they would be interested in playing together with family and friends. In conclusion, we reject the initial call of the authors to "make the game a spectacle" [41, p. 2197], instead prioritizing players' comfort zones and facilitating optional social fun that does not turn disability into a spectacle.`,
    `Platform Embedded Voice Modulators. Voice chat is the main method through which social VR users interact with one another. Yet it also discloses much information regarding one's gender, ethnicity, country of origin, and age, which may or may not benefit how people are perceived and approached in social VR. Therefore, platform provided voice modulators, which make users' voices anonymous and generic, would allow users (such as women, trans women, and non-native English speakers) not to include voice as part of their self-presentation. In this way, they would be able to avoid certain inappropriate perceptions and behaviors toward them based on their voice.`,
    `6.1.3 Add empathy to ensure trust maintenance. Many users reach out to chatbots to share their intense thoughts and life situation and expect to receive empathetic support and understanding in response [29,39,43]. Current chatbots can only partially satisfy this need by offering their availability to hold a conversation at any time and suggesting canned motivational or reassuring messages and sometimes stress-management practices (e.g., Woebot). The results of user expectations analysis indicate that chatbots frequently fail to accurately detect user's negative feelings and respond with an appropriate level of empathy and consideration. Even though affective computing is a long-lasting research problem [34], recent natural language processing methods achieved considerable progress in detecting fine-grained emotions and intents conveyed in humangenerated text messages [41]. At the same time, chatbots in some domains were shown to outperform human in the delivered level of empathy if trained accordingly [17]. Thus, we suggest that designers improve chatbots' abilities to distinguish a variety of users' emotional states and deliver empathetic responses, which could increase users' sense of belonging and acceptance [8]. To verify whether mutual understanding is achieved, chatbots should attend to the user's response in the "third position", i.e., the one following the initial two-turn exchanges [31]. If the user displays discontent with the agent's interpretation of her disclosed emotion, the agent should seek clarification and initiate repair strategies to preserve the conversation quality [31,38]. Depending on specific needs communicated by the user, the agent might offer advice on emotional regulation or just let the user vent out about her situation.`,
    'There are several implications of our work for website design. First, our results show that website complexity negatively impacts performance, even for a relatively diverse sample, which suggests that when efficiency is important, designers should strive to reduce the visual complexity of their website to a minimum. Since perceived visual complexity increases with the number of images, text, and colors [27], reducing such elements to the most necessary components would improve search efficiency and information recall. This is also consistent with past usability guidelines [19] and findings on the negative impact of website complexity on search efficiency [36]. However, it is not always desirable to lower the complexity of otherwise complex websites. There are specific demographic groups that prefer highly complex websites over simple ones [25]. Since visual preferences have been shown to correlate with trustworthiness and perceived usability [14], re-designing complex websites to be simpler may be disadvantageous for these user groups.'
])

export const summary = localStorageStore('data_summary', [
    [
        "The author investigates movement-based video games from the perspectives of wheelchair users, emphasizing the need for inclusive design.",
        "Through interviews and surveys, the study reveals themes such as independent access and social challenges, creating guidelines for game design that include disabled players."
    ],
    [
        "The author conducted an interview study with 30 participants to investigate self-presentation and perception in Social Virtual Reality (VR).",
        "This study provides empirical evidence and potential design implications for understanding identity practices and increasing complexity in CSCW and social VR platforms."
    ],
    [
        'The author investigates user experiences and expectations of open-domain chatbots by analyzing reviews from Google Play in a mixed-method study.',
        'They find that users currently value entertainment but desire more human-like behavior, with an emphasis on emotional interaction and attentiveness, leading to design implications for future chatbot development.'
    ],
    [
        'The study reveals that website visual complexity significantly impacts search efficiency and information recall, with higher complexity leading to poorer performance.',
        'Importantly, users preferring simpler websites experience a more pronounced negative effect from high complexity than those who prefer complex websites.'
    ]
])

export const evidence = localStorageStore('data_evidence', [
    "“Theme 2: The Push and Pull of Social Relationships and Settings. This theme encompasses participants' perspectives on social relationships and social settings in which both physical activity and games can take place. In particular, participants highlighted awareness of performative aspects of physical activity and playing games on a social stage, and difficulties that surround (expected) participant performance and its relationship with their experience of physical disability. With respect to (...)” (Section 3.4.2: INTERVIEW RESULTS)",
    `“In particular, participants expressed diverse perspectives of how gender should be perceived and presented in social VR. First, presenting gender was considered a natural way to draw attention. A few participants commented that social VR users tended to pay more attention to female digital representations just because they were female. For example, P4 (trans woman, 32, white) and P11 (cis male, 21, white) revealed, "People just pay attention to you if you present yourself as female. It's just (...)” (Section 4.2.2: FINDINGS)`,
    `“Empathy is the ability to understand the feelings of others and take their perspective. It encompasses both the abilities to recognize the emotions of another person and express appropriate emotions in return. Both of these dimensions emerged as pronounced themes in our analysis. First, users express a need for chatbots to better understand their emotions (n=70). For example, the following review described how a chatbot failed to correctly identify a user's positive mood: "I wish it was more (...)” (Section 5.2.2: USER EXPECTATIONS)`,
    `“Our analysis revealed that website complexity has a significant negative effect on search efficiency, confirming our first hypothesis (see Table 2). A linear mixed-model ANOVA confirmed the significant effect of complexity on search response time (F(2, 8.99) = 4.44, p < .05). Participants were fastest on simple websites (M = 4.2s, SD = 4.7s) and slowest on highly complex websites (M = 7.3s, SD = 7.0s), regardless of their preferred complexity level. 1 Figure 2 shows this negative correlation (...)” (‘Hypothesis Testing H.1: Visual Complexity Negatively Affects Search Efficiency’ section)`
])

export const citation = localStorageStore('data_citation', [
    "Mason, L., Gerling, K., Dickinson, P., Holopainen, J., Jacobs, L., & Hicks, K. (2022). Including the Experiences of Physically Disabled Players in Mainstream Guidelines for Movement-Based Games. CHI Conference on Human Factors in Computing Systems.",
    "Freeman, G., & Maloney, D. (2021). Body, Avatar, and Me. Proceedings of the ACM on Human-Computer Interaction, 4(CSCW3), 1–27.",
    "Svikhnushina, E., Placinta, A., & Pu, P. (2021). User Expectations of Conversational Chatbots Based on Online Reviews. Designing Interactive Systems Conference 2021.",
    'Baughan, A., August, T., Yamashita, N., & Reinecke, K. (2020). Keep it Simple: How Visual Complexity and Preferences Impact Search Efficiency on Websites. Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems.'
])

export const card_front_data = localStorageStore('data_card_front', [
    '<div class="card"> <div class="card-front-text"> <div class="vertical-middle"> <h3 class="title"> Facilitating optional social fun. </h3> <p class="description"> Designers should create movement experiences where physically disabled players can choose to play socially with close contacts, ensuring comfort and avoiding spectacle. </p> </div> </div> <div class="card-front-image"> <img class="image" src="/study/1.png"> </div> </div>',
    '<div class="card"> <div class="card-front-text"> <div class="vertical-middle"> <h3 class="title"> Providing platform-embedded voice modulators. </h3> <p class="description"> Designers should embed voice modulators in social VR to help users avoid biased perceptions and behaviors based on their voice. </p> </div> </div> <div class="card-front-image"> <img class="image" src="/study/2.png"> </div> </div>',
    `<div class="card"> <div class="card-front-text"> <div class="vertical-middle"> <h3 class="title"> Adding empathy to chatbot interactions. </h3> <p class="description"> Designers should enhance chatbots' abilities to detect emotional states and respond empathetically to improve user trust and satisfaction. </p> </div> </div> <div class="card-front-image"> <img class="image" src="/study/3.png"> </div> </div>`,
    `<div class="card"> <div class="card-front-text"> <div class="vertical-middle"> <h3 class="title"> Reducing visual complexity for efficiency. </h3> <p class="description"> Designers should minimize images, text, and colors to improve search efficiency and information recall, especially when efficiency is a priority. </p> </div> </div> <div class="card-front-image"> <img class="image" src="/study/4.png"> </div> </div>`
])

export const card_back_data = localStorageStore('data_card_back', [
    `<div class="card card-back"> <div class="summary-container"> <div class="vertical-middle"> <p class="summary-header"> About this paper </p> <p class="summary">The author investigates movement-based video games from the perspectives of wheelchair users, emphasizing the need for inclusive design.<br><br>Through interviews and surveys, the study reveals themes such as independent access and social challenges, creating guidelines for game design that include disabled players.</p> </div> </div> <div class="evidence-container"> <div class="vertical-middle"> <p class="evidence-header"> Which part of the paper did the design guideline come from? </p> <p class="evidence"> “Theme 2: The Push and Pull of Social Relationships and Settings. This theme encompasses participants' perspectives on social relationships and social settings in which both physical activity and games can take place. In particular, participants highlighted awareness of performative aspects of physical activity and playing games on a social stage, and difficulties that surround (expected) participant performance and its relationship with their experience of physical disability. With respect to (...)” (Section 3.4.2: INTERVIEW RESULTS) </p> </div> </div> <div class="citation-container"> <div class="vertical-middle"> <p class="citation"> Mason, L., Gerling, K., Dickinson, P., Holopainen, J., Jacobs, L., & Hicks, K. (2022). Including the Experiences of Physically Disabled Players in Mainstream Guidelines for Movement-Based Games. CHI Conference on Human Factors in Computing Systems. </p> </div> </div> </div>`,
    `<div class="card card-back"> <div class="summary-container"> <div class="vertical-middle"> <p class="summary-header"> About this paper </p> <p class="summary"> The author conducted an interview study with 30 participants to investigate self-presentation and perception in Social Virtual Reality (VR). <br><br>This study provides empirical evidence and potential design implications for understanding identity practices and increasing complexity in CSCW and social VR platforms. </p> </div> </div> <div class="evidence-container"> <div class="vertical-middle"> <p class="evidence-header"> Which part of the paper did the design guideline come from? </p> <p class="evidence"> “In particular, participants expressed diverse perspectives of how gender should be perceived and presented in social VR. First, presenting gender was considered a natural way to draw attention. A few participants commented that social VR users tended to pay more attention to female digital representations just because they were female. For example, P4 (trans woman, 32, white) and P11 (cis male, 21, white) revealed, "People just pay attention to you if you present yourself as female. It's just (...)” (Section 4.2.2: FINDINGS) </p> </div> </div> <div class="citation-container"> <div class="vertical-middle"> <p class="citation"> Freeman, G., & Maloney, D. (2021). Body, Avatar, and Me. Proceedings of the ACM on Human-Computer Interaction, 4(CSCW3), 1–27. </p> </div> </div> </div>`,
    `<div class="card card-back"> <div class="summary-container"> <div class="vertical-middle"> <p class="summary-header"> About this paper </p> <p class="summary"> The author investigates user experiences and expectations of open-domain chatbots by analyzing reviews from Google Play in a mixed-method study. <br><br>They find that users currently value entertainment but desire more human-like behavior, with an emphasis on emotional interaction and attentiveness, leading to design implications for future chatbot development. </p> </div> </div> <div class="evidence-container"> <div class="vertical-middle"> <p class="evidence-header"> Which part of the paper did the design guideline come from? </p> <p class="evidence"> “Empathy is the ability to understand the feelings of others and take their perspective. It encompasses both the abilities to recognize the emotions of another person and express appropriate emotions in return. Both of these dimensions emerged as pronounced themes in our analysis. First, users express a need for chatbots to better understand their emotions (n=70). For example, the following review described how a chatbot failed to correctly identify a user's positive mood: "I wish it was more (...)” (Section 5.2.2: USER EXPECTATIONS) </p> </div> </div> <div class="citation-container"> <div class="vertical-middle"> <p class="citation"> Svikhnushina, E., Placinta, A., &amp; Pu, P. (2021). User Expectations of Conversational Chatbots Based on Online Reviews. Designing Interactive Systems Conference 2021. </p> </div> </div> </div>`,
    `<div class="card card-back"> <div class="summary-container"> <div class="vertical-middle"> <p class="summary-header"> About this paper </p> <p class="summary"> The study reveals that website visual complexity significantly impacts search efficiency and information recall, with higher complexity leading to poorer performance. <br><br>Importantly, users preferring simpler websites experience a more pronounced negative effect from high complexity than those who prefer complex websites. </p> </div> </div> <div class="evidence-container"> <div class="vertical-middle"> <p class="evidence-header"> Which part of the paper did the design guideline come from? </p> <p class="evidence"> “Our analysis revealed that website complexity has a significant negative effect on search efficiency, confirming our first hypothesis (see Table 2). A linear mixed-model ANOVA confirmed the significant effect of complexity on search response time (F(2, 8.99) = 4.44, p < .05). Participants were fastest on simple websites (M = 4.2s, SD = 4.7s) and slowest on highly complex websites (M = 7.3s, SD = 7.0s), regardless of their preferred complexity level. 1 Figure 2 shows this negative correlation (...)” (‘Hypothesis Testing H.1: Visual Complexity Negatively Affects Search Efficiency’ section) </p> </div> </div> <div class="citation-container"> <div class="vertical-middle"> <p class="citation"> Baughan, A., August, T., Yamashita, N., & Reinecke, K. (2020). Keep it Simple: How Visual Complexity and Preferences Impact Search Efficiency on Websites. Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems. </p> </div> </div> </div>`
])

export const scores_study = localStorageStore('scores_study', {})