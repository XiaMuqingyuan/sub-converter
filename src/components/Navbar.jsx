/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */
import { APP_NAME, GITHUB_REPO, DOCS_URL } from '../constants.js';

export const Navbar = () => {
    return (
        <nav class="fixed top-0 z-50 w-full border-b border-white/60 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-300 dark:border-gray-800/80 dark:bg-gray-950/70">
            <div class="container mx-auto px-4">
                <div class="flex h-16 items-center justify-between">
                    <a href="#" class="flex items-center gap-3 text-xl font-black tracking-tight text-gray-950 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-300">
                        <span class="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-700 shadow-glow shadow-primary-500/20">
                            <img src="/favicon.ico" alt={`${APP_NAME} logo`} class="h-5 w-5" />
                        </span>
                        <span>{APP_NAME}</span>
                    </a>
                    <div class="flex items-center gap-2 sm:gap-3">
                        <a
                            href={DOCS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-white/80 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-primary-300 sm:flex"
                        >
                            <i class="fas fa-book"></i>
                            <span>Docs</span>
                        </a>
                        <a
                            href={GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-white/80 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-gray-800/80 dark:hover:text-primary-300"
                        >
                            <i class="fab fa-github"></i>
                            <span>GitHub</span>
                        </a>
                        <button
                            class="rounded-full border border-gray-200/80 bg-white/70 p-2 text-gray-500 shadow-sm transition-colors hover:border-primary-200 hover:text-primary-600 dark:border-gray-700/80 dark:bg-gray-900/70 dark:text-gray-400 dark:hover:border-primary-800 dark:hover:text-primary-300"
                            x-on:click="toggleDarkMode()"
                            aria-label="Toggle dark mode"
                        >
                            <i class="fas" x-bind:class="darkMode ? 'fa-sun' : 'fa-moon'"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
