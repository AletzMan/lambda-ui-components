import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Pagination } from "./Pagination";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LambdaConfigProvider lang="es" >
    {children}
  </LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
  return render(ui, { wrapper: Wrapper });
}

describe("Pagination", () => {
  test("renders correct number of page buttons", () => {
    renderWithProvider(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => { }} />
    );
    expect(screen.getByRole("button", { name: /Página 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Página 5/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Página/i }).length).toBe(5);
  });

  test("calls onPageChange with correct page when number button clicked", () => {
    const onPageChange = vi.fn();
    renderWithProvider(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByRole("button", { name: /Página 3/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test("navigation buttons call onPageChange with correct page", () => {
    const onPageChange = vi.fn();
    renderWithProvider(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
        showFirstLastButtons
        showPrevNextButtons
      />
    );
    fireEvent.click(screen.getByLabelText(/Go to first page/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText(/Go to previous page/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByLabelText(/Go to next page/i));
    expect(onPageChange).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByLabelText(/Go to last page/i));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  test("disables navigation buttons on first page", () => {
    renderWithProvider(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => { }}
        showFirstLastButtons
        showPrevNextButtons
      />
    );
    expect(screen.getByLabelText(/Go to first page/i)).toBeDisabled();
    expect(screen.getByLabelText(/Go to previous page/i)).toBeDisabled();
  });

  test("disables navigation buttons on last page", () => {
    renderWithProvider(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={() => { }}
        showFirstLastButtons
        showPrevNextButtons
      />
    );
    expect(screen.getByLabelText(/Go to last page/i)).toBeDisabled();
    expect(screen.getByLabelText(/Go to next page/i)).toBeDisabled();
  });

  test("does not call onPageChange when disabled", () => {
    const onPageChange = vi.fn();
    renderWithProvider(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} disabled />
    );
    fireEvent.click(screen.getByRole("button", { name: /Página 2/i }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test("renders ellipsis when there are many pages", () => {
    renderWithProvider(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => { }} maxVisiblePages={5} />
    );
    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
  });

  test("active page button has aria-current=page", () => {
    renderWithProvider(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => { }} />
    );
    const activeBtn = screen.getByRole("button", { name: /Página 3/i });
    expect(activeBtn).toHaveAttribute("aria-current", "page");
  });
});
