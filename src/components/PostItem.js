import Modal from './Modal';
import './postItem.css';

function PostItem({
	onClose,
	open,
	name,
	addressStreet,
	addressCity,
	addressState,
	addressZip,
}) {
	return (
		<Modal modalLable="Ship to: " onClose={onClose} open={open}>
			<div className="postItem">
				<h2>{name}</h2>
				<p>{addressStreet}</p>
				<p>{`${addressCity}, ${addressState} ${addressZip}`}</p>
			</div>
		</Modal>
	);
}

export default PostItem;
