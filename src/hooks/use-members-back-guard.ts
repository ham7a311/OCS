"use client";

import { useEffect, useRef } from "react";

const MEMBERS_PATH = "/members";

/**
 * Keeps a signed-in visitor on `/members` when they use the browser Back
 * control. Without this, Back walks into `/signin`, `/`, or the Google
 * account chooser that OAuth left on the history stack.
 *
 * If they are editing a saved profile, the first Back cancels edit and
 * returns to the confirmation screen instead of leaving the page.
 */
export function useMembersBackGuard({
  enabled,
  editing,
  onCancelEdit,
}: {
  enabled: boolean;
  editing: boolean;
  onCancelEdit: () => void;
}) {
  const editingRef = useRef(editing);
  const cancelRef = useRef(onCancelEdit);
  editingRef.current = editing;
  cancelRef.current = onCancelEdit;

  useEffect(() => {
    if (!enabled) return;

    const url = MEMBERS_PATH;
    const state = { ocsMembers: true as const };

    window.history.replaceState(state, "", url);
    window.history.pushState(state, "", url);

    const onPop = () => {
      if (window.location.pathname !== MEMBERS_PATH) {
        window.history.pushState(state, "", url);
        return;
      }

      if (editingRef.current) {
        cancelRef.current();
      }

      window.history.pushState(state, "", url);
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [enabled]);
}
