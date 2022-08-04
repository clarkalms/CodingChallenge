import './postManager.css';
import Post from './Post';
import { useState, useEffect } from 'react';
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	doc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import AddPost from './AddPost';

function PostManager() {
	const [openAddModal, setOpenAddModal] = useState(false);
	const [posts, setPosts] = useState([]);

	/* function to get all posts from firestore in realtime */
	useEffect(() => {
		const postColRef = query(
			collection(db, 'posts'),
			orderBy('created', 'desc')
		);
		onSnapshot(postColRef, (snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => ({
					isActive: false,
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
	}, []);

	const displayContent = async (id) => {
		for (let i = 0; i < posts.length; i++) {
			let taskDocRef = doc(db, 'posts', posts[i].id);
			if (posts[i].id === id) {
				if (posts[i].data.postActive === true) {
					await updateDoc(taskDocRef, {
						postActive: false,
					});
				} else {
					await updateDoc(taskDocRef, {
						postActive: true,
					});
				}
			} else {
				await updateDoc(taskDocRef, {
					postActive: false,
				});
			}
		}
	};

	return (
		<div className="postManager">
			<header>POSTS:</header>
			{openAddModal && (
				<AddPost onClose={() => setOpenAddModal(false)} open={openAddModal} />
			)}

			<div className="postManager__container">
				<button onClick={() => setOpenAddModal(true)}>Add Post +</button>
				<div className="postManager__posts">
					{posts.map((post) => (
						<Post
							isActive={post.data.postActive}
							posts={posts}
							buttonClick={() => displayContent(post.id)}
							id={post.id}
							key={post.id}
							name={post.data.user}
							postText={post.data.text}
							isLiked={post.data.liked}
							created={post.data.created}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default PostManager;
