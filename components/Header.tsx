import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold">
          Event Management
        </Link>
        <nav className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/admin/login">Admin</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;  
