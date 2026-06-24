export const formLogicFn = () => {
    // Inline: parse Surge INI into JSON-like object
    const parseSurgeValue = (rawValue = '') => {
        const trimmed = rawValue.trim();
        if (trimmed === '') return '';
        const unquoted = trimmed.replace(/^"(.*)"$/, '$1');
        const lower = unquoted.toLowerCase();
        if (lower === 'true') return true;
        if (lower === 'false') return false;
        if (/^-?\d+(\.\d+)?$/.test(unquoted)) return Number(unquoted);
        return unquoted;
    };

    const convertSurgeIniToJson = (content) => {
        const lines = content.split(/\r?\n/);
        const config = {};
        let currentSection = null;
        const obj = (key) => { if (!config[key]) config[key] = {}; return config[key]; };
        const arr = (key) => { if (!config[key]) config[key] = []; return config[key]; };
        for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line || line.startsWith(';') || line.startsWith('#')) continue;
            const m = line.match(/^\[(.+)]$/);
            if (m) { currentSection = m[1].trim(); continue; }
            if (!currentSection) continue;
            const sec = currentSection.toLowerCase();
            if (sec === 'general' || sec === 'replica') {
                const eq = line.indexOf('=');
                if (eq === -1) continue;
                const k = line.slice(0, eq).trim();
                const v = line.slice(eq + 1).trim();
                if (!k) continue;
                obj(sec)[k] = parseSurgeValue(v);
            } else if (sec === 'proxy') {
                arr('proxies').push(line);
            } else if (sec === 'proxy group') {
                arr('proxy-groups').push(line);
            } else if (sec === 'rule') {
                arr('rules').push(line);
            } else {
                arr(sec).push(line);
            }
        }
        if (!config.general && !config.replica && !config.proxies && !config['proxy-groups']) {
            throw new Error('Unable to parse Surge INI content');
        }
        return config;
    };

    const parseSurgeConfigInput = (content) => {
        const trimmed = content.trim();
        if (!trimmed) throw new Error('Config content is empty');
        try {
            return { configObject: JSON.parse(trimmed), convertedFromIni: false };
        } catch {
            return { configObject: convertSurgeIniToJson(content), convertedFromIni: true };
        }
    };

    const loadTranslations = (obj) => {
        const T = window.APP_TRANSLATIONS;
        if (!T) return;
        obj.processingText = T.processing;
        obj.convertText = T.convert;
        obj.shortenLinksText = T.shortenLinks;
        obj.shorteningText = T.shortening;
        obj.showFullLinksText = T.showFullLinks;
        obj.saveConfigText = T.saveConfig;
        obj.savingConfigText = T.savingConfig;
        obj.configContentRequiredText = T.configContentRequired;
        obj.configSaveFailedText = T.configSaveFailed;
    };

    window.formData = function () {
        return {
            input: '',
            showAdvanced: false,
            selectedRules: [],
            selectedPredefinedRule: 'balanced',
            subconverterCopied: false,
            groupByCountry: false,
            includeAutoSelect: true,
            enableClashUI: false,
            externalController: '',
            externalUiDownloadUrl: '',
            configType: 'singbox',
            configEditor: '',
            savingConfig: false,
            currentConfigId: '',
            saveConfigText: '',
            savingConfigText: '',
            configContentRequiredText: '',
            configSaveFailedText: '',
            configValidationState: '',
            configValidationMessage: '',
            customUA: '',
            loading: false,
            generatedLinks: null,
            shortenedLinks: null,
            shortening: false,
            customShortCode: '',
            parsingUrl: false,
            parseDebounceTimer: null,
            processingText: '',
            convertText: '',
            shortenLinksText: '',
            shorteningText: '',
            showFullLinksText: '',

            init() {
                loadTranslations(this);

                // Restore persisted state
                this.input = localStorage.getItem('inputTextarea') || '';
                this.showAdvanced = localStorage.getItem('advancedToggle') === 'true';
                this.groupByCountry = localStorage.getItem('groupByCountry') === 'true';
                this.includeAutoSelect = localStorage.getItem('includeAutoSelect') !== 'false';
                this.enableClashUI = localStorage.getItem('enableClashUI') === 'true';
                this.externalController = localStorage.getItem('externalController') || '';
                this.externalUiDownloadUrl = localStorage.getItem('externalUiDownloadUrl') || '';
                this.customUA = localStorage.getItem('userAgent') || '';
                this.configEditor = localStorage.getItem('configEditor') || '';
                this.configType = localStorage.getItem('configType') || 'singbox';
                this.customShortCode = localStorage.getItem('customShortCode') || '';
                this.currentConfigId = new URLSearchParams(window.location.search).get('configId') || '';

                this.applyPredefinedRule();

                // Watchers for persistence
                this.$watch('input', v => { localStorage.setItem('inputTextarea', v); this.handleInputChange(v); });
                this.$watch('showAdvanced', v => localStorage.setItem('advancedToggle', v));
                this.$watch('groupByCountry', v => localStorage.setItem('groupByCountry', v));
                this.$watch('includeAutoSelect', v => localStorage.setItem('includeAutoSelect', v));
                this.$watch('enableClashUI', v => localStorage.setItem('enableClashUI', v));
                this.$watch('externalController', v => localStorage.setItem('externalController', v));
                this.$watch('externalUiDownloadUrl', v => localStorage.setItem('externalUiDownloadUrl', v));
                this.$watch('customUA', v => localStorage.setItem('userAgent', v));
                this.$watch('configEditor', v => { localStorage.setItem('configEditor', v); this.resetConfigValidation(); });
                this.$watch('configType', v => { localStorage.setItem('configType', v); this.resetConfigValidation(); });
                this.$watch('customShortCode', v => localStorage.setItem('customShortCode', v));
            },

            applyPredefinedRule() {
                if (this.selectedPredefinedRule === 'custom') return;
                const sets = window.PREDEFINED_RULE_SETS;
                if (sets?.[this.selectedPredefinedRule]) {
                    this.selectedRules = sets[this.selectedPredefinedRule];
                }
            },

            getSubconverterUrl() {
                const origin = window.location.origin;
                const params = new URLSearchParams();
                if (this.selectedPredefinedRule && this.selectedPredefinedRule !== 'custom') {
                    params.append('selectedRules', this.selectedPredefinedRule);
                } else if (this.selectedPredefinedRule === 'custom') {
                    params.append('selectedRules', JSON.stringify(this.selectedRules));
                }
                try {
                    const el = document.querySelector('input[name="customRules"]');
                    if (el?.value) {
                        const parsed = JSON.parse(el.value);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            params.append('customRules', JSON.stringify(parsed));
                        }
                    }
                } catch { /* ignore */ }
                if (!this.includeAutoSelect) params.append('include_auto_select', 'false');
                if (this.groupByCountry) params.append('group_by_country', 'true');
                const appLang = window.APP_LANG || 'zh-CN';
                if (appLang !== 'zh-CN') params.append('lang', appLang);
                return `${origin}/subconverter?${params.toString()}`;
            },

            copySubconverterUrl() {
                navigator.clipboard.writeText(this.getSubconverterUrl()).then(() => {
                    this.subconverterCopied = true;
                    setTimeout(() => this.subconverterCopied = false, 2000);
                }).catch(() => { });
            },

            resetConfigValidation() {
                this.configValidationState = '';
                this.configValidationMessage = '';
            },

            async saveBaseConfig() {
                const content = (this.configEditor || '').trim();
                if (!content) {
                    alert(this.configContentRequiredText || window.APP_TRANSLATIONS.configContentRequired);
                    return;
                }
                let payloadContent = this.configEditor;
                if (this.configType === 'surge') {
                    try {
                        payloadContent = JSON.stringify(parseSurgeConfigInput(this.configEditor).configObject);
                    } catch (e) {
                        const prefix = window.APP_TRANSLATIONS.configValidationError || 'Config validation error:';
                        alert(`${prefix} ${e?.message || ''}`.trim());
                        return;
                    }
                }
                this.savingConfig = true;
                try {
                    const res = await fetch('/config', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: this.configType, content: payloadContent })
                    });
                    const text = await res.text();
                    if (!res.ok) throw new Error(text || res.statusText || 'Request failed');
                    if (!text.trim()) throw new Error('Missing config ID');
                    this.currentConfigId = text.trim();
                    this.updateConfigIdInUrl(this.currentConfigId);
                    alert(`${window.APP_TRANSLATIONS.saveConfigSuccess || 'Configuration saved successfully!'}\nID: ${this.currentConfigId}`);
                } catch (error) {
                    console.error('Failed to save base config:', error);
                    alert(`${this.configSaveFailedText || window.APP_TRANSLATIONS.configSaveFailed || 'Failed to save configuration'}: ${error?.message || 'Unknown error'}`);
                } finally {
                    this.savingConfig = false;
                }
            },

            validateBaseConfig() {
                const content = (this.configEditor || '').trim();
                if (!content) {
                    this.configValidationState = 'error';
                    this.configValidationMessage = this.configContentRequiredText || window.APP_TRANSLATIONS.configContentRequired;
                    return;
                }
                try {
                    if (this.configType === 'clash') {
                        if (!window.jsyaml?.load) throw new Error(window.APP_TRANSLATIONS.parserUnavailable || 'Parser unavailable');
                        window.jsyaml.load(content);
                        this.configValidationMessage = window.APP_TRANSLATIONS.validYamlConfig || 'YAML config is valid';
                    } else if (this.configType === 'surge') {
                        parseSurgeConfigInput(this.configEditor);
                        this.configValidationMessage = window.APP_TRANSLATIONS.validJsonConfig || 'JSON config is valid';
                    } else {
                        JSON.parse(content);
                        this.configValidationMessage = window.APP_TRANSLATIONS.validJsonConfig || 'JSON config is valid';
                    }
                    this.configValidationState = 'success';
                } catch (error) {
                    this.configValidationState = 'error';
                    const prefix = window.APP_TRANSLATIONS.configValidationError || 'Config validation error: ';
                    this.configValidationMessage = `${prefix}${error?.message || ''}`;
                }
            },

            clearBaseConfig() {
                if (confirm(window.APP_TRANSLATIONS.confirmClearConfig)) {
                    this.configEditor = '';
                    localStorage.removeItem('configEditor');
                    this.currentConfigId = '';
                    this.updateConfigIdInUrl(null);
                }
            },

            clearAll() {
                if (!confirm(window.APP_TRANSLATIONS.confirmClearAll)) return;
                this.input = '';
                this.generatedLinks = null;
                this.shortenedLinks = null;
                this.customShortCode = '';
                localStorage.removeItem('customShortCode');
            },

            updateConfigIdInUrl(configId) {
                const url = new URL(window.location.href);
                if (configId) url.searchParams.set('configId', configId);
                else url.searchParams.delete('configId');
                window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
            },

            async submitForm() {
                this.loading = true;
                this.shortenedLinks = null;
                try {
                    const el = document.querySelector('input[name="customRules"]');
                    const customRules = (el?.value) ? JSON.parse(el.value) : [];
                    const origin = window.location.origin;
                    const params = new URLSearchParams();
                    params.append('config', this.input);
                    params.append('ua', this.customUA);
                    params.append('selectedRules', JSON.stringify(this.selectedRules));
                    params.append('customRules', JSON.stringify(customRules));
                    if (this.groupByCountry) params.append('group_by_country', 'true');
                    if (!this.includeAutoSelect) params.append('include_auto_select', 'false');
                    if (this.enableClashUI) params.append('enable_clash_ui', 'true');
                    if (this.externalController) params.append('external_controller', this.externalController);
                    if (this.externalUiDownloadUrl) params.append('external_ui_download_url', this.externalUiDownloadUrl);
                    const configId = this.currentConfigId || new URLSearchParams(window.location.search).get('configId');
                    if (configId) params.append('configId', configId);
                    const qs = params.toString();
                    this.generatedLinks = {
                        xray: `${origin}/xray?${qs}`,
                        singbox: `${origin}/singbox?${qs}`,
                        clash: `${origin}/clash?${qs}`,
                        surge: `${origin}/surge?${qs}`
                    };
                    setTimeout(() => {
                        document.querySelector('.mt-12')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                } catch (error) {
                    console.error('Error generating links:', error);
                    alert(window.APP_TRANSLATIONS.errorGeneratingLinks);
                } finally {
                    this.loading = false;
                }
            },

            async shortenLinks() {
                if (this.shortenedLinks) { alert(window.APP_TRANSLATIONS.alreadyShortened); return; }
                if (!this.generatedLinks) return;
                this.shortening = true;
                try {
                    const origin = window.location.origin;
                    const shortened = {};
                    let shortCode = this.customShortCode.trim();
                    let isFirst = true;
                    const prefixMap = { xray: 'x', singbox: 'b', clash: 'c', surge: 's' };
                    for (const [type, url] of Object.entries(this.generatedLinks)) {
                        let apiUrl = `${origin}/shorten-v2?url=${encodeURIComponent(url)}`;
                        if (shortCode) apiUrl += `&shortCode=${encodeURIComponent(shortCode)}`;
                        const res = await fetch(apiUrl);
                        if (!res.ok) throw new Error(`Failed to shorten ${type} link`);
                        const code = await res.text();
                        if (isFirst && !shortCode) shortCode = code;
                        isFirst = false;
                        shortened[type] = `${origin}/${prefixMap[type]}/${code}`;
                    }
                    this.shortenedLinks = shortened;
                } catch (error) {
                    console.error('Error shortening links:', error);
                    alert(window.APP_TRANSLATIONS.shortenFailed);
                } finally {
                    this.shortening = false;
                }
            },

            handleInputChange(val) {
                if (this.parseDebounceTimer) clearTimeout(this.parseDebounceTimer);
                if (!val?.trim()) return;
                this.parseDebounceTimer = setTimeout(() => this.tryParseSubscriptionUrl(val.trim()), 500);
            },

            isSubscriptionUrl(text) {
                if (text.includes('\n')) return false;
                try {
                    const url = new URL(text);
                    if (url.pathname.match(/^\/([bcxs])\/([a-zA-Z0-9_-]+)$/)) return true;
                    if (url.pathname.match(/^\/(singbox|clash|xray|surge)$/) && url.search) return true;
                } catch { /* not a URL */ }
                return false;
            },

            async tryParseSubscriptionUrl(text) {
                if (!this.isSubscriptionUrl(text)) return;
                this.parsingUrl = true;
                try {
                    let url = new URL(text);
                    const shortMatch = url.pathname.match(/^\/([bcxs])\/([a-zA-Z0-9_-]+)$/);
                    if (shortMatch) {
                        const res = await fetch(`/resolve?url=${encodeURIComponent(text)}`);
                        if (!res.ok) { console.warn('Failed to resolve short URL'); return; }
                        const data = await res.json();
                        if (!data.originalUrl) { console.warn('No original URL returned'); return; }
                        url = new URL(data.originalUrl);
                    }
                    this.populateFormFromUrl(url);
                } catch (error) {
                    console.error('Error parsing subscription URL:', error);
                } finally {
                    this.parsingUrl = false;
                }
            },

            populateFormFromUrl(url) {
                const p = new URLSearchParams(url.search);
                const config = p.get('config');
                if (config) this.input = config;
                const selectedRules = p.get('selectedRules');
                if (selectedRules) {
                    try {
                        const parsed = JSON.parse(selectedRules);
                        if (Array.isArray(parsed)) { this.selectedRules = parsed; this.selectedPredefinedRule = 'custom'; }
                    } catch { /* ignore */ }
                }
                const customRules = p.get('customRules');
                if (customRules) {
                    try {
                        const parsed = JSON.parse(customRules);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            window.dispatchEvent(new CustomEvent('restore-custom-rules', { detail: { rules: parsed } }));
                        }
                    } catch { /* ignore */ }
                }
                this.groupByCountry = p.get('group_by_country') === 'true';
                this.includeAutoSelect = p.get('include_auto_select') !== 'false';
                this.enableClashUI = p.get('enable_clash_ui') === 'true';
                const ec = p.get('external_controller');
                if (ec) this.externalController = ec;
                const eu = p.get('external_ui_download_url');
                if (eu) this.externalUiDownloadUrl = eu;
                const ua = p.get('ua');
                if (ua) this.customUA = ua;
                const cid = p.get('configId');
                if (cid) { this.currentConfigId = cid; this.updateConfigIdInUrl(cid); }
                if (selectedRules || customRules || this.groupByCountry || this.enableClashUI ||
                    ec || eu || ua || cid) {
                    this.showAdvanced = true;
                }
            }
        };
    };
};