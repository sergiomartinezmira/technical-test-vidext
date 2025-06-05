"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { throttle } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useTRPC } from "server/trpc/client";
import { Tldraw, createTLStore, getSnapshot, loadSnapshot } from "tldraw";
import "tldraw/tldraw.css";
import { LoadingComponent } from "./loading";
import { ErrorAlert } from "./alerts/error";

export default function Editor() {
  const trpc = useTRPC();

  const { data, status, error } = useQuery(trpc.getSnapshot.queryOptions());
  const setSnapshot = useMutation(trpc.setSnapshot.mutationOptions());

  const store = useMemo(() => createTLStore(), []);

  const [showError, setShowError] = useState(false);

  const showAlerts = () => {
    setShowError(true);
    throttle(() => {
      setShowError(false);
    }, 3000);
  };

  useEffect(() => {
    try {
      if (data?.snapshot) {
        loadSnapshot(store, JSON.parse(data.snapshot));
      }

      if (error) {
        showAlerts();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw Error(error);
    }
  }, [data, store, error]);

  useEffect(() => {
    const updateUserSnapshot = async () => {
      try {
        const newSnapshot = getSnapshot(store);
        setSnapshot.mutateAsync(newSnapshot);
        if (setSnapshot.error) {
          showAlerts();
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw Error(error);
      }
    };

    const cleanupFn = store.listen(
      throttle(() => {
        updateUserSnapshot();
      }, 500)
    );

    return () => {
      cleanupFn();
    };
  }, [store, setSnapshot]);

  return (
    <>
      {status === "success" && <LoadingComponent />}
      <div style={{ position: "fixed", inset: 0 }}>
        {showError && (error || setSnapshot.error) && (
          <ErrorAlert
            error={error?.message || setSnapshot.error?.message || ""}
          />
        )}
        {(status === "success" || status === "error") && (
          <Tldraw
            store={store}
            acceptedImageMimeTypes={["image/jpeg", "image/png"]}
            acceptedVideoMimeTypes={[]}
            maxAssetSize={1 * 1024 * 1024} // 1MB
          />
        )}
      </div>
    </>
  );
}
