export default function AssignmentHeader() {
  return (
    <div className="hidden items-start justify-between lg:flex">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-success shadow-[0_0_12px_rgba(34,197,94,0.7)]" />

          <h1
            className="
              font-display
              text-[24px]
              font-bold
              leading-[120%]
              tracking-[-0.04em]
              text-foreground
            "
          >
            Assignments
          </h1>
        </div>

        <p className="mt-1 text-sm text-muted font-display font-normal leading-[1.4] tracking-[-0.04em] text-center text-muted-foreground align-middle">
          Manage and create assignments for your classes.
        </p>
      </div>
    </div>
  );
}
