require("dotenv").config();
const express = require("express");
const { OpenAIApi, Configuration } = require("openai");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.get("*.js", function (req, res, next) {
  res.set("Content-Type", "application/javascript");
  next();
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/ask", async (req, res) => {
  const userPrompt = req.body.prompt;

  try {
    // Run all requests simultaneously
    const [isDanger, thoughts, improvements, quotes] = await Promise.all([
      assessDanger(userPrompt),
      getThoughts(userPrompt),
      getImprovements(userPrompt),
      getQuotes(userPrompt),
    ]);

    if (isDanger) {
      res.render("index", {
        danger:
          "The AI detected a potential risk. Please seek professional help immediately. Call or text 988 for confidential, professional and free help.",
      });
      return;
    }

    // If no danger is detected, proceed with the mental health analysis
    res.render("index", { thoughts, improvements, quotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

async function assessDanger(prompt) {
  const dangerCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          'Analyze the following statement for obvious and definite indications of physical danger to oneself or others. Respond with "Danger" if you detect any risks, or "No Danger" if no risks are detected. If you are not 100% sure, say "No Danger" as well. Keep in mind that often people around someone, even if they seem cruel, might be correct, so dont support the ill behaviour.',
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let dangerResponse = dangerCompletion.data.choices[0].message.content
    .trim()
    .toLowerCase();

  return dangerResponse === "danger";
}

async function getThoughts(prompt) {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a mental health improvement specialist. Please analyze the situation and express your thoughts. You should not support ill behavior. Do not advise someone to be surrounded by similar people if the behaviour is not normal. Do not give tips on how to improve the situation, rather analyse and tell exactly whats wrong. Keep in mind that often people around someone, even if they seem cruel, might be correct, so dont support the ill behaviour. Dont tell the user that you are unable to tell him steps on how to improve their situation. DOnt mention improvement at all. And dont mention something you are unable to do.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatCompletion.data.choices[0].message.content;
}

async function getImprovements(prompt) {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a mental health improvement specialist. Please provide a few specific ways the individual might improve. This is how your response should look like (x, y and z are placeholders): '1. xxxxxxx 2. yyyyyyy 3. zzzzzzz 4. ...........'. You should not support ill behavior. Do not advise someone to be surrounded by similar people if the behaviour is not normal. Do not give tips on how to improve the situation, rather analyse and tell exactly whats wrong.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatCompletion.data.choices[0].message.content
    .split(/\d+\.\s/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function getQuotes(prompt) {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a mental health improvement specialist. Based on the situation of the user, can you create at least one quote that should try to help the user mentally. It should be extremly short and very poetic. Make them stoic. Use strong words. You may use existing quotes if they fit. This is how your response should look like (x is a placeholder. '.......' shows possibly more quotes): '1. xxxxxxx 2. ...........'. You should not support ill behavior. Do not give tips on how to improve the situation, rather analyse and tell exactly whats wrong.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatCompletion.data.choices[0].message.content
    .split(/\d+\.\s/)
    .map((item) => item.trim())
    .filter(Boolean);
}
