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
                  glass: '0 8px 32px -12px rgba(0, 0, 0, 0.12)',
                  glow: '0 28px 90px -42px rgba(10, 163, 235, 0.55)',
                  card: '0 4px 24px -8px rgba(0, 0, 0, 0.08)',
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

          /* Custom scrollbar */
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.12); border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.22); }
          .dark ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.10); }
          .dark ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.18); }

          /* Selection color */
          ::selection { background: rgba(10, 163, 235, 0.18); }
          .dark ::selection { background: rgba(10, 163, 235, 0.28); }

          /* Ambient gradient background */
          body::before {
            content: '';
            position: fixed;
            inset: 0;
            z-index: -2;
            background:
              radial-gradient(circle at 15% 10%, rgba(34, 155, 198, 0.12), transparent 32rem),
              radial-gradient(circle at 85% 5%, rgba(8, 173, 114, 0.10), transparent 34rem),
              radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.06), transparent 30rem),
              linear-gradient(180deg, #f8fafc 0%, #f3f4f6 40%, #eef6f4 100%);
            pointer-events: none;
          }

          html.dark body::before {
            background:
              radial-gradient(circle at 15% 10%, rgba(34, 155, 198, 0.15), transparent 32rem),
              radial-gradient(circle at 85% 5%, rgba(8, 173, 114, 0.10), transparent 34rem),
              radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.08), transparent 30rem),
              radial-gradient(circle at 50% 50%, rgba(20, 168, 153, 0.04), transparent 40rem),
              linear-gradient(180deg, #0f131a 0%, #141a1e 40%, #0d1a17 100%);
          }

          /* Subtle grid overlay */
          body::after {
            content: '';
            position: fixed;
            inset: 0;
            z-index: -1;
            background-image:
              linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent 75%);
            pointer-events: none;
          }

          html.dark body::after {
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          }

          /* Glass panel - primary card style */
          .glass-panel {
            border: 1px solid rgba(255, 255, 255, 0.72);
            background: rgba(255, 255, 255, 0.78);
            box-shadow: 0 8px 32px -12px rgba(0, 0, 0, 0.10);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          }

          html.dark .glass-panel {
            border-color: rgba(255, 255, 255, 0.08);
            background: rgba(40, 40, 40, 0.70);
            box-shadow: 0 8px 32px -12px rgba(0, 0, 0, 0.30);
          }

          /* Glass card - for nested sections */
          .glass-card {
            border: 1px solid rgba(0, 0, 0, 0.06);
            background: rgba(255, 255, 255, 0.60);
            box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.06);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          }

          html.dark .glass-card {
            border-color: rgba(255, 255, 255, 0.06);
            background: rgba(50, 50, 50, 0.50);
            box-shadow: 0 4px 24px -8px rgba(0, 0, 0, 0.20);
          }

          .interactive-soft {
            transition: transform 250ms cubic-bezier(0.18, 0.8, 0.2, 1), box-shadow 250ms ease, background 250ms ease, color 250ms ease, border-color 250ms ease;
          }

          .interactive-soft:hover {
            transform: translateY(-1px);
          }
          .interactive-soft:active {
            transform: translateY(0px) scale(0.98);
          }

          /* Fade-up entrance animation */
          .fade-up {
            animation: fade-up 560ms cubic-bezier(0.18, 0.8, 0.2, 1) both;
          }

          @keyframes fade-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Scale-in entrance animation */
          .scale-in {
            animation: scale-in 400ms cubic-bezier(0.18, 0.8, 0.2, 1) both;
          }

          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.96); }
            to { opacity: 1; transform: scale(1); }
          }

          /* Consistent focus ring for all interactive elements */
          input:focus-visible,
          select:focus-visible,
          textarea:focus-visible,
          button:focus-visible {
            outline: 2px solid rgba(10, 163, 235, 0.45);
            outline-offset: 2px;
            border-color: transparent;
          }

          /* Unified input field style */
          .input-field {
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.08);
            background: rgba(255, 255, 255, 0.60);
            padding: 0.625rem 1rem;
            color: #111827;
            border-radius: 0.75rem;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          }

          html.dark .input-field {
            border-color: rgba(255, 255, 255, 0.08);
            background: rgba(60, 60, 60, 0.45);
            color: #f3f4f6;
          }

          .input-field:focus {
            border-color: rgba(10, 163, 235, 0.50);
            box-shadow: 0 0 0 3px rgba(10, 163, 235, 0.08);
          }

          html.dark .input-field:focus {
            border-color: rgba(10, 163, 235, 0.50);
            box-shadow: 0 0 0 3px rgba(10, 163, 235, 0.12);
          }

          /* Responsive adjustment for small screens */
          @media (max-width: 640px) {
            body::before {
              background:
                radial-gradient(circle at 20% 15%, rgba(34, 155, 198, 0.10), transparent 24rem),
                radial-gradient(circle at 80% 10%, rgba(8, 173, 114, 0.08), transparent 26rem),
                linear-gradient(180deg, #f8fafc 0%, #f5f5f7 50%, #eef6f4 100%);
            }
            html.dark body::before {
              background:
                radial-gradient(circle at 20% 15%, rgba(34, 155, 198, 0.12), transparent 24rem),
                radial-gradient(circle at 80% 10%, rgba(8, 173, 114, 0.08), transparent 26rem),
                linear-gradient(180deg, #0f131a 0%, #141a1e 50%, #0d1a17 100%);
            }
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