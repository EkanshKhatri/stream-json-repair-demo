import {
  repairJson,
  parsePartialJson,
  safeParsePartialJson,
  parseJsonStream,
} from "stream-json-repair";

console.log("Running Consumer Integration Tests for stream-json-repair...\n");

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    process.exit(1);
  }
}

// Test 1: repairJson
const repaired = repairJson('{"user": "Ekansh", "active": tru');
assert(
  repaired === '{"user": "Ekansh", "active": true}',
  "repairJson should complete boolean and close brace"
);
console.log("✔ Test 1: repairJson passed");

// Test 2: parsePartialJson
const parsed = parsePartialJson('{"items": [1, 2, 3');
assert(
  Array.isArray(parsed?.items) && parsed.items.length === 3,
  "parsePartialJson should return parsed array"
);
console.log("✔ Test 2: parsePartialJson passed");

// Test 3: safeParsePartialJson
const safe = safeParsePartialJson('```json\n{"status": "ok"');
assert(safe.success && safe.data.status === "ok", "safeParsePartialJson should parse markdown");
console.log("✔ Test 3: safeParsePartialJson passed");

// Test 4: parseJsonStream
async function testStream() {
  const chunks = ['{"step": 1', ', "name": "Build"'];
  async function* gen() {
    for (const c of chunks) yield c;
  }
  let count = 0;
  for await (const snap of parseJsonStream(gen())) {
    count++;
    assert(typeof snap.value === "object", "Snapshot value must be an object");
  }
  assert(count === 2, "Stream should yield 2 snapshots");
}

await testStream();
console.log("✔ Test 4: parseJsonStream passed");

console.log("\n🎉 ALL CONSUMER TESTS PASSED SUCCESSFULLY!");
