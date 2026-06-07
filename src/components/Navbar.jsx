/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */
import { APP_NAME, GITHUB_REPO, DOCS_URL } from '../constants.js';

export const Navbar = () => {
    return (
        <nav class="fixed top-3 z-50 w-full px-3">
            <div class="container mx-auto px-4">
                <div class="glass-panel flex h-14 items-center justify-between rounded-full px-3 shadow-glass md:px-5">
                    <a href="#" class="flex items-center gap-3 text-xl font-black tracking-tight text-gray-950 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-300">
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
                            class="interactive-soft hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-white/70 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-primary-300 sm:flex"
                        >
                            <i class="fas fa-book"></i>
                            <span>Docs</span>
                        </a>
                        <a
                            href={GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="interactive-soft flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-white/70 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-primary-300"
                        >
                            <i class="fab fa-github"></i>
                            <span>GitHub</span>
                        </a>
                        <button
                            class="interactive-soft rounded-full border border-white/70 bg-white/55 p-2 text-gray-500 shadow-sm hover:border-primary-200 hover:bg-white/85 hover:text-primary-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-300 dark:hover:border-primary-500/30 dark:hover:text-primary-300"
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
