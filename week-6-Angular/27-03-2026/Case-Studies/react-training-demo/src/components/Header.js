import React from 'react';

function Header({ title, subtitle }) {
    return (
        <header style={{
            backgroundColor: '#282c34', // ✅ FIXED
            color: 'white',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </header>
    );
}

export default Header;