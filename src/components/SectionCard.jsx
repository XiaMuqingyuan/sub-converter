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
    <div class={`rounded-2xl border border-black/10 bg-white/65 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04] md:p-8 ${className}`}>
      {(icon || title || actions) && (
        <div class="mb-4 flex items-center justify-between">
          {(icon || title) && (
            <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              {icon && <i class={`${icon} text-gray-400`} />}
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
