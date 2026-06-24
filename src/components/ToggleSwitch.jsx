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
      class="flex cursor-pointer items-center justify-between rounded-lg border border-black/10 bg-gray-50 p-3 dark:border-white/10 dark:bg-[#3b3b3b]"
    >
      <div>
        <span class="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        {description && (
          <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      <div class="relative inline-flex items-center cursor-pointer">
        <input
          id={toggleId}
          type="checkbox"
          x-model={model}
          disabled={disabled}
          class="sr-only peer"
          {...(onChange ? { 'x-on:change': onChange } : {})}
        />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
      </div>
    </label>
  );
};
