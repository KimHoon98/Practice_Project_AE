import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, test, expect } from "vitest";
import { ToolCallBadge } from "../ToolCallBadge";

afterEach(() => cleanup());

function makeInvocation(
  toolName: string,
  args: Record<string, unknown>,
  state: "call" | "result",
  result?: unknown
) {
  return { toolName, args, state, result };
}

test("str_replace_editor create pending shows Creating label and spinner", () => {
  render(
    <ToolCallBadge
      toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "/App.jsx" }, "call")}
    />
  );
  expect(screen.getByText("Creating /App.jsx")).toBeTruthy();
  expect(document.querySelector(".animate-spin")).toBeTruthy();
});

test("str_replace_editor create done shows Creating label and green dot", () => {
  const { container } = render(
    <ToolCallBadge
      toolInvocation={makeInvocation("str_replace_editor", { command: "create", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Creating /App.jsx")).toBeTruthy();
  expect(container.querySelector(".bg-emerald-500")).toBeTruthy();
  expect(document.querySelector(".animate-spin")).toBeNull();
});

test("str_replace_editor str_replace shows Editing label", () => {
  render(
    <ToolCallBadge
      toolInvocation={makeInvocation("str_replace_editor", { command: "str_replace", path: "/components/Card.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Editing /components/Card.jsx")).toBeTruthy();
});

test("str_replace_editor insert shows Editing label", () => {
  render(
    <ToolCallBadge
      toolInvocation={makeInvocation("str_replace_editor", { command: "insert", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Editing /App.jsx")).toBeTruthy();
});

test("str_replace_editor view shows Reading label", () => {
  render(
    <ToolCallBadge
      toolInvocation={makeInvocation("str_replace_editor", { command: "view", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Reading /App.jsx")).toBeTruthy();
});

test("str_replace_editor undo_edit shows Undoing edit label", () => {
  render(
    <ToolCallBadge
      toolInvocation={makeInvocation("str_replace_editor", { command: "undo_edit" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Undoing edit")).toBeTruthy();
});

test("file_manager rename shows Renaming label", () => {
  render(
    <ToolCallBadge
      toolInvocation={makeInvocation("file_manager", { command: "rename", path: "/old.jsx", new_path: "/new.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Renaming /old.jsx")).toBeTruthy();
});

test("file_manager delete shows Deleting label", () => {
  render(
    <ToolCallBadge
      toolInvocation={makeInvocation("file_manager", { command: "delete", path: "/App.jsx" }, "result", "ok")}
    />
  );
  expect(screen.getByText("Deleting /App.jsx")).toBeTruthy();
});

test("unknown tool falls back to raw tool name", () => {
  render(
    <ToolCallBadge
      toolInvocation={makeInvocation("some_other_tool", { command: "run" }, "result", "ok")}
    />
  );
  expect(screen.getByText("some_other_tool")).toBeTruthy();
});
