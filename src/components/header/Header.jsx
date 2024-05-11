import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../elements/Logo";
import LogoutButton from "./LogoutButton";

function Header() {
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();

  const headerLabels = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Log In",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="py-3 shadow bg-gray-500">
        <Container>
          <nav className="flex">
            {/* putting logo on the header */}
            <div className="mr-4">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>

            {/* using map fn to display all the buttons in the header */}
            <ul className="flex ml-auto">
              {headerLabels.map((label) =>
                label.active ? (
                  <li key={label.name}>
                    <button
                      onClick={() => navigate(label.slug)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {label.name}
                    </button>
                  </li>
                ) : null
              )}
              {/* display logout button if the authStatus has a value meaning that the user is signed in */}

              {authStatus ? (
                <li>
                  <LogoutButton />
                </li>
              ) : null}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
