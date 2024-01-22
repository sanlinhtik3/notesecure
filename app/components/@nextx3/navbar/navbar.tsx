"use client"

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu } from "@nextui-org/react";
import Link from "next/link";
import { User } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import EditUser from "../../EditUser";
import { EditProfile } from "@/app/demo/edit-profile";

export default function Navbarv({ _id, email, name, asset }: any) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    console.log(asset)

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/note">
                        Note
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/about-us">
                        About Us
                    </Link>
                </NavbarItem>
                {asset === "2" && (
                    <NavbarItem isActive>
                        <Link href="/admin" aria-current="page">
                            Admin
                        </Link>
                    </NavbarItem>
                )}

            </NavbarContent>
            <NavbarContent justify="end">
                <User
                    name={name}
                    description={(
                        <Link href="https://twitter.com/jrgarciadev">
                            {email}
                        </Link>
                    )}
                    avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                    }}
                />
                <EditProfile _id={_id} />
                {!_id && (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="#">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} href="#" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}

            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}