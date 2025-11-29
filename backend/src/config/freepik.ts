import env from "../utils/env";

export const generateImage = async (prompt: string) => {
  const url = "https://api.freepik.com/v1/ai/mystic";
  const options = {
    body: JSON.stringify({
      prompt: prompt,
      model: "fluid",
      aspect_ratio: "square_1_1",
      creative_detailing: 35,
      engine: "automatic",
    }),
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-freepik-api-key": env.FREEPIK_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const taskId = data.data.task_id;

    while (true) {
      await new Promise((r) => setTimeout(r, 5000));

      const poll = await fetch(`${url}/${taskId}`, {
        headers: { "x-freepik-api-key": env.FREEPIK_API_KEY },
      });
      const result = await poll.json();

      if (
        result.data.status === "COMPLETED" &&
        result.data.generated.length > 0
      ) {
        const imageUrl = result.data.generated[0];
        console.log("IMAGE URL: ", imageUrl);
        return imageUrl;
      }

      if (result.data.status === "FAILED") {
        console.error(result);
        return null;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
