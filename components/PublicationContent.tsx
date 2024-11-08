export default function PublicationContent({ content }: { content: string }) {
  return (
    <div className="px-3 md:px-4 py-2">
      <p className="text-sm md:text-base text-gray-800 whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
