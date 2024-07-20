import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";

const judge0API = "https://judge0-ce.p.rapidapi.com/submissions";

const codeExecute = asyncHandler(async (req, res) => {
  const { language, code, input } = req.body;

  const languageMapping = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54,
  };

  const languageId = languageMapping[language];
  if (!languageId) {
    return res.status(400).send("Language not supported");
  }

  const submissionData = {
    source_code: code,
    stdin: input,
    language_id: languageId,
  };

  try {
    const { data } = await axios.post(judge0API, submissionData, {
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "x-rapidapi-key": process.env.JUDGE0_API_KEY,
      },
    });

    const submissionToken = data.token;

    // Polling the Judge0 API for the result
    let result;
    while (true) {
      const { data: resultData } = await axios.get(
        `${judge0API}/${submissionToken}`,
        {
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": process.env.JUDGE0_API_KEY,
          },
        }
      );

      if (resultData.status.id > 2) {
        result = resultData;
        break;
      }
    }

    if (result.status.id !== 3) {
      return res
        .status(500)
        .send(result.stderr || result.compile_output || "Error executing code");
    }

    res.send(result.stdout);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export { codeExecute };
