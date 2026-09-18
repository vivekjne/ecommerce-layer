import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls, type UIMessage } from "ai";

export interface UseShopChatOptions {
  /** Resource route backing the chat stream. Defaults to "/api/chat". */
  chatApi?: string;
}

/**
 * A thin wrapper around @ai-sdk/react's useChat with the transport and
 * multi-step tool-call auto-resubmit behavior a shopping chat needs
 * pre-wired, so a host app doesn't need to know those AI SDK details to
 * get "propose then confirm" semantics right.
 */
export function useShopChat(options: UseShopChatOptions = {}): UseChatHelpers<UIMessage> {
  return useChat({
    transport: new DefaultChatTransport({ api: options.chatApi ?? "/api/chat" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
  });
}
