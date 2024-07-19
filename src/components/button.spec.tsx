import "@testing-library/jest-dom"
import { describe, expect, it, vi } from "vitest"
import { fireEvent, render } from "@testing-library/react"
import { Button } from "./button"

const buttonTestId = "button"

describe("Button", () => {
  it("should render properly", () => {
    const { getByTestId } = render(<Button>Test button</Button>)
    expect(getByTestId(buttonTestId)).toBeInTheDocument()
  })

  it("should render button text", () => {
    const { getByTestId } = render(<Button>Test button</Button>)
    expect(getByTestId(buttonTestId)).toHaveTextContent("Test button")
  })

  it("should be able to fire event", () => {
    const handleClick = vi.fn()

    const { getByTestId } = render(
      <Button onClick={handleClick}>Test button</Button>
    )

    fireEvent.click(getByTestId(buttonTestId))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("should be able to render primary style", () => {
    const { getByTestId } = render(
      <Button variant="primary">Test button</Button>
    )

    expect(getByTestId(buttonTestId)).toHaveClass(
      "bg-lime-300 text-lime-950 hover:bg-lime-400"
    )
  })

  it("should be able to render secondary style", () => {
    const { getByTestId } = render(
      <Button variant="secondary">Test button</Button>
    )

    expect(getByTestId(buttonTestId)).toHaveClass(
      "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
    )
  })
})
