import React from 'react'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    function logout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand ms-3" href="/home">VU ROOMS</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon" ><i class="fa-solid fa-bars" style={{color: 'white'}}></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        {user ? (
                            <>
                                <div class="dropdown me-3">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-user"></i> {user.name}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                        <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                                        
                                    </ul>
                                </div>

                            </>
                        ) : (
                            <>
                                <li class="nav-item">
                                    <a class="nav-link" href="/register">Register</a>
                                </li>
                                <li class="nav-item me-3">
                                    <a class="nav-link" href="/login">Login</a>
                                </li>
                            </>)}

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar