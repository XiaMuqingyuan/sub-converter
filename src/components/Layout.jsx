import { html } from 'hono/html'
import { APP_KEYWORDS } from '../constants.js';

export const Layout = (props) => {
  const { title, children } = props
  return html`
    <!DOCTYPE html>
    <html lang="en" x-data="appData()">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <meta name="description" content="Convert and optimize your subscription links easily" />
        <meta name="keywords" content="${APP_KEYWORDS}" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.10/dist/cdn.min.js" onerror="window.__alpineFailed=true"></script>
        <script>
          window.__alpineLoaded = false;
          document.addEventListener('alpine:init', () => { window.__alpineLoaded = true; });
          window.addEventListener('DOMContentLoaded', () => {
            if (window.__alpineFailed || !window.__alpineLoaded) {
              console.error('Alpine.js initialization failed. Interactive features are disabled.');
              const warning = document.createElement('div');
              warning.className = 'fixed bottom-4 right-4 z-50 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg shadow-lg text-sm';
              warning.textContent = 'Alpine.js 加载失败，页面交互功能不可用，请刷新或检查网络。';
              document.body.appendChild(warning);
            }
          });
        </script>
        <script>
          tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                boxShadow: {
                  soft: '0 20px 60px -32px rgba(15, 23, 42, 0.22)',
                  glow: '0 28px 90px -42px rgba(10, 163, 235, 0.55)',
                },
                colors: {
                  primary: {
                    50: '#eef9ff',
                    100: '#dcf2ff',
                    200: '#b2e6ff',
                    300: '#6ed4ff',
                    400: '#33c5ff',
                    500: '#0aa3eb',
                    600: '#0082ca',
                    700: '#0068a3',
                    800: '#005887',
                    900: '#06496f',
                    950: '#042f4a',
                  },
                  gray: {
                    850: '#1f2937',
                    900: '#111827',
                    950: '#0b0f19',
                  }
                },
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                }
              }
            }
          }
        </script>
        <style>
          html { scroll-behavior: smooth; }

          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            position: relative;
            min-height: 100vh;
            overflow-x: hidden;
          }

          /* Ambient gradient background */
          body::before {
            content: '';
            position: fixed;
            inset: 0;
            z-index: -2;
            background:
              radial-gradient(circle at 18% 8%, rgba(34, 155, 198, 0.16), transparent 28rem),
              radial-gradient(circle at 82% 0%, rgba(8, 173, 114, 0.14), transparent 30rem),
              linear-gradient(180deg, #f8fafc 0%, #f5f5f7 46%, #eef6f4 100%);
            pointer-events: none;
          }

          .dark body::before,
          html.dark body::before {
            background:
              radial-gradient(circle at 18% 8%, rgba(34, 155, 198, 0.18), transparent 28rem),
              radial-gradient(circle at 82% 0%, rgba(8, 173, 114, 0.14), transparent 30rem),
              linear-gradient(180deg, #121826 0%, #171717 52%, #0f1f1c 100%);
          }

          /* Subtle grid overlay */
          body::after {
            content: '';
            position: fixed;
            inset: 0;
            z-index: -1;
            background-image:
              linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 70%);
            pointer-events: none;
          }

          .dark body::after,
          html.dark body::after {
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          }

          .glass-panel {
            border: 1px solid rgba(255, 255, 255, 0.68);
            background: rgba(255, 255, 255, 0.82);
            box-shadow: 0 24px 70px -42px rgba(15, 23, 42, 0.32);
            backdrop-filter: blur(18px);
          }

          .dark .glass-panel,
          html.dark .glass-panel {
            border-color: rgba(255, 255, 255, 0.12);
            background: rgba(48, 48, 48, 0.78);
          }

          .interactive-soft {
            transition: transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms ease, background 220ms ease, color 220ms ease, border-color 220ms ease;
          }

          .interactive-soft:hover {
            transform: translateY(-1px);
          }

          .fade-up {
            animation: fade-up 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }

          @keyframes fade-up {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
              transition-duration: 0.01ms !important;
            }
          }

          [x-cloak] { display: none !important; }
        </style>
        <script>
          // Dark mode controller
          function appData() {
            return {
              darkMode: localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches),
              toggleDarkMode() {
                this.darkMode = !this.darkMode;
                localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', this.darkMode);
              },
              init() {
                if (this.darkMode) document.documentElement.classList.add('dark');
              }
            }
          }

          // Version update checker
          function updateChecker(currentVersion, apiUrl) {
            return {
              currentVersion,
              latestVersion: '',
              showUpdateToast: false,
              i18n: {
                newVersionAvailable: getUpdateI18n('newVersionAvailable'),
                currentVersion: getUpdateI18n('currentVersion'),
                viewRelease: getUpdateI18n('viewRelease'),
                updateGuide: getUpdateI18n('updateGuide'),
                later: getUpdateI18n('later')
              },
              init() {
                setTimeout(() => this.checkForUpdates(), 3000);
              },
              async checkForUpdates() {
                try {
                  const dismissedVersion = localStorage.getItem('sublink_dismissed_version');
                  const lastCheck = localStorage.getItem('sublink_last_version_check');
                  const now = Date.now();

                  // Rate limit: once per hour
                  if (lastCheck && (now - parseInt(lastCheck)) < 3600000) {
                    const cached = localStorage.getItem('sublink_latest_version');
                    if (cached && cached !== dismissedVersion && this.compareVersions(cached, this.currentVersion) > 0) {
                      this.latestVersion = cached;
                      this.showUpdateToast = true;
                    }
                    return;
                  }

                  const res = await fetch(apiUrl, {
                    headers: { 'Accept': 'application/vnd.github.v3+json' }
                  });
                  if (!res.ok) return;

                  const data = await res.json();
                  const latest = (data.tag_name || '').replace(/^v/, '');

                  localStorage.setItem('sublink_latest_version', latest);
                  localStorage.setItem('sublink_last_version_check', now.toString());

                  if (latest && latest !== dismissedVersion && this.compareVersions(latest, this.currentVersion) > 0) {
                    this.latestVersion = latest;
                    this.showUpdateToast = true;
                  }
                } catch (e) {
                  console.debug('Version check failed:', e.message);
                }
              },
              compareVersions(v1, v2) {
                const p1 = v1.split('.').map(Number);
                const p2 = v2.split('.').map(Number);
                for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
                  const a = p1[i] || 0, b = p2[i] || 0;
                  if (a > b) return 1;
                  if (a < b) return -1;
                }
                return 0;
              },
              dismissUpdate() {
                this.showUpdateToast = false;
                localStorage.setItem('sublink_dismissed_version', this.latestVersion);
              }
            }
          }

          // i18n helper for update checker
          function getUpdateI18n(key) {
            const lang = navigator.language || 'en-US';
            const translations = {
              'zh-CN': {
                newVersionAvailable: '发现新版本',
                currentVersion: '当前版本',
                viewRelease: '查看更新',
                updateGuide: '更新指南',
                later: '稍后提醒'
              },
              'zh-TW': {
                newVersionAvailable: '發現新版本',
                currentVersion: '當前版本',
                viewRelease: '查看更新',
                updateGuide: '更新指南',
                later: '稍後提醒'
              },
              'en-US': {
                newVersionAvailable: 'New Version Available',
                currentVersion: 'Current',
                viewRelease: 'View Release',
                updateGuide: 'Update Guide',
                later: 'Later'
              },
              'fa': {
                newVersionAvailable: 'نسخه جدید موجود است',
                currentVersion: 'نسخه فعلی',
                viewRelease: 'مشاهده نسخه',
                updateGuide: 'راهنمای به‌روزرسانی',
                later: 'بعداً'
              },
              'ru': {
                newVersionAvailable: 'Доступна новая версия',
                currentVersion: 'Текущая',
                viewRelease: 'Посмотреть',
                updateGuide: 'Руководство по обновлению',
                later: 'Позже'
              }
            };
            const langKey = Object.keys(translations).find(k => lang.startsWith(k.split('-')[0])) || 'en-US';
            return translations[langKey][key] || translations['en-US'][key];
          }
        </script>
      </head>
      <body class="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        ${children}
      </body>
    </html>
  `
}