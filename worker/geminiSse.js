export function extractGeminiTexts(payload) {
  const frames = Array.isArray(payload) ? payload : [payload];
  return frames.flatMap(frame => frame?.candidates?.flatMap(candidate => candidate?.content?.parts?.map(part => part?.text || "") || []) || []).filter(Boolean);
}

export function describeGeminiPayload(payload) {
  const frames = Array.isArray(payload) ? payload : [payload];
  return {
    frameCount: frames.length,
    frames: frames.slice(0, 3).map(frame => ({
      keys: frame && typeof frame === "object" ? Object.keys(frame).sort() : [],
      candidateCount: Array.isArray(frame?.candidates) ? frame.candidates.length : 0,
      candidates: (frame?.candidates || []).slice(0, 2).map(candidate => ({
        keys: candidate && typeof candidate === "object" ? Object.keys(candidate).sort() : [],
        finishReason: typeof candidate?.finishReason === "string" ? candidate.finishReason : undefined,
        contentKeys: candidate?.content && typeof candidate.content === "object" ? Object.keys(candidate.content).sort() : [],
        partKeys: Array.isArray(candidate?.content?.parts) ? candidate.content.parts.slice(0, 3).map(part => part && typeof part === "object" ? Object.keys(part).sort() : []) : [],
      })),
    })),
  };
}
