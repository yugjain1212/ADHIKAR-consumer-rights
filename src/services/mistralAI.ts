
import { toast } from "sonner";

const MISTRAL_API_ENDPOINT = "https://api.mistral.ai/v1/chat/completions";

// This would normally come from environment variables or Supabase secrets
// For now, users will need to provide their own API key
let MISTRAL_API_KEY = "";

export const setMistralApiKey = (apiKey: string) => {
  MISTRAL_API_KEY = apiKey;
  localStorage.setItem("mistral_api_key", apiKey);
  return true;
};

export const getMistralApiKey = () => {
  if (!MISTRAL_API_KEY) {
    MISTRAL_API_KEY = localStorage.getItem("mistral_api_key") || "";
  }
  return MISTRAL_API_KEY;
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const chatWithMistral = async (
  messages: ChatMessage[]
): Promise<ChatMessage | null> => {
  const apiKey = getMistralApiKey();
  
  if (!apiKey) {
    toast.error("Please set your Mistral AI API key first");
    return null;
  }

  try {
    const payload: ChatCompletionRequest = {
      model: "mistral-medium",
      messages: [
        {
          role: "system",
          content: "You are a helpful consumer rights assistant that provides accurate information about consumer protection laws, rights, and how to handle disputes with businesses."
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000
    };

    const response = await fetch(MISTRAL_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Mistral API error:", error);
      throw new Error(error.message || "Error calling Mistral AI API");
    }

    const data: ChatCompletionResponse = await response.json();
    return data.choices[0].message;
  } catch (error) {
    console.error("Error chatting with Mistral:", error);
    toast.error("Failed to get response from AI assistant");
    return null;
  }
};
