/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */
import { APP_NAME, GITHUB_REPO, DOCS_URL } from '../constants.js';

export const Navbar = () => {
    return (
        <nav class="fixed top-5 z-50 w-full px-4">
            <div class="container mx-auto flex justify-end px-4">
                <div class="flex h-12 items-center justify-end gap-5">
                    <a href="#" class="hidden items-center gap-2 text-base font-semibold text-gray-800 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-300 md:flex">
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
                            class="text-lg font-semibold text-gray-800 hover:text-primary-600 dark:text-white dark:hover:text-primary-300"
                        >
                            <span>API文档</span>
                        </a>
                        <a
                            href={GITHUB_REPO}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="interactive-soft hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-gray-700 hover:bg-white/20 dark:text-white sm:flex"
                        >
                            <i class="fab fa-github"></i>
                        </a>
                        <button
                            class="interactive-soft flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-gray-700 hover:bg-white/20 dark:text-white"
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
