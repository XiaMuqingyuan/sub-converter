/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

export const ToggleSwitch = (props) => {
  const {
    model,
    label,
    description,
    disabled,
    onChange,
    id,
  } = props;

  const toggleId = id || `toggle-${model}`;

  return (
    <label
      for={toggleId}
      class="group flex cursor-pointer items-center justify-between rounded-xl border border-black/8 bg-white/70 p-3.5 transition-all duration-200 hover:border-primary-300/40 hover:shadow-sm dark:border-white/8 dark:bg-[#3b3b3b]/55 dark:hover:border-primary-400/25"
    >
      <div class="space-y-0.5">
        <span class="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">{label}</span>
        {description && (
          <p class="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      <div class="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
        <input
          id={toggleId}
          type="checkbox"
          x-model={model}
          disabled={disabled}
          class="sr-only peer"
          {...(onChange ? { 'x-on:change': onChange } : {})}
        />
        <div class="w-11 h-6 bg-gray-300/70 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-700/50 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-gray-500 peer-checked:bg-primary-600 dark:peer-checked:bg-primary-500"></div>
      </div>
    </label>
  );
};