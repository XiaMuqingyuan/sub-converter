/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */
import { APP_NAME, GITHUB_REPO, DOCS_URL } from '../constants.js';

export const Navbar = () => {
    return (
        <nav class="fixed top-5 z-50 w-full px-4">
            <div class="container mx-auto flex justify-center px-4 md:justify-end">
                <div class="glass-panel flex h-14 items-center justify-end gap-5 rounded-full px-3 shadow-soft">
                    <a
                        href="#"
                        class="hidden items-center gap-2 text-base font-semibold text-gray-800 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-300 md:flex"
                    >
                        <span class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-300 to-primary-700 shadow-glow shadow-primary-500/20 transition-transform duration-300 hover:scale-105">
                            <img src="/favicon.ico" alt={`${APP_NAME} logo`} class="h-5 w-5" />
                        </span>
                        <span>{APP_NAME}</span>
                    </a>
                    <div class="flex items-center gap-2 sm:gap-3">
                        <a
                            href={DOCS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="rounded-full px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-white dark:hover:bg-white/10 dark:hover:text-primary-300 sm:text-base"
                        >
                            API文档
                        </a>
                        <a
                            href={GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="interactive-soft hidden h-10 w-10 items-center justify-center rounded-full bg-gray-900/5 text-xl text-gray-700 hover:bg-gray-900/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:flex"
                        >
                            <i class="fab fa-github" />
                        </a>
                        <button
                            class="interactive-soft flex h-10 w-10 items-center justify-center rounded-full bg-gray-900/5 text-xl text-gray-700 hover:bg-gray-900/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
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