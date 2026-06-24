/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

export const SectionCard = (props) => {
  const {
    icon,
    title,
    children,
    actions,
    className = '',
    bodyClass = '',
  } = props;

  return (
    <div class={`glass-card rounded-2xl p-6 md:p-8 ${className}`}>
      {(icon || title || actions) && (
        <div class="mb-5 flex items-center justify-between">
          {(icon || title) && (
            <h3 class="flex items-center gap-2.5 text-lg font-semibold text-gray-900 dark:text-white">
              {icon && <i class={`${icon} text-primary-500/60 dark:text-primary-400/60`} />}
              {title}
            </h3>
          )}
          {actions && <div class="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div class={bodyClass}>{children}</div>
    </div>
  );
};