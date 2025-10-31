import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Alert } from "./Alert";
import { LambdaConfigProvider } from "../../_internal/hooks/translation/LambdaConfigProvider";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <LambdaConfigProvider lang="es" radiusBox="small" radiusField="tiny" radiusSelector="small">
    {children}
  </LambdaConfigProvider>
);

function renderWithProvider(ui: React.ReactElement) {
  return render(ui, { wrapper: Wrapper });
}

describe("Alert", () => {
  test("renders with title and message", () => {
    renderWithProvider(<Alert title="Info" message="Mensaje de alerta" color="info" />);
    expect(screen.getByText("Info")).toBeInTheDocument();
    expect(screen.getByText("Mensaje de alerta")).toBeInTheDocument();
  });

  test("renders default icon for color", () => {
    renderWithProvider(<Alert title="Éxito" message="Todo bien" color="success" />);
    // Busca el icono por su rol de presentación o por clase
    expect(screen.getByTestId("lucide-check-circle")).toBeInTheDocument();
  });

  test("renders custom icon when provided", () => {
    const CustomIcon = <span data-testid="custom-icon">★</span>;
    renderWithProvider(
      <Alert title="Custom" message="Con icono" color="neutral" customIcon={CustomIcon} />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    renderWithProvider(
      <Alert title="Cerrable" message="Cerrar esto" color="danger" onClose={handleClose} />
    );
    const closeBtn = screen.getByRole("button", { name: /cerrar alerta/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  test("applies custom className and style", () => {
    renderWithProvider(
      <Alert
        title="Clase"
        message="Estilo"
        color="info"
        className="my-alert"
        style={{ backgroundColor: "red" }}
      />
    );
    const alertDiv = screen.getByRole("status");
    expect(alertDiv).toHaveClass("my-alert");
    expect(alertDiv).toHaveStyle({ backgroundColor: "red" });
  });
});
