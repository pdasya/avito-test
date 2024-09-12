import { render, screen } from "@testing-library/react";
import AdList from "./AdList";
import { describe, test, expect, vi } from "vitest";
import { Advertisment } from "@/types/types";

vi.mock("../AdItem/AdItem", () => ({
  default: (props: Advertisment) => <div>{props.name}</div>,
}));

const mockAds: Advertisment[] = [
  {
    id: "1",
    name: "Ad 1",
    description: "Description 1",
    price: 100,
    imageUrl: "https://example.com/ad1.jpg",
    createdAt: new Date().toISOString(),
    views: 10,
    likes: 5,
  },
  {
    id: "2",
    name: "Ad 2",
    description: "Description 2",
    price: 200,
    imageUrl: "https://example.com/ad2.jpg",
    createdAt: new Date().toISOString(),
    views: 20,
    likes: 10,
  },
];

describe("AdList component", () => {
  test("renders list of ads correctly", () => {
    render(<AdList ads={mockAds} />);

    expect(screen.getByText("Ad 1")).toBeInTheDocument();
    expect(screen.getByText("Ad 2")).toBeInTheDocument();
  });

  test("renders correct number of ads", () => {
    render(<AdList ads={mockAds} />);
    const items = screen.getAllByText(/Ad/i);
    expect(items.length).toBe(2);
  });

  test("renders empty state when there are no ads", () => {
    render(<AdList ads={[]} />);
    expect(screen.queryByText(/Ad/i)).not.toBeInTheDocument();
  });
});
