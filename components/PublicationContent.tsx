export default function PublicationContent({ content }: { content: string }) {
  return (
    <div className="px-4 py-2">
      <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
    </div>
  );
}
