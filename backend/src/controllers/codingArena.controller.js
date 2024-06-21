import { exec } from "child_process";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, "..", "..", "public", "temp");

const codeExecute = asyncHandler(async (req, res) => {
  const { language, code, input } = req.body;

  const uniqueDir = path.join(tempDir, uuidv4());
  await fs.mkdir(uniqueDir, { recursive: true });

  let command;
  let fileName;

  switch (language) {
    case "javascript":
      command = `echo "${input}" | node -e "${code.replace(/"/g, '\\"')}"`;
      break;
    case "python":
      command = `echo "${input}" | python -c "${code.replace(/"/g, '\\"')}"`;
      break;
    case "java":
      fileName = "Main.java";
      await fs.writeFile(path.join(uniqueDir, fileName), code);
      command = `cd "${uniqueDir}" && javac Main.java && echo "${input}" | java -cp . Main`;
      break;
    case "cpp":
      fileName = "main.cpp";
      await fs.writeFile(path.join(uniqueDir, fileName), code);
      command = `cd "${uniqueDir}" && g++ main.cpp -o main && echo "${input}" | ./main`;
      break;
    default:
      cleanup(uniqueDir);
      return res.status(400).send("Language not supported");
  }

  exec(command, (error, stdout, stderr) => {
    cleanup(uniqueDir);
    if (error) {
      return res.status(500).send(stderr || error.message);
    }
    res.send(stdout);
  });
});

const cleanup = (dir) => {
  setTimeout(async () => {
    try {
      await fs.rm(dir, { recursive: true, force: true });
      // console.log(`Temporary directory ${dir} deleted.`);
    } catch (error) {
      console.error(`Error deleting temporary directory ${dir}:`, error);
    }
  }, 5000);
};

export { codeExecute };
