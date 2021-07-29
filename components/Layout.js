import React from 'react'
import Header from './Header'
import { Container } from 'semantic-ui-react'

export default function Layout({ children }) {
    return (
        <Container>
            <Header />
                { children }
        </Container>
    )
}
