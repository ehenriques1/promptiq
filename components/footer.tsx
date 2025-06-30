export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Built with <span className="font-semibold">PromptIQ Framework</span>
          </p>

          <div className="flex justify-center space-x-6 text-sm">
            <a href="/privacy" className="text-gray-500 hover:text-gray-700 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-gray-500 hover:text-gray-700 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
