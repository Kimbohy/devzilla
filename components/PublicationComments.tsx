"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

interface PublicationCommentsProps {
  publicationId: string;
}

export default function PublicationComments({
  publicationId,
}: PublicationCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch comments when component mounts or publication changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/publications/${publicationId}/comments`
        );
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setError("Impossible de charger les commentaires");
        setLoading(false);
      }
    };

    if (publicationId) {
      fetchComments();
    }
  }, [publicationId]);

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        `/api/publications/${publicationId}/comments`,
        {
          content: newComment,
        }
      );

      // Add the new comment to the list
      setComments((prevComments) => [...prevComments, response.data]);

      // Clear input
      setNewComment("");
    } catch (err) {
      console.error("Failed to submit comment:", err);
      setError("Impossible de publier le commentaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Comment Input */}
      <form
        onSubmit={handleSubmitComment}
        className="flex items-start space-x-3"
      >
        <Image
          src="/avatar.svg"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-grow">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary"
            rows={2}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className={`mt-2 px-4 py-2 rounded-lg text-white transition-colors 
              ${
                isSubmitting || !newComment.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark"
              }`}
          >
            {isSubmitting ? "Envoi en cours..." : "Commenter"}
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4 p-5">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">Aucun commentaire</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg"
            >
              <Image
                src={comment.user.avatar}
                alt={comment.user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{comment.user.name}</h4>
                  <span className="text-xs text-gray-500">
                    {comment.createdAt}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
