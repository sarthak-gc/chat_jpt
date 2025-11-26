import { google } from "@ai-sdk/google";

import { ModelMessage, streamText } from "ai";
import { config } from "dotenv";
config();

export const getAiResponse = async function* (
  prompt: string,
  information: string,
  messages: ModelMessage[]
) {
  const finalPrompt = information
    ? `${prompt}
          NOW, THE PROMPT IS OVER, AFTER THIS THERE IS JUST GENERAL INFORMATION ABOUT THE USER: NO NEED TO RESPOND TO THIS, YOU CAN RESPOND TO THE USER PROMPT WITH THESE INFORMATION ONLY IF THE PROMPT ${prompt} IS RELATED TO THE INFORMATION, FOR OTHER PROMPTS WHICH HAVE NOTHING TO DO WITH THE PROVIDED INFORMATION AFTER THIS, IGNORE THE INFORMATION SENT AFTER THIS
          ${information},`
    : prompt;

  const { textStream } = streamText({
    model: google("gemini-2.5-flash"),
    messages: [...messages, { role: "user", content: finalPrompt }],
  });

  for await (const textPart of textStream) {
    yield textPart;
  }
};

// import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import { ModelMessage, streamText } from "ai";

// export const getAiResponse = async function* (
//   prompt: string,
//   information: string,
//   messages: ModelMessage[],
//   accessToken: string
// ) {
//   const finalPrompt = information
//     ? `${prompt}
//           [USER INFO BELOW - ONLY USE IF RELEVANT]
//           ${information}`
//     : prompt;

//   const google = createGoogleGenerativeAI({
//     apiKey: undefined,
//     baseURL: "https://generativelanguage.googleapis.com/v1",

//     fetch: (url, init) => {
//       const cleanUrl = url.toString().replace(/[?&]key=[^&]+/, "");
//       return fetch(cleanUrl, {
//         ...init,
//         headers: {
//           ...init?.headers,
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//     },
//   });

//   const { textStream } = streamText({
//     model: google("gemini-2.5-flash"),
//     messages: [...messages, { role: "user", content: finalPrompt }],
//   });

//   for await (const textPart of textStream) {
//     yield textPart;
//   }
// };
