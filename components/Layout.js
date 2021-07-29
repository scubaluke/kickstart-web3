import React from 'react'

export default function Layout({ children }) {
    return (
        <div>
            <h1>Header</h1>
                {children}
            <h1>Footer</h1>
        </div>
    )
}
