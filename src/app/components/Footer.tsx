import { Link, useNavigate } from 'react-router';
import { useStore } from '../store/useStore';

const footerSections = [
  {
    title: 'Buy',
    links: [
      { label: 'Registration', path: '/signup' },
      { label: 'Buyer Protection', path: '#' },
      { label: 'Bidding & buying help', path: '/search' },
      { label: 'All categories', path: '/search' },
    ],
  },
  {
    title: 'Sell',
    links: [
      { label: 'Start selling', path: '/sell' },
      { label: 'How to sell', path: '/sell' },
      { label: 'Business sellers', path: '/sell' },
      { label: 'Seller tools', path: '/sell' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Electronics', path: '/search?q=Electronics' },
      { label: 'Fashion', path: '/search?q=Fashion' },
      { label: 'Watches', path: '/search?q=Watches' },
      { label: 'Daily Deals', path: '/search' },
    ],
  },
  {
    title: 'About SHILOH',
    links: [
      { label: 'Company info', path: '#' },
      { label: 'News', path: '#' },
      { label: 'Careers', path: '#' },
      { label: 'Policies', path: '#' },
    ],
  },
  {
    title: 'Help & Contact',
    links: [
      { label: 'Seller Center', path: '/sell' },
      { label: 'Contact Us', path: '#' },
      { label: 'Returns', path: '#' },
      { label: 'Site Map', path: '/search' },
    ],
  },
];

const bottomLinks = ['Accessibility', 'User Agreement', 'Privacy', 'Cookies', 'Your Ad Choices'];

export function Footer() {
  const navigate = useNavigate();
  const { setSearchQuery } = useStore();

  const handleNav = (path: string, q?: string) => {
    if (q) setSearchQuery(q);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.path, link.path.includes('?q=') ? new URLSearchParams(link.path.split('?')[1]).get('q') ?? '' : undefined)}
                      className="text-gray-500 hover:text-blue-600 text-xs transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">SHILOH</Link>
              <span className="text-xs text-gray-400">The precision marketplace</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>🌐</span>
              <button className="hover:text-blue-600">United States</button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs text-gray-400">© 2024 SHILOH Inc. All Rights Reserved.</p>
            {bottomLinks.map((link) => (
              <button key={link} className="text-xs text-gray-400 hover:text-blue-600 transition-colors">
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
