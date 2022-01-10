import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test("render no url and likes", () => {
    const user = {
        id: "1234",
        username: "shiftleino",
        name: "Shiftleino"
    }
    const blog = {
        title: "Hello World Test",
        author: "shiftleino",
        url: "http://localhost",
        likes: 1000,
        user: user
    }

    const component = render(<Blog blog={blog} user={user} />)

    expect(component.container).toHaveTextContent(
        "Hello World Test shiftleino"
    )
    expect(component.container).not.toHaveTextContent(
        "http://localhost"
    )
    expect(component.container).not.toHaveTextContent("1000")
})