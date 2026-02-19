import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod/v3";

// ============================================================
// 0. 환경 변수 설정
//    .env 파일에 아래 키들을 넣어두세요
//    OPENAI_API_KEY=sk-...
//    ANTHROPIC_API_KEY=sk-ant-...
//    GOOGLE_API_KEY=AI...
// ============================================================

const openai = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0.7,
});

const claude = new ChatAnthropic({
  model: "claude-haiku-4-5-20251001",
  temperature: 0.7,
  maxTokens: 1024,
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  temperature: 0.7,
});

// ============================================================
// 1. 기본 호출 — 3개 모델 비교
// ============================================================
async function basicInvoke() {
  console.log("=== 1. 기본 호출 (OpenAI / Claude / Gemini) ===\n");

  const messages = [
    { role: "system" as const, content: "너는 친절한 한국어 도우미야." },
    { role: "user" as const, content: "TypeScript의 장점 3가지를 간단히 알려줘." },
  ];

  const [oRes, cRes, gRes] = await Promise.all([
    openai.invoke(messages),
    claude.invoke(messages),
    gemini.invoke(messages),
  ]);

  console.log("[OpenAI]", oRes.content, "\n");
  console.log("[Claude]", cRes.content, "\n");
  console.log("[Gemini]", gRes.content, "\n");
}

// ============================================================
// 2. 프롬프트 템플릿 + 체인 (LCEL pipe) — 모델별 체인
// ============================================================
async function promptChain() {
  console.log("=== 2. 프롬프트 템플릿 + 체인 ===\n");

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "너는 {language} 전문 번역가야. 주어진 문장을 {language}로 번역해."],
    ["user", "{text}"],
  ]);
  const parser = new StringOutputParser();

  const openaiChain = prompt.pipe(openai).pipe(parser);
  const claudeChain = prompt.pipe(claude).pipe(parser);
  const geminiChain = prompt.pipe(gemini).pipe(parser);

  const input = { language: "일본어", text: "오늘 날씨가 정말 좋네요!" };

  const [oRes, cRes, gRes] = await Promise.all([
    openaiChain.invoke(input),
    claudeChain.invoke(input),
    geminiChain.invoke(input),
  ]);

  console.log("[OpenAI]", oRes);
  console.log("[Claude]", cRes);
  console.log("[Gemini]", gRes);
  console.log();
}

// ============================================================
// 3. 스트리밍 출력 — Claude 스트리밍
// ============================================================
async function streamingOutput() {
  console.log("=== 3. 스트리밍 출력 (Claude) ===\n");

  const prompt = ChatPromptTemplate.fromTemplate(
    "{topic}에 대한 짧은 시를 써줘."
  );
  const chain = prompt.pipe(claude).pipe(new StringOutputParser());

  const stream = await chain.stream({ topic: "봄" });
  for await (const chunk of stream) {
    process.stdout.write(chunk);
  }
  console.log("\n");
}

// ============================================================
// 4. 구조화된 출력 (Structured Output) — 모델별 비교
// ============================================================
async function structuredOutput() {
  console.log("=== 4. 구조화된 출력 (Zod) ===\n");

  const recipeSchema = z.object({
    name: z.string().describe("요리 이름"),
    ingredients: z.array(z.string()).describe("재료 목록"),
    steps: z.array(z.string()).describe("조리 순서"),
    difficulty: z.enum(["쉬움", "보통", "어려움"]).describe("난이도"),
  });

  const query = "간단한 계란볶음밥 레시피를 알려줘.";

  const [oRes, cRes, gRes] = await Promise.all([
    openai.withStructuredOutput(recipeSchema).invoke(query),
    claude.withStructuredOutput(recipeSchema).invoke(query),
    gemini.withStructuredOutput(recipeSchema).invoke(query),
  ]);

  console.log("[OpenAI]", JSON.stringify(oRes, null, 2), "\n");
  console.log("[Claude]", JSON.stringify(cRes, null, 2), "\n");
  console.log("[Gemini]", JSON.stringify(gRes, null, 2), "\n");
}

// ============================================================
// 5. 배치 처리 — Gemini 배치
// ============================================================
async function batchProcessing() {
  console.log("=== 5. 배치 처리 (Gemini) ===\n");

  const prompt = ChatPromptTemplate.fromTemplate(
    "{word}의 뜻을 한 줄로 설명해줘."
  );
  const chain = prompt.pipe(gemini).pipe(new StringOutputParser());

  const results = await chain.batch([
    { word: "세렌디피티" },
    { word: "페르소나" },
    { word: "패러다임" },
  ]);

  results.forEach((r, i) => console.log(`  ${i + 1}. ${r}`));
  console.log();
}

// ============================================================
// 실행
// ============================================================
async function main() {
  console.log("🦜🔗 LangChain.js 기본 예제 — OpenAI / Claude / Gemini\n");

  await basicInvoke();
  await promptChain();
  await streamingOutput();
  await structuredOutput();
  await batchProcessing();

  console.log("✅ 모든 예제 완료!");
}

main().catch(console.error);
