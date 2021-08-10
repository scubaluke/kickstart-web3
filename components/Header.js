import React from 'react'
import  { Link } from '../routes'
import { Menu } from 'semantic-ui-react'


export default function Header() {
    return (
        <Menu style={{ marginTop: '10px' }} >
            <Link route='/' ><a className='item' href="/">Crowd Coin</a></Link>

            <Menu.Menu position='right'>
                <Link route='/'><a className='item' href="/">Campaigns</a></Link>
                <Link route='/campaigns/new' ><a className='item' href="/campaigns/new">+</a></Link>
            </Menu.Menu>
            
        </Menu>
    )
}
