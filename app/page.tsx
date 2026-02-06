import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg" />
              <span className="text-xl font-bold text-white">FeedbackBox</span>
            </div>
            <Link 
              href="/dashboard"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Collect User Feedback
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              In Seconds
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Drop-in widget for your website. Beautiful, simple, and gets you the insights you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-green-500/50 transition-all transform hover:scale-105"
            >
              Start Free
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-lg backdrop-blur-sm border border-white/20 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-gray-400">Your widget preview appears here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-400">Simple, powerful, and beautiful</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast Setup</h3>
            <p className="text-gray-400">Copy one line of code. Paste it in your site. Done in 30 seconds.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Beautiful Design</h3>
            <p className="text-gray-400">Modern glass morphism UI that blends perfectly with any website.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Organized Feedback</h3>
            <p className="text-gray-400">Filter by bugs, features, or praise. Export to CSV with one click.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Start free, upgrade when you need more</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="text-5xl font-bold text-white mb-2">$0</div>
              <p className="text-gray-400">Perfect for trying it out</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">1 project</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Up to 50 feedback entries</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">Basic filtering</span>
              </li>
            </ul>
            <Link
              href="/dashboard"
              className="block w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-center border border-white/20 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl border-2 border-green-500/50 p-8 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold rounded-full">
              POPULAR
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="text-5xl font-bold text-white mb-2">$9</div>
              <p className="text-gray-300">per month</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200 font-medium">Unlimited projects</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200 font-medium">Unlimited feedback</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200 font-medium">Advanced filtering</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200 font-medium">CSV export</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200 font-medium">Priority support</span>
              </li>
            </ul>
            <Link
              href="/dashboard"
              className="block w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold text-center shadow-lg shadow-green-500/50 transition-all"
            >
              Start Pro Trial
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md rounded-3xl border border-green-500/30 p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Listen to Your Users?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of products collecting better feedback with FeedbackBox
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold text-lg shadow-lg shadow-green-500/50 transition-all transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-400">
            <p>&copy; 2026 FeedbackBox. Built with ❤️ for better products.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
