/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */
import { APP_NAME, GITHUB_REPO, DOCS_URL } from '../constants.js';

export const Navbar = () => {
    return (
        <nav class="fixed top-5 z-50 w-full px-4">
            <div class="container mx-auto flex justify-center px-4 md:justify-end">
                <div class="glass-panel flex h-14 items-center justify-end gap-5 rounded-2xl px-3 shadow-glow shadow-primary-500/5">
                    <a
                        href="#"
                        class="hidden items-center gap-2.5 text-base font-semibold text-gray-800 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-300 md:flex"
                    >
                        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/20 transition-transform duration-300 hover:scale-105 hover:shadow-primary-500/30">
                            <img src="/favicon.ico" alt={`${APP_NAME} logo`} class="h-5 w-5" />
                        </span>
                        <span>{APP_NAME}</span>
                    </a>
                    <div class="flex items-center gap-1.5 sm:gap-2.5">
                        <a
                            href={DOCS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rounded-xl px-3.5 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 active:scale-95 dark:text-gray-300 dark:hover:bg-white/[0.07] dark:hover:text-primary-300 sm:text-base"
                        >
                            API文档
                        </a>
                        <a
                            href={GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="interactive-soft hidden h-10 w-10 items-center justify-center rounded-xl bg-gray-900/[0.04] text-lg text-gray-600 hover:bg-gray-900/10 hover:text-gray-800 dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/[0.12] dark:hover:text-white sm:flex"
                            aria-label="View on GitHub"
                        >
                            <i class="fab fa-github" />
                        </a>
                        <button
                            class="interactive-soft flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900/[0.04] text-lg text-gray-600 hover:bg-gray-900/10 hover:text-gray-800 dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/[0.12] dark:hover:text-white"
                            x-on:click="toggleDarkMode()"
                            aria-label="Toggle dark mode"
                        >
                            <i class="fas" x-bind:class="darkMode ? 'fa-sun' : 'fa-moon'" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};