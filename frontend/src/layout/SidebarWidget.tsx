export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Feito por RLBV Systems
      </h3>
      <p className="mb-4 text-gray-400 text-theme-sm dark:text-gray-400">
        Impulsionando seu negócio com soluções inovadoras.
      </p>
      <span className="font-medium text-theme-sm text-gray-300 dark:text-gray-400">
        @2026 RLBV Productions. Todos os direitos reservados.
      </span>
    </div>
  );
}
