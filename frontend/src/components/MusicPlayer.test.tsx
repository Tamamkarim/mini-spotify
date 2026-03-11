import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MusicPlayer from "./MusicPlayer";

beforeAll(() => {
  // Mock play/pause to avoid jsdom errors
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

describe("MusicPlayer", () => {
  it("renders play button and audio element", () => {
    const { getByText, container } = render(<MusicPlayer url="test.mp3" />);
    expect(getByText("Play")).toBeInTheDocument();
    // Check for audio element
    expect(container.querySelector("audio")).toBeTruthy();
  });

  it("toggles play/pause text", () => {
    const { getByText } = render(<MusicPlayer url="test.mp3" />);
    const playBtn = getByText("Play");
    fireEvent.click(playBtn);
    // After click, should show Pause
    expect(getByText("Pause")).toBeInTheDocument();
  });
});
