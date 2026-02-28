import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-center mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex justify-center space-x-6 space-x-reverse mb-4">
                <a href="https://www.facebook.com/share/1CXGzpAaMK/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://www.instagram.com/nadir.infograph?igsh=ZmJsZGhheXB0emli" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors">
                     <span className="sr-only">Instagram</span>
                     <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.465c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.75-9.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://www.tiktok.com/nadirinfograph2" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-500 transition-colors">
                    <span className="sr-only">TikTok</span>
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.98-1.59-2.04-1.6-5.04-.04-7.17.98-1.32 2.63-2.12 4.16-2.21.08-1.54.02-3.08.01-4.63h4.05v1.8c.11.02.22.01.33.01.62.01 1.23.01 1.85-.02-1.12-1.02-2.25-2.02-3.37-3.03Z"/></svg>
                </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Nadir Infograph ©</p>
        </footer>
    );
};

export default Footer;