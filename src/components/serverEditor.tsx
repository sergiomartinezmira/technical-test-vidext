"use client";
import dynamic from "next/dynamic";
import { LoadingComponent } from "./loading";

const Editor = dynamic(() => import("components/editor"), {
  ssr: false,
  loading: () => <LoadingComponent spinnerOnly />,
});

export default function EditorWrapper() {
  return <Editor />;
}
