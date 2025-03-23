
export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-end space-x-4">
                <li className="text-white hover:text-gray-400"><a href="/">Home</a></li>
                <li className="text-white hover:text-gray-400"><a href="/mycodes">My Codes</a></li>
            </ul>
        </nav>
    );
}