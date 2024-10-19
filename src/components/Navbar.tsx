import React from "react";
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="p-4 shadow-md w-full flex justify-center">
            <div className="container mx-auto flex justify-between items-center w-5/6">
                <div className="text-white text-2xl font-bold">
                    <Link href="/" className='text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1'>Home</Link>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/todos" className='text-xl shadow-md bg-blue-600 text-white hover:bg-blue-500 rounded-md px-3 py-1'>
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
