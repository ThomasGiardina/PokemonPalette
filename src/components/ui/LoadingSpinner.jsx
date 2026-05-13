export default function LoadingSpinner({ size = 24 }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className="animate-spin rounded-full"
        style={{
          width: size,
          height: size,
          border: '2px solid var(--border)',
          borderTopColor: 'var(--primary)',
        }}
      />
    </div>
  );
}
