declare global {
  interface Window {
    currentSlide?: (n: number) => void;
    __navRefactor?: any;
    handleGoogleSuggestions?: (data: any) => void;
  }

  type ChatMessage = {
    role: 'user' | 'bot' | 'assistant' | 'system' | string;
    text: string;
    content?: string;
  };
}

export {};
