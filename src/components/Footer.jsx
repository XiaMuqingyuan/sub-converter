/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */
import { APP_NAME, GITHUB_REPO, DOCS_URL, APP_VERSION } from '../constants.js';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer class="mt-12 border-t border-gray-200 bg-white/50 py-8 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
            <div class="container mx-auto px-4">
                <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div class="flex flex-col items-center gap-2 text-center text-gray-600 dark:text-gray-400 md:flex-row md:text-left">
                        <span class="text-sm">&copy; {currentYear} {APP_NAME}. All rights reserved.</span>
                        <span class="hidden text-gray-300 dark:text-gray-700 md:inline">|</span>
                        <a
                            href={`${GITHUB_REPO}/releases/tag/v${APP_VERSION}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-500 transition-colors hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                            title={`View release notes for v${APP_VERSION}`}
                        >
                            v{APP_VERSION}
                        </a>
                    </div>
                    <div class="flex items-center gap-6">
                        <a
                            href={DOCS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            aria-label="Documentation"
                        >
                            <i class="fas fa-book text-lg" />
                        </a>
                        <a
                            href={GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            aria-label="GitHub"
                        >
                            <i class="fab fa-github text-lg" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};