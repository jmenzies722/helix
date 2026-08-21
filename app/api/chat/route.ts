import { gateway } from "@ai-sdk/gateway";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { HELIX_INSTRUCTIONS, HELIX_MODEL } from "@/lib/helix";

export const maxDuration = 30;

function isChatRequest(
  value: unknown,
): value is { messages: UIMessage[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    "messages" in value &&
    Array.isArray(value.messages)
  );
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isChatRequest(body)) {
    return Response.json(
      { error: "Expected a messages array." },
      { status: 400 },
    );
  }

  const result = streamText({
    model: gateway(HELIX_MODEL),
    instructions: HELIX_INSTRUCTIONS,
    messages: await convertToModelMessages(body.messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: () => "Helix could not reply. Try again.",
    }),
  });
}
