import { useEffect } from "react";

interface KeyboardShortcutsConfig {
  onToggleCommandMenu: () => void;
  onToggleStudio: () => void;
  onCloseAllModals: () => boolean; // Returns true if a modal was closed
  isAnyModalOpen?: boolean;
}

export function useGlobalKeyboardShortcuts({
  onToggleCommandMenu,
  onToggleStudio,
  onCloseAllModals,
}: KeyboardShortcutsConfig) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable ||
          target.getAttribute("role") === "textbox");

      // 1. Cmd+K (Mac) or Ctrl+K (Windows/Linux) -> Toggle Command Menu
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        onToggleCommandMenu();
        return;
      }

      // 2. Escape key -> Close modals
      if (e.key === "Escape") {
        const closedSomething = onCloseAllModals();
        if (closedSomething) {
          e.preventDefault();
        }
        return;
      }

      // If user is currently typing in an input field or textarea, do not trigger single-key navigation shortcuts
      if (isTyping) {
        return;
      }

      // 3. 'S' or 's' key -> Toggle / Open Studio
      if (e.key === "s" || e.key === "S") {
        // Prevent triggering if combined with Ctrl/Meta/Alt
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          onToggleStudio();
          return;
        }
      }

      // 4. '?' key -> Open Command Menu
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        onToggleCommandMenu();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onToggleCommandMenu, onToggleStudio, onCloseAllModals]);
}
