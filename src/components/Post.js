import './post.css';
import { useState } from 'react';
import PostItem from './PostItem';
import EditPost from './EditPost';
import TimeSince from './TimeSince';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function Post({ id, isLiked, name, postText, created }) {
	const [liked, setLiked] = useState(isLiked);
	console.log('LIKED STATE: ', isLiked);
	const [open, setOpen] = useState({ edit: false, view: false });
	const handleClose = () => {
		setOpen({ edit: false, view: false });
	};

	const formatDate = (date) => {
		let dateString = new Date(created.seconds * 1000).toDateString();
		let timeString = new Date(created.seconds * 1000).toLocaleString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		});
		return `${dateString} ${timeString}`;
	};

	/* function to update firestore */
	const handleChange = async () => {
		console.log('LIKED: ', liked);
		console.log('NOT LIKED: ', !liked);

		const taskDocRef = doc(db, 'posts', id);
		console.log(id);
		try {
			setLiked(!liked);
			await updateDoc(taskDocRef, {
				liked,
			});
		} catch (err) {
			alert(err);
		}
	};
	/* function to delete a document from firstore */
	const handleDelete = async () => {
		const postDocRef = doc(db, 'posts', id);
		try {
			await deleteDoc(postDocRef);
		} catch (err) {
			alert(err);
		}
	};

	return (
		<div className="post">
			<div className="post__body">
				<div className="post__header">
					<FontAwesomeIcon
						icon={regular('circle-user')}
						size={'3x'}
						color="rgb(81, 168, 198)"
					/>
					<h2 className="post__username">{name}</h2>
					<TimeSince timeStamp={created} />
				</div>
				<div className="post__text">
					<p>{postText}</p>
				</div>
				<div className="post__footer">
					<div className="post__timestamp">
						<p>{formatDate(created)}</p>
					</div>
					<div className="post__buttons">
						<div className="heart__icon">
							<FontAwesomeIcon
								cursor={'pointer'}
								onClick={() => handleChange()}
								id={`checkbox-${id}`}
								color="tomato"
								icon={isLiked ? solid('heart') : regular('heart')}
							/>
						</div>
						<div className="edit__icon">
							<FontAwesomeIcon
								color="rgb(81, 168, 198)"
								cursor={'pointer'}
								icon={regular('pen-to-square')}
								onClick={() => setOpen({ ...open, edit: true })}
							/>
						</div>
						<div className="trash__icon">
							<FontAwesomeIcon
								color="rgb(81, 168, 198)"
								cursor={'pointer'}
								icon={regular('trash-can')}
								onClick={() => handleDelete()}
							/>
						</div>
					</div>
				</div>
			</div>

			{open.view && (
				<PostItem
					onClose={handleClose}
					name={name}
					postText={postText}
					open={open.view}
				/>
			)}

			{open.edit && (
				<EditPost
					onClose={handleClose}
					name={name}
					toEditPostText={postText}
					open={open.edit}
					id={id}
				/>
			)}
		</div>
	);
}

export default Post;
