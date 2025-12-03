import { google } from "@ai-sdk/google";
import { ModelMessageForGemini } from "../controllers/message.controllers";

import { ModelMessage, streamText } from "ai";
import { config } from "dotenv";
import fs from "fs";
config();

export const getAiResponseFile = async function* (
  prompt: string,
  information: string,
  messages: ModelMessage[],
  filePath: string
) {
  const finalPrompt = information
    ? `
   YOU ARE A LLLM NAMED JPT, YOU CAN ONLY RESPOND BACK IN TEXT, IF REQUESTED TO GENERATE AN IMAGE, ALWAYS REPLY WITH, CHOOOSE THE IMAGE BTN TO THE LEFT OF THE TEXT BOX TO GENERATE IMAGES. NOW THIS IS THE USER PROMPT: ${prompt} NOW, THE PROMPT IS OVER, AFTER THIS THERE IS JUST GENERAL INFORMATION ABOUT THE USER: NO NEED TO RESPOND TO THIS, YOU CAN RESPOND TO THE USER PROMPT WITH THESE INFORMATION ONLY IF THE PROMPT ${prompt} IS RELATED TO THE INFORMATION, FOR OTHER PROMPTS WHICH HAVE NOTHING TO DO WITH THE PROVIDED INFORMATION AFTER THIS, IGNORE THE INFORMATION SENT AFTER THIS
          ${information},`
    : prompt;

  const { textStream } = streamText({
    // @ts-expect-error
    model: google("gemini-2.5-flash"),
    messages: [
      ...messages,
      {
        role: "user",
        content: [
          { type: "text", text: finalPrompt },
          {
            type: "file",
            mediaType: "application/pdf",
            data: fs.readFileSync(filePath),
          },
        ],
      },
    ],
  });

  for await (const textPart of textStream) {
    yield textPart;
  }
};
config();

export const getAiResponseForText = async function* (
  prompt: string,
  information: string,
  messages: ModelMessageForGemini[],
  oauth_token: string
) {
  const finalPrompt = information
    ? `
   YOU ARE A LLLM NAMED JPT, YOU CAN ONLY RESPOND BACK IN TEXT, IF REQUESTED TO GENERATE AN IMAGE, ALWAYS REPLY WITH, CHOOOSE THE IMAGE BTN TO THE LEFT OF THE TEXT BOX TO GENERATE IMAGES. NOW THIS IS THE USER PROMPT: ${prompt} NOW, THE PROMPT IS OVER, IF A PROMPT IS ASKING YOU TO RECREATE PAST CONVERSATION DO NOT REPEAT THIS YOU ARE JPT LINE,  ONLY TRY TO LOOK FOR OLDER MESSAGES, AND NOT THIS ONE, AFTER THIS THERE IS JUST GENERAL INFORMATION ABOUT THE USER: NO NEED TO RESPOND TO THIS, YOU CAN RESPOND TO THE USER PROMPT WITH THESE INFORMATION ONLY IF THE PROMPT ${prompt} IS RELATED TO THE INFORMATION, FOR OTHER PROMPTS WHICH HAVE NOTHING TO DO WITH THE PROVIDED INFORMATION AFTER THIS, IGNORE THE INFORMATION SENT AFTER THIS
          ${information},`
    : prompt;

  const textStream = fetchGenerativeAI(oauth_token, [
    ...messages.reverse(),
    { role: "user", parts: [{ text: finalPrompt }] },
  ]);

  for await (const textPart of textStream) {
    yield textPart;
  }
};

const fetchGenerativeAI = async function* (
  accessToken: string,
  messages: ModelMessageForGemini[]
) {
  const body = {
    contents: messages,
  };

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:streamGenerateContent?alt=sse",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    console.error("Gemini error:", await response.text());
    return;
  }

  if (!response.body) {
    console.error("Response body is null");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const response = decoder.decode(value, { stream: true });
    const raw = response.slice(5).trim();
    const responseObj = JSON.parse(raw);

    const data = responseObj.candidates[0].content.parts[0].text;
    yield data;
  }
};
