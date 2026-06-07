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
              console.error('Failed to initialize Alpine.js. Interactive features are disabled.');
              const warning = document.createElement('div');
              warning.className = 'fixed bottom-4 right-4 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg shadow';
              warning.textContent = '加载 Alpine.js 失败，页面交互功能不可用，请刷新或检查网络。';
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
                  glass: '0 24px 70px -42px rgba(15, 23, 42, 0.32)'
                },
                colors: {
                  primary: {
                    50: '#eef9ff',
                    100: '#dcf2ff',
                    200: '#b2e6ff',
                    300: '#6ed4ff',
                    400: '#33c5ff', // Spaceship Blue
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
                    950: '#0b0f19', // Deep dark for background
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
          html {
            scroll-behavior: smooth;
          }

          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            position: relative;
            min-height: 100vh;
            overflow-x: hidden;
          }

          body::before {
            content: '';
            position: fixed;
            inset: 0;
            z-index: -2;
            background:
              radial-gradient(circle at 50% -10%, rgba(255, 255, 255, 0.95) 0%, transparent 34%),
              radial-gradient(ellipse 72% 50% at 16% 12%, rgba(10, 163, 235, 0.16) 0%, transparent 58%),
              radial-gradient(ellipse 52% 42% at 92% 28%, rgba(147, 197, 253, 0.22) 0%, transparent 58%),
              linear-gradient(180deg, #f8fbff 0%, #eef6ff 45%, #ffffff 100%);
            pointer-events: none;
          }

          .dark body::before,
          html.dark body::before {
            background:
              radial-gradient(circle at 50% -10%, rgba(51, 197, 255, 0.18) 0%, transparent 34%),
              radial-gradient(ellipse 72% 50% at 16% 12%, rgba(10, 163, 235, 0.14) 0%, transparent 58%),
              radial-gradient(ellipse 52% 42% at 92% 28%, rgba(59, 130, 246, 0.16) 0%, transparent 58%),
              linear-gradient(180deg, #070b13 0%, #0b1220 50%, #070b13 100%);
          }

          body::after {
            content: '';
            position: fixed;
            inset: 0;
            z-index: -1;
            opacity: 0.18;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-repeat: repeat;
            background-size: 128px 128px;
          }

          .dark body::after,
          html.dark body::after {
            opacity: 0.15;
          }

          .glass-panel {
            border: 1px solid rgba(255, 255, 255, 0.72);
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.46));
            box-shadow: 0 24px 70px -42px rgba(15, 23, 42, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.78);
            backdrop-filter: blur(26px) saturate(150%);
            -webkit-backdrop-filter: blur(26px) saturate(150%);
          }

          .dark .glass-panel,
          html.dark .glass-panel {
            border-color: rgba(255, 255, 255, 0.10);
            background: linear-gradient(145deg, rgba(17, 24, 39, 0.66), rgba(15, 23, 42, 0.42));
            box-shadow: 0 28px 80px -46px rgba(0, 0, 0, 0.86), inset 0 1px 0 rgba(255, 255, 255, 0.08);
          }

          .premium-card {
            transform: translateZ(0);
            transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 260ms ease, border-color 260ms ease, background 260ms ease;
          }

          .premium-card:hover {
            transform: translateY(-3px) scale(1.005);
            border-color: rgba(10, 163, 235, 0.24);
            box-shadow: 0 30px 90px -46px rgba(10, 163, 235, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.82);
          }

          .dark .premium-card:hover,
          html.dark .premium-card:hover {
            border-color: rgba(51, 197, 255, 0.26);
          }

          .hero-orb {
            position: absolute;
            width: 18rem;
            height: 18rem;
            border-radius: 9999px;
            background: linear-gradient(135deg, rgba(51, 197, 255, 0.24), rgba(255, 255, 255, 0.08));
            filter: blur(14px);
            opacity: 0.72;
            pointer-events: none;
            animation: float-orb 12s ease-in-out infinite alternate;
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

          @keyframes float-orb {
            from { transform: translate3d(0, 0, 0) scale(1); }
            to { transform: translate3d(18px, 24px, 0) scale(1.06); }
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
          function appData() {
            return {
              darkMode: localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches),
              toggleDarkMode() {
                this.darkMode = !this.darkMode;
                localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
                if (this.darkMode) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              },
              init() {
                if (this.darkMode) {
                  document.documentElement.classList.add('dark');
                }
              }
            }
          }

          // Version update checker Alpine.js component
          function updateChecker(currentVersion, apiUrl) {
            return {
              currentVersion: currentVersion,
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
                // Check for updates after a short delay to not block initial render
                setTimeout(() => this.checkForUpdates(), 3000);
              },
              async checkForUpdates() {
                try {
                  // Check if user dismissed this version before
                  const dismissedVersion = localStorage.getItem('sublink_dismissed_version');
                  const lastCheck = localStorage.getItem('sublink_last_version_check');
                  const now = Date.now();
                  
                  // Only check once per hour to avoid rate limiting
                  if (lastCheck && (now - parseInt(lastCheck)) < 3600000) {
                    const cachedVersion = localStorage.getItem('sublink_latest_version');
                    if (cachedVersion && cachedVersion !== dismissedVersion && this.compareVersions(cachedVersion, this.currentVersion) > 0) {
                      this.latestVersion = cachedVersion;
                      this.showUpdateToast = true;
                    }
                    return;
                  }

                  const response = await fetch(apiUrl, {
                    headers: { 'Accept': 'application/vnd.github.v3+json' }
                  });
                  
                  if (!response.ok) return;
                  
                  const data = await response.json();
                  const latestVersion = (data.tag_name || '').replace(/^v/, '');
                  
                  // Cache the result
                  localStorage.setItem('sublink_latest_version', latestVersion);
                  localStorage.setItem('sublink_last_version_check', now.toString());
                  
                  // Compare versions
                  if (latestVersion && latestVersion !== dismissedVersion && this.compareVersions(latestVersion, this.currentVersion) > 0) {
                    this.latestVersion = latestVersion;
                    this.showUpdateToast = true;
                  }
                } catch (error) {
                  console.debug('Version check failed:', error.message);
                }
              },
              compareVersions(v1, v2) {
                const parts1 = v1.split('.').map(Number);
                const parts2 = v2.split('.').map(Number);
                for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
                  const p1 = parts1[i] || 0;
                  const p2 = parts2[i] || 0;
                  if (p1 > p2) return 1;
                  if (p1 < p2) return -1;
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
