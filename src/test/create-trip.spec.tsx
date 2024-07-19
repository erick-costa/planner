import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CreateTripPage } from "../pages/create-trip"
import { BrowserRouter } from "react-router-dom"

describe("Create trip page", () => {
  it("should render properly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <CreateTripPage />
      </BrowserRouter>
    )

    expect(
      getByText("Convide seus amigos e planeje sua próxima viagem!")
    ).toBeInTheDocument()
    expect(getByText("Continuar")).toBeInTheDocument()
  })

  it("should render input element", () => {
    const { getByPlaceholderText } = render(
      <BrowserRouter>
        <CreateTripPage />
      </BrowserRouter>
    )

    expect(getByPlaceholderText("Para onde você vai?")).toBeInTheDocument()
  })

  it("should be able to type in input", () => {
    render(
      <BrowserRouter>
        <CreateTripPage />
      </BrowserRouter>
    )

    const input = screen.getByPlaceholderText("Para onde você vai?")
    fireEvent.change(input, { target: { value: "Lugar teste" } })

    expect(input.value).toBe("Lugar teste")
  })
})
