# ⚡ stream-json-repair-demo

> **Real-World Consumer Application Showcasing the [`stream-json-repair`](https://www.npmjs.com/package/stream-json-repair) NPM Package for Live AI Streaming.**

[![npm dependency](https://img.shields.io/badge/dependency-stream--json--repair%20%401.0.0-blue?style=flat-square)](https://www.npmjs.com/package/stream-json-repair)
[![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)
[![node version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square)](https://nodejs.org/)

---

## 📌 Project Overview

This repository is a **consumer application** built to demonstrate how the published NPM package **[`stream-json-repair`](https://www.npmjs.com/package/stream-json-repair)** is integrated and used in real-world software.

* **Published NPM Package:** [npmjs.com/package/stream-json-repair](https://www.npmjs.com/package/stream-json-repair)
* **Core Package GitHub Repository:** [github.com/EkanshKhatri/stream-json-repair](https://github.com/EkanshKhatri/stream-json-repair)

---

## 🎯 The Real-World Problem Solved

When building modern AI-driven applications with **OpenAI**, **Anthropic Claude**, or **Google Gemini**, streaming structured outputs (JSON) is essential for responsiveness.

However, standard `JSON.parse()` crashes immediately whenever a token stream is incomplete:
```js
JSON.parse('{"user": "Ekansh", "active": tru');
// ❌ SyntaxError: Unexpected end of JSON input
```

By installing and using **`stream-json-repair`**, this application:
1. **Repairs truncated JSON strings in real-time** (auto-completes booleans, strings, numbers, brackets, and braces).
2. **Safely strips markdown code blocks and conversational prose** emitted by LLMs (```` ```json ... ``` ````).
3. **Streams token chunks frame-by-frame**, yielding valid, typed JavaScript objects as tokens arrive over the network.

---

## 📦 Dependency in `package.json`

This project directly installs `stream-json-repair` as a production dependency:

```json
{
  "name": "stream-json-repair-demo",
  "dependencies": {
    "stream-json-repair": "^1.0.0"
  }
}
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/EkanshKhatri/stream-json-repair-demo.git
cd stream-json-repair-demo
```

### 2. Install Dependencies
```bash
npm install
```
*(This pulls `stream-json-repair` directly from the official NPM registry).*

### 3. Run the Live AI Streaming Demo
```bash
npm start
```

### 4. Run Integration Tests
```bash
npm test
```

---

## 💻 Code Examples & Usage in this Project

### 1. Progressive Token Streaming with `parseJsonStream`
From [`index.js`](./index.js):
```js
import { parseJsonStream } from "stream-json-repair";

// Consuming an async stream of tokens from an AI model:
for await (const snapshot of parseJsonStream(simulateNetworkStream())) {
  console.log(`[Status: ${snapshot.isComplete ? "Done" : "Generating..."}]`);
  console.log("Current Live State:", snapshot.value);
}
```

### 2. Direct Repair of Partial JSON with `repairJson`
```js
import { repairJson } from "stream-json-repair";

const truncated = '{"task": "Analyze revenue", "metrics": {"growth": 18.5, "achieved": tru';
const validJson = repairJson(truncated);

console.log(validJson);
// 👉 Output: {"task": "Analyze revenue", "metrics": {"growth": 18.5, "achieved": true}}
```

### 3. Safe Parsing with Markdown Extraction
```js
import { safeParsePartialJson } from "stream-json-repair";

const aiOutput = "Sure! Here is the data:\n```json\n{\"summary\": \"Growth is up 45%\"";
const result = safeParsePartialJson(aiOutput);

if (result.success) {
  console.log(result.data.summary); // "Growth is up 45%"
}
```

---

## 📂 Project Structure

```
stream-json-repair-demo/
├── index.js          # Interactive showcase: 3 real-world AI streaming scenarios
├── test.js           # Integration test verifying the NPM package installation
├── package.json      # Manifest with stream-json-repair dependency
├── .gitignore        # Standard ignore rules
└── README.md         # Documentation & consumer guide
```

---

## 👨‍💻 Author

**Ekansh Khatri**  
* GitHub: [@EkanshKhatri](https://github.com/EkanshKhatri)  
* NPM: [ekanshkhatri](https://www.npmjs.com/~ekanshkhatri)

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.
