/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

import { ValidatedTextarea } from './ValidatedTextarea.jsx';

export const CustomRules = (props) => {
    const { t } = props;

    return (
        <div x-data="customRulesData()" class="glass-card rounded-2xl p-6 md:p-8">
            <div class="flex items-center justify-between mb-5">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <i class="fas fa-stream text-primary-500/60 dark:text-primary-400/60"></i>
                    {t('customRulesSection')}
                </h3>
            </div>

            <div class="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4">
                <p class="text-sm text-gray-500 dark:text-gray-400">{t('customRulesSectionTooltip')}</p>

                <div class="flex bg-gray-100/80 dark:bg-white/[0.06] rounded-xl p-1">
                    <button
                        type="button" x-on:click="mode = 'form'"
                    x-bind:class="{'bg-white dark:bg-white/[0.10] text-primary-600 dark:text-primary-400 shadow-sm': mode === 'form', 'text-gray-500 dark:text-gray-400': mode !== 'form'}"
                    class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
                    <i class="fas fa-list"></i>
                    {t('customRulesForm')}
                </button>
                <button
                    type="button" x-on:click="mode = 'json'"
                x-bind:class="{'bg-white dark:bg-white/[0.10] text-primary-600 dark:text-primary-400 shadow-sm': mode === 'json', 'text-gray-500 dark:text-gray-400': mode !== 'json'}"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
                <i class="fas fa-code"></i>
                {t('customRulesJSON')}
            </button>
        </div>
      </div>

    {/* Form Mode */ }
    <div x-show="mode === 'form'" {...{'x-transition:enter': 'transition ease-out duration-300', 'x-transition:enter-start': 'opacity-0 transform scale-95', 'x-transition:enter-end': 'opacity-100 transform scale-100'}}>
        <template x-if="rules.length === 0">
            <div class="text-center py-12 bg-white/50 dark:bg-white/[0.03] rounded-xl border-2 border-dashed border-black/10 dark:border-white/10">
                <div class="w-16 h-16 bg-gray-100 dark:bg-white/[0.06] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <i class="fas fa-plus text-2xl"></i>
                </div>
                <p class="text-gray-500 dark:text-gray-400 mb-4">{t('noCustomRulesForm')}</p>
                <button type="button" x-on:click="addRule()" class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-200 font-medium interactive-soft">
                {t('addCustomRule')}
            </button>
        </div>
        </template>

    <div class="space-y-4">
        <template x-for="(rule, index) in rules" x-bind:key="index">
        <div
          x-data="{ show: false }"
          x-init="$nextTick(() => show = true)"
          x-show="show"
          class="bg-white/60 dark:bg-white/[0.04] rounded-xl p-5 border border-black/6 dark:border-white/8 transition-all duration-200 hover:border-primary-300/40 dark:hover:border-primary-400/20"
          {...{
            'x-transition:enter': 'transition ease-out duration-300',
            'x-transition:enter-start': 'opacity-0 -translate-y-2 scale-95',
            'x-transition:enter-end': 'opacity-100 translate-y-0 scale-100',
            'x-transition:leave': 'transition ease-in duration-200',
            'x-transition:leave-start': 'opacity-100 translate-y-0 scale-100',
            'x-transition:leave-end': 'opacity-0 translate-y-2 scale-95',
            'x-on:custom-rules-clear.window': 'show = false'
          }}
        >
            <div class="flex justify-between items-center mb-4 pb-3 border-b border-black/6 dark:border-white/8">
                <h3 class="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    <span class="w-6 h-6 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-xs font-semibold" x-text="index + 1"></span>
                    {t('customRule')}
                </h3>
                <button
                  type="button"
                  x-on:click="show = false; setTimeout(() => removeRule(index), 200)"
                  class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rule Name */}
            <div class="col-span-1 md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {t('customRuleOutboundName')}
                </label>
                <input
                    type="text"
                    x-model="rule.name"
                    class="input-field"
                    placeholder="e.g., MyRule"
                />
            </div>

            {/* Domain Suffix */}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {t('customRuleDomainSuffix')}
                </label>
                <input
                    type="text"
                    x-model="rule.domain_suffix"
                    class="input-field"
                    placeholder={t('customRuleDomainSuffixPlaceholder')}
                />
            </div>

            {/* Domain Keyword */}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {t('customRuleDomainKeyword')}
                </label>
                <input
                    type="text"
                    x-model="rule.domain_keyword"
                    class="input-field"
                    placeholder={t('customRuleDomainKeywordPlaceholder')}
                />
            </div>

            {/* SRC IP CIDR */}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                    {t('customRuleSrcIPCIDR')}
                    <i class="fas fa-info-circle text-gray-400 hover:text-primary-500 cursor-help" title={t('customRuleSrcIPCIDRTooltip')}></i>
                </label>
                <input
                    type="text"
                    x-model="rule.src_ip_cidr"
                    class="input-field"
                    placeholder={t('customRuleSrcIPCIDRPlaceholder')}
                />
            </div>

            {/* IP CIDR */}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {t('customRuleIPCIDR')}
                </label>
                <input
                    type="text"
                    x-model="rule.ip_cidr"
                    class="input-field"
                    placeholder={t('customRuleIPCIDRPlaceholder')}
                />
            </div>

            {/* Protocol */}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                    {t('customRuleProtocol')}
                    <i class="fas fa-info-circle text-gray-400 hover:text-primary-500 cursor-help" title={t('customRuleProtocolTooltip')}></i>
                </label>
                <input
                    type="text"
                    x-model="rule.protocol"
                    class="input-field"
                    placeholder={t('customRuleProtocolPlaceholder')}
                />
            </div>

            {/* Geo-Site */}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                    {t('customRuleGeoSite')}
                    <i class="fas fa-info-circle text-gray-400 hover:text-primary-500 cursor-help" title={t('customRuleGeoSiteTooltip')}></i>
                </label>
                <input
                    type="text"
                    x-model="rule.site"
                    class="input-field"
                    placeholder={t('customRuleGeoSitePlaceholder')}
                />
            </div>

            {/* Geo-IP */}
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1">
                    {t('customRuleGeoIP')}
                    <i class="fas fa-info-circle text-gray-400 hover:text-primary-500 cursor-help" title={t('customRuleGeoIPTooltip')}></i>
                </label>
                <input
                    type="text"
                    x-model="rule.ip"
                    class="input-field"
                    placeholder={t('customRuleGeoIPPlaceholder')}
                />
            </div>
        </div>
    </div>
          </template>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <button type="button" x-on:click="addRule()" class="interactive-soft px-4 py-2.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-all duration-200 font-medium flex items-center gap-2">
            <i class="fas fa-plus"></i>
            {t('addCustomRule')}
          </button>
          <button type="button" x-on:click="clearAll()" x-show="rules.length > 0" class="interactive-soft px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200 font-medium flex items-center gap-2" >
    <i class="fas fa-trash"></i>
{ t('clearAll') }
          </button>
        </div>
      </div>

    {/* JSON Mode */ }
    <div x-show="mode === 'json'" {...{'x-transition:enter': 'transition ease-out duration-300', 'x-transition:enter-start': 'opacity-0 transform scale-95', 'x-transition:enter-end': 'opacity-100 transform scale-100'}}>
        <ValidatedTextarea
          id="customRulesJson"
          name="customRulesJson"
          model="jsonContent"
          placeholder='[{"name": "MyRule", "src_ip_cidr": "192.168.1.13/32", "domain_suffix": "example.com", "outbound": "Proxy"}]'
          variant="mono"
          textareaClass="min-h-[16rem]"
          containerClass="group"
          labelWrapperClass="flex items-center justify-end mb-2"
          labelActionsWrapperClass="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          inlineActionsWrapperClass="absolute bottom-4 right-4 flex gap-2"
          preserveLabelSpace={false}
          pasteLabel={t('paste')}
          clearLabel={t('clear')}
          validation={{
            button: {
              key: 'validate-json',
              label: t('validateJSON'),
              attrs: { 'x-on:click': 'validateJson()' }
            },
            error: {
              show: 'jsonError',
              textExpr: 'jsonError'
            },
            success: {
              show: 'jsonValid',
              text: t('allJSONValid')
            }
          }}
        />
      </div>

    {/* Hidden input to store the final JSON for form submission */ }
    <input type="hidden" name="customRules" x-bind:value="JSON.stringify(rules)" />

        <script dangerouslySetInnerHTML={{
            __html: `
        function customRulesData() {
          return {
            mode: 'form',
            rules: [],
            jsonContent: '[]',
            jsonError: null,
            jsonValid: false,
            
            init() {
              // Watch for changes in rules to update JSON content
              this.$watch('rules', (value) => {
                if (this.mode === 'form') {
                  this.jsonContent = JSON.stringify(value, null, 2);
                }
              });

              // Watch for changes in JSON content to update rules
              this.$watch('jsonContent', (value) => {
                if (this.mode === 'json') {
                  try {
                    const parsed = JSON.parse(value);
                    if (Array.isArray(parsed)) {
                      this.rules = parsed;
                      this.jsonError = null;
                      this.jsonValid = true;
                      setTimeout(() => this.jsonValid = false, 3000);
                    } else {
                      this.jsonError = '${t('mustBeArray')}';
                    }
                  } catch (e) {
                    this.jsonError = e.message;
                  }
                }
              });

              // Listen for custom event to restore rules from URL parsing
              window.addEventListener('restore-custom-rules', (event) => {
                if (event.detail && Array.isArray(event.detail.rules)) {
                  this.rules = event.detail.rules;
                  this.jsonContent = JSON.stringify(event.detail.rules, null, 2);
                  this.mode = 'json'; // Switch to JSON mode to show imported rules
                }
              });
            },
            
            addRule() {
              this.rules.push({
                name: '',
                domain_suffix: '',
                domain_keyword: '',
                src_ip_cidr: '',
                ip_cidr: '',
                protocol: '',
                site: '',
                ip: '',
                outbound: '' // Will be set to name by default in backend or needs explicit field? 
                             // In original logic, outbound name IS the rule name for custom rules.
              });
            },
            
            removeRule(index) {
              this.rules.splice(index, 1);
            },
            
            clearAll() {
              if (!confirm('${t('confirmClearAllRules')}')) {
                return;
              }
              
              this.$dispatch('custom-rules-clear');
              setTimeout(() => {
                this.rules = [];
                this.jsonContent = '[]';
              }, 200);
            },
            
            validateJson() {
              try {
                const parsed = JSON.parse(this.jsonContent);
                if (Array.isArray(parsed)) {
                  this.rules = parsed;
                  this.jsonError = null;
                  this.jsonValid = true;
                  setTimeout(() => this.jsonValid = false, 3000);
                } else {
                  this.jsonError = '${t('mustBeArray')}';
                }
              } catch (e) {
                this.jsonError = e.message;
              }
            }
          }
        }
      `}} />
    </div>
  );
};