import Modal from "./Modal";

const DeleteConfirm = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <Modal
      title="Delete Task"
      message="Are you sure you want to delete this task?"
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default DeleteConfirm;
