import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

describe("Footer Component", () => {
  it("renders the footer component", () => {
    render(<Footer />);

    expect(screen.getByText(/pdasya/i)).toBeInTheDocument();

    expect(screen.getByText(/2024/i)).toBeInTheDocument();
  });

  it("renders the GitHub link with correct href and image", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /pdasya/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/pdasya");

    const githubImage = screen.getByAltText(/github image/i);
    expect(githubImage).toBeInTheDocument();
    expect(githubImage).toHaveAttribute("src", "/github.png");
  });

  it("renders the YLab link with correct href and image", () => {
    render(<Footer />);

    const ylabLink = screen.getByRole("link", { name: /avito/i });
    expect(ylabLink).toBeInTheDocument();
    expect(ylabLink).toHaveAttribute("href", "https://start.avito.ru/tech");

    const ylabImage = screen.getByAltText(/avito image/i);
    expect(ylabImage).toBeInTheDocument();
    expect(ylabImage).toHaveAttribute("src", "/avito.png");
  });
});
