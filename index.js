#!/usr/bin/env node

import { config } from "dotenv";
import { OpenAI } from "openai";
import path from "path";
import { fileURLToPath } from "url";

(async () => {
  // Load Environment Variables
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  config({ path: path.join(__dirname, ".env") });

  const instruction = [
    "You are an AI agent operating on the command line.",
    "Please suggest the best command from the user's prompt.",
    "The command should work with the following environment:",
    `- OS: ${getOS(process.platform)}`,
    `- Architecture: ${process.arch}`,
    `- User: ${process.env.USER}`,
    `- Current Directory: ${process.cwd()}`,
    `- Home Directory: ${process.env.HOME}`,
  ].join("\n");

  // Format user input
  const userInput = process.argv.slice(2).join(" ");

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: instruction,
      },
      {
        role: "user",
        content: userInput,
      },
    ],
    stream: true,
    temperature: 0,
  });

  for await (const message of response) {
    process.stdout.write(message.choices[0].delta.content ?? "");
  }
  process.stdout.write("\n");
})();

function getOS(platform) {
  return (
    {
      aix: "IBM AIX",
      darwin: "macOS",
      freebsd: "FreeBSD",
      linux: "Linux",
      openbsd: "OpenBSD",
      sunos: "Solaris (SunOS)",
      win32: "Windows",
    }[platform] || platform
  );
}
