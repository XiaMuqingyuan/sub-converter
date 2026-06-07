/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

export const TextareaWithActions = (props) => {
  const {
    id,
    name,
    label,
    labelPrefix = null,
    placeholder,
    required = false,
    rows,
    model,
    variant = 'default',
    containerClass = '',
    textareaClass = '',
    labelWrapperClass = 'flex items-center justify-between mb-2',
    labelActions = [],
    labelActionsWrapperClass = 'flex gap-2',
    inlineActions = [],
    inlineActionsWrapperClass = 'flex gap-2 absolute bottom-4 right-4',
    textareaAttrs = {},
    preserveLabelSpace = true,
    children
  } = props;

  const textareaBindings = { ...textareaAttrs };
  if (model && !textareaBindings['x-model']) {
    textareaBindings['x-model'] = model;
  }
  if (required) {
    textareaBindings.required = true;
  }
  if (rows) {
    textareaBindings.rows = rows;
  }

  const classNames = [
    'w-full rounded-2xl border border-gray-200/80 px-4 py-3 text-gray-900 shadow-inner shadow-gray-100/70 outline-none transition-all duration-200 resize-y placeholder-gray-400 focus:border-primary-300 focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700/80 dark:text-white dark:shadow-black/20 dark:placeholder-gray-500 dark:focus:border-primary-700',
    variant === 'mono' ? 'font-mono text-sm bg-gray-50/80 dark:bg-gray-950/70' : 'bg-gray-50/80 dark:bg-gray-950/70',
    textareaClass
  ]
    .filter(Boolean)
    .join(' ');

  const renderActions = (actionsArray) =>
    actionsArray?.length
      ? actionsArray.map((action, index) => {
          const {
            key,
            type = 'button',
            icon,
            label: actionLabel,
            hideLabelOnMobile = false,
            className: actionClass = '',
            title,
            attrs = {}
          } = action;

          return (
            <button
              type={type}
              title={title || actionLabel}
              class={actionClass}
              key={key || `${actionLabel || 'action'}-${index}`}
              {...attrs}
            >
              {icon && <i class={icon}></i>}
              {actionLabel && (
                <span class={hideLabelOnMobile ? 'hidden sm:inline' : ''}>{actionLabel}</span>
              )}
            </button>
          );
        })
      : null;

  const hasLabelContent = Boolean(label || labelPrefix);
  const hasLabelSection = Boolean(hasLabelContent || (labelActions?.length ?? 0) > 0);

  const shouldRenderPlaceholder =
    !hasLabelContent && preserveLabelSpace && (labelActions?.length ?? 0) > 0;

  return (
    <div class={`space-y-2 ${containerClass}`.trim()}>
      {hasLabelSection && (
        <div class={labelWrapperClass}>
          {hasLabelContent ? (
            <label
              for={id}
              class="block text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"
            >
              {labelPrefix}
              {label}
            </label>
          ) : shouldRenderPlaceholder ? (
            <span></span>
          ) : null}
          {labelActions?.length ? (
            <div class={labelActionsWrapperClass}>{renderActions(labelActions)}</div>
          ) : null}
        </div>
      )}

      <div class="relative">
        <textarea id={id} name={name} placeholder={placeholder} class={classNames} {...textareaBindings}></textarea>
        {inlineActions?.length ? (
          <div class={inlineActionsWrapperClass}>{renderActions(inlineActions)}</div>
        ) : null}
      </div>

      {children}
    </div>
  );
};
