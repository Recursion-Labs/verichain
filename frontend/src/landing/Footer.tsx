import { Github, Twitter, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#02FDA9] to-[#26D98E] flex items-center justify-center shadow-lg shadow-[#02FDA9]/30">
              <span className="text-[#0C0F0A] font-bold text-lg">V</span>
            </div>
            <div>
              <span className="text-xl tracking-tight">VeriChain</span>
              <div className="text-xs text-[#02FDA9] -mt-1">Midnight Network</div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              Privacy-proven authenticity for the modern supply chain
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-gray-400 hover:text-[#02FDA9] hover:bg-white/5 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-gray-400 hover:text-[#02FDA9] hover:bg-white/5 transition-all"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-gray-400 hover:text-[#02FDA9] hover:bg-white/5 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">
            © 2025 VeriChain. Built on Midnight Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
