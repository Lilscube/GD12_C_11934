import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Row, Col, Button, ListGroup, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KomentarPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    if (isEditing) {
      setComments(
        comments.map((comment) =>
          comment.id === editingId ? { ...comment, text: newComment } : comment
        )
      );
      toast.success("Komentar berhasil diperbarui");
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newCommentData = {
        id: comments.length + 1,
        username: "@user", 
        text: newComment,
        time: new Date().toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setComments([newCommentData, ...comments]);
      toast.success("Komentar berhasil ditambahkan");
    }

    setNewComment("");
  };

  const handleEditComment = (id) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setNewComment(commentToEdit.text);
      setIsEditing(true);
      setEditingId(id);
    }
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteCommentId(id);
  };

  const handleDeleteComment = () => {
    setComments(comments.filter((comment) => comment.id !== deleteCommentId));
    setShowDeleteModal(false);
    setDeleteCommentId(null);
    toast.success("Komentar berhasil dihapus");
  };

  return (
    <Container className="mb-4 text-start">
      <Row>
        <Col md={8} className="mx-auto">
          {/* Konten Gambar, Title, dan Deskripsi */}
          <div className="mb-4 text-left" style={{ backgroundColor: "#343a40", padding: "16px", borderRadius: "8px" }}>
            {state?.imageUrl && (
              <img
                src={state.imageUrl}
                alt="Content Thumbnail"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            )}
            <h5 className="text-white mt-3">{state?.title || "Untitled Content"}</h5>
            <p className="text-white">{state?.description || "No description provided."}</p>
          </div>

          {/* Komentar Section */}
          <div className="comments-section">
            <h6 className="text-white mb-3">Comments</h6>
            <p className="text-white">Tuliskan komentar baru:</p>
            <div className="d-flex mb-3">
              <Form.Control
                as="textarea"
                className="textarea-placeholder"
                style={{
                  backgroundColor: "#0A1628",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #4A90E2",
                  color: "white",
                }}
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add New Comment"
              />
              <Button
                className="ms-2"
                style={{
                  height: "3rem",
                  backgroundColor: "#4A90E2",
                  border: "none",
                  fontWeight: "bold",
                  color: "white",
                }}
                onClick={handleAddComment}
              >
                {isEditing ? "Update" : "Kirim"}
              </Button>
            </div>

            <ListGroup>
              {comments.length === 0 ? (
                <div
                  style={{
                    backgroundColor: "#0A1628",
                    padding: "10px",
                    borderRadius: "8px",
                    textAlign: "center",
                    color: "white",
                    border: "1px solid #4A90E2",
                  }}
                >
                  Belum ada komentar, ayo tambahin komentar!
                </div>
              ) : (
                comments.map((comment) => (
                  <ListGroup.Item
                    key={comment.id}
                    className="d-flex justify-content-between align-items-start"
                    style={{
                      backgroundColor: "#0A1628",
                      borderRadius: "8px",
                      marginBottom: "10px",
                      border: "1px solid #4A90E2",
                      color: "white",
                    }}
                  >
                    <div>
                      <strong>{comment.username}</strong>
                      <div className="small text-white">{comment.time}</div>
                      <p className="mb-0">{comment.text}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        style={{ backgroundColor: "#F0AD4E", border: "none" }}
                        onClick={() => handleEditComment(comment.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ backgroundColor: "#D9534F", border: "none" }}
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>

          </div>
        </Col>
      </Row>

      {/* Toast Notification */}
      <ToastContainer />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hapus Komentar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus komentar ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteComment}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default KomentarPage;
