import './post.css';
import { useState } from 'react';
import EditPost from './EditPost';
import TimeSince from './TimeSince';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

function Post({
	isActive,
	posts,
	id,
	isLiked,
	name,
	postText,
	created,
	buttonClick,
}) {
	const [liked, setLiked] = useState(isLiked);
	const [edit, setEdit] = useState(false);
	const [postActive, setPostActive] = useState(isActive);
	const handleClose = () => {
		setEdit(false);
	};

	// console.log(console.log(`POST ID: ${id} POST IS ACTIVE: ${isActive}`));

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
		const taskDocRef = doc(db, 'posts', id);
		// console.log(id);
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
					<div className="post__header__left">
						<FontAwesomeIcon
							icon={regular('circle-user')}
							size={'3x'}
							color="rgb(81, 168, 198)"
						/>
						<h2 className="post__username">{name}</h2>
						<TimeSince timeStamp={created} />
					</div>
					<div className="post__header__right">
						<span>{isActive ? 'HIDE' : 'SHOW'}</span>
						<FontAwesomeIcon
							color="rgb(81, 168, 198)"
							cursor={'pointer'}
							icon={isActive ? solid('eye') : solid('eye-slash')}
							onClick={() => buttonClick().then(setPostActive(!postActive))}
						/>
					</div>
				</div>

				<div className={isActive ? 'accordion__open' : 'accordion__close'}>
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
									onClick={() => setEdit(true)}
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
			</div>

			{edit && (
				<EditPost
					onClose={handleClose}
					name={name}
					toEditPostText={postText}
					open={edit}
					id={id}
				/>
			)}
		</div>
	);
}

export default Post;
