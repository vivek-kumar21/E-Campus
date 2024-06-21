import React, { useState } from "react";
import axios from "axios";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { dracula } from "@uiw/codemirror-theme-dracula";

import Loader from "../Loader";
import { URL } from "../../url";

const initialCode = {
  javascript: `console.log("Hello, world!");`,
  python: `print("Hello, world!")`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world!" << endl;
    return 0;
}`,
};

const Main = () => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(initialCode[language]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const executeCode = async () => {
    try {
      setLoading(true);
      const response = await axios.post(URL + "/api/v1/execute", {
        language,
        code,
        input,
      });
      setOutput(response.data);
      setLoading(false);
    } catch (error) {
      setOutput(error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(initialCode[selectedLanguage]);
    setOutput("");
  };

  return (
    <div className="bg-gray-200">
      <div className="flex items-center justify-center">
        <span className="text-gray-600 mt-2 relative">
          <span className="text-4xl text-extrabold relative">Coding Arena</span>
          <span
            className="absolute inset-x-0 bottom-[-20px] h-8 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: "url(https://www.beyondcss.dev/underline.svg)",
            }}
          ></span>
        </span>
      </div>
      <div className="flex flex-wrap p-4">
        <div className="w-full lg:w-1/2 p-4">
          <div className="flex justify-between">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="mb-4 px-4 py-2 border border-gray-300 rounded w-32 bg-white"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
            </select>

            <button
              onClick={executeCode}
              className="mb-4 w-24 h-10 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              {loading ? <Loader size={"w-6 h-6"} /> : <p>Run Code</p>}
            </button>
          </div>

          <CodeMirror
            value={code}
            height="450px"
            extensions={
              language === "javascript"
                ? [javascript()]
                : language === "python"
                ? [python()]
                : language === "java"
                ? [java()]
                : [cpp()]
            }
            theme={dracula}
            onChange={(value) => {
              setCode(value);
            }}
          />
        </div>

        <div className="w-full lg:w-1/2 mt-12 p-4 flex flex-col">
          <h3 className="text-lg font-semibold">Input:</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here"
            className="mb-4 p-2 w-full h-24 border border-gray-300 rounded"
          />

          <h3 className="text-lg font-semibold">Output:</h3>
          <div className="mt-0 bg-white p-4 border border-gray-300 rounded flex-grow">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
