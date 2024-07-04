declare module 'aos' {
    interface AosOptions {
      // Define the available options for the AOS library
      offset?: number;
      delay?: number;
      duration?: number;
      easing?: string;
      once?: boolean;
      mirror?: boolean;
      anchorPlacement?: string;
    }
  
    function init(options?: AosOptions): void;
    function refresh(): void;
    function refreshHard(): void;
    function activate(): void;
    function remove(): void;
  }