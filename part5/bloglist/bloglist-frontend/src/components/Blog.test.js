import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "./Blog"

let user; let blog

beforeEach(() => {
    user = {
        id: "1234",
        username: "shiftleino",
        name: "Shiftleino"
    }
    blog = {
        title: "Hello World Test",
        author: "shiftleino",
        url: "http://localhost",
        likes: 1000,
        user: user
    }
})

test("render no url and likes", () => {
    const component = render(<Blog blog={blog} user={user} />)

    expect(component.container).toHaveTextContent(
        "Hello World Test shiftleino"
    )
    expect(component.container).not.toHaveTextContent(
        "http://localhost"
    )
    expect(component.container).not.toHaveTextContent("1000")
})

test("render url and likes when view clicked", () => {
    const component = render(
        <Blog blog={blog} user={user} />
    )
    const button = component.getByText("view")
    fireEvent.click(button)

    expect(component.container).toHaveTextContent("http://localhost")
    expect(component.container).toHaveTextContent("1000")
})