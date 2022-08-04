import Modal from './Modal';
import { useState } from 'react';
import './editPost.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function EditPost({ open, onClose, name, toEditPostText, id }) {
	const [postText, setPostText] = useState(toEditPostText);

	/* function to update firestore */
	const handleUpdate = async (e) => {
		e.preventDefault();
		const postDocRef = doc(db, 'posts', id);
		try {
			await updateDoc(postDocRef, {
				user: name,
				text: postText,
			});
			onClose();
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Modal modalLable="EDIT POST" onClose={onClose} open={open}>
			<form onSubmit={handleUpdate} className="editPost">
				<input type="text" name="title" defaultValue={name} readOnly={true} />
				<textarea
					onChange={(e) => setPostText(e.target.value)}
					defaultValue={postText}
				></textarea>
				<button type="submit">EDIT</button>
			</form>
		</Modal>
	);
}

export default EditPost;
