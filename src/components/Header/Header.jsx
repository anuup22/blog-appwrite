import React from "react";
import { Container, Logo, LogoutBtn} from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        }, 
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "Add Posts",
            slug: "/add-post",
            active: authStatus
        } 
    ]

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex items-center ml-auto">
                        {navItems.map((item) => (
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full"
                                    >{item.name}</button>
                                </li>
                            ) : null
                        ))}
                        {authStatus ? (
                            <li>
                                <LogoutBtn />
                            </li>
                        ) : null}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}