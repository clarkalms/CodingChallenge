import Modal from './Modal';
import { useState } from 'react';
import './addPost.css';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function AddPost({ onClose, open }) {
	const [name, setName] = useState('');
	const [postText, setPostText] = useState('');

	/* function to add new post to firestore */
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collection(db, 'posts'), {
				user: name,
				text: postText,
				liked: false,
				created: Timestamp.now(),
			});
			onClose();
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Modal modalLable="Add Post" onClose={onClose} open={open}>
			<form onSubmit={handleSubmit} className="addPost" name="addPost">
				<input
					type="text"
					name="name"
					onChange={(e) => setName(e.target.value.toUpperCase())}
					value={name}
					placeholder="Name"
				/>
				<textarea
					onChange={(e) => setPostText(e.target.value)}
					placeholder="What's on your mind?"
					value={postText}
				></textarea>
				<button type="submit">DONE</button>
			</form>
		</Modal>
	);
}

export default AddPost;
