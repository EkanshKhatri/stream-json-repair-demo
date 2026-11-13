import {
  repairJson,
  parsePartialJson,
  safeParsePartialJson,
  parseJsonStream,
} from "stream-json-repair";

console.log("======================================================================");
console.log("🤖 AI Streaming Consumer Showcase (Powered by stream-json-repair)");
console.log("======================================================================\n");

// -----------------------------------------------------------------------------
// Scenario 1: Repairing Truncated / Incomplete JSON from an AI API
// -----------------------------------------------------------------------------
console.log("--- [Scenario 1] Repairing Partial JSON from LLM Stream Cut-off ---");
const rawStreamChunk = '{"task": "Analyze quarterly revenue", "status": "in_progress", "metrics": {"growth": 18.5, "target": 20.0, "achieved": tru';

console.log("Raw Incomplete Payload from Network:");
console.log(rawStreamChunk);

const repairedJson = repairJson(rawStreamChunk);
console.log("\nRepaired Output (Valid JSON):");
console.log(repairedJson);

const parsedObject = parsePartialJson(rawStreamChunk);
console.log("\nDirectly Parsed JavaScript Object:");
console.dir(parsedObject, { depth: null });
console.log("Is Task In Progress?", parsedObject.status === "in_progress");
console.log("Growth Rate:", parsedObject.metrics?.growth + "%");

// -----------------------------------------------------------------------------
// Scenario 2: Handling Markdown Code Fences & Conversational Text
// -----------------------------------------------------------------------------
console.log("\n--- [Scenario 2] Stripping Markdown Fences & Conversational Intro ---");
const conversationalAiResponse = `
Sure! Here is the structured summary you requested:
\`\`\`json
{
  "summary": "AI adoption grew by 45% year-over-year.",
  "top_sectors": ["Healthcare", "Finance", "Software
`;

const safeResult = safeParsePartialJson(conversationalAiResponse);
if (safeResult.success) {
  console.log("SafeParse Result:");
  console.dir(safeResult.data, { depth: null });
}

// -----------------------------------------------------------------------------
// Scenario 3: Real-Time Token-by-Token Streaming Pipeline
// -----------------------------------------------------------------------------
console.log("\n--- [Scenario 3] Real-Time AI Token Stream Simulation ---");

// Simulated tokens arriving one-by-one from an LLM stream (OpenAI / Gemini / Claude)
const tokenStream = [
  '{"recipe": "Masala Dosa',
  '", "difficulty": "Medium',
  '", "prepTimeMinutes": 20',
  ', "ingredients": ["Fermented batter',
  '", "Potato filling',
  '", "Mustard seeds"]',
  ', "nutrition": {"calories": 280, "protein": 6',
  ', "isVegan": true}}',
];

async function* simulateNetworkStream() {
  for (const token of tokenStream) {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate 100ms network latency
    yield token;
  }
}

async function runLiveStreamingDemo() {
  let step = 1;
  for await (const snapshot of parseJsonStream(simulateNetworkStream())) {
    console.log(`[Chunk #${step++}] Status: ${snapshot.isComplete ? "✅ COMPLETE" : "⏳ STREAMING..."}`);
    console.log("Live State Snapshot:", JSON.stringify(snapshot.value));
    console.log("----------------------------------------------------------------------");
  }
  console.log("\n🎉 Stream fully received, repaired, and parsed without a single crash!");
}

await runLiveStreamingDemo();
