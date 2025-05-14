import { MistralClient } from '@mistralai/mistralai';

const client = new MistralClient(process.env.MISTRAL_API_KEY || '');

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function chatWithMistral(messages: ChatMessage[]) {
  try {
    const response = await client.chat({
      model: 'mistral-tiny',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    });

    return {
      success: true,
      message: response.choices[0].message.content
    };
  } catch (error) {
    console.error('Error in chatWithMistral:', error);
    return {
      success: false,
      error: 'Failed to get response from Mistral AI'
    };
  }
} 