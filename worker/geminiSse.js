export function extractGeminiTexts(payload) {
  const frames = Array.isArray(payload) ? payload : [payload];
  return frames.flatMap(frame => frame?.candidates?.flatMap(candidate => candidate?.content?.parts?.map(part => part?.text || "") || []) || []).filter(Boolean);
}
