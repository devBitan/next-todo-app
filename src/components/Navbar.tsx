import React from "react";
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <Link href="/">Home</Link>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/todos" className="text-white hover:text-blue-200">
                                Admin task
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
