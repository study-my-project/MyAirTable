import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">My Project</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/about" className="hover:underline">About</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;