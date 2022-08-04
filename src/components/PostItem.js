import Modal from './Modal';
import './postItem.css';

function PostItem({ onClose, open, name, postText }) {
	return (
		<Modal modalLable="" onClose={onClose} open={open}>
			<div className="postItem">
				<h2>{name}</h2>
				<p>{postText}</p>
			</div>
		</Modal>
	);
}

export default PostItem;
