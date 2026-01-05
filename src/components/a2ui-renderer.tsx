"use client";

import React from "react";

// A2UI JSON types
type A2UIComponent = {
  type: string;
  text?: string;
  variant?: string;
  label?: string;
  url?: string;
  alt?: string;
  children?: A2UIComponent[];
  onPress?: string;
};

// Simple A2UI to React renderer
export function A2UIRenderer({ widget }: { widget: A2UIComponent }) {
  const renderComponent = (comp: A2UIComponent, key: number = 0): React.ReactNode => {
    switch (comp.type) {
      case "card":
        return (
          <div key={key} className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-w-md">
            {comp.children?.map((child, i) => renderComponent(child, i))}
          </div>
        );

      case "row":
        return (
          <div key={key} className="flex gap-4 p-4 justify-center">
            {comp.children?.map((child, i) => renderComponent(child, i))}
          </div>
        );

      case "column":
        return (
          <div key={key} className="flex flex-col items-center text-center">
            {comp.children?.map((child, i) => renderComponent(child, i))}
          </div>
        );

      case "text":
        const textVariants: Record<string, string> = {
          h1: "text-2xl font-bold text-gray-900 p-4 pb-2",
          h2: "text-xl font-semibold text-gray-800 px-4 py-1",
          h3: "text-lg font-medium text-gray-700 px-4 py-1",
          body: "text-sm text-gray-600 px-4 py-1",
          caption: "text-xs text-gray-500 px-4 py-1",
        };
        return (
          <p key={key} className={textVariants[comp.variant || "body"]}>
            {comp.text}
          </p>
        );

      case "image":
        return (
          <img
            key={key}
            src={comp.url}
            alt={comp.alt || ""}
            className="w-full h-40 object-cover"
          />
        );

      case "button":
        const buttonVariants: Record<string, string> = {
          primary: "bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors",
          secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors",
        };
        return (
          <button
            key={key}
            className={buttonVariants[comp.variant || "primary"]}
          >
            {comp.label}
          </button>
        );

      case "divider":
        return <hr key={key} className="border-gray-200 mx-4 my-2" />;

      default:
        return <div key={key}>{JSON.stringify(comp)}</div>;
    }
  };

  return <div className="a2ui-widget">{renderComponent(widget)}</div>;
}

export function A2UILoading({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-400 mb-4">{title}</h3>
      <div className="flex items-center justify-center h-32">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Rendering A2UI widget...</p>
        </div>
      </div>
    </div>
  );
}
